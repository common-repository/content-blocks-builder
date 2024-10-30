<?php
/**
 * Block Overrides
 *
 * @package    BoldBlocks
 * @author     Phi Phan <mrphipv@gmail.com>
 * @copyright  Copyright (c) 2024, Phi Phan
 */

namespace BoldBlocks;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( ! class_exists( BlockOverrides::class ) ) :
	/**
	 * Create/edit custom content blocks.
	 */
	class BlockOverrides extends CoreComponent {
		/**
		 * Define a list of supported core blocks
		 *
		 * @var array
		 */
		protected $supported_core_blocks = [
			'core/paragraph' => [ 'content' ],
			'core/heading'   => [ 'content' ],
			'core/button'    => [ 'text', 'url', 'linkTarget', 'rel' ],
			'core/image'     => [ 'id', 'url', 'title', 'alt' ],
		];

		/**
		 * Define a list of supported block binding
		 *
		 * @var array
		 */
		protected $supported_blocks = [
			'boldblocks/svg-block' => [
				'content',
				'title',
				'description',
				'linkUrl',
				'linkTarget',
				'linkRel',
				'buttonText',
			],
		];

		/**
		 * Run main hooks
		 *
		 * @return void
		 */
		public function run() {
			// Register block bindings.
			add_action( 'init', [ $this, 'register_block_bindings' ] );

			// Register block binding contexts for supported blocks.
			add_filter( 'register_block_type_args', [ $this, 'register_custom_args' ], 10, 2 );

			// Register scripts.
			add_action( 'init', [ $this, 'register_scripts' ] );

			// Replace the dynamic values.
			add_action( 'render_block', [ $this, 'render_block_replace_dynamic_content' ], 10, 3 );

			// Render specific blocks.
			add_filter( 'cbb_pre_render_dynamic_content', [ $this, 'pre_render_dynamic_content' ], 10, 4 );

			// Support more blocks.
			add_filter( 'cbb_block_overrides_supported_blocks', [ $this, 'support_additional_blocks' ] );
		}

		/**
		 * Register custom block bindings
		 *
		 * @return void
		 */
		public function register_block_bindings() {
			if ( function_exists( 'register_block_bindings_source' ) ) {
				register_block_bindings_source(
					'cbb/block-overrides',
					array(
						'label'              => _x( 'Block Overrides', 'block bindings source' ),
						'get_value_callback' => [ $this, 'block_bindings_block_overrides_get_value' ],
						'uses_context'       => array( 'cbb/block-overrides' ),
					)
				);
			}
		}

		/**
		 * Get value callback for block binding attributes
		 *
		 * @param array    $source_args
		 * @param WP_Block $block_instance
		 * @param string   $attribute_name
		 * @return mixed
		 */
		public function block_bindings_block_overrides_get_value( array $source_args, $block_instance, string $attribute_name ) {
			if ( empty( $block_instance->attributes['metadata']['name'] ) ) {
				return null;
			}
			$metadata_name = $block_instance->attributes['metadata']['name'];
			return _wp_array_get( $block_instance->context, array( 'cbb/block-overrides', $metadata_name, $attribute_name ), null );
		}

		/**
		 * Register block overrides context for blocks
		 *
		 * @param array  $args
		 * @param string $block_name
		 * @return void
		 */
		public function register_custom_args( $args, $block_name ) {
			if ( array_key_exists( $block_name, $this->get_supported_blocks() ) ) {
				if ( empty( $args['uses_context'] ) ) {
					$args['uses_context'] = [];
				}

				$args['uses_context'][] = 'cbb/block-overrides';
			}

			return $args;
		}

		/**
		 * Register scripts
		 *
		 * @return void
		 */
		public function register_scripts() {
			// Custom blocks handle.
			$custom_blocks_handler = $this->the_plugin_instance->get_component( CustomBlocks::class );

			// Load all custom blocks for registration.
			wp_add_inline_script( $custom_blocks_handler->custom_blocks_handle, 'var CBB_SYNCING_SUPPORTED_BLOCKS=' . wp_json_encode( apply_filters( 'cbb_block_overrides_get_all_supported_blocks', array_merge( $this->supported_core_blocks, $this->get_supported_blocks() ) ) ), 'before' );
		}

		/**
		 * Replace original content with content from the context
		 *
		 * @param string   $block_content
		 * @param array    $block
		 * @param WP_Block $block_instance
		 * @return void
		 */
		public function render_block_replace_dynamic_content( $block_content, $block, $block_instance ) {
			if ( ! function_exists( 'register_block_bindings_source' ) ) {
				return $block_content;
			}

			// Get dynamic data.
			$computed_attributes = $this->process_block_bindings( $block, $block_instance );

			if ( empty( $computed_attributes ) || empty( $block_content ) ) {
				return $block_content;
			}

			// Allow render blocks in a different way.
			$pre_render = apply_filters( 'cbb_pre_render_dynamic_content', null, $block_content, $computed_attributes, $block_instance );

			if ( ! is_null( $pre_render ) ) {
				$block_content = $pre_render;
			} else {
				foreach ( $computed_attributes as $attribute_name => $source_value ) {
					$block_content = $this->replace_html( $block_content, $attribute_name, $source_value, $block_instance, $computed_attributes );
				}
			}

			return $block_content;
		}

		/**
		 * Render special blocks.
		 *
		 * @param null     $content
		 * @param string   $block_content
		 * @param array    $computed_attributes
		 * @param WP_Block $block_instance
		 * @return null|string
		 */
		public function pre_render_dynamic_content( $content, $block_content, $computed_attributes, $block_instance ) {
			if ( 'boldblocks/svg-block' === $block_instance->name ) {
				// Merge with dynamic content.
				$attributes = array_merge( $block_instance->attributes, $computed_attributes );

				// Get class and style attributes.
				$block_reader = new \WP_HTML_Tag_Processor( $block_content );
				$class        = '';
				$inner_class  = '';
				$style        = '';
				$inner_style  = '';

				if ( $block_reader->next_tag() ) {
					$class = $block_reader->get_attribute( 'class' );
					$style = $block_reader->get_attribute( 'style' );
				}

				if ( $block_reader->next_tag( [ 'class_name' => 'wp-block-boldblocks-svg-block__inner' ] ) ) {
					$inner_class = $block_reader->get_attribute( 'class' );
					$inner_style = $block_reader->get_attribute( 'style' );
				}

				// Don't display empty icon.
				if ( empty( $attributes['content'] ) ) {
					return '';
				}

				$svg = $attributes['content'];

				$id    = \uniqid();
				$title = '';
				$desc  = '';
				$texts = '';
				if ( ! empty( $attributes['title'] ) ) {
					$title  = "<title id=\"svg_block_{$id}_title\">{$attributes['title']}</title>";
					$texts .= $title;
				}
				if ( ! empty( $attributes['description'] ) ) {
					$desc   = "<desc id=\"svg_block_{$id}_desc\">{$attributes['description']}</desc>";
					$texts .= $desc;
				}

				// Add title & desc.
				$svg = \preg_replace(
					'/' . \preg_quote( '>', '/' ) . '/',
					'>' . $texts,
					$svg,
					1
				);

				$is_link          = ! empty( $attributes['linkUrl'] ) || ! empty( $attributes['linkToPost'] );
				$inner_tag        = $is_link ? 'a' : 'div';
				$inner_attributes = '';
				$button           = '';
				if ( $is_link ) {
					if ( ! empty( $attributes['linkToPost'] ) ) {
						if ( isset( $block_instance->context['postId'] ) ) {
							// Get post_id from the context first.
							$post_id = $block_instance->context['postId'];
						} else {
							// Fallback to the current post id.
							$post_id = get_queried_object_id();
						}

						$link_url = get_permalink( $post_id );
					} else {
						$link_url = $attributes['linkUrl'] ?? '';
					}

					if ( $link_url ) {
						$inner_attributes .= ' href="' . $link_url . '"';

						if ( ! empty( $attributes['linkTarget'] ) ) {
							$inner_attributes .= ' target="' . $attributes['linkTarget'] . '"';
						}

						if ( ! empty( $attributes['linkRel'] ) ) {
							$inner_attributes .= ' rel="' . $attributes['linkRel'] . '"';
						}

						if ( ! empty( $attributes['useAsButton'] ) && ! empty( $attributes['buttonText'] ) ) {
							$button = '<span class="button-text">' . $attributes['buttonText'] . '</span>';
						}
					}
				}

				$new_content  = "<div><{$inner_tag}{$inner_attributes}>{$svg}{$button}</{$inner_tag}></div>";
				$block_reader = new \WP_HTML_Tag_Processor( $new_content );
				$block_reader->next_tag();
				$block_reader->set_attribute( 'class', $class );
				if ( $style ) {
					$block_reader->set_attribute( 'style', $style );
				}

				$block_reader->next_tag();
				$block_reader->set_attribute( 'class', $inner_class );
				if ( $inner_style ) {
					$block_reader->set_attribute( 'style', $inner_style );
				}

				if ( $block_reader->next_tag( 'svg' ) ) {
					$block_reader->set_attribute( 'role', 'img' );

					if ( $texts ) {
						if ( $title ) {
							$block_reader->set_attribute( 'aria-labelledby', "svg_block_{$id}_title" );
						}
						if ( $desc ) {
							$block_reader->set_attribute( 'aria-describedby', "svg_block_{$id}_desc" );
						}
					}
				}

				return $block_reader->get_updated_html();
			} elseif ( 'core/embed' === $block_instance->name ) {
				// Merge with dynamic content.
				$attributes = array_merge( $block_instance->attributes, $computed_attributes );

				if ( empty( $attributes['url'] ) ) {
					return '';
				}

				// Get class and style attributes.
				$block_reader = new \WP_HTML_Tag_Processor( $block_content );
				$class        = '';
				$style        = '';

				if ( $block_reader->next_tag( 'figure' ) ) {
					$class = $block_reader->get_attribute( 'class' );
					if ( $class ) {
						$class = explode( ' ', $class );
						$class = array_filter(
							$class,
							function ( $item ) {
								if ( 0 === stripos( $item, 'is-type-' ) || 0 === stripos( $item, 'is-provider-' ) || 0 === stripos( $item, 'wp-block-embed-' ) ) {
									return false;
								}

								return $item;
							}
						);

						$class = implode( ' ', $class );
					}

					$style = $block_reader->get_attribute( 'style' );
					if ( $style ) {
						$style = " style=\"{$style}\"";
					}
				}

				$classes = [ 'wp-block-embed' ];
				if ( $class ) {
					$classes[] = $class;
				}
				if ( $attributes['type'] ?? '' ) {
					$classes[] = "is-type-{$attributes['type']}";
				}
				if ( $attributes['providerNameSlug'] ?? '' ) {
					$classes[] = "is-provider-{$attributes['providerNameSlug']}";
					$classes[] = "wp-block-embed-{$attributes['providerNameSlug']}";
				}
				$markup  = '<figure class="' . implode( ' ', $classes ) . '"' . $style . '><div class="wp-block-embed__wrapper">' . PHP_EOL;
				$markup .= $attributes['url'] . PHP_EOL;
				$markup .= '</div>';
				if ( $attributes['caption'] ?? '' ) {
					$markup .= '<figcaption class="wp-element-caption">' . $attributes['caption'] . '</figcaption>';
				}
				$markup .= '</figure>';

				global $wp_embed;
				return $wp_embed->autoembed( $markup );
			} elseif ( 'boldblocks/youtube-block' === $block_instance->name ) {
				if ( function_exists( 'better_youtube_embed_block_render_block' ) ) {
					// Merge with dynamic content.
					$attributes = array_merge( $block_instance->attributes, $computed_attributes );

					return better_youtube_embed_block_render_block( $attributes );
				}
			} elseif ( 'boldblocks/counting-number' === $block_instance->name ) {
				// Merge with dynamic content.
				$attributes = array_merge( $block_instance->attributes, $computed_attributes );

				// Get class and style attributes.
				$block_reader = new \WP_HTML_Tag_Processor( $block_content );
				$class        = '';
				$style        = '';
				$value_attrs  = [];

				if ( $block_reader->next_tag() ) {
					$class = $block_reader->get_attribute( 'class' );
					$style = $block_reader->get_attribute( 'style' );
				}

				if ( $block_reader->next_tag( [ 'class_name' => 'value' ] ) ) {
					$value_attribute_names = $block_reader->get_attribute_names_with_prefix( '' );
					foreach ( $value_attribute_names as $name ) {
						$value_attrs[ $name ] = $block_reader->get_attribute( $name );
					}
				}

				$new_content = '<div class="' . $class . '" style="' . $style . '">';
				if ( $attributes['prefix'] ?? false ) {
					$new_content .= '<span class="prefix">' . $attributes['prefix'] . '</span>';
				}
				$new_content .= '<span class="value">' . ( $attributes['startVal'] ?? '' ) . '</span>';
				$new_content .= '<span class="sr-value">' . ( $attributes['value'] ?? '' ) . '</span>';
				if ( $attributes['suffix'] ?? false ) {
					$new_content .= '<span class="suffix">' . $attributes['suffix'] . '</span>';
				}
				$new_content .= '</div>';

				$overridable_attrs = [ 'data-value', 'data-start-val', 'data-prefix', 'data-suffix' ];

				$block_reader = new \WP_HTML_Tag_Processor( $new_content );
				if ( $block_reader->next_tag( [ 'class_name' => 'value' ] ) ) {
					foreach ( $value_attrs as $attribute_key => $attribute_value ) {
						if ( in_array( $attribute_key, $overridable_attrs, true ) ) {
							switch ( $attribute_key ) {
								case 'data-value':
									$attribute_value = $attributes['value'] ?? '';
									break;

								case 'data-start-val':
									$attribute_value = $attributes['startVal'] ?? '';
									break;

								case 'data-prefix':
									$attribute_value = $attributes['prefix'] ?? '';
									break;

								case 'data-suffix':
									$attribute_value = $attributes['suffix'] ?? '';
									break;

								default:
									break;
							}
						}

						$block_reader->set_attribute( $attribute_key, $attribute_value );
					}
				}

				return $block_reader->get_updated_html();
			}

			return $content;
		}

		/**
		 * Add more blocks to the supported list
		 *
		 * @param array $supported_blocks
		 * @return array
		 */
		public function support_additional_blocks( $supported_blocks ) {
			$supported_blocks['core/embed']        = [ 'url', 'caption', 'type', 'providerNameSlug', 'responsive', 'previewable' ];
			$supported_blocks['core/video']        = [ 'src', 'caption' ];
			$supported_blocks['core/audio']        = [ 'src', 'caption' ];
			$supported_blocks['core/code']         = [ 'content' ];
			$supported_blocks['core/verse']        = [ 'content' ];
			$supported_blocks['core/preformatted'] = [ 'content' ];
			$supported_blocks['core/pullquote']    = [ 'value', 'citation' ];

			$supported_blocks['boldblocks/youtube-block']   = [ 'url', 'caption', 'aspectRatio', 'isMaxResThumbnail', 'customThumbnail' ];
			$supported_blocks['boldblocks/counting-number'] = [ 'value', 'startVal', 'prefix', 'suffix' ];

			return $supported_blocks;
		}

		/**
		 * Build dynamic contents
		 *
		 * @param array    $parsed_block
		 * @param WP_Block $block_instance
		 * @return array
		 */
		private function process_block_bindings( $parsed_block, $block_instance ) {
			$computed_attributes = array();
			$block_name          = $parsed_block['blockName'] ?? '';
			$supported_blocks    = $this->get_supported_blocks();

			// If the block doesn't have the bindings property, isn't one of the supported
			// block types, or the bindings property is not an array, return the block content.
			if (
				! isset( $supported_blocks[ $block_name ] ) ||
				empty( $parsed_block['attrs']['metadata']['bindings'] ) ||
				! is_array( $parsed_block['attrs']['metadata']['bindings'] )
				) {
					return $computed_attributes;
			}

			foreach ( $parsed_block['attrs']['metadata']['bindings'] as $attribute_name => $block_binding ) {
				// If the attribute is not in the supported list, process next attribute.
				if ( ! array_key_exists( $block_name, $supported_blocks ) ) {
					continue;
				}

				// If no source is provided, or that source is not registered, process next attribute.
				if ( ! isset( $block_binding['source'] ) || ! is_string( $block_binding['source'] ) ) {
					continue;
				}

				$block_binding_source = get_block_bindings_source( $block_binding['source'] );
				if ( null === $block_binding_source ) {
					continue;
				}

				$source_args  = ! empty( $block_binding['args'] ) && is_array( $block_binding['args'] ) ? $block_binding['args'] : array();
				$source_value = $block_binding_source->get_value( $source_args, $block_instance, $attribute_name );

				// If the value is not null, process the HTML based on the block and the attribute.
				if ( ! is_null( $source_value ) ) {
					$computed_attributes[ $attribute_name ] = $source_value;
				}
			}

			return $computed_attributes;
		}

		/**
		 * Depending on the block attribute name, replace its value in the HTML based on the value provided.
		 *
		 * @param string   $block_content  Block content.
		 * @param string   $attribute_name The attribute name to replace.
		 * @param mixed    $source_value   The value used to replace in the HTML.
		 * @param WP_Block $block_instance
		 * @param array    $computed_attributes
		 * @return string  The modified block content.
		 */
		private function replace_html( string $block_content, string $attribute_name, $source_value, $block_instance, $computed_attributes ) {
			$block_type = $block_instance->block_type;
			$properties = $block_type->attributes[ $attribute_name ];

			// Use this filter to alter source, selector for the property.
			$properties = apply_filters( 'cbb_get_binding_attribute_properties', $properties, $attribute_name, $block_instance, $computed_attributes );

			if ( ! isset( $properties['source'] ) ) {
				return $block_content;
			}

			// Make sure the seletor is valid and don't support multiple selector.
			if ( empty( $properties['selector'] ) || false !== stripos( $properties['selector'], ',' ) ) {
				return $block_content;
			}

			// Depending on the attribute source, the processing will be different.
			switch ( $properties['source'] ) {
				case 'html':
				case 'rich-text':
					$parsed_selector = $this->parse_selector( $properties['selector'] );
					$tag_name        = $parsed_selector['tag_name'] ?? '';
					$class_name      = $parsed_selector['class_name'] ?? '';

					// If there is no tag_name, attempt to get it from the source.
					if ( ! $tag_name ) {
						$block_reader = new \WP_HTML_Tag_Processor( $block_content );

						// If any element matches the selector, get the tag name.
						if ( $block_reader->next_tag( $parsed_selector['query'] ) ) {
							$tag_name = $block_reader->get_tag();
						}
					}

					// Bail if there is no tag name.
					if ( ! $tag_name ) {
						return $block_content;
					}

					$pattern = '/(<' . $tag_name . '[^>]*>).*?(<\/' . $tag_name . '>)/is';

					return preg_replace( $pattern, '$1' . wp_kses_post( $source_value ) . '$2', $block_content );

				case 'attribute':
					$amended_content = new \WP_HTML_Tag_Processor( $block_content );
					$parsed_selector = $this->parse_selector( $properties['selector'] );
					if ( ! $amended_content->next_tag( $parsed_selector['query'] ) ) {
						return $block_content;
					}
					$amended_content->set_attribute( $properties['attribute'], $source_value );
					return $amended_content->get_updated_html();

				default:
					return $block_content;
			}
		}

		/**
		 * Parse selector
		 *
		 * @param string $selector
		 * @return array
		 */
		private function parse_selector( $selector ) {
			$parsed_attrs = [];
			$dot_pos      = stripos( $selector, '.' );
			if ( false === $dot_pos ) {
				$parsed_attrs['tag_name'] = $selector;
			} elseif ( $dot_pos > 0 ) {
				$parts                      = explode( '.', $selector );
				$parsed_attrs['tag_name']   = $parts[0];
				$parsed_attrs['class_name'] = $parts[1];
			} else {
				$parsed_attrs['class_name'] = trim( $selector, '.' );
			}

			$query = [];
			if ( ! empty( $parsed_attrs['tag_name'] ) ) {
				$query['tag_name'] = $parsed_attrs['tag_name'];
			}

			if ( ! empty( $parsed_attrs['class_name'] ) ) {
				$query['class_name'] = $parsed_attrs['class_name'];
			}

			$parsed_attrs['query'] = $query;

			return $parsed_attrs;
		}

		/**
		 * Get supported blocks
		 *
		 * @return array
		 */
		private function get_supported_blocks() {
			return apply_filters( 'cbb_block_overrides_supported_blocks', $this->supported_blocks );
		}
	}
endif;
