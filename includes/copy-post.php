<?php
/**
 * Copy blocks, variations, and patterns
 *
 * @package    BoldBlocks
 * @author     Phi Phan <mrphipv@gmail.com>
 * @copyright  Copyright (c) 2023, Phi Phan
 */

namespace BoldBlocks;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( ! class_exists( CopyPost::class ) ) :
	/**
	 * Copy blocks, variations, or patterns
	 */
	class CopyPost extends CoreComponent {
		/**
		 * Run main hooks
		 *
		 * @return void
		 */
		public function run() {
			// Add the Copy action link the the list post screen.
			add_action( 'admin_init', [ $this, 'copy_post_row_actions' ] );

			// Add new rest api endpoint.
			add_action( 'rest_api_init', [ $this, 'register_endpoint' ] );

			// Handle copy action.
			add_action( 'admin_action_cbb_copy_item', [ $this, 'hanlde_copy_item_action_link' ] );

			// Add a notice for item copied successfully.
			add_action( 'admin_notices', [ $this, 'copy_item_admin_notice' ] );

			// Enqueue scripts.
			add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_block_editor_assets' ] );
		}

		/**
		 * Add the Copy action link the the list post screen.
		 *
		 * @return void
		 */
		public function copy_post_row_actions() {
			if ( 'edit.php' === $GLOBALS['pagenow'] ) {
				add_filter( 'post_row_actions', [ $this, 'add_row_action' ], 10, 2 );
				add_filter( 'page_row_actions', [ $this, 'add_row_action' ], 10, 2 );
				return;
			}
		}

		/**
		 * Add a "Copy" row action to blocks, variations, and patterns on list views.
		 *
		 * @param array   $actions Existing actions.
		 * @param WP_Post $post    Post object of current post in list.
		 * @return array           Array of updated row actions.
		 */
		public function add_row_action( $actions, $post ) {
			// Bail if it's not a place to add the copy link.
			if ( ! $this->user_can_access_post( $post->ID ) || ! $post instanceof \WP_Post || ! $this->validate_post_type( $post->post_type, $post ) ) {
				return $actions;
			}

			$edit_url    = wp_nonce_url(
				add_query_arg(
					array(
						'post_type'   => $post->post_type,
						'action'      => 'cbb_copy_item',
						'cbb-copy-id' => $post->ID,
					),
					admin_url( 'post-new.php' )
				),
				BOLDBLOCKS_CBB_ROOT_FILE,
				'cbb-copy-nonce'
			);
			$edit_action = array(
				'cbb-copy' => sprintf(
					'<a href="%s" aria-label="%s">%s</a>',
					esc_url( $edit_url ),
					esc_attr__( 'Copy this item.', 'content-blocks-builder' ),
					esc_html__( 'Copy', 'content-blocks-builder' )
				),
			);

			// Insert the Copy action before the Trash action.
			$edit_offset     = max( 2, array_search( 'trash', array_keys( $actions ), true ) );
			$updated_actions = array_merge(
				array_slice( $actions, 0, $edit_offset ),
				$edit_action,
				array_slice( $actions, $edit_offset )
			);

			/**
			 * Fires after the new Copy action has been added to the row actions.
			 * Allows changes to the action presentation, or other final checks.
			 *
			 * @param array   $updated_actions Updated row actions with the Copy Post action.
			 * @param array   $actions Original row actions passed to this filter.
			 * @param WP_Post $post Post object of current post in listing.
			 */
			return apply_filters( 'cbb_copy_item_row_actions', $updated_actions, $actions, $post );
		}

		/**
		 * Function creates post duplicate as a draft and redirects then to the edit post screen
		 */
		public function hanlde_copy_item_action_link() {
			// Bail if there is no post to copy.
			if ( empty( $_GET['cbb-copy-id'] ) ) {
				return;
			}

			// Nonce verification.
			if ( ! isset( $_GET['cbb-copy-nonce'] ) || ! wp_verify_nonce( $_GET['cbb-copy-nonce'], BOLDBLOCKS_CBB_ROOT_FILE ) ) {
				return;
			}

			// Get the original post id.
			$post_id = absint( $_GET['cbb-copy-id'] );

			// Clone it.
			$new_post = $this->copy_item( $post_id );

			// On error.
			if ( ! $new_post || ! $new_post instanceof \WP_Post ) {
				die( is_string( $new_post ) ? $new_post : '' );
			}

			// Redirect to the post list screen.
			wp_safe_redirect(
				add_query_arg(
					array(
						'post_type'     => $new_post->post_type,
						'cbb_copied_id' => $new_post->ID,
					),
					admin_url( 'edit.php' )
				)
			);

			exit;
		}

		/**
		 * Copy a post to a new one
		 *
		 * @param int $post_id
		 * @return WP_Post|string
		 */
		private function copy_item( $post_id ) {
			// Get the post data.
			$post = get_post( $post_id );
			if ( ! $post || ! $post instanceof \WP_Post ) {
				return __( 'Copy post failed, could not find the original post.', 'content-blocks-builder' );
			}

			// Not has permission and invalid post type.
			if ( ! $this->user_can_access_post( $post->ID ) || ! $this->validate_post_type( $post->post_type, $post ) ) {
				return __( 'You are not allowed to copy the original post', 'content-blocks-builder' );
			}

			// New author id.
			$current_user  = wp_get_current_user();
			$new_author_id = $current_user->ID;

			// New post data.
			$args = array(
				'post_title'   => $post->post_title . __( ' new copy', 'content-blocks-builder' ),
				'post_content' => wp_slash( $post->post_content ),
				'post_author'  => $new_author_id,
				'post_status'  => 'draft',
				'post_type'    => $post->post_type,
				'menu_order'   => $post->menu_order,
			);

			// Insert the post.
			$new_post_id = wp_insert_post( $args );

			// Copy taxonomies.
			$taxonomies = get_object_taxonomies( $post->post_type );
			if ( $taxonomies ) {
				foreach ( $taxonomies as $taxonomy ) {
					$post_terms = wp_get_object_terms( $post_id, $taxonomy, array( 'fields' => 'slugs' ) );
					wp_set_object_terms( $new_post_id, $post_terms, $taxonomy, false );
				}
			}

			// Copy post meta.
			$post_meta = get_post_custom( $post_id );
			foreach ( $post_meta as $key => $values ) {
				foreach ( $values as $value ) {
					if ( 'boldblocks_variation_name' === $key ) {
						$strlen = strlen( $value );
						if ( $strlen > 10 ) {
							$id = uniqid();
							if ( strlen( $id ) > 10 ) {
								$id = substr( $id, -10 );
							}
							$prefix = substr( $value, 0, $strlen - 10 );
							$value  = $prefix . $id;
						}
					}
					update_post_meta( $new_post_id, $key, maybe_unserialize( $value ) );
				}
			}

			return get_post( $new_post_id );
		}

		/**
		 * Register a custom endpoint to copy post.
		 *
		 * @return void
		 */
		public function register_endpoint() {
			register_rest_route(
				'boldblocks/v1',
				'/copyPost/(?P<id>[\d]+)',
				array(
					'methods'             => 'POST',
					'callback'            => [ $this, 'handle_copy_post_request' ],
					'permission_callback' => function ( $request ) {
						return $this->user_can_access_post( $request['id'] );
					},
				)
			);
		}

		/**
		 * Handle copy post from REST api.
		 *
		 * @param WP_Request $request
		 * @return void
		 */
		public function handle_copy_post_request( $request ) {
			$post_id = $request['id'];

			// Clone it.
			$post = $this->copy_item( $post_id );

			// On error.
			if ( ! $post || ! $post instanceof \WP_Post ) {
				wp_send_json_error( $post );
			}

			wp_send_json_success(
				[
					'post'   => $post,
					'notice' => $this->get_success_response(
						$post->ID,
						$post->post_type
					),
				]
			);
		}

		/**
		 * Add the admin notice
		 *
		 * @return void
		 */
		public function copy_item_admin_notice() {
			// Get the current screen.
			$screen = get_current_screen();

			if ( 'edit' !== $screen->base ) {
				return;
			}

			if ( ! $this->validate_post_type( $screen->post_type ) ) {
				return;
			}

			// Checks if settings updated.
			// phpcs:ignore WordPress.Security.NonceVerification.Recommended
			if ( isset( $_GET['cbb_copied_id'] ) ) {
				// phpcs:ignore WordPress.Security.NonceVerification.Recommended
				$res       = $this->get_success_response( absint( $_GET['cbb_copied_id'] ), $screen->post_type );
				$edit_link = sprintf(
					'<a href="%s" aria-label="%s">%s</a>',
					esc_url( $res['edit_url'] ),
					$res['edit_label'],
					$res['edit_label']
				);
				// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				echo '<div class="notice notice-success is-dismissible"><p>' . $res['message'] . ' ' . $edit_link . '.</p></div>';
			}
		}

		/**
		 * Build the success massage
		 *
		 * @param int    $post_id
		 * @param string $post_type
		 * @return array
		 */
		private function get_success_response( $post_id, $post_type ) {
			$post_type_object = get_post_type_object( $post_type );
			$post_type_label  = $post_type_object->labels->singular_name;

			$edit_url = add_query_arg(
				array(
					'action' => 'edit',
					'post'   => $post_id,
				),
				admin_url( 'post.php' )
			);

			return [
				'message'    => sprintf( __( 'A new copied %s is created.', 'content-blocks-builder' ), strtolower( $post_type_label ) ),
				'edit_url'   => $edit_url,
				'edit_label' => esc_attr__( 'Edit' ),
			];
		}

		/**
		 * Enqueue editor assets
		 *
		 * @return void
		 */
		public function enqueue_block_editor_assets() {
			$screen = get_current_screen();
			if ( $this->validate_post_type( $screen->post_type ) ) {
				// Access file.
				$copy_post_asset = $this->the_plugin_instance->include_file( 'build/copy-post.asset.php' );

				// Scripts.
				wp_enqueue_script(
					'cbb-copy-post',
					$this->the_plugin_instance->get_file_uri( '/build/copy-post.js' ),
					$copy_post_asset['dependencies'] ?? [],
					$this->the_plugin_instance->get_script_version( $copy_post_asset ),
					[ 'in_footer' => true ]
				);

				// Add translation.
				wp_set_script_translations( 'cbb-copy-post', 'content-blocks-builder' );
			}
		}

		/**
		 * Determine if the current user has edit access to the source post.
		 *
		 * @param int $post_id Source post ID (the post being copied).
		 * @return bool True if user has the meta cap of `edit_post` for the given post ID, false otherwise.
		 */
		protected function user_can_access_post( $post_id ) {
			return current_user_can( 'edit_post', $post_id );
		}

		/**
		 * Validate the post type to be used for the target post.
		 *
		 * @param WP_Post $post Post object of current post in listing.
		 * @return bool True if the post type is in a list of supported psot types; false otherwise.
		 */
		protected function validate_post_type( $post_type, $post = null ) {
			/**
			 * Fires when determining if the "Copy" row action should be made available.
			 * Allows overriding supported post types.
			 *
			 * @param array   Post types supported by default.
			 * @param WP_Post $post Post object of current post in listing.
			 */
			$valid_post_types = apply_filters(
				'cbb_copy_item_post_types',
				[
					'boldblocks_block',
					'boldblocks_variation',
					'boldblocks_pattern',
					'post',
					'page',
				],
				$post
			);

			return in_array( $post_type, $valid_post_types, true );
		}
	}
endif;
