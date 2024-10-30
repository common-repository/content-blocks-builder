<?php
/**
 * The custom style component
 *
 * @package   BoldBlocks
 * @author    Phi Phan <mrphipv@gmail.com>
 * @copyright Copyright (c) 2022, Phi Phan
 */

namespace BoldBlocks;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( ! class_exists( CustomStyle::class ) ) :
	/**
	 * The controller class for style.
	 */
	class CustomStyle extends CoreComponent {
		/**
		 * The style handle for feature styles
		 *
		 * @var array
		 */
		private $feature_style_handle = 'cbb-dynamic-style';

		/**
		 * Store the context of styles
		 *
		 * @var array
		 */
		private $style_contexts = [
			'loops'           => [],
			'loop'            => '',
			'post'            => 0,
			'counter'         => 0,
			'content'         => false,
			'content_counter' => 0,
		];

		/**
		 * Store the ID of query loop with carousel or grid layout
		 *
		 * @var array
		 */
		private $query_ids = [];

		/**
		 * The cached styles
		 *
		 * @var array
		 */
		private $styles = [];

		/**
		 * The refined breakpoints
		 *
		 * @var array
		 */
		private $breakpoints = [];

		/**
		 * The list of non-cbb blocks that support dynamic style
		 *
		 * @var array
		 */
		public $non_cbb_blocks = [ 'core/template-part' ];

		/**
		 * Run main hooks
		 *
		 * @return void
		 */
		public function run() {
			// Register setting fields.
			add_action( 'init', [ $this, 'register_setting_fields' ] );

			// Register style handle.
			add_action( 'init', [ $this, 'register_feature_style' ] );

			// Render block style.
			add_filter( 'render_block', [ $this, 'render_block_style' ], 10, 3 );

			// Render link to post first.
			add_filter( 'render_block', [ $this, 'build_block_link_to_post' ], 20, 3 );

			// Build dynamic block overlay.
			add_filter( 'render_block', [ $this, 'build_block_overlay' ], 20, 3 );

			// Build dynamic block background.
			add_filter( 'render_block', [ $this, 'build_block_background' ], 30, 3 );

			// Build animations.
			add_filter( 'render_block', [ $this, 'build_block_animations' ], 30, 3 );

			// Render grid style for the query loop block.
			add_filter( 'render_block_core/query', [ $this, 'render_query_loop_grid_style' ], 10, 3 );

			// Render carousel settings for the query loop block.
			add_filter( 'render_block_core/query', [ $this, 'render_query_loop_carousel_layout' ], 10, 3 );

			// Enqueue block styles.
			add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_responsive_styles' ] );

			// Enqueue breakpoints.
			add_action( 'init', [ $this, 'enqueue_reponsive_breakpoints' ] );

			// Update loop id.
			add_filter( 'render_block_context', [ $this, 'update_loop_id' ], 10, 2 );

			// Reset loop id.
			add_filter( 'render_block', [ $this, 'reset_loop_id' ], 10, 2 );

			// Render preload style for carousels.
			add_filter( 'cbb_get_block_style', [ $this, 'get_carousel_preload_style' ], 10, 2 );

			// Support dynamic style for none-cbb blocks.
			add_filter( 'cbb_support_block_style', [ $this, 'support_block_style' ], 10, 2 );

			// Set a block layout for non-cbb blocks.
			add_filter( 'cbb_get_block_layout', [ $this, 'get_block_layout' ], 10, 2 );

			// Render sticky data for the core/template-part block.
			add_filter( 'render_block_core/template-part', [ $this, 'render_template_part_sticky' ], 10, 3 );

			// Build preloader for the carousel.
			add_filter( 'render_block', [ $this, 'build_carousel_preloader' ], 30, 3 );
		}

		/**
		 * Register custom setting fields
		 *
		 * @return void
		 */
		public function register_setting_fields() {
			register_setting(
				'boldblocks',
				'cbb_breakpoints',
				[
					'type'         => 'array',
					'show_in_rest' => array(
						'name'   => 'CBBBreakpoints',
						'schema' => array(
							'items' => array(
								'type'                 => 'object',
								'properties'           => array(
									'breakpoint' => array(
										'type' => 'number',
									),
									'prefix'     => array(
										'type' => 'string',
									),
								),
								'additionalProperties' => array(
									'type' => 'string',
								),
							),
						),
					),
					'default'      => [
						[
							'breakpoint' => 576,
							'prefix'     => 'sm',
						],
						[
							'breakpoint' => 768,
							'prefix'     => 'md',
						],
						[
							'breakpoint' => 1024,
							'prefix'     => 'lg',
						],
					],
				]
			);
		}

		/**
		 * Enqueue responsive breakpoints
		 *
		 * @return void
		 */
		public function enqueue_reponsive_breakpoints() {
			// Custom blocks handle.
			$custom_blocks_handler = $this->the_plugin_instance->get_component( CustomBlocks::class );

			// Get breakpoint setting.
			$breakpoints = $this->get_breakpoints();

			// Get breakpoint scripts.
			$breakpoint_script = 'var CBBBreakpoints=' . wp_json_encode( $breakpoints );

			// Load JS breakpoints.
			wp_add_inline_script( $custom_blocks_handler->custom_blocks_handle, $breakpoint_script, 'before' );
			wp_add_inline_script( $custom_blocks_handler->carousel_blocks_frontend_handle, $breakpoint_script, 'before' );
		}

		/**
		 * Register a handle for enqueue block styles.
		 *
		 * @return void
		 */
		public function register_feature_style() {
			wp_register_style( $this->feature_style_handle, '' );
		}

		/**
		 * Enqueue all feature styles
		 *
		 * @return void
		 */
		public function enqueue_responsive_styles() {
			if ( wp_is_block_theme() ) {
				wp_enqueue_style( $this->feature_style_handle );
			}
			wp_add_inline_style( $this->feature_style_handle, $this->get_responsive_styles() );
		}

		/**
		 * Build responsive styles
		 *
		 * @return string
		 */
		private function get_responsive_styles() {
			$style = '';

			$breakpoints       = $this->get_breakpoints();
			$md_breakpoint     = absint( $breakpoints['md']['breakpoint'] ?? 768 );
			$md_breakpoint_max = $md_breakpoint - 1;
			$lg_breakpoint     = absint( $breakpoints['lg']['breakpoint'] ?? 1024 );
			$lg_breakpoint_max = $lg_breakpoint - 1;
			$md_start          = "@media(min-width:{$md_breakpoint}px){";
			$lg_start          = "@media(min-width:{$lg_breakpoint}px){";
			$end               = '}';

			// Padding.
			$padding_style  = '.sm-cbb-padding-top{padding-top:var(--cbb--padding-top) !important;}.sm-cbb-padding-right{padding-right:var(--cbb--padding-right) !important;}.sm-cbb-padding-bottom{padding-bottom:var(--cbb--padding-bottom) !important;}.sm-cbb-padding-left{padding-left:var(--cbb--padding-left) !important;}';
			$padding_style .= "{$md_start}.md-cbb-padding-top{padding-top:var(--cbb--padding-top) !important;}.md-cbb-padding-right{padding-right:var(--cbb--padding-right) !important;}.md-cbb-padding-bottom{padding-bottom:var(--cbb--padding-bottom) !important;}.md-cbb-padding-left{padding-left:var(--cbb--padding-left) !important;}{$end}";
			$padding_style .= "{$lg_start}.lg-cbb-padding-top{padding-top:var(--cbb--padding-top) !important;}.lg-cbb-padding-right{padding-right:var(--cbb--padding-right) !important;}.lg-cbb-padding-bottom{padding-bottom:var(--cbb--padding-bottom) !important;}.lg-cbb-padding-left{padding-left:var(--cbb--padding-left) !important;}{$end}";
			$style         .= $padding_style;

			// Margin.
			$margin_style  = '.sm-cbb-margin-top{margin-top:var(--cbb--margin-top) !important;}.sm-cbb-margin-right{margin-right:var(--cbb--margin-right) !important;}.sm-cbb-margin-bottom{margin-bottom:var(--cbb--margin-bottom) !important;}.sm-cbb-margin-left{margin-left:var(--cbb--margin-left) !important;}';
			$margin_style .= "{$md_start}.md-cbb-margin-top{margin-top:var(--cbb--margin-top) !important;}.md-cbb-margin-right{margin-right:var(--cbb--margin-right) !important;}.md-cbb-margin-bottom{margin-bottom:var(--cbb--margin-bottom) !important;}.md-cbb-margin-left{margin-left:var(--cbb--margin-left) !important;}{$end}";
			$margin_style .= "{$lg_start}.lg-cbb-margin-top{margin-top:var(--cbb--margin-top) !important;}.lg-cbb-margin-right{margin-right:var(--cbb--margin-right) !important;}.lg-cbb-margin-bottom{margin-bottom:var(--cbb--margin-bottom) !important;}.lg-cbb-margin-left{margin-left:var(--cbb--margin-left) !important;}{$end}";
			$style        .= $margin_style;

			// Block gap.
			$block_gap_style  = '.sm-cbb-block-gap > *{margin-block-start:0;margin-block-end:0;}.sm-cbb-block-gap > * + *{margin-block-start:var(--cbb--block-gap) !important;margin-block-end:0;}';
			$block_gap_style .= "{$md_start}.md-cbb-block-gap > *{margin-block-start:0;margin-block-end:0;}.md-cbb-block-gap > * + *{margin-block-start:var(--cbb--block-gap) !important;margin-block-end:0;}{$end}";
			$block_gap_style .= "{$lg_start}.lg-cbb-block-gap > *{margin-block-start:0;margin-block-end:0;}.lg-cbb-block-gap > * + *{margin-block-start:var(--cbb--block-gap) !important;margin-block-end:0;}{$end}";
			$style           .= $block_gap_style;

			// Border.
			$border_style  = '.sm-cbb-border-top{border-top:var(--cbb--border-top) !important;}.sm-cbb-border-right{border-right:var(--cbb--border-right) !important;}.sm-cbb-border-bottom{border-bottom:var(--cbb--border-bottom) !important;}.sm-cbb-border-left{border-left:var(--cbb--border-left) !important;}';
			$border_style .= "{$md_start}.md-cbb-border-top{border-top:var(--cbb--border-top) !important;}.md-cbb-border-right{border-right:var(--cbb--border-right) !important;}.md-cbb-border-bottom{border-bottom:var(--cbb--border-bottom) !important;}.md-cbb-border-left{border-left:var(--cbb--border-left) !important;}{$end}";
			$border_style .= "{$lg_start}.lg-cbb-border-top{border-top:var(--cbb--border-top) !important;}.lg-cbb-border-right{border-right:var(--cbb--border-right) !important;}.lg-cbb-border-bottom{border-bottom:var(--cbb--border-bottom) !important;}.lg-cbb-border-left{border-left:var(--cbb--border-left) !important;}{$end}";
			$style        .= $border_style;

			// Border radius.
			$radius_style  = '.sm-cbb-border-radius{overflow:hidden;border-radius: var(--cbb--border-radius) !important;}';
			$radius_style .= "{$md_start}.md-cbb-border-radius{overflow:hidden;border-radius: var(--cbb--border-radius) !important;}{$end}";
			$radius_style .= "{$lg_start}.lg-cbb-border-radius{overflow:hidden;border-radius: var(--cbb--border-radius) !important;}{$end}";
			$style        .= $radius_style;

			// Width.
			$width_style  = '.sm-cbb-width{width:var(--cbb--width) !important;}';
			$width_style .= "{$md_start}.md-cbb-width{width:var(--cbb--width) !important;}{$end}";
			$width_style .= "{$lg_start}.lg-cbb-width{width:var(--cbb--width) !important;}{$end}";
			$style       .= $width_style;

			// Height.
			$height_style  = '.sm-cbb-height{height:var(--cbb--height) !important;}';
			$height_style .= "{$md_start}.md-cbb-height{height:var(--cbb--height) !important;}{$end}";
			$height_style .= "{$lg_start}.lg-cbb-height{height:var(--cbb--height) !important;}{$end}";
			$style        .= $height_style;

			// Aspect ratio.
			$aspect_ratio_style  = '.sm-cbb-aspect-ratio{aspect-ratio:var(--cbb--aspect-ratio);}';
			$aspect_ratio_style .= "{$md_start}.md-cbb-aspect-ratio{aspect-ratio:var(--cbb--aspect-ratio);}{$end}";
			$aspect_ratio_style .= "{$lg_start}.lg-cbb-aspect-ratio{aspect-ratio:var(--cbb--aspect-ratio);}{$end}";
			$style              .= $aspect_ratio_style;

			// Text alignment.
			$text_align_style  = '.sm-cbb-text-align{text-align:var(--cbb--text-align);}';
			$text_align_style .= "{$md_start}.md-cbb-text-align{text-align:var(--cbb--text-align);}{$end}";
			$text_align_style .= "{$lg_start}.lg-cbb-text-align{text-align:var(--cbb--text-align);}{$end}";
			$style            .= $text_align_style;

			// Vertical alignment.
			$v_align_style  = '.sm-cbb-v-align.cbb-layout-grid{display:grid;align-content:var(--cbb--v-align);}.sm-cbb-v-align.cbb-layout-grid>*{width:100%;}.sm-cbb-v-align.cbb-align-items{align-items:var(--cbb--v-align);}.sm-cbb-v-align.cbb-align-self{align-self:var(--cbb--v-align);}';
			$v_align_style .= "{$md_start}.md-cbb-v-align.cbb-layout-grid{display:grid;align-content:var(--cbb--v-align);}.md-cbb-v-align.cbb-layout-grid>*{width:100%;}.md-cbb-v-align.cbb-align-items{align-items:var(--cbb--v-align);}.md-cbb-v-align.cbb-align-self{align-self:var(--cbb--v-align);}{$end}";
			$v_align_style .= "{$lg_start}.lg-cbb-v-align.cbb-layout-grid{display:grid;align-content:var(--cbb--v-align);}.lg-cbb-v-align.cbb-layout-grid>*{width:100%;}.lg-cbb-v-align.cbb-align-items{align-items:var(--cbb--v-align);}.lg-cbb-v-align.cbb-align-self{align-self:var(--cbb--v-align);}{$end}";
			$style         .= $v_align_style;

			// Justify alignment.
			$h_align_style  = '.sm-cbb-h-align.cbb-layout-grid{display:grid;justify-content:var(--cbb--h-align);}.sm-cbb-h-align.cbb-layout-grid>*{width:auto;}.sm-cbb-h-align.cbb-justify-items{justify-items:var(--cbb--h-align);}.sm-cbb-h-align.cbb-justify-self{justify-self:var(--cbb--h-align);}';
			$h_align_style .= "{$md_start}.md-cbb-h-align.cbb-layout-grid{display:grid;justify-content:var(--cbb--h-align);}.md-cbb-h-align.cbb-layout-grid>*{width:auto;}.md-cbb-h-align.cbb-justify-items{justify-items:var(--cbb--h-align);}.md-cbb-h-align.cbb-justify-self{justify-self:var(--cbb--h-align);}{$end}";
			$h_align_style .= "{$lg_start}.lg-cbb-h-align.cbb-layout-grid{display:grid;justify-content:var(--cbb--h-align);}.lg-cbb-h-align.cbb-layout-grid>*{width:auto;}.lg-cbb-h-align.cbb-justify-items{justify-items:var(--cbb--h-align);}.lg-cbb-h-align.cbb-justify-self{justify-self:var(--cbb--h-align);}{$end}";
			$style         .= $h_align_style;

			// Transform.
			$transform_style  = '.sm-cbb-transform{transform:var(--cbb--transform);transform-origin:var(--cbb--transform-origin)}';
			$transform_style .= "{$md_start}.md-cbb-transform{transform:var(--cbb--transform);transform-origin:var(--cbb--transform-origin)}{$end}";
			$transform_style .= "{$lg_start}.lg-cbb-transform{transform:var(--cbb--transform);transform-origin:var(--cbb--transform-origin)}{$end}";
			$style           .= $transform_style;

			// Visibility.
			$visibility_style  = "@media(max-width:{$md_breakpoint_max}px){.cbb-hidden-sm{display:none !important;}}";
			$visibility_style .= "@media(min-width:{$md_breakpoint}px) and (max-width:{$lg_breakpoint_max}px){.cbb-hidden-md{display:none !important;}}";
			$visibility_style .= "@media(min-width:{$lg_breakpoint}px){.cbb-hidden-lg{display:none !important;}}";
			$style            .= $visibility_style;

			// Grid: Columns & gap.
			$grid_style  = '.sm-cbb-grid-columns > *,.sm-cbb-grid-columns > * + *{margin:0}.sm-cbb-grid-columns{grid-template-columns:var(--cbb--grid-columns);}.sm-cbb-grid-rows{grid-template-rows:var(--cbb--grid-rows);}.sm-cbb-grid-gap-column{column-gap:var(--cbb--grid-gap-column);}.sm-cbb-grid-gap-row{row-gap:var(--cbb--grid-gap-row);}';
			$grid_style .= "{$md_start}.md-cbb-grid-columns > * {margin:0}.md-cbb-grid-columns{grid-template-columns:var(--cbb--grid-columns);}.md-cbb-grid-rows{grid-template-rows:var(--cbb--grid-rows);}.md-cbb-grid-gap-column{column-gap:var(--cbb--grid-gap-column);}.md-cbb-grid-gap-row{row-gap:var(--cbb--grid-gap-row);}{$end}";
			$grid_style .= "{$lg_start}.lg-cbb-grid-columns > * {margin:0}.lg-cbb-grid-columns{grid-template-columns:var(--cbb--grid-columns);}.lg-cbb-grid-rows{grid-template-rows:var(--cbb--grid-rows);}.lg-cbb-grid-gap-column{column-gap:var(--cbb--grid-gap-column);}.lg-cbb-grid-gap-row{row-gap:var(--cbb--grid-gap-row);}{$end}";
			$style      .= $grid_style;

			// Grid item: columnSpan & rowSpan.
			$grid_item_style  = '.sm-cbb-grid-item-column{grid-column:var(--cbb--grid-item-column);}.sm-cbb-grid-item-row{grid-row:var(--cbb--grid-item-row);}.sm-cbb-grid-item-order{order:var(--cbb--grid-item-order);}';
			$grid_item_style .= "{$md_start}.md-cbb-grid-item-column{grid-column:var(--cbb--grid-item-column);}.md-cbb-grid-item-row{grid-row:var(--cbb--grid-item-row);}.md-cbb-grid-item-order{order:var(--cbb--grid-item-order);}{$end}";
			$grid_item_style .= "{$lg_start}.lg-cbb-grid-item-column{grid-column:var(--cbb--grid-item-column);}.lg-cbb-grid-item-row{grid-row:var(--cbb--grid-item-row);}.lg-cbb-grid-item-order{order:var(--cbb--grid-item-order);}{$end}";
			$style           .= $grid_item_style;

			// Accordion gap.
			$accordion_gap_style  = '.sm-cbb-accordion-gap{display:flex;flex-direction:column;gap:var(--cbb--accordion-gap);}.sm-cbb-a-has-border > .is-accordion-item{border-top:var(--cbb--item-border-top);}.sm-cbb-a-no-border > .is-accordion-item{border-top:0;}';
			$accordion_gap_style .= "{$md_start}.md-cbb-accordion-gap{display:flex;flex-direction:column;gap:var(--cbb--accordion-gap);}.md-cbb-a-has-border > .is-accordion-item{border-top:var(--cbb--item-border-top);}.md-cbb-a-no-border > .is-accordion-item{border-top:0;}{$end}";
			$accordion_gap_style .= "{$lg_start}.lg-cbb-accordion-gap{display:flex;flex-direction:column;gap:var(--cbb--accordion-gap);}.lg-cbb-a-has-border > .is-accordion-item{border-top:var(--cbb--item-border-top);}.lg-cbb-a-no-border > .is-accordion-item{border-top:0;}{$end}";
			$style               .= $accordion_gap_style;

			// Accordion padding.
			// We don't need padding style, because it has a default value.

			// Sticky offset.
			$sticky_offset_style  = '.is-stick-to-top.sm-cbb-sticky-offset{top: var(--cbb--sticky-offset);}.is-stick-to-bottom.sm-cbb-sticky-offset{bottom: var(--cbb--sticky-offset);}';
			$sticky_offset_style .= "{$md_start}.is-stick-to-top.md-cbb-sticky-offset{top: var(--cbb--sticky-offset);}.is-stick-to-bottom.md-cbb-sticky-offset{bottom: var(--cbb--sticky-offset);}{$end}";
			$sticky_offset_style .= "{$lg_start}.is-stick-to-top.lg-cbb-sticky-offset{top: var(--cbb--sticky-offset);}.is-stick-to-bottom.lg-cbb-sticky-offset{bottom: var(--cbb--sticky-offset);}{$end}";
			$style               .= $sticky_offset_style;

			// Offcanvas.
			$offcanvas_style  = "{$md_start}.is-offcanvas.placement-start,.is-offcanvas.placement-end{width:var(--bb--modal-width--md,25rem);}.is-offcanvas.placement-top,.is-offcanvas.placement-bottom{height:var(--bb--modal-height--md,30vh);}{$end}";
			$offcanvas_style .= "{$lg_start}.is-offcanvas.placement-start,.is-offcanvas.placement-end{width:var(--bb--modal-width--lg,25rem);}.is-offcanvas.placement-top,.is-offcanvas.placement-bottom{height:var(--bb--modal-height--lg,30vh);}{$end}";
			$style           .= $offcanvas_style;

			// Popover.
			$popover_style  = "{$md_start}.is-popover{width:var(--bb--modal-width--md,auto);height:var(--bb--modal-height--md,auto);}{$end}";
			$popover_style .= "{$lg_start}.is-popover{width:var(--bb--modal-width--lg,auto);height:var(--bb--modal-height--lg,auto);}{$end}";
			$style         .= $popover_style;

			// Modal.
			$modal_style  = "{$md_start}.is-modal > .bb-modal-dialog{width:var(--bb--modal-width--md,32rem);}.is-modal > .bb-modal-dialog[style*=\"--bb--modal-height--md:\"]{height:var(--bb--modal-height--md);}.modal--custom-position{align-items:var(--bb--modal-v-align--md);justify-content:var(--bb--modal-h-align--md);}{$end}";
			$modal_style .= "{$lg_start}.is-modal > .bb-modal-dialog{width:var(--bb--modal-width--md,50rem);}.is-modal > .bb-modal-dialog[style*=\"--bb--modal-height--lg:\"]{height:var(--bb--modal-height--lg);}.modal--custom-position{align-items:var(--bb--modal-v-align--lg);justify-content:var(--bb--modal-h-align--lg);}{$end}";
			$style       .= $modal_style;

			// Mobile background.
			$background_style  = '.cbb-mobile-image > .bb\:block-background--img{display:none !important;}.cbb-mobile-image > .is-mobile-image {display:block !important;}';
			$background_style .= "@media(min-width:{$md_breakpoint}px){.cbb-mobile-image > .bb\:block-background--img{display:block !important;}.cbb-mobile-image > .is-mobile-image {display:none !important;}}";
			$background_style .= "@media(max-width:{$md_breakpoint_max}px){.cbb-mobile-background{background-image: var(--cbb-mobile-background) !important;}}";
			$style            .= $background_style;

			return $style;
		}

		/**
		 * Render style for all supported blocks
		 *
		 * @param string   $block_content
		 * @param array    $block
		 * @param WP_Block $block_instance
		 * @return string
		 */
		public function render_block_style( $block_content, $block, $block_instance ) {
			// Ignore admin side.
			if ( is_admin() ) {
				return $block_content;
			}

			// Bail if the block has no style.
			if ( ! $this->has_style( $block, $block_instance ) ) {
				return $block_content;
			}

			// Buil selector.
			$selector = $this->generate_selector( $block['blockName'], $block_instance );

			// Get custom style.
			$is_in_cache = isset( $this->styles[ $selector ] );

			if ( $is_in_cache ) {
				$block_styles = $this->styles[ $selector ];
			} else {
				$block_styles = $this->get_block_style( $block, $selector, $block_instance );

				// Add to the cache.
				$this->styles[ $selector ] = $block_styles;
			}

			if ( empty( $block_styles['style'] ?? '' ) ) {
				return $block_content;
			}

			if ( ! wp_is_block_theme() ) {
				// Enqueue style.
				wp_enqueue_style( $this->feature_style_handle );
			}

			if ( ! $is_in_cache ) {
				wp_add_inline_style( $this->feature_style_handle, $block_styles['style'] );
			}

			// Add selector to block wrapper element.
			$block_content = $this->add_class_to_block( $block_content, implode( ' ', $block_styles['classes'] ) );

			return $block_content;
		}

		/**
		 * Get block custom style
		 *
		 * @param array    $block
		 * @param string   $selector
		 * @param WP_Block $block_instance
		 * @return string
		 */
		private function get_block_style( $block, $selector, $block_instance ) {
			$style          = '';
			$class_selector = '.' . $selector;

			$classes                = [ $selector ];
			$style_array            = [];
			$responsive_style_array = [];

			// Get responsive settings.
			$breakpoints = $this->get_breakpoints();

			// Get the settings.
			$settings = $block['attrs']['boldblocks'];

			// Features.
			$features = [
				'padding'           => [
					'func_build_responsive_style' => [ $this, 'build_padding_style' ],
					'group'                       => 'spacing',
				],
				'margin'            => [
					'func_build_responsive_style' => [ $this, 'build_margin_style' ],
					'group'                       => 'spacing',
				],
				'blockGap'          => [
					'func_build_responsive_style' => [ $this, 'build_block_gap_style' ],
					'group'                       => 'spacing',
				],
				'border'            => [ 'func_build_responsive_style' => [ $this, 'build_border_style' ] ],
				'borderRadius'      => [ 'func_build_responsive_style' => [ $this, 'build_border_radius_style' ] ],
				'width'             => [ 'func_build_responsive_style' => [ $this, 'build_width_style' ] ],
				'height'            => [ 'func_build_responsive_style' => [ $this, 'build_height_style' ] ],
				'aspectRatio'       => [ 'func_build_responsive_style' => [ $this, 'build_aspect_ratio_style' ] ],
				'textAlignment'     => [ 'func_build_responsive_style' => [ $this, 'build_text_align_style' ] ],
				'verticalAlignment' => [
					'func_build_responsive_style' => [ $this, 'build_vertical_align_style' ],
					'func_build_dependent_style'  => [ $this, 'build_vertical_align_dependent_style' ],
				],
				'justifyAlignment'  => [
					'func_build_responsive_style' => [ $this, 'build_justify_align_style' ],
					'func_build_dependent_style'  => [ $this, 'build_justify_align_dependent_style' ],
				],
				'transform'         => [
					'func_build_responsive_style' => [ $this, 'build_transform_style' ],
					'func_build_dependent_style'  => [ $this, 'build_transform_dependent_style' ],
				],
				'hidden'            => [
					'func_build_style' => [ $this, 'build_hidden_style' ],
					'group'            => 'visibility',
				],
				'columns'           => [
					'func_build_responsive_style' => [ $this, 'build_columns_style' ],
					'group'                       => 'grid',
					'layout_type'                 => 'grid',
				],
				'rows'           => [
					'func_build_responsive_style' => [ $this, 'build_rows_style' ],
					'group'                       => 'grid',
					'layout_type'                 => 'grid',
				],
				'gap'               => [
					'func_build_responsive_style' => [ $this, 'build_gap_style' ],
					'group'                       => 'grid',
					'layout_type'                 => 'grid',
				],
				'columnSpan'        => [
					'func_build_responsive_style' => [ $this, 'build_column_span_style' ],
					'group'                       => 'gridItem',
					'layout_type'                 => 'gridItem',
				],
				'rowSpan'           => [
					'func_build_responsive_style' => [ $this, 'build_row_span_style' ],
					'group'                       => 'gridItem',
					'layout_type'                 => 'gridItem',
				],
				'accordionGap'      => [
					'func_build_responsive_style' => [ $this, 'build_accordion_gap_style' ],
					'func_build_dependent_style'  => [ $this, 'build_accordion_gap_dependent_style' ],
					'group'                       => 'accordion',
					'setting_name'                => 'gap',
					'layout_type'                 => 'accordion',
				],
				'accordionPadding'  => [
					'func_build_responsive_style' => [ $this, 'build_accordion_padding_style' ],
					'group'                       => 'accordion',
					'setting_name'                => 'padding',
					'layout_type'                 => 'accordion',
				],
				'stickyOffset'      => [
					'func_build_responsive_style' => [ $this, 'build_sticky_offset_style' ],
					'group'                       => 'sticky',
					'setting_name'                => 'offset',
				],
			];

			$block_layout = apply_filters( 'cbb_get_block_layout', $block_instance->block_type->supports['layoutType'] ?? '', $block );
			foreach ( $features as $feature => $feature_args ) {
				if ( isset( $feature_args['layout_type'] ) && $block_layout !== $feature_args['layout_type'] ) {
					continue;
				}

				if ( ! in_array( $feature, [ 'border', 'hidden' ], true ) && 'accordionItem' === $block_layout ) {
					continue;
				}

				if ( ! in_array( $feature, [ 'border', 'hidden', 'accordionGap', 'accordionPadding' ], true ) && 'accordion' === $block_layout ) {
					continue;
				}

				if ( 'stickyOffset' === $feature ) {
					// Not supported block layouts.
					if ( ! in_array( $block_layout, [ 'standalone', 'gridItem' ], true ) ) {
						continue;
					}

					// Not enable sticky or enabling scrolling up.
					if ( ! ( $settings['sticky']['enable'] ?? false ) || ( $settings['sticky']['isStickOnScrollingUp'] ?? false ) ) {
						continue;
					}
				}

				$group_name   = $feature_args['group'] ?? null;
				$setting_name = $feature_args['setting_name'] ?? $feature;
				if ( $this->is_valid_value( $group_name ) ) {
					$setting_value = $settings[ $group_name ][ $setting_name ] ?? null;
				} else {
					$setting_value = $settings[ $setting_name ] ?? null;
				}

				if ( empty( $setting_value ) ) {
					continue;
				}

				$args = array_merge(
					[
						'settings'      => $settings,
						'setting_value' => $setting_value,
						'feature'       => $feature,
						'selector'      => $class_selector,
						'breakpoints'   => $breakpoints,
						'block'         => $block,
						'block_layout'  => $block_layout,
					],
					$feature_args
				);

				if ( \is_callable( $args['func_build_style'] ?? '' ) ) {
					$feature_style = $this->build_style( array_merge( $args, [ 'value' => $setting_value ] ), $style_array, $classes );
				}

				if ( \is_callable( $args['func_build_responsive_style'] ?? '' ) ) {
					$feature_responsive_style = $this->build_responsive_style( $args, $responsive_style_array, $classes );
				}
			}

			if ( $responsive_style_array ) {
				foreach ( $responsive_style_array as $responsive_style ) {
					$style .= $responsive_style;
				}
			}

			$custom_css = $this->get_custom_css_style( $block );

			if ( $custom_css ) {
				// Get & refine custom style.
				$custom_style = $this->refine_custom_value( $custom_css['value'] ?? '', [ 'selector' => $class_selector ], 'CSS' );

				if ( $custom_style ) {
					$style .= $custom_style;
				}
			}

			// Allow altering the style.
			$style = apply_filters(
				'cbb_get_block_style',
				$style,
				[
					'settings'     => $settings,
					'selector'     => $class_selector,
					'breakpoints'  => $breakpoints,
					'block'        => $block,
					'block_layout' => $block_layout,
				]
			);

			return [
				'style'   => $style,
				'classes' => $classes,
			];
		}

		/**
		 * Build custom style
		 *
		 * @param array $args
		 * @param array &$style_array
		 * @param array &$classes
		 * @return string
		 */
		private function build_style( $args, &$style_array, &$classes ) {
			$return_value     = false;
			$func_build_style = $args['func_build_style'] ?? '';

			if ( ! \is_callable( $func_build_style ) ) {
				return $return_value;
			}

			$setting_value = $args['setting_value'] ?? [];
			if ( ! $this->is_valid_value( $setting_value ) ) {
				return $return_value;
			}

			// Build style.
			$feature_styles = $func_build_style( $args, $style_array, $classes );

			if ( ! $feature_styles ) {
				return $return_value;
			}

			$keys  = [];
			$style = '';
			foreach ( $feature_styles as $attr_key => $attr_value ) {
				$style .= "{$attr_key}:{$attr_value};";

				if ( ! in_array( $attr_key, $keys, true ) ) {
					$keys[]    = $attr_key;
					$classes[] = str_replace( '--cbb--', 'cbb-', $attr_key );
				}
			}

			return $style ? $style : $return_value;
		}

		/**
		 * Build style for padding
		 *
		 * @param array $args
		 * @return string
		 */
		private function build_padding_style( $args ) {
			$style_array = [];
			$value       = $args['value'];
			if ( is_array( $value ) ) {
				if ( isset( $value['top'] ) && is_string( $value['top'] ) ) {
					$top_style = $this->get_spacing_value( $value['top'] );
					if ( $this->is_valid_value( $top_style ) ) {
						$style_array['--cbb--padding-top'] = $top_style;
					}
				}

				if ( isset( $value['right'] ) && is_string( $value['right'] ) ) {
					$right_style = $this->get_spacing_value( $value['right'] );
					if ( $this->is_valid_value( $right_style ) ) {
						$style_array['--cbb--padding-right'] = $right_style;
					}
				}

				if ( isset( $value['bottom'] ) && is_string( $value['bottom'] ) ) {
					$bottom_style = $this->get_spacing_value( $value['bottom'] );
					if ( $this->is_valid_value( $bottom_style ) ) {
						$style_array['--cbb--padding-bottom'] = $bottom_style;
					}
				}

				if ( isset( $value['left'] ) && is_string( $value['left'] ) ) {
					$left_style = $this->get_spacing_value( $value['left'] );
					if ( $this->is_valid_value( $left_style ) ) {
						$style_array['--cbb--padding-left'] = $left_style;
					}
				}
			}

			return $style_array;
		}

		/**
		 * Build style for margin
		 *
		 * @param array $args
		 * @return string
		 */
		private function build_margin_style( $args ) {
			$style_array = [];
			$value       = $args['value'];
			if ( is_array( $value ) ) {
				if ( isset( $value['top'] ) && is_string( $value['top'] ) ) {
					$top_style = $this->get_spacing_value( $value['top'] );
					if ( $this->is_valid_value( $top_style ) ) {
						$style_array['--cbb--margin-top'] = $top_style;
					}
				}

				if ( isset( $value['right'] ) && is_string( $value['right'] ) ) {
					$right_style = $this->get_spacing_value( $value['right'] );
					if ( $this->is_valid_value( $right_style ) ) {
						$style_array['--cbb--margin-right'] = $right_style;
					}
				}

				if ( isset( $value['bottom'] ) && is_string( $value['bottom'] ) ) {
					$bottom_style = $this->get_spacing_value( $value['bottom'] );
					if ( $this->is_valid_value( $bottom_style ) ) {
						$style_array['--cbb--margin-bottom'] = $bottom_style;
					}
				}

				if ( isset( $value['left'] ) && is_string( $value['left'] ) ) {
					$left_style = $this->get_spacing_value( $value['left'] );
					if ( $this->is_valid_value( $left_style ) ) {
						$style_array['--cbb--margin-left'] = $left_style;
					}
				}
			}

			return $style_array;
		}

		/**
		 * Build style for gap
		 *
		 * @param array $args
		 * @return string
		 */
		private function build_block_gap_style( $args ) {
			$style_array = [];
			$value       = $args['value'];
			if ( is_array( $value ) && ( $value['top'] ?? false ) ) {
				$gap_style = $this->get_spacing_value( $value['top'] );
				if ( $this->is_valid_value( $gap_style ) ) {
					$style_array['--cbb--block-gap'] = $gap_style;
				}
			}

			return $style_array;
		}

		/**
		 * Build style for border
		 *
		 * @param array $args
		 * @return string
		 */
		private function build_border_style( $args ) {
			$style_array = [];
			$value       = $args['value'];
			if ( is_array( $value ) ) {
				if ( ( $value['top'] ?? false ) || ( $value['right'] ?? false ) || ( $value['bottom'] ?? false ) || ( $value['left'] ?? false ) ) {
					$top    = $value['top'] ?? null;
					$right  = $value['right'] ?? null;
					$bottom = $value['bottom'] ?? null;
					$left   = $value['left'] ?? null;
				} else {
					$top    = $value;
					$right  = $value;
					$bottom = $value;
					$left   = $value;
				}

				if ( $top ) {
					$top_style = $this->build_border_side_css_value( $top, 'top' );
					if ( $top_style ) {
						$style_array['--cbb--border-top'] = $top_style;
					}
				}

				if ( $right ) {
					$right_style = $this->build_border_side_css_value( $right, 'right' );
					if ( $right_style ) {
						$style_array['--cbb--border-right'] = $right_style;
					}
				}

				if ( $bottom ) {
					$bottom_style = $this->build_border_side_css_value( $bottom, 'bottom' );
					if ( $bottom_style ) {
						$style_array['--cbb--border-bottom'] = $bottom_style;
					}
				}

				if ( $left ) {
					$left_style = $this->build_border_side_css_value( $left, 'left' );
					if ( $left_style ) {
						$style_array['--cbb--border-left'] = $left_style;
					}
				}
			}

			return $style_array;
		}

		/**
		 * Build the css variable for border by side
		 *
		 * @param array  $value
		 * @param string $side
		 * @return string
		 */
		private function build_border_side_css_value( $value, $side ) {
			$style_array = [];
			if ( is_array( $value ) ) {
				if ( $this->is_valid_value( $value['width'] ?? null ) && is_string( $value['width'] ) ) {
					$style_array[] = $value['width'];
				}

				if ( $this->is_valid_value( $value['style'] ?? null ) && is_string( $value['style'] ) ) {
					$style_array[] = $value['style'];
				}

				if ( $this->is_valid_value( $value['color'] ?? null ) ) {
					$color = $this->get_css_color_value( $value['color'] );
					if ( $color ) {
						$style_array[] = $color;
					}
				}
			}

			return implode( ' ', $style_array );
		}

		/**
		 * Build style for radius
		 *
		 * @param array $args
		 * @return string
		 */
		private function build_border_radius_style( $args ) {
			$style_array = [];
			$value       = $args['value'];
			if ( is_array( $value ) ) {
				$css_value    = '';
				$top_left     = $value['top-left'] ?? 0;
				$top_right    = $value['top-right'] ?? 0;
				$bottom_right = $value['bottom-right'] ?? 0;
				$bottom_left  = $value['bottom-left'] ?? 0;

				if ( ! empty( $top_left ) || ! empty( $top_right ) || ! empty( $bottom_right ) || ! empty( $bottom_left ) ) {
					$css_value = "{$top_left} {$top_right} {$bottom_right} {$bottom_left}";
				}

				if ( $args['settings']['enableEllipticalRadius'] ?? false ) {
					$top_left     = $value['top-left-vertical'] ?? 0;
					$top_right    = $value['top-right-vertical'] ?? 0;
					$bottom_right = $value['bottom-right-vertical'] ?? 0;
					$bottom_left  = $value['bottom-left-vertical'] ?? 0;

					if ( ! empty( $top_left ) || ! empty( $top_right ) || ! empty( $bottom_right ) || ! empty( $bottom_left ) ) {
						$css_value = "{$css_value} / {$top_left} {$top_right} {$bottom_right} {$bottom_left}";
					}
				}

				if ( $css_value ) {
					$style_array['--cbb--border-radius'] = $css_value;
				}
			}

			return $style_array;
		}

		/**
		 * Build style for width
		 *
		 * @param array $args
		 * @return string
		 */
		private function build_width_style( $args ) {
			$style_array = [];
			$value       = $args['value'];
			if ( is_array( $value ) && ( $value['value'] ?? false ) ) {
				$width_style = $value['value'];
				if ( $this->is_valid_value( $width_style ) ) {
					$style_array['--cbb--width'] = $width_style;
				}
			}

			return $style_array;
		}

		/**
		 * Build style for height
		 *
		 * @param array $args
		 * @return string
		 */
		private function build_height_style( $args ) {
			$style_array = [];
			$value       = $args['value'];
			if ( is_array( $value ) && ( $value['value'] ?? false ) ) {
				$style = $value['value'];
				if ( $this->is_valid_value( $style ) ) {
					$style_array['--cbb--height'] = $style;
				}
			}

			return $style_array;
		}

		/**
		 * Build style for aspect ratio
		 *
		 * @param array $args
		 * @return string
		 */
		private function build_aspect_ratio_style( $args ) {
			$style_array = [];
			$value       = $args['value'];
			if ( is_array( $value ) && ( $value['value'] ?? false ) ) {
				$style = $value['value'];
				if ( $this->is_valid_value( $style ) ) {
					$style_array['--cbb--aspect-ratio'] = $style;
				}
			}

			return $style_array;
		}

		/**
		 * Build style for text alignment
		 *
		 * @param array $args
		 * @return string
		 */
		private function build_text_align_style( $args ) {
			$style_array = [];
			$value       = $args['value'];
			if ( $this->is_valid_value( $value ) ) {
				$style_array['--cbb--text-align'] = $value;
			}

			return $style_array;
		}

		/**
		 * Build style for vertical alignment
		 *
		 * @param array $args
		 * @return string
		 */
		private function build_vertical_align_style( $args ) {
			$style_array = [];
			$value       = $args['value'] ?? null;
			if ( $this->is_valid_value( $value ) ) {
				if ( 'top' === $value ) {
					$value = 'start';
				} elseif ( 'bottom' === $value ) {
					$value = 'end';
				}

				$style_array['--cbb--v-align'] = $value;
			}

			return $style_array;
		}

		/**
		 * Build dependent style for vertical alignment
		 *
		 * @param array $args
		 * @param array &$classes
		 * @return string
		 */
		private function build_vertical_align_dependent_style( $args, &$classes ) {
			$style = '';
			$value = $args['setting_value'] ?? null;
			if ( $this->is_valid_value( $value ) ) {
				$block_layout = $args['block_layout'] ?? '';
				if ( 'grid' === $block_layout ) {
					$class = 'cbb-align-items';
				} elseif ( 'gridItem' === $block_layout ) {
					$class = 'cbb-align-self';
				} else {
					$class = 'cbb-layout-grid';
				}

				if ( ! in_array( $class, $classes, true ) ) {
					$classes[] = $class;
				}
			}

			return $style;
		}

		/**
		 * Build style for justify alignment
		 *
		 * @param array $args
		 * @return string
		 */
		private function build_justify_align_style( $args ) {
			$style_array = [];
			$value       = $args['value'] ?? null;
			if ( $this->is_valid_value( $value ) ) {
				$block_layout = $args['block_layout'] ?? '';
				if ( in_array( $block_layout, [ 'standalone', 'carouselItem', 'vstackItem' ], true ) ) {
					if ( 'left' === $value ) {
						$value = 'start';
					} elseif ( 'right' === $value ) {
						$value = 'end';
					}
				}
				$style_array['--cbb--h-align'] = $value;
			}

			return $style_array;
		}

		/**
		 * Build dependent style for justify alignment
		 *
		 * @param array $args
		 * @param array &$classes
		 * @return string
		 */
		private function build_justify_align_dependent_style( $args, &$classes ) {
			$style = '';
			$value = $args['setting_value'] ?? null;
			if ( $this->is_valid_value( $value ) ) {
				$block_layout = $args['block_layout'] ?? '';
				if ( 'grid' === $block_layout ) {
					$class = 'cbb-justify-items';
				} elseif ( 'gridItem' === $block_layout ) {
					$class = 'cbb-justify-self';
				} else {
					// if ( in_array( $block_layout, [ 'standalone', 'carouselItem', 'vstackItem' ], true ) ) {.
					$class = 'cbb-layout-grid';
				}

				if ( ! in_array( $class, $classes, true ) ) {
					$classes[] = $class;
				}
			}

			return $style;
		}

		/**
		 * Build style for transform
		 *
		 * @param array $args
		 * @return string
		 */
		private function build_transform_style( $args ) {
			$style_array = [];
			$value       = $args['value'];
			if ( ! empty( $value ) && is_array( $value ) ) {
				$style = implode( ' ', array_filter( array_map( [ $this, 'build_transform_item' ], $value ) ) );
				if ( $this->is_valid_value( $value ) ) {
					$style_array['--cbb--transform'] = $style;
				}
			}

			return $style_array;
		}

		/**
		 * Build transform item: translate, rotate, scale, skew
		 *
		 * @return string
		 */
		private function build_transform_item( $transform_item ) {
			$style = '';
			if ( is_array( $transform_item ) && count( $transform_item ) > 0 ) {
				// Get tranform type.
				$transform_type  = array_keys( $transform_item )[0];
				$transform_value = $transform_item[ $transform_type ] ?? '';

				if ( $transform_type === 'rotate' ) {
					if ( is_numeric( $transform_value ) ) {
						$style = "rotate({$transform_value}deg)";
					}
				} elseif ( is_array( $transform_value ) ) {
					$suffix = 'skew' === $transform_type ? 'deg' : '';

					$x       = $transform_value['x'] ?? '';
					$y       = $transform_value['y'] ?? '';
					$x_value = preg_replace( '/[^0-9.]/', '', $x );
					$y_value = preg_replace( '/[^0-9.]/', '', $y );

					if ( \is_numeric( $x_value ) || \is_numeric( $y_value ) ) {
						if ( ! \is_numeric( $x_value ) ) {
							if ( 'scale' === $transform_type ) {
								$x = 1;
							} else {
								$x = 0;
							}
						}

						if ( ! \is_numeric( $y_value ) ) {
							if ( 'scale' === $transform_type ) {
								$y = 1;
							} else {
								$y = 0;
							}
						}

						$style = "{$transform_type}({$x}{$suffix}, {$y}{$suffix})";
					}
				}
			}

			return $style;
		}

		/**
		 * Build dependent style for transform
		 *
		 * @param array $args
		 * @param array &$classes
		 * @return string
		 */
		private function build_transform_dependent_style( $args, &$classes ) {
			$transform_origin = $args['settings']['transformOrigin'] ?? [];
			$x                = $transform_origin['x'] ?? .5;
			if ( ! \is_numeric( $x ) ) {
				$x = .5;
			}
			$x = round( $x, 2 ) * 100;
			$y = $transform_origin['y'] ?? .5;
			if ( ! \is_numeric( $y ) ) {
				$y = .5;
			}
			$y = round( $y, 2 ) * 100;

			return "{$args['selector']}{--cbb--transform-origin: {$x}% {$y}%;}";
		}

		/**
		 * Build style for hidden
		 *
		 * @param array $args
		 * @param array &$style_array
		 * @param array &$classes
		 * @return array
		 */
		private function build_hidden_style( $args, &$style_array, &$classes ) {
			$style_array = [];
			$value       = $args['value'] ?? null;
			if ( ! empty( $value ) && is_array( $value ) ) {
				foreach ( $value as $breakpoint ) {
					$class = "cbb-hidden-{$breakpoint}";
					if ( ! in_array( $class, $classes, true ) ) {
						$classes[] = $class;
					}
				}
			}

			return $style_array;
		}

		/**
		 * Build style for grid columns
		 *
		 * @param array $args
		 * @return string
		 */
		private function build_columns_style( $args ) {
			$style_array = [];
			$value       = $args['value'] ?? null;
			if ( $this->is_valid_value( $value ) ) {
				$style_array['--cbb--grid-columns'] = $value;
			}

			return $style_array;
		}

		/**
		 * Build style for grid rows
		 *
		 * @param array $args
		 * @return string
		 */
		private function build_rows_style( $args ) {
			$style_array = [];
			$value       = $args['value'] ?? null;
			if ( $this->is_valid_value( $value ) ) {
				$style_array['--cbb--grid-rows'] = $value;
			}

			return $style_array;
		}

		/**
		 * Build style for grid gap
		 *
		 * @param array $args
		 * @return string
		 */
		private function build_gap_style( $args ) {
			$style_array = [];
			$value       = $args['value'] ?? null;
			if ( $value && is_array( $value ) ) {
				$column_gap = $value['column'] ?? null;
				if ( $this->is_valid_value( $column_gap ) ) {
					$style_array['--cbb--grid-gap-column'] = $column_gap;
				}
				$row_gap = $value['row'] ?? null;
				if ( $this->is_valid_value( $row_gap ) ) {
					$style_array['--cbb--grid-gap-row'] = $row_gap;
				}
			}

			return $style_array;
		}

		/**
		 * Build style for grid item column span
		 *
		 * @param array $args
		 * @return string
		 */
		private function build_column_span_style( $args ) {
			$style_array = [];
			$value       = $args['value'] ?? null;
			if ( $value && is_array( $value ) ) {
				$start = $value['start'] ?? null;
				$span  = $value['span'] ?? null;
				$order = $value['order'] ?? null;

				if ( $this->is_valid_value( $start ) || $this->is_valid_value( $span ) ) {
					$start = $this->is_valid_value( $start ) ? $start : 'auto';
					$span  = $this->is_valid_value( $span ) ? $span : 'auto';

					if ( 'auto' !== $span && absint( $span ) > 0 ) {
						$span = "span {$span}";
					}

					$style_array['--cbb--grid-item-column'] = "{$start} / {$span}";
				}

				if ( $this->is_valid_value( $order ) && $order !== 'auto' ) {
					$style_array['--cbb--grid-item-order'] = $order;
				}
			}

			return $style_array;
		}

		/**
		 * Build style for grid item row span
		 *
		 * @param array $args
		 * @return string
		 */
		private function build_row_span_style( $args ) {
			$style_array = [];
			$value       = $args['value'] ?? null;
			if ( $value && is_array( $value ) ) {
				$start = $value['start'] ?? null;
				$span  = $value['span'] ?? null;

				if ( $this->is_valid_value( $start ) || $this->is_valid_value( $span ) ) {
					$start = $this->is_valid_value( $start ) ? $start : 'auto';
					$span  = $this->is_valid_value( $span ) ? $span : 'auto';

					if ( 'auto' !== $span && absint( $span ) > 0 ) {
						$span = "span {$span}";
					}

					$style_array['--cbb--grid-item-row'] = "{$start} / {$span}";
				}
			}

			return $style_array;
		}

		/**
		 * Build style for accordion gap
		 *
		 * @param array $args
		 * @return string
		 */
		private function build_accordion_gap_style( $args ) {
			$style_array = [];
			$value       = $args['value'];
			if ( $this->is_valid_value( $value ) ) {
				$style_array['--cbb--accordion-gap'] = $value;
			}

			return $style_array;
		}

		/**
		 * Build dependent style for accordion gap
		 *
		 * @param array $args
		 * @param array &$classes
		 * @return string
		 */
		private function build_accordion_gap_dependent_style( $args, &$classes ) {
			$style          = '';
			$setting_values = $args['setting_values'];
			if ( $this->is_valid_value( $setting_values ) && is_array( $setting_values ) ) {
				foreach ( $setting_values as $breakpoint => $value ) {
					if ( absint( $value ) > 0 ) {
						$classes[] = "{$breakpoint}-cbb-a-has-border";
					} else {
						$classes[] = "{$breakpoint}-cbb-a-no-border";
					}
				}
			}

			return $style;
		}

		/**
		 * Build style for accordion gap
		 *
		 * @param array $args
		 * @return string
		 */
		private function build_accordion_padding_style( $args ) {
			$style_array = [];
			$value       = $args['value'];
			if ( $value && is_array( $value ) ) {
				$x = $value['x'] ?? null;
				if ( ! $this->is_valid_value( $x ) ) {
					$x = '1.25rem';
				}

				$y = $value['y'] ?? null;
				if ( ! $this->is_valid_value( $y ) ) {
					$y = '1rem';
				}

				$style_array['--cbb--accordion-padding'] = "{$y} {$x}";
			}

			return $style_array;
		}

		/**
		 * Build style for sticky offset
		 *
		 * @param array $args
		 * @return array
		 */
		private function build_sticky_offset_style( $args ) {
			$style_array = [];
			$value       = $args['value'];
			if ( $value && is_array( $value ) ) {
				$offset = $value['value'] ?? null;
				if ( $this->is_valid_value( $offset ) ) {
					$style_array['--cbb--sticky-offset'] = $offset;
				}
			}

			return $style_array;
		}

		/**
		 * Check whether current block has custom style or not.
		 *
		 * @param [type] $block
		 * @return boolean
		 */
		private function get_custom_css_style( $block ) {
			// There is no boldblocks value.
			if ( ! isset( $block['attrs']['boldblocks'] ) || ! isset( $block['attrs']['boldblocks']['customCSS'] ) ) {
				return false;
			}

			$custom_css = $block['attrs']['boldblocks']['customCSS'];
			if ( ! is_array( $custom_css ) || empty( $custom_css['value'] ) ) {
				return false;
			}

			return $custom_css;
		}

		/**
		 * Render dynamic link to post element
		 *
		 * @param string   $block_content
		 * @param array    $block
		 * @param WP_Block $block_instance
		 * @return string
		 */
		public function build_block_link_to_post( $block_content, $block, $block_instance ) {
			// Ignore admin side.
			if ( is_admin() ) {
				return $block_content;
			}

			// There is no post context.
			$post_id = $block_instance->context['postId'] ?? false;
			if ( ! $post_id ) {
				return $block_content;
			}

			// There is no background value.
			if ( ! ( $block['attrs']['boldblocks']['background'] ?? false ) ) {
				return $block_content;
			}

			$background = $block['attrs']['boldblocks']['background'];
			$media_type = $background['mediaType'] ?? 'image';

			if ( 'image' === $media_type && ( $background['image']['useFeaturedImage'] ?? false ) && ( $background['image']['linkToPost'] ?? false ) ) {
				$block_content = $this->add_inner_content_to_block( $block_content, '<a class="bb:link-to-post" href="' . esc_url( get_permalink( $post_id ) ) . '" rel="permalink"></a>' );
			}

			return $block_content;
		}

		/**
		 * Render dynamic background image
		 *
		 * @param string   $block_content
		 * @param array    $block
		 * @param WP_Block $block_instance
		 * @return string
		 */
		public function build_block_background( $block_content, $block, $block_instance ) {
			// Ignore admin side.
			if ( is_admin() ) {
				return $block_content;
			}

			// Ignore legacy markup.
			if ( strpos( $block['innerHTML'] ?? '', 'bb:block-background' ) !== false ) {
				return $block_content;
			}

			$context_background = [];
			$meta_name          = $block['attrs']['metadata']['name'] ?? '';
			if ( $meta_name && 'cbb/block-overrides' === ( $block['attrs']['metadata']['bindings']['background']['source'] ?? '' ) ) {
				$context_background = $block_instance->context['cbb/block-overrides'][ $meta_name ]['background'] ?? [];
			}

			$background = $block['attrs']['boldblocks']['background'] ?? [];
			if ( $context_background ) {
				$background = array_replace_recursive( $background, $context_background );
			}

			// There is no background value.
			if ( ! $background ) {
				return $block_content;
			}

			$media_type = $background['mediaType'] ?? 'image';
			$media_url  = $background[ $media_type ]['url'] ?? '';

			if ( 'image' === $media_type ) {
				if ( $background['image']['useFeaturedImage'] ?? false ) {
					return $this->build_thumbnail_background( $background, $block_content, $block, $block_instance );
				} elseif ( $media_url ) {
					return $this->build_custom_image_background( $background, $block_content, $block, $block_instance );
				}
			} elseif ( 'video' === $media_type && $media_url ) {
				return $this->build_video_background( $background, $block_content, $block, $block_instance );
			}

			return $block_content;
		}

		/**
		 * Build the background using custom image
		 *
		 * @param array    $background
		 * @param string   $block_content
		 * @param array    $block
		 * @param WP_Block $block_instance
		 * @return string
		 */
		private function build_custom_image_background( $background, $block_content, $block, $block_instance ) {
			$block_class      = 'bb:has-background bb:has-background--image';
			$block_background = $this->build_image_background( $background['image']['id'] ?? false, $background, $block_class );

			if ( strpos( $block['innerHTML'] ?? '', $block_background['block_class'] ) === false ) {
				$block_content = $this->add_class_to_block( $block_content, $block_background['block_class'] );
			}

			$block_content = $this->add_inner_content_to_block( $block_content, $block_background['background_markup'] );

			return $block_content;
		}

		/**
		 * Build the background using post thumbnail
		 *
		 * @param array    $background
		 * @param string   $block_content
		 * @param array    $block
		 * @param WP_Block $block_instance
		 * @return string
		 */
		private function build_thumbnail_background( $background, $block_content, $block, $block_instance ) {
			$post_id = $block_instance->context['postId'] ?? false;
			if ( ! $post_id ) {
				return $block_content;
			}

			$image_id = get_post_thumbnail_id( $post_id );

			$block_class = 'bb:has-background bb:has-background--image';
			if ( $image_id ) {
				$block_background = $this->build_image_background( $image_id, $background, $block_class );

				if ( strpos( $block['innerHTML'] ?? '', $block_background['block_class'] ) === false ) {
					$block_content = $this->add_class_to_block( $block_content, $block_background['block_class'] );
				}

				$block_content = $this->add_inner_content_to_block( $block_content, $block_background['background_markup'] );
			} else {
				// Add custom background as a fallback.
				if ( $background['image']['url'] ?? '' ) {
					$block_content = $this->add_class_to_block( $block_content, 'has-no-thumbnail' );
					$block_content = $this->build_custom_image_background( $background, $block_content, $block, $block_instance );
				} else {
					$block_content = $this->add_class_to_block( $block_content, $block_class . ' has-no-thumbnail' );
				}
			}

			return $block_content;
		}

		/**
		 * Build image background
		 *
		 * @param int    $image_id
		 * @param array  $background
		 * @param string $block_class
		 * @return array
		 */
		private function build_image_background( $image_id, $background, $block_class ) {
			$settings            = $background['settings'] ?? [];
			$media               = $background['image'] ?? [];
			$mobile_background   = ! ( $media['useFeaturedImage'] ?? false ) && ( $media['hasMobileBackground'] ?? false ) && ( $media['mobileBackground']['url'] ?? '' ) ? $media['mobileBackground'] : false;
			$background_classes  = [ 'bb:block-background bb:block-background--image' ];
			$background_position = round( ( $settings['focalPoint']['x'] ?? .5 ) * 100 ) . '% ' . round( ( $settings['focalPoint']['y'] ?? .5 ) * 100 ) . '%';

			$image_element = '';
			$dataset       = [];
			$image_size    = $media['size'] ?? 'full';

			$is_internal_image = false;
			$image_url         = $image_id ? wp_get_attachment_image_url( $image_id, $image_size ) : false;
			if ( $image_url ) {
				$is_internal_image = true;
			} else {
				$image_url = $media['url'];
			}

			$alt_text   = $media['customAlt'] ?? wp_get_attachment_caption( $image_id );
			$object_fit = $settings['objectFit'] ?? 'cover';
			if ( empty( $object_fit ) ) {
				$object_fit = 'cover';
			}
			$img_style         = 'display:block;width:100%;height:100%;object-fit:' . $object_fit . ';object-position:' . $background_position . ';';
			$background_styles = [];
			$animation_type    = false;
			if ( $settings['isImgElement'] ?? false ) {
				$attrs            = [
					'alt'   => esc_attr( $alt_text ),
					'style' => esc_attr( $img_style ),
					'class' => 'bb:block-background--img',
				];
				$loading_priority = $settings['loadingPriority'] ?? '';
				if ( $loading_priority ) {
					if ( $loading_priority === 'lazy' ) {
						$attrs['loading'] = 'lazy';
					} elseif ( in_array( $loading_priority, [ 'high', 'low' ], true ) ) {
						$attrs['fetchpriority'] = $loading_priority;
					}
				}

				if ( $is_internal_image ) {
					$image_element = wp_get_attachment_image(
						$image_id,
						$image_size,
						false,
						$attrs
					);
				} else {
					$image_element = $this->generate_image_element( $image_url, $attrs );
				}

				if ( $mobile_background ) {
					$background_classes[] = 'cbb-mobile-image';
					$attrs['class']      .= ' is-mobile-image';

					$mobile_image = '';
					if ( $mobile_background['id'] ?? false ) {
						$mobile_image = wp_get_attachment_image(
							$mobile_background['id'],
							$image_size,
							false,
							$attrs
						);
					}

					if ( ! $mobile_image ) {
						$mobile_image = $this->generate_image_element( $mobile_background['url'], $attrs );
					}

					$image_element .= $mobile_image;
				}
			} else {
				$image_as_background = $this->get_background_image_url( $image_url );
				$background_styles   = [
					'background-image'    => 'url(' . $image_as_background . ')',
					'background-position' => $background_position,
				];
				if ( ! empty( $settings['isFixed'] ) ) {
					$background_styles['background-attachment'] = 'fixed';
				}

				$background_styles['background-repeat'] = $settings['repeat'] ?? 'no-repeat';
				$background_styles['background-size']   = $settings['size'] ?? 'cover';
				if ( $mobile_background ) {
					$background_styles['--cbb-mobile-background'] = "url('{$this->get_background_image_url( $mobile_background['url'] )}')";
					$background_classes[]                         = 'cbb-mobile-background';
				}
			}

			$animation_type     = $settings['animation']['type'] ?? false;
			$animation_settings = $settings['animation']['settings'] ?? [];
			if ( $animation_type && 'none' !== $animation_type ) {
				$background_classes[] = $animation_type;

				if ( in_array( $animation_type, [ 'bg-scroll-horizontal', 'bg-scroll-vertical' ], true ) ) {
					if ( ! ( $settings['isImgElement'] ?? false ) ) {
						if ( $this->has_animation_setting_value( 'scroll', 'duration', $animation_settings ) ) {
							$background_styles['animation-duration'] = $this->get_animation_setting_value( 'scroll', 'duration', $animation_settings ) . 's';
						}

						if ( $background_styles['background-repeat'] !== 'repeat' ) {
							$background_styles['background-repeat'] = 'bg-scroll-horizontal' === $animation_type ? 'repeat-x' : 'repeat-y';
						}

						if ( $this->has_animation_setting_value( 'scroll', 'reverseDirection', $animation_settings ) ) {
							$background_classes[] = 'is-reverse';
						}
					}
				} elseif ( 'bg-parallax' === $animation_type ) {
					unset( $background_styles['background-attachment'] );

					$dataset['data-speed'] = $this->get_animation_setting_value( 'parallax', 'speed', $animation_settings, 0.5 );

					if ( $this->get_animation_setting_value( 'parallax', 'opacity', $animation_settings, '' ) ) {
						$dataset['data-opacity'] = 'true';
					}

					if ( $this->get_animation_setting_value( 'parallax', 'disableParallax', $animation_settings, '' ) ) {
						$dataset['data-disable-parallax'] = 'true';

						$breakpoint = $this->get_animation_setting_value( 'parallax', 'disableParallaxBreakpoint', $animation_settings );
						if ( ! $breakpoint ) {
							$breakpoint = 767;
						}

						$dataset['data-disable-parallax-breakpoint'] = $breakpoint;
					}
				} elseif ( 'bg-zoom' === $animation_type ) {
					if ( isset( $animation_settings['zoom']['initialScale'] ) ) {
						$background_styles['--cbb--zoom-initial-scale'] = $animation_settings['zoom']['initialScale'];
					}
					if ( isset( $animation_settings['zoom']['scale'] ) ) {
						$background_styles['--cbb--zoom-scale'] = $animation_settings['zoom']['scale'];
					}
					if ( isset( $animation_settings['zoom']['duration'] ) ) {
						$background_styles['--cbb--zoom-duration'] = $animation_settings['zoom']['duration'] . 's';
					}
					if ( isset( $animation_settings['zoom']['timingFunction'] ) ) {
						$background_styles['--cbb--zoom-timing-function'] = $animation_settings['zoom']['timingFunction'];
					}

					$zoom_event           = $animation_settings['zoom']['event'] ?? 'hover';
					$background_classes[] = "bg-zoom-{$zoom_event}";

					if ( 'reveal' === $zoom_event ) {
						$dataset['data-reveal-animation'] = esc_attr(
							wp_json_encode(
								[
									'name'          => 'bgZoom',
									'animation'     => 'bgZoom var(--cbb--zoom-duration) var(--cbb--zoom-timing-function)',
									'multipleTimes' => $animation_settings['zoom']['multipleTimes'] ?? false,
									'forwards'      => true,
								]
							)
						);
					}

					if ( ! empty( $animation_settings['zoom']['withOpacity'] ) ) {
						$background_styles['--cbb--zoom-initial-opacity'] = $animation_settings['zoom']['initialOpacity'] ?? 0;
						$background_styles['--cbb--zoom-opacity']         = $animation_settings['zoom']['opacity'] ?? 1;
					}
				}
			}

			$background_style = $background_styles ? array_reduce(
				array_keys( $background_styles ),
				function ( $carry, $key ) use ( $background_styles ) {
					return $carry . $key . ':' . $background_styles[ $key ] . ';';
				},
				''
			) : '';

			if ( $background_style ) {
				$background_style = ' style="' . $background_style . '"';
			}

			$data_attribute = $dataset ? array_reduce(
				array_keys( $dataset ),
				function ( $carry, $key ) use ( $dataset ) {
					return $carry . ' ' . $key . '="' . esc_attr( $dataset[ $key ] ) . '"';
				},
				' '
			) : '';

			$background_image = sprintf( '<div class="%1$s"%2$s %3$s>%4$s</div>', \implode( ' ', $background_classes ), $background_style, $data_attribute, $image_element );

			if ( $animation_type && 'none' !== $animation_type ) {
				$block_class .= ' js-animation-' . $animation_type;
			}

			return [
				'background_markup' => $background_image,
				'block_class'       => $block_class,
			];
		}

		/**
		 * Generate img tag from an image url
		 *
		 * @param string $image_url
		 * @param array  $attrs
		 * @return string
		 */
		private function generate_image_element( $image_url, $attrs ) {
			$attr_html = '';
			foreach ( $attrs as $name => $value ) {
				$attr_html .= " $name=" . '"' . esc_attr( $value ) . '"';
			}

			return sprintf( '<img src="%1$s"%2$s/>', esc_attr( $image_url ), $attr_html );
		}

		/**
		 * Get image as background url
		 *
		 * @param string $image_url
		 * @return string
		 */
		private function get_background_image_url( $image_url ) {
			return strpos( $image_url, 'data:image/svg+xml' ) === 0 ? '&quot;' . esc_attr( $image_url ) . '&quot;' : esc_attr( $image_url );
		}

		/**
		 * Render animations
		 *
		 * @param string   $block_content
		 * @param array    $block
		 * @param WP_Block $block_instance
		 * @return string
		 */
		public function build_block_animations( $block_content, $block, $block_instance ) {
			// There is no animations value.
			if ( ! isset( $block['attrs']['boldblocks'] ) || ! isset( $block['attrs']['boldblocks']['animations'] ) ) {
				return $block_content;
			}

			// Get animations.
			$animations = $block['attrs']['boldblocks']['animations'];
			if ( ! is_array( $animations ) ) {
				return $block_content;
			}

			$animation_names = $this->get_animation_names();

			$animation_object = array_reduce(
				$animations,
				function ( $accumulator, $animation ) use ( $animation_names ) {
					$name     = $animation['name'] ?? '';
					$duration = $animation['duration'] ?? '';

					if ( ! $name || ! $duration ) {
						return $accumulator;
					}

					$delay           = $animation['delay'] ?? 0;
					$repeat          = $animation['repeat'] ?? 1;
					$infinite        = $animation['infinite'] ?? false;
					$timing_function = $animation['timingFunction'] ?? '';
					$animation_name  = isset( $animation_names[ $name ]['name'] ) ? $animation_names[ $name ]['name'] : $name;
					if ( ! $timing_function && isset( $animation_names[ $name ]['timingFunction'] ) ) {
						$timing_function = $animation_names[ $name ]['timingFunction'];
					}
					$timing_function = $timing_function ? " $timing_function" : '';
					$count           = $infinite ? 'infinite' : $repeat;

					$animation_string = "$animation_name {$duration}s{$timing_function} {$delay}s $count";

					// Save animation.
					$accumulator['animation'] = $accumulator['animation']
						? "{$accumulator['animation']}, $animation_string"
						: $animation_string;

					// Save the name.
					$accumulator['name'] = $accumulator['name']
						? "{$accumulator['name']},$name"
						: $name;

					return $accumulator;
				},
				[
					'animation' => '',
					'name'      => '',
				]
			);

			if ( $animation_object['name'] && $animation_object['animation'] ) {
				$animation_object['multipleTimes'] = $block['attrs']['boldblocks']['animateMultipleTimes'] ?? false;

				$block_content = $this->add_data_to_block( $block_content, 'data-reveal-animation', esc_attr( wp_json_encode( $animation_object ) ) );
			}

			return $block_content;
		}

		/**
		 * Get all predefined animations
		 *
		 * @return array
		 */
		private function get_animation_names() {
			$animation_names = [
				'bounce'            => false,
				'flash'             => false,
				'pulse'             => [ 'timingFunction' => 'ease-in-out' ],
				'rubberBand'        => false,
				'shakeX'            => false,
				'shakeY'            => false,
				'headShake'         => [ 'timingFunction' => 'ease-in-out' ],
				'swing'             => false,
				'tada'              => false,
				'wobble'            => false,
				'jello'             => false,
				'heartBeat'         => [ 'timingFunction' => 'ease-in-out' ],

				'backInDown'        => false,
				'backInLeft'        => false,
				'backInRight'       => false,
				'backInUp'          => false,

				'bounceIn'          => false,
				'bounceInDown'      => false,
				'bounceInLeft'      => false,
				'bounceInRight'     => false,
				'bounceInUp'        => false,

				'fadeIn'            => false,
				'fadeInDown'        => [ 'name' => 'fadeInXY' ],
				'fadeInDownBig'     => [ 'name' => 'fadeInXY' ],
				'fadeInLeft'        => [ 'name' => 'fadeInXY' ],
				'fadeInLeftBig'     => [ 'name' => 'fadeInXY' ],
				'fadeInRight'       => [ 'name' => 'fadeInXY' ],
				'fadeInRightBig'    => [ 'name' => 'fadeInXY' ],
				'fadeInUp'          => [ 'name' => 'fadeInXY' ],
				'fadeInUpBig'       => [ 'name' => 'fadeInXY' ],
				'fadeInTopLeft'     => [ 'name' => 'fadeInXY' ],
				'fadeInTopRight'    => [ 'name' => 'fadeInXY' ],
				'fadeInBottomLeft'  => [ 'name' => 'fadeInXY' ],
				'fadeInBottomRight' => [ 'name' => 'fadeInXY' ],

				'fadeInUpSmall'     => [ 'name' => 'fadeInXY' ],
				'fadeInRightSmall'  => [ 'name' => 'fadeInXY' ],
				'fadeInDownSmall'   => [ 'name' => 'fadeInXY' ],
				'fadeInLeftSmall'   => [ 'name' => 'fadeInXY' ],

				'flip'              => false,
				'flipInX'           => false,
				'flipInY'           => false,

				'lightSpeedInRight' => [ 'timingFunction' => 'ease-out' ],
				'lightSpeedInLeft'  => [ 'timingFunction' => 'ease-out' ],

				'rotateIn'          => [ 'name' => 'rotateInZ' ],
				'rotateInDownLeft'  => [ 'name' => 'rotateInZ' ],
				'rotateInDownRight' => [ 'name' => 'rotateInZ' ],
				'rotateInUpLeft'    => [ 'name' => 'rotateInZ' ],
				'rotateInUpRight'   => [ 'name' => 'rotateInZ' ],

				'jackInTheBox'      => false,
				'rollIn'            => false,

				'zoomIn'            => false,
				'zoomInDown'        => [ 'name' => 'zoomInXY' ],
				'zoomInLeft'        => [ 'name' => 'zoomInXY' ],
				'zoomInRight'       => [ 'name' => 'zoomInXY' ],
				'zoomInUp'          => [ 'name' => 'zoomInXY' ],

				'slideInDown'       => [ 'name' => 'slideInXY' ],
				'slideInLeft'       => [ 'name' => 'slideInXY' ],
				'slideInRight'      => [ 'name' => 'slideInXY' ],
				'slideInUp'         => [ 'name' => 'slideInXY' ],

				'slideInDownSmall'  => [ 'name' => 'slideInXY' ],
				'slideInLeftSmall'  => [ 'name' => 'slideInXY' ],
				'slideInRightSmall' => [ 'name' => 'slideInXY' ],
				'slideInUpSmall'    => [ 'name' => 'slideInXY' ],

				'spin'              => false,
				'zoomOutIn'         => false,
			];

			return $animation_names;
		}

		/**
		 * Has a animation setting value or not
		 *
		 * @param string $type
		 * @param string $name
		 * @param array  $settings
		 * @return mixed
		 */
		private function has_animation_setting_value( $type, $name, $settings ) {
			return isset( $settings[ $type ][ $name ] ) || isset( $settings[ $name ] );
		}

		/**
		 * Get background animation setting value
		 *
		 * @param string $type
		 * @param string $name
		 * @param array  $settings
		 * @param mixed  $default_val
		 * @return mixed
		 */
		private function get_animation_setting_value( $type, $name, $settings, $default_val = '' ) {
			if ( isset( $settings[ $type ][ $name ] ) ) {
				return $settings[ $type ][ $name ];
			} else {
				return $settings[ $name ] ?? $default_val;
			}
		}

		/**
		 * Build the video background
		 *
		 * @param array    $background
		 * @param string   $block_content
		 * @param array    $block
		 * @param WP_Block $block_instance
		 * @return string
		 */
		private function build_video_background( $background, $block_content, $block, $block_instance ) {
			$settings    = $background['settings'] ?? [];
			$media       = $background['video'] ?? [];
			$block_class = 'bb:has-background bb:has-background--video';

			$background_position = round( ( $settings['focalPoint']['x'] ?? .5 ) * 100 ) . '% ' . round( ( $settings['focalPoint']['y'] ?? .5 ) * 100 ) . '%';
			$object_fit          = $settings['objectFit'] ?? 'cover';
			if ( empty( $object_fit ) ) {
				$object_fit = 'cover';
			}

			$video_style      = 'object-fit:' . $object_fit . ';object-position:' . $background_position . ';';
			$block_background = sprintf( '<div class="bb:block-background bb:block-background--video"><video src="%1$s" autoplay="autoplay" muted loop playsinline preload="auto" style="%2$s"/></div>', $media['url'], $video_style );

			if ( $media['isPausable'] ?? false ) {
				$block_class      .= ' cbb-has-video-controls';
				$play_pause_icon   = apply_filters( 'cbb_play_pause_icon', '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="control-play-pause"><g class="icon-pause"><rect width="4.5" height="14" x="3.75" y="3" rx="1.5"></rect><rect width="4.5" height="14" x="11.75" y="3" rx="1.5"></rect></g><path class="icon-play" d="M5 15.25V4.77a1.44 1.44 0 0 1 1.44-1.62 1.86 1.86 0 0 1 1.11.31l8.53 5c.76.44 1.17.8 1.17 1.51s-.41 1.07-1.17 1.51l-8.53 5a1.86 1.86 0 0 1-1.11.31A1.42 1.42 0 0 1 5 15.25Z"></path></svg>' );
				$block_background .= '<button class="cbb-video-play-pause">' . $play_pause_icon . '</button>';
			}

			if ( strpos( $block['innerHTML'] ?? '', $block_class ) === false ) {
				$block_content = $this->add_class_to_block( $block_content, $block_class );
			}

			$block_content = $this->add_inner_content_to_block( $block_content, $block_background );

			return $block_content;
		}

		/**
		 * Render block overlay
		 *
		 * @param string   $block_content
		 * @param array    $block
		 * @param WP_Block $block_instance
		 * @return string
		 */
		public function build_block_overlay( $block_content, $block, $block_instance ) {
			// Ignore admin side.
			if ( is_admin() ) {
				return $block_content;
			}

			$block_overlay = $block['attrs']['boldblocks']['overlay'] ?? false;

			// There is no overlay value.
			if ( ! ( $block_overlay['overlayColor'] ?? false ) ) {
				return $block_content;
			}

			// Ignore legacy markup.
			if ( strpos( $block['innerHTML'] ?? '', 'bb:block-overlay' ) !== false ) {
				return $block_content;
			}

			$bg_color      = '';
			$overlay_color = $block_overlay['overlayColor'] ?? [];
			if ( ( $overlay_color['gradientSlug'] ?? false ) || ( $overlay_color['gradientValue'] ?? false ) ) {
				if ( $overlay_color['gradientSlug'] ?? false ) {
					$bg_color = sprintf( 'var(--wp--preset--gradient--%1$s, %2$s)', $overlay_color['gradientSlug'], $overlay_color['gradientValue'] ?? '' );
				} else {
					$bg_color = $overlay_color['gradientValue'];
				}
			} elseif ( ( $overlay_color['slug'] ?? false ) || ( $overlay_color['value'] ?? false ) ) {
				if ( $overlay_color['slug'] ?? false ) {
					$bg_color = sprintf( 'var(--wp--preset--color--%1$s, %2$s)', $overlay_color['slug'], $overlay_color['value'] ?? '' );
				} else {
					$bg_color = $overlay_color['value'];
				}
			}

			if ( empty( $bg_color ) ) {
				return $block_content;
			}

			$opacity = absint( $block_overlay['opacity'] ?? 100 );

			// Build the markup.
			$overlay_markup = sprintf( '<div aria-hidden="true" class="bb:block-overlay" style="background:%1$s;opacity:%2$s;"></div>', $bg_color, $opacity / 100 );

			$block_class = 'bb:has-overlay';
			if ( strpos( $block['innerHTML'] ?? '', $block_class ) === false ) {
				$block_content = $this->add_class_to_block( $block_content, $block_class );
			}

			$block_content = $this->add_inner_content_to_block( $block_content, $overlay_markup );

			return $block_content;
		}

		/**
		 * Render grid style for the query loop's grid layout
		 *
		 * @param string   $block_content
		 * @param array    $block
		 * @param WP_Block $block_instance
		 * @return string
		 */
		public function render_query_loop_grid_style( $block_content, $block, $block_instance ) {
			// Ignore admin side.
			if ( is_admin() ) {
				return $block_content;
			}

			// If this is a core/query block that has grid layout.
			$grid_data = $this->get_query_loop_grid_data( $block, $block_instance );
			if ( ! $grid_data ) {
				return $block_content;
			}

			$display_layout = $grid_data['displayType'] ?? '';
			if ( 'responsiveGrid' === $display_layout && ( $grid_data['grid'] ?? false ) ) {
				// Buil selector.
				$selector = 'cbb-query-' . $this->get_query_loop_id( $block );

				// Get responsive settings.
				$breakpoints = $this->get_breakpoints();

				// Get custom style.
				$block_style = $this->get_query_grid_style(
					[
						'selector'    => ".{$selector} > ul",
						'block'       => $block,
						'data'        => $grid_data['grid'],
						'breakpoints' => $breakpoints,
					]
				);

				if ( empty( $block_style ) ) {
					return $block_content;
				}

				$handle = $selector;
				wp_register_style( $handle, '' );
				wp_add_inline_style( $handle, $block_style );
				wp_enqueue_style( $handle );

				// Add selector to block wrapper element.
				$block_content = $this->add_class_to_block( $block_content, $selector );
			}

			return $block_content;
		}

		/**
		 * Build an unique ID for a query loop
		 *
		 * @param array $block
		 * @return string
		 */
		private function get_query_loop_id( $block ) {
			$query_id = $block['attrs']['queryId'] ?? 1;
			$key      = "id_{$query_id}";
			if ( ! isset( $this->query_ids[ $key ] ) ) {
				$this->query_ids[ $key ] = 1;
			} else {
				$this->query_ids[ $key ]++;
			}

			return $query_id . '-' . $this->query_ids[ $key ];
		}

		/**
		 * Get grid layout data
		 *
		 * @param array    $block
		 * @param WP_Block $block_instance
		 * @return array
		 */
		private function get_query_loop_grid_data( $block, $block_instance ) {
			$data            = [];
			$old_layout_type = $block['attrs']['displayLayout']['type'] ?? '';
			if ( 'grid' === $old_layout_type ) {
				// Convert to the new name.
				$old_layout_type = 'responsiveGrid';
			}
			$data['displayType'] = $old_layout_type;
			$data['grid']        = $block['attrs']['boldblocks']['grid'] ?? [];

			if ( $block_instance->block_type->api_version >= 3 ) {
				$post_template = $this->get_nested_post_template( $block_instance );

				if ( $post_template ) {
					if ( 'responsiveGrid' === ( $post_template->attributes['boldblocks']['layout']['type'] ?? '' ) ) {
						$data['displayType'] = 'responsiveGrid';
						$data['grid']        = $post_template->attributes['boldblocks']['grid'] ?? [];
					}
				}
			}

			return $data;
		}

		/**
		 * Build grid style
		 *
		 * @param array $args
		 * @return string
		 */
		private function get_query_grid_style( $args ) {
			$selector = $args['selector'];
			$data     = $args['data'];

			// None-responsive style.
			$style = "{$selector}{display:grid;padding:0;margin:0;}{$selector} > li{padding:0;margin:0;}{$selector} > li + li{margin-block-start:0;margin-block-end:0;}";

			// Columns style.
			$style .= $this->build_query_loop_responsive_style(
				array_merge(
					$args,
					[
						'setting_value'               => $data['columns'] ?? null,
						'func_build_responsive_style' => function ( $args ) {
							$style_array = [];
							$value       = $args['value'];
							if ( $value ) {
								$style_array = [
									'--cbb--grid--columns' => $value,
								];
							}

							return $style_array;
						},
						'func_build_dependent_style'  => function ( $args ) {
							$responsive_styles = $args['responsive_styles'] ?? [];
							$selector          = $args['selector'];
							$breakpoints       = $args['breakpoints'] ?? [];
							$style             = "{$selector}{grid-template-columns:var(--cbb--grid--columns);}";

							foreach ( $responsive_styles as $breakpoint => $attribute_array ) {
								$media_query = $breakpoints[ $breakpoint ]['minQuery'] ?? '';
								if ( $media_query ) {
									$style = \str_replace( '##CONTENT##', $style, $media_query );
								}

								break;
							}

							return $style;
						},
					]
				)
			);

			// Rows style.
			$style .= $this->build_query_loop_responsive_style(
				array_merge(
					$args,
					[
						'setting_value'               => $data['rows'] ?? null,
						'func_build_responsive_style' => function ( $args ) {
							$style_array = [];
							$value       = $args['value'];
							if ( $value ) {
								$style_array = [
									'--cbb--grid--rows' => $value,
								];
							}

							return $style_array;
						},
						'func_build_dependent_style'  => function ( $args ) {
							$responsive_styles = $args['responsive_styles'] ?? [];
							$selector          = $args['selector'];
							$breakpoints       = $args['breakpoints'] ?? [];
							$style             = "{$selector}{grid-template-rows:var(--cbb--grid--rows);}";

							foreach ( $responsive_styles as $breakpoint => $attribute_array ) {
								$media_query = $breakpoints[ $breakpoint ]['minQuery'] ?? '';
								if ( $media_query ) {
									$style = \str_replace( '##CONTENT##', $style, $media_query );
								}

								break;
							}

							return $style;
						},
					]
				)
			);

			// Gap style.
			$style .= $this->build_query_loop_responsive_style(
				array_merge(
					$args,
					[
						'setting_value'               => $data['gap'] ?? null,
						'func_build_responsive_style' => function ( $args ) {
							$style_array = [];
							$value       = $args['value'];
							if ( $value && is_array( $value ) ) {
								$row = $value['row'] ?? null;

								if ( $this->is_valid_value( $row ) ) {
									$style_array['--cbb--grid--gap--row'] = $row;
								}

								$column = $value['column'] ?? null;

								if ( $this->is_valid_value( $column ) ) {
									$style_array['--cbb--grid--gap--column'] = $column;
								}
							}

							return $style_array;
						},
						'func_build_dependent_style'  => function ( $args ) {
							$responsive_styles = $args['responsive_styles'] ?? [];
							$selector          = $args['selector'];
							$breakpoints       = $args['breakpoints'] ?? [];
							$style             = '';

							foreach ( $responsive_styles as $breakpoint => $style_array ) {
								if ( strpos( $style, 'row-gap' ) !== false && strpos( $style, 'column-gap' ) !== false ) {
									break;
								}

								$media_query = $breakpoints[ $breakpoint ]['minQuery'] ?? '';

								if ( strpos( $style, 'row-gap' ) === false && isset( $style_array['--cbb--grid--gap--row'] ) ) {
									$row_style = "{$selector}{row-gap:var(--cbb--grid--gap--row);}";
									if ( $media_query ) {
										$style .= \str_replace( '##CONTENT##', $row_style, $media_query );
									} else {
										$style .= $row_style;
									}
								}
								if ( strpos( $style, 'column-gap' ) === false && isset( $style_array['--cbb--grid--gap--column'] ) ) {
									$column_style = "{$selector}{column-gap:var(--cbb--grid--gap--column);}";
									if ( $media_query ) {
										$style .= \str_replace( '##CONTENT##', $column_style, $media_query );
									} else {
										$style .= $column_style;
									}
								}
							}

							return $style;
						},
					]
				)
			);

			$items = $data['items'] ?? [];
			if ( $items ) {
				foreach ( $items as $item_key => $item_value ) {
					$item_index = str_replace( 'item', '', $item_key );

					// Column style.
					$style .= $this->build_query_loop_responsive_style(
						array_merge(
							$args,
							[
								'setting_value' => $item_value['columnSpan'] ?? [],
								'setting_name'  => 'columnSpan',
								'selector'      => "{$selector} > li:nth-of-type({$item_index})",
								'func_build_responsive_style' => [ $this, 'build_grid_item_responsive_style' ],
								'func_build_dependent_style' => [ $this, 'build_grid_item_dependent_style' ],
							]
						)
					);

					// Row style.
					$style .= $this->build_query_loop_responsive_style(
						array_merge(
							$args,
							[
								'setting_value' => $item_value['rowSpan'] ?? [],
								'setting_name'  => 'rowSpan',
								'selector'      => "{$selector} > li:nth-of-type({$item_index})",
								'func_build_responsive_style' => [ $this, 'build_grid_item_responsive_style' ],
								'func_build_dependent_style' => [ $this, 'build_grid_item_dependent_style' ],
							]
						)
					);
				}
			}

			return $style;
		}

		/**
		 * Build responsive style for grid item
		 *
		 * @param array $args
		 * @return array
		 */
		private function build_grid_item_responsive_style( $args ) {
			$setting_name  = $args['setting_name'] ?? 'columnSpan';
			$variable_name = 'columnSpan' === $setting_name ? '--cbb--grid-item--column' : '--cbb--grid-item--row';
			$style_array   = [];
			$value         = $args['value'];
			if ( $value && is_array( $value ) ) {
				$span  = $value['span'] ?? null;
				$start = $value['start'] ?? null;

				if ( $this->is_valid_value( $start ) || $this->is_valid_value( $span ) ) {
					if ( ! $this->is_valid_value( $start ) ) {
						$start = 'auto';
					}

					if ( ! $this->is_valid_value( $span ) ) {
						$span = 'auto';
					}
					if ( $span !== 'auto' && $span > 0 ) {
						$span = "span {$span}";
					}

					$style_array[ $variable_name ] = "{$start} / {$span}";
				}

				if ( 'columnSpan' === $setting_name ) {
					$order = $value['order'] ?? null;
					if ( is_numeric( $order ) ) {
						$style_array['--cbb--grid-item--order'] = $order;
					}
				}
			}

			return $style_array;
		}

		/**
		 * Build dependent style for grid item
		 *
		 * @param array $args
		 * @return array
		 */
		private function build_grid_item_dependent_style( $args ) {
			$setting_name  = $args['setting_name'] ?? 'columnSpan';
			$variable_name = 'columnSpan' === $setting_name ? '--cbb--grid-item--column' : '--cbb--grid-item--row';
			$css_name      = 'columnSpan' === $setting_name ? 'grid-column' : 'grid-row';

			$responsive_styles = $args['responsive_styles'] ?? [];
			$selector          = $args['selector'];
			$breakpoints       = $args['breakpoints'] ?? [];
			$style             = '';

			foreach ( $responsive_styles as $breakpoint => $style_array ) {
				if ( 'columnSpan' === $setting_name ) {
					if ( strpos( $style, $css_name ) !== false && strpos( $style, 'order' ) !== false ) {
						break;
					}
				} else {
					if ( strpos( $style, $css_name ) !== false ) {
						break;
					}
				}

				$media_query = $breakpoints[ $breakpoint ]['minQuery'] ?? '';

				if ( strpos( $style, $css_name ) === false && isset( $style_array[ $variable_name ] ) ) {
					$column_style = "{$selector}{{$css_name}:var($variable_name);}";
					if ( $media_query ) {
						$style .= \str_replace( '##CONTENT##', $column_style, $media_query );
					} else {
						$style .= $column_style;
					}
				}
				if ( 'columnSpan' === $setting_name && strpos( $style, 'order' ) === false && isset( $style_array['--cbb--grid-item--order'] ) ) {
					$order_style = "{$selector}{order:var(--cbb--grid-item--order);}";
					if ( $media_query ) {
						$style .= \str_replace( '##CONTENT##', $order_style, $media_query );
					} else {
						$style .= $order_style;
					}
				}
			}

			return $style;
		}

		/**
		 * Render carousel layout for query loop blocks
		 *
		 * @param string   $block_content
		 * @param array    $block
		 * @param WP_Block $block_instance
		 * @return string
		 */
		public function render_query_loop_carousel_layout( $block_content, $block, $block_instance ) {
			// Ignore admin side.
			if ( is_admin() ) {
				return $block_content;
			}

			$post_template = $this->get_nested_post_template( $block_instance );
			if ( $post_template ) {
				// If this has carousel layout.
				if ( 'carousel' === ( $post_template->attributes['boldblocks']['layout']['type'] ?? '' ) ) {
					// Build carousel settings.
					$carousel_settings = $post_template->attributes['boldblocks']['carousel'] ?? [];
					if ( $carousel_settings ) {
						if ( ! $this->block_has_attribute( 'data-carousel-settings', $block_content ) ) {
							$carousel_attr = $this->build_query_loop_carousel_settings( $carousel_settings );

							if ( $carousel_attr ) {
								$block_content = $this->add_data_to_block( $block_content, 'data-carousel-settings', esc_attr( $carousel_attr ) );
							}
						}

						// Buil selector.
						$selector = 'cbb-query-' . $this->get_query_loop_id( $block );

						// Get responsive settings.
						$breakpoints = $this->get_breakpoints();

						// Get custom style.
						$block_style = $this->get_carousel_preload_style(
							'',
							[
								'selector'     => ".{$selector}",
								'settings'     => [ 'carousel' => $carousel_settings ],
								'block_layout' => 'carousel',
								'breakpoints'  => $breakpoints,
							]
						);

						$carousel_class = 'js-carousel-layout';

						if ( $block_style ) {
							$handle = $selector;
							wp_register_style( $handle, '' );
							wp_add_inline_style( $handle, $block_style );
							wp_enqueue_style( $handle );

							$carousel_class .= ' ' . $selector;
						}

						if ( $carousel_settings['displayLoader'] ?? false ) {
							$carousel_class .= ' has-preloader';

							if ( 'coverflow' === ( $carousel_settings['effect'] ?? '' ) ) {
								$carousel_class .= ' is-fading-loader';
							}

							// Add preloader.
							$block_content = $this->add_inner_content_to_block( $block_content, $this->get_carousel_preloader_markup( $block, $block_instance ) );
						}

						// Add selector to block wrapper element.
						$block_content = $this->add_class_to_block( $block_content, $carousel_class );
					}
				}
			}

			return $block_content;
		}

		/**
		 * Add preload style for carousels
		 *
		 * @param string $style
		 * @param array  $args
		 */
		public function get_carousel_preload_style( $style, $args ) {
			if ( 'carousel' === ( $args['block_layout'] ?? '' ) ) {
				$preload_style = '';
				$value         = $args['settings']['carousel'] ?? false;
				$selector      = $args['selector'];
				$breakpoints   = $args['breakpoints'];
				if ( $value && is_array( $value ) ) {
					if ( $value['enableResponsive'] ?? false ) {
						$setting_value     = $value['breakpoints'] ?? [];
						$responsive_styles = [];
						foreach ( $setting_value as $breakpoint => $value_by_breakpoint ) {
							$value = null;
							if ( $this->is_valid_value( $value_by_breakpoint['value'] ?? null ) ) {
								$value = $value_by_breakpoint['value'];
							} elseif ( isset( $value_by_breakpoint['inherit'] ) && is_string( $value_by_breakpoint['inherit'] ) ) {
								$value = $setting_value[ $value_by_breakpoint['inherit'] ]['value'] ?? null;
							}

							if ( $this->is_valid_value( $value ) ) {
								$style_by_breakpoint = $this->build_carousel_preload_style( $value );
								if ( $style_by_breakpoint ) {
									$responsive_styles[ $breakpoint ] = $style_by_breakpoint;
								}
							}
						}

						$this->sort_styles( $responsive_styles );

						$last_responsive_style = '';
						foreach ( $responsive_styles as $breakpoint => $style_by_breakpoint ) {
							if ( ! $style_by_breakpoint || ! is_array( $style_by_breakpoint ) ) {
								continue;
							}

							$responsive_style = '';
							foreach ( $style_by_breakpoint as $attr_key => $attr_value ) {
								$responsive_style .= "{$attr_key}:{$attr_value};";
							}

							if ( $responsive_style !== $last_responsive_style ) {
								$style_with_selector = "{$selector}{{$responsive_style}}";
								$media_query         = $breakpoints[ $breakpoint ]['minQuery'] ?? '';
								if ( $media_query ) {
									$preload_style .= \str_replace( '##CONTENT##', $style_with_selector, $media_query );
								} else {
									$preload_style .= $style_with_selector;
								}
								$last_responsive_style = $responsive_style;
							}
						}
					} else {
						$style_array = $this->build_carousel_preload_style( $value );
						$attr_style  = '';
						foreach ( $style_array as $attr_key => $attr_value ) {
							$attr_style .= "{$attr_key}:{$attr_value};";
						}

						if ( $attr_style ) {
							$preload_style .= "{$selector}{{$attr_style}}";
						}
					}
				}

				if ( $preload_style ) {
					$style .= $preload_style;
				}
			}

			return $style;
		}

		/**
		 * Build preload style for carousels
		 *
		 * @param array $value
		 * @return void
		 */
		private function build_carousel_preload_style( $value ) {
			$style_array    = [];
			$slides_perview = $value['slidesPerView'] ?? 1;
			if ( is_array( $slides_perview ) ) {
				if ( $slides_perview['auto'] ?? false ) {
					$slides_perview = 'auto';
				} else {
					$slides_perview = $slides_perview['value'] ?? 1;
				}
			}

			if ( $slides_perview !== 'auto' ) {
				$gap_count = absint( ceil( $slides_perview ) ) - 1;
				if ( $slides_perview <= 0 ) {
					$slides_perview = 1;
				}
			} else {
				$gap_count = 0;
			}

			$space_between = $value['spaceBetween'] ?? 0;
			if ( $space_between < 0 ) {
				$space_between = 0;
			}

			$total_gap = $gap_count * $space_between;

			$style_array['--cbb-slide-width']  = $slides_perview === 'auto' ? 'auto' : "calc((100% - {$total_gap}px ) / {$slides_perview})";
			$style_array['--cbb-carousel-gap'] = "{$space_between}px";

			return $style_array;
		}

		/**
		 * Build a json string of carousel settings
		 *
		 * @param array $carousel_settings
		 * @return string
		 */
		private function build_query_loop_carousel_settings( $carousel_settings ) {
			// phpcs:disable
			$dataset = [];

			// Speed.
			if ( $carousel_settings['speed'] ?? false ) {
				$dataset['speed'] = $carousel_settings['speed'];
			}

			// Loop and rewind.
			$dataset['loop']   = false;
			$dataset['rewind'] = false;

			$loop_type = $carousel_settings['loopType'] ?? '';
			if ( 'infinite' === $loop_type ) {
				$dataset['loop'] = true;
			} elseif ( 'rewind' === $loop_type ) {
				$dataset['rewind'] = true;
			}

			// Autoplay.
			$dataset['autoplay'] = false;
			$autoplay            = $carousel_settings['autoplay'] ?? false;
			$enable_autoplay     = false;
			if ( $autoplay && is_array( $autoplay ) && ( $autoplay['enable'] ?? false ) ) {
				unset( $autoplay['enable'] );
				$dataset['autoplay'] = $autoplay;
			}

			// Direction.
			if ( $carousel_settings['direction'] ?? false ) {
				$dataset['direction'] = $carousel_settings['direction'];
			}

			// Effect.
			$effect = $carousel_settings['effect'] ?? 'slide';
			// Handle wrong default data.
			if ( is_array( $effect ) ) {
				$effect = 'slide';
			}

			if ( $effect ) {
				$dataset['effect'] = $effect;
				$effectSettings    = $carousel_settings['effectSettings'] ?? [];
				$settings          = $effectSettings[ $effect . 'Effect' ] ?? false;

				// Fade.
				if ( 'fade' === $effect ) {
					$dataset['fadeEffect'] = [ 'crossFade' => true ];
				}

				// Coverflow.
				if ( 'coverflow' === $effect ) {
					if ( is_array( $settings ) ) {
						$dataset['coverflowEffect'] = $settings;
					} else {
						$dataset['coverflowEffect'] = [ 'slideShadows' => false ];
					}
				}

				// Creative.
				if ( 'creative' === $effect ) {
					if ( is_array( $settings ) ) {
						$dataset['creativeEffect'] = $settings;
					} else {
						$dataset['creativeEffect'] = [
							'prev' => [
								'translate' => [ '-20%', 0, -1 ],
							],
							'next' => [
								'translate' => [ '100%', 0, 0 ],
							],
						];
					}
				}
			}

			// slidesPerView.
			$slidesPerViewDependencies = [
				'fade',
				'flip',
				'cube',
				'cards',
				'creative',
			];

			$slidesPerViewRaw = $carousel_settings['slidesPerView'] ?? 1;
			if ( in_array( $effect, $slidesPerViewDependencies, true ) ) {
				$dataset['slidesPerView'] = 1;
			} else {
				$slidesPerView = $slidesPerViewRaw;
				if ( is_array( $slidesPerViewRaw ) ) {
					$slidesPerView = $slidesPerViewRaw['auto'] ?? false
						? 'auto'
						: $slidesPerViewRaw['value'] ?? 1;
				}

				if ( $slidesPerViewRaw ) {
					$dataset['slidesPerView'] = $slidesPerViewRaw;

					if ( $slidesPerView > 1 && ( $carousel_settings['slidesPerGroup'] ?? false ) ) {
						$dataset['slidesPerGroup'] = $carousel_settings['slidesPerGroup'];
					}
				}

				// spaceBetween.
				$spaceBetween = $carousel_settings['spaceBetween'] ?? 0;
				if ( $spaceBetween ) {
					$dataset['spaceBetween'] = $spaceBetween;
				}

				// Breakpoints.
				$breakpointValues = [
					'sm' => 576,
					'md' => 768,
					'lg' => 1024,
				];
				$enableResponsive = $carousel_settings['enableResponsive'] ?? false;
				$breakpoints      = $carousel_settings['breakpoints'] ?? [];
				if ( $enableResponsive && is_array( $breakpoints ) ) {
					$breakpointAtts = [];
					foreach ( array_keys( $breakpoints ) as $breakpoint ) :
						$value   = $breakpoints[ $breakpoint ]['value'] ?? '';
						$inherit = $breakpoints[ $breakpoint ]['inherit'] ?? '';

						$valueByBreakpoint = false;
						if ( $value && is_array( $value ) ) {
							$valueByBreakpoint = $value;
						}

						if ( ! $valueByBreakpoint && is_string( $inherit ) ) {
							$inheritValue = $breakpoints[ $inherit ] ?? '';
							if ( $inheritValue && is_array( $inheritValue ) ) {
								$valueByBreakpoint = $inheritValue;
							}
						}

						if ( is_array( $valueByBreakpoint ) ) {
							$breakpointAtts[ $breakpointValues[ $breakpoint ] ] = $valueByBreakpoint;
						}
					endforeach;

					$dataset['breakpoints'] = $breakpointAtts;
				} else {
					if ( $carousel_settings['oneSlidePerViewInMobile'] ?? false ) {
						$dataset['breakpoints'] = [
							$breakpointValues['sm'] => [
								'slidesPerView' => 1,
								'spaceBetween'  => 0,
							],

							$breakpointValues['md'] => [
								'slidesPerView' => $slidesPerViewRaw,
								'spaceBetween'  => $spaceBetween,
							],
						];
					}
				}
			}

			// centeredSlides.
			$dataset['centeredSlides'] = $carousel_settings['centeredSlides'] ?? false;
			if ($dataset['centeredSlides'] && $effect === 'slide' && ($carousel_settings['centeredSlidesSettings']['enable'] ?? '')) {
				$dataset['centeredSlidesSettings'] = $carousel_settings['centeredSlidesSettings'];
			}

			// Pagination.
			$pagination            = $carousel_settings['pagination'] ?? [];
			$dataset['pagination'] = $pagination['enable'] ?? false;
			if ( $dataset['pagination'] ) {
				$dataset['paginationSettings'] = $pagination;
			}

			// Navigation.
			$navigation            = $carousel_settings['navigation'] ?? [];
			$dataset['navigation'] = $navigation['enable'] ?? false;
			if ( $dataset['navigation'] ) {
				$dataset['navigationSettings'] = $navigation;
			}

			// Scrollbar.
			$scrollbar            = $carousel_settings['scrollbar'] ?? [];
			$dataset['scrollbar'] = $scrollbar['enable'] ?? false;
			if ( $dataset['scrollbar'] ) {
				$dataset['scrollbarSettings'] = $scrollbar;
			}

			// Equal height?.
			$equalHeight = $carousel_settings['equalHeight'] ?? false;
			if ( $equalHeight ) {
				// Only add the property when it is true to prevent from invalid content.
				$dataset['equalHeight'] = $equalHeight;
			}

			$thumbs = $carousel_settings['thumbs'] ?? false;
			if ( $thumbs && ( $thumbs['enable'] ?? false ) ) {
				$dataset['thumbsSettings'] = $thumbs;
			}

			return wp_json_encode( $dataset );
			// phpcs:enable
		}

		/**
		 * Get nested post template block for core/query
		 *
		 * @param WP_Block $block_instance
		 * @return boolean|WP_Block
		 */
		private function get_nested_post_template( $block_instance ) {
			return $this->find_nested_block( $block_instance, 'core/post-template' );
		}

		/**
		 * Find a specific nested block from a parent block
		 *
		 * @param WP_Block $block
		 * @param string   $block_name
		 * @return mixed
		 */
		public function find_nested_block( $block, $block_name ) {
			if ( $block->name === $block_name ) {
				return $block;
			}

			foreach ( $block->inner_blocks as $inner_block ) {
				$result = $this->find_nested_block( $inner_block, $block_name );

				if ( $result ) {
					return $result;
				}
			}

			return false;
		}

		/**
		 * Build responsive style
		 *
		 * @param array $args
		 * @param array &$style_array
		 * @param array &$responsive_style_array
		 * @return string
		 */
		private function build_query_loop_responsive_style( $args ) {
			$func_build_responsive_style = $args['func_build_responsive_style'] ?? '';
			if ( ! \is_callable( $func_build_responsive_style ) ) {
				return '';
			}

			$setting_value = $args['setting_value'] ?? [];
			if ( empty( $setting_value ) || ! \is_array( $setting_value ) ) {
				return '';
			}

			$breakpoints = $args['breakpoints'];
			$selector    = $args['selector'];

			$responsive_styles = [];
			foreach ( $setting_value as $breakpoint => $value_by_breakpoint ) {
				$value = null;
				if ( $this->is_valid_value( $value_by_breakpoint['value'] ?? null ) ) {
					$value = $value_by_breakpoint['value'];
				} elseif ( isset( $value_by_breakpoint['inherit'] ) && is_string( $value_by_breakpoint['inherit'] ) ) {
					$value = $setting_value[ $value_by_breakpoint['inherit'] ]['value'] ?? null;
				}

				if ( $this->is_valid_value( $value ) ) {
					$style_by_breakpoint = $func_build_responsive_style( array_merge( $args, [ 'value' => $value ] ) );
					if ( $style_by_breakpoint ) {
						$responsive_styles[ $breakpoint ] = $style_by_breakpoint;
					}
				}
			}

			$this->sort_styles( $responsive_styles );

			$dependent_style            = '';
			$func_build_dependent_style = $args['func_build_dependent_style'] ?? '';
			if ( \is_callable( $func_build_dependent_style ) ) {
				$dependent_style = $func_build_dependent_style( array_merge( $args, [ 'responsive_styles' => $responsive_styles ] ) );
			}

			$style                 = '';
			$last_responsive_style = '';
			foreach ( $responsive_styles as $breakpoint => $style_by_breakpoint ) {
				if ( ! $style_by_breakpoint || ! is_array( $style_by_breakpoint ) ) {
					continue;
				}

				$responsive_style = '';
				foreach ( $style_by_breakpoint as $attr_key => $attr_value ) {
					$responsive_style .= "{$attr_key}:{$attr_value};";
				}

				if ( $responsive_style !== $last_responsive_style ) {
					$style_with_selector = "{$selector}{{$responsive_style}}";
					$media_query         = $breakpoints[ $breakpoint ]['minQuery'] ?? '';
					if ( $media_query ) {
						$style .= \str_replace( '##CONTENT##', $style_with_selector, $media_query );
					} else {
						$style .= $style_with_selector;
					}
					$last_responsive_style = $responsive_style;
				}
			}

			return $style . $dependent_style;
		}

		/**
		 * Build the breakpoints
		 *
		 * @return array
		 */
		private function get_breakpoints() {
			if ( ! $this->breakpoints ) {
				$breakpoints = get_option( 'cbb_breakpoints' );
				if ( empty( $breakpoints ) ) {
					$breakpoints = [
						[
							'breakpoint' => 576,
							'prefix'     => 'sm',
						],
						[
							'breakpoint' => 768,
							'prefix'     => 'md',
						],
						[
							'breakpoint' => 1024,
							'prefix'     => 'lg',
						],
					];
				}

				$breakpoints = array_filter(
					array_map(
						function( $item ) {
							if ( empty( $item['breakpoint'] ) || empty( $item['prefix'] ) ) {
								return false;
							}

							$breakpoint = absint( $item['breakpoint'] );

							if ( $breakpoint < 10 ) {
								return false;
							}

							$max_breakpoint        = $breakpoint - 1;
							$item['breakpointMax'] = $max_breakpoint;

							if ( $item['prefix'] !== 'sm' ) {
								$item['minQuery'] = "@media (min-width: {$breakpoint}px){##CONTENT##}";
								$item['maxQuery'] = "@media (max-width: {$max_breakpoint}px){##MAX_CONTENT##}";
							} else {
								$item['minQuery'] = '';
								$item['maxQuery'] = "@media (max-width: {$max_breakpoint}px){##MAX_CONTENT##}";
							}

							return $item;
						},
						$breakpoints
					)
				);

				$this->breakpoints = array_column( $breakpoints, null, 'prefix' );
			}

			return $this->breakpoints;
		}

		/**
		 * Generate block selector.
		 *
		 * @param string   $block_name
		 * @param WP_Block $block_instance
		 * @return string
		 */
		private function generate_selector( $block_name, $block_instance ) {
			$selector_prefix = 'cbb';

			if ( '' !== $this->style_contexts['loop'] ) {
				$post_id = $block_instance->context['postId'] ?? 0;
				if ( ! $this->style_contexts['post'] || $this->style_contexts['post'] !== $post_id ) {
					$this->style_contexts['post']            = $post_id;
					$this->style_contexts['counter']         = 0;
					$this->style_contexts['content_counter'] = 0;
				}

				if ( $this->style_contexts['content'] ) {
					// The content context selector.
					$content_counter = ++ $this->style_contexts['content_counter'];
					return "{$selector_prefix}-p{$this->style_contexts['post']}-{$content_counter}";
				}

				$counter = ++ $this->style_contexts['counter'];
				// The selector inside the loop.
				return "{$selector_prefix}-{$this->style_contexts['loop']}-{$counter}";
			} else {
				// The global selector.
				return wp_unique_id( "{$selector_prefix}-g-" );
			}
		}

		/**
		 * Update loop id when having a post template block
		 *
		 * @param array $context
		 * @param array $block
		 * @return array
		 */
		public function update_loop_id( $context, $block ) {
			if ( $this->is_loop_temlate_block( $block['blockName'] ?? '' ) ) {
				if ( isset( $context['queryId'] ) ) {
					$query_id = $context['queryId'];
					if ( in_array( $query_id, $this->style_contexts['loops'], true ) ) {
						$count = count(
							array_filter(
								$this->style_contexts['loops'],
								function( $value ) use ( $query_id ) {
									return $value === $query_id;
								}
							)
						);

						$this->style_contexts['loop'] = "{$query_id}i{$count}";
					} else {
						$this->style_contexts['loop'] = $query_id;
					}

					$this->style_contexts['loops'][] = $query_id;
				}
			}

			// Post content inside a loop.
			if ( $this->style_contexts['loop'] && 'core/post-content' === ( $block['blockName'] ?? '' ) ) {
				$this->style_contexts['content'] = true;
			}

			return $context;
		}

		/**
		 * Reset loop id when the post template is rendered
		 *
		 * @param string $content
		 * @param array  $block
		 * @return string
		 */
		public function reset_loop_id( $content, $block ) {
			if ( $this->is_loop_temlate_block( $block['blockName'] ?? '' ) ) {
				$this->style_contexts['loop'] = '';
				$this->style_contexts['post'] = 0;
			}

			// Post content inside a loop.
			if ( 'core/post-content' === ( $block['blockName'] ?? '' ) ) {
				$this->style_contexts['content'] = false;
			}

			return $content;
		}

		/**
		 * Render sticky attributes for core template part blocks
		 *
		 * @param string   $block_content
		 * @param array    $block
		 * @param WP_Block $block_instance
		 * @return string
		 */
		public function render_template_part_sticky( $block_content, $block, $block_instance ) {
			// Ignore admin side.
			if ( is_admin() ) {
				return $block_content;
			}

			// If this block has sticky data.
			$sticky_data = $block['attrs']['boldblocks']['sticky'] ?? false;
			if ( $sticky_data && ( $sticky_data['enable'] ?? false ) ) {
				$sticky_classes   = [ 'is-sticky-block' ];
				$sticky_classes[] = 'is-stick-to-' . ( $sticky_data['stickTo'] ?? 'top' );

				if ( $sticky_data['isStickOnScrollingUp'] ?? false ) {
					$sticky_classes[] = 'is-sticky-on-scrollup';
				} else {
					if ( $sticky_data['isFixed'] ?? false ) {
						$sticky_classes[] = 'is-fixed';
						if ( $sticky_data['isInFlow'] ?? false ) {
							$sticky_classes[] = 'is-in-flow';
						}
						if ( $sticky_data['isDetectingScroll'] ?? false ) {
							$sticky_classes[] = 'is-detecting-scroll';
						}
					} elseif ( $sticky_data['isDetectingStuck'] ?? false ) {
						$sticky_classes[] = 'is-detecting-stuck';
					}
				}

				if ( in_array( $block['attrs']['area'] ?? '', [ 'header', 'footer' ], true ) ) {
					$sticky_classes[] = 'is-sticky-' . $block['attrs']['area'];
				}

				$block_content = $this->add_class_to_block( $block_content, implode( ' ', $sticky_classes ) );
			}

			return $block_content;
		}

		/**
		 * Render preloader for carousel layout blocks
		 *
		 * @param string   $block_content
		 * @param array    $block
		 * @param WP_Block $block_instance
		 * @return string
		 */
		public function build_carousel_preloader( $block_content, $block, $block_instance ) {
			// Ignore admin side.
			if ( is_admin() ) {
				return $block_content;
			}

			// There is no carousel layout.
			if ( ! $this->has_style( $block, $block_instance ) || ( 'carousel' !== ( $block_instance->block_type->supports['layoutType'] ?? '' ) ) ) {
				return $block_content;
			}

			// Has preloader?
			$has_preloader = $block['attrs']['boldblocks']['carousel']['displayLoader'] ?? false;
			if ( $has_preloader ) {
				$preloader_class = 'has-preloader';
				if ( 'coverflow' === ( $block['attrs']['boldblocks']['carousel']['effect'] ?? '' ) ) {
					$preloader_class .= ' is-fading-loader';
				}

				// Mark it as having preloader.
				$block_content = $this->add_class_to_block( $block_content, $preloader_class );

				// Add the loader to the markup.
				$block_content = $this->add_inner_content_to_block( $block_content, $this->get_carousel_preloader_markup( $block, $block_instance ) );
			}

			return $block_content;
		}

		/**
		 * Get the preloader markup for carousels
		 *
		 * @param array    $block
		 * @param WP_Block $block_instance
		 * @return string
		 */
		private function get_carousel_preloader_markup( $block, $block_instance ) {
			return apply_filters( 'cbb_carousel_preloader', '<div class="cbb-loader"></div>', $block, $block_instance );
		}

		/**
		 * Support block style for non-cbb blocks
		 *
		 * @param string $is_supported
		 * @param array  $block
		 * @return boolean
		 */
		public function support_block_style( $is_supported, $block ) {
			if ( in_array( $block['blockName'] ?? '', $this->non_cbb_blocks, true ) ) {
				$is_supported = true;
			}

			return $is_supported;
		}

		/**
		 * Set a valid layout for none-cbb blocks
		 *
		 * @param string $block_layout
		 * @param array  $block
		 * @return string
		 */
		public function get_block_layout( $block_layout, $block ) {
			if ( in_array( $block['blockName'] ?? '', $this->non_cbb_blocks, true ) ) {
				$block_layout = 'standalone';
			}

			return $block_layout;
		}

		/**
		 * Check whether the block is a loop template block.
		 *
		 * @param string $block_name
		 * @return array
		 */
		private function is_loop_temlate_block( $block_name ) {
			$loop_template_blocks = apply_filters( 'cbb_get_loop_temlate_blocks', [ 'core/post-template' ] );

			return in_array( $block_name, $loop_template_blocks, true );
		}

		/**
		 * Check whether current block has custom style or not.
		 *
		 * @param array    $block
		 * @param WP_Block $block_instance
		 * @return boolean
		 */
		private function has_style( $block, $block_instance ) {
			// There is no boldblocks value.
			if ( ! isset( $block['attrs']['boldblocks'] ) ) {
				return false;
			}

			return apply_filters( 'cbb_support_block_style', isset( $block_instance->block_type->supports['cbb'] ), $block, $block_instance );
		}

		/**
		 * Order style array by breakpoints
		 *
		 * @param array $styles
		 * @return void
		 */
		private function sort_styles( &$styles ) {
			uksort(
				$styles,
				function( $a, $b ) {
					if ( 'lg' === $a || 'sm' === $b ) {
						return 1;
					}

					if ( 'sm' === $a || 'lg' === $b ) {
						return -1;
					}

					return 0;
				}
			);
		}

		/**
		 * Build responsive style
		 *
		 * @param array $args
		 * @param array &$responsive_style_array
		 * @param array &$classes
		 * @return string
		 */
		private function build_responsive_style( $args, &$responsive_style_array, &$classes ) {
			$return_value                = false;
			$func_build_responsive_style = $args['func_build_responsive_style'] ?? '';
			if ( ! \is_callable( $func_build_responsive_style ) ) {
				return $return_value;
			}

			$setting_value = $args['setting_value'] ?? [];
			if ( empty( $setting_value ) || ! \is_array( $setting_value ) ) {
				return $return_value;
			}

			$breakpoints = $args['breakpoints'];
			$selector    = $args['selector'];

			$setting_values    = [];
			$responsive_styles = [];
			foreach ( $setting_value as $breakpoint => $value_by_breakpoint ) {
				$value = null;
				if ( $this->is_valid_value( $value_by_breakpoint['value'] ?? null ) ) {
					$value = $value_by_breakpoint['value'];
				} elseif ( isset( $value_by_breakpoint['inherit'] ) && is_string( $value_by_breakpoint['inherit'] ) ) {
					$value = $setting_value[ $value_by_breakpoint['inherit'] ]['value'] ?? null;
				}

				if ( $this->is_valid_value( $value ) ) {
					$style_by_breakpoint = $func_build_responsive_style( array_merge( $args, [ 'value' => $value ] ) );
					if ( $style_by_breakpoint ) {
						$responsive_styles[ $breakpoint ] = $style_by_breakpoint;
					}
				}

				$setting_values[ $breakpoint ] = $value;
			}

			$this->sort_styles( $responsive_styles );

			$dependent_style            = '';
			$func_build_dependent_style = $args['func_build_dependent_style'] ?? '';
			if ( \is_callable( $func_build_dependent_style ) ) {
				$dependent_style = $func_build_dependent_style(
					array_merge(
						$args,
						[
							'setting_values'    => $setting_values,
							'responsive_styles' => $responsive_styles,
						]
					),
					$classes
				);
			}

			$keys                  = [];
			$style                 = '';
			$last_responsive_style = '';
			foreach ( $responsive_styles as $breakpoint => $style_by_breakpoint ) {
				$responsive_style = '';
				foreach ( $style_by_breakpoint as $attr_key => $attr_value ) {
					$responsive_style .= "{$attr_key}:{$attr_value};";

					if ( ! in_array( $attr_key, $keys, true ) ) {
						$keys[]    = $attr_key;
						$classes[] = $breakpoint . '-' . str_replace( '--cbb--', 'cbb-', $attr_key );
					}
				}

				if ( $responsive_style !== $last_responsive_style ) {
					$style_with_selector = "{$selector}{{$responsive_style}}";
					$min_query           = $breakpoints[ $breakpoint ]['minQuery'] ?? '';
					if ( $min_query ) {
						$style_with_selector = \str_replace( '##CONTENT##', $style_with_selector, $min_query );
					}

					$style                .= $style_with_selector;
					$last_responsive_style = $responsive_style;
				}
			}

			// Add style to the style_array.
			if ( $style ) {
				$style                   .= $dependent_style;
				$responsive_style_array[] = $style;

				return $style;
			}

			return $return_value;
		}

		/**
		 * Check wether the block markup has a attribute or not.
		 *
		 * @param string $attribute
		 * @param string $block_content
		 * @return boolean
		 */
		private function block_has_attribute( $attribute, $block_content ) {
			$tags = new \WP_HTML_Tag_Processor( $block_content );
			if ( $tags->next_tag() ) {
				return null !== $tags->get_attribute( $attribute );
			}

			return false;
		}

		/**
		 * Add CSS class to block wrapper
		 *
		 * @param string $block_content
		 * @param string $classes
		 * @return string
		 */
		public function add_class_to_block( $block_content, $classes ) {
			$tags = new \WP_HTML_Tag_Processor( $block_content );
			if ( $tags->next_tag() ) {
				$tags->add_class( $classes );
			}
			return $tags->get_updated_html();
		}

		/**
		 * Add data attribute to block wrapper
		 *
		 * @param string $block_content
		 * @param string $value
		 * @return string
		 */
		public function add_data_to_block( $block_content, $name, $value ) {
			$tags = new \WP_HTML_Tag_Processor( $block_content );
			if ( $tags->next_tag() ) {
				$tags->set_attribute( $name, $value );
			}

			return $tags->get_updated_html();
		}

		/**
		 * Add inner content to block markup
		 *
		 * @param string $block_content
		 * @param string $inner_content
		 * @return string
		 */
		public function add_inner_content_to_block( $block_content, $inner_content ) {
			if ( $inner_content ) {
				$block_content = \preg_replace(
					'/' . \preg_quote( '>', '/' ) . '/',
					'>' . $inner_content,
					$block_content,
					1
				);
			}

			return $block_content;
		}

		/**
		 * Detect a value is valid
		 *
		 * @param mixed $value
		 * @return boolean
		 */
		private function is_valid_value( $value ) {
			return isset( $value ) && $value !== '';
		}

		/**
		 * Get value for spacing var
		 *
		 * @param string $value
		 * @return string
		 */
		private function get_spacing_value( $value ) {
			if ( ! $this->is_valid_value( $value ) ) {
				return '';
			}

			if ( strpos( $value, 'var:preset|spacing|' ) !== false ) {
				preg_match( '/var:preset\|spacing\|(.+)/', $value, $slug );

				if ( ! $slug ) {
					return $value;
				}

				return "var(--wp--preset--spacing--{$slug[1]})";
			}

			return $value;
		}

		/**
		 * Get CSS value for a color object.
		 *
		 * @param array $color_array
		 * @return string
		 */
		private function get_css_color_value( $color_array ) {
			$value = '';

			if ( ! empty( $color_array ) ) {
				if ( is_string( $color_array ) ) {
					$value = $color_array;
				} elseif ( is_array( $color_array ) ) {
					if ( $color_array['gradientSlug'] ?? false ) {
						$value = "var(--wp--preset--gradient--{$color_array['gradientSlug']}, {$color_array['gradientValue']})";
					} elseif ( $color_array['gradientValue'] ?? false ) {
						$value = $color_array['gradientValue'];
					} elseif ( $color_array['slug'] ?? false ) {
						$value = "var(--wp--preset--color--{$color_array['slug']}, {$color_array['value']})";
					} elseif ( $color_array['value'] ?? false ) {
						$value = $color_array['value'];
					}
				}
			}

			return $value;
		}

		/**
		 * Refine custom JS and CSS value
		 *
		 * @param string $code
		 * @param array  $tokens
		 * @param string $type
		 * @return string
		 */
		public function refine_custom_value( $code, $tokens = [], $type = 'CSS' ) {
			// Remove tags.
			// $code = preg_replace( '/(<([\w-]+)>)/mi', '', $code );

			// Replace breakpoint tokens.
			$breakpoints = $this->get_breakpoints();

			$tokens = array_merge(
				$tokens,
				[
					'TABLET_UP'    => ( $breakpoints['md']['breakpoint'] ?? 768 ) . 'px',
					'TABLET_DOWN'  => ( $breakpoints['md']['breakpointMax'] ?? 767 ) . 'px',
					'DESKTOP_UP'   => ( $breakpoints['lg']['breakpoint'] ?? 1024 ) . 'px',
					'DESKTOP_DOWN' => ( $breakpoints['lg']['breakpointMax'] ?? 1023 ) . 'px',
				]
			);

			$code = str_replace( array_keys( $tokens ), array_values( $tokens ), $code );

			// Minify it.
			return $this->minify( $code, $type );
		}

		/**
		 * Simple minify JS and CSS
		 *
		 * @param string $code
		 * @param string $type
		 * @return string
		 */
		public function minify( $code, $type = 'CSS' ) {
			if ( $this->the_plugin_instance->is_debug_mode() ) {
				return $code;
			}

			if ( 'CSS' === $type ) {
				$code = preg_replace( '/\s+/', ' ', $code );
			} elseif ( 'JS' === $type ) {
				// Remove comments first - https://stackoverflow.com/a/31907095/1038868.
				$pattern = '/(?:(?:\/\*(?:[^*]|(?:\*+[^*\/]))*\*+\/)|(?:(?<!\:|\\\|\'|\")\/\/.*))/';
				$code    = preg_replace( $pattern, '', $code );

				// Remove spaces, tabs, and new lines after a line if it ends with a semicolon, a bracket, or a comma, or an open parentheses.
				$code = preg_replace( '/([;{,\(])\s+/', '$1', $code );

				// Remove before ...
				$code = preg_replace( '/\s+([}\)])/', '$1', $code );

				// Remove spaces before a line.
				$code = preg_replace( '/^\s+/m', '', $code );
			}

			return trim( $code );
		}
	}
endif;
