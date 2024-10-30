<?php
/**
 * The icon library
 *
 * @package   BoldBlocks
 * @author    Phi Phan <mrphipv@gmail.com>
 * @copyright Copyright (c) 2022, Phi Phan
 */

namespace BoldBlocks;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( ! class_exists( IconLibrary::class ) ) :
	/**
	 * The controller class for icon library.
	 */
	class IconLibrary extends CoreComponent {
		/**
		 * Run main hooks
		 *
		 * @return void
		 */
		public function run() {
			// Add rest api endpoint to query icon library.
			add_action( 'rest_api_init', [ $this, 'register_icon_library_endpoint' ] );
		}

		/**
		 * Build a custom endpoint to query icon library.
		 *
		 * @return void
		 */
		public function register_icon_library_endpoint() {
			register_rest_route(
				'cbb/v1',
				'/getIconLibrary/',
				array(
					'methods'             => 'GET',
					'callback'            => [ $this, 'get_icon_library' ],
					'permission_callback' => function () {
						return current_user_can( 'publish_posts' );
					},
				)
			);
		}

			/**
			 * Get icon library.
			 *
			 * @param WP_REST_Request $request The request object.
			 * @return void
			 */
		public function get_icon_library( $request ) {
			// icons file path.
			$icons_file = $this->the_plugin_instance->get_file_path( 'data/icon-library/icons.json' );

			// Send the error if the icons file is not exists.
			if ( ! \file_exists( $icons_file ) ) {
				wp_send_json_error( __( 'The icons.json file is not exists.', 'content-blocks-builder' ), 500 );
			}

			// Parse json.
			$icons = wp_json_file_decode( $icons_file, [ 'associative' => true ] );

			// Query svg images from the media library.
			$media_svg_images = $this->query_svg_images();

			if ( $media_svg_images ) {
				$icons = $media_svg_images + $icons;
			}

			wp_send_json(
				[
					'data'    => $icons,
					'success' => true,
				]
			);
		}

		/**
		 * Query SVG images from the library
		 *
		 * @return array
		 */
		private function query_svg_images() {
			$media_svgs = [];
			$images     = get_posts(
				[
					'post_type'      => 'attachment',
					'post_mime_type' => [ 'image/svg+xml' ],
					'post_status'    => 'any',
					'posts_per_page' => 100,
				]
			);

			if ( $images ) {
				foreach ( $images as $image ) {
					$icon = file_get_contents( get_attached_file( $image->ID ) );
					if ( $icon ) {
						$media_svgs[] = [
							'name'       => $image->post_name,
							'title'      => $image->post_title,
							'icon'       => $icon,
							'categories' => [ 'Media Library' ],
							'provider'   => 'Media Library',
						];
					}
				}
			}

			return $media_svgs;
		}
	}
endif;
