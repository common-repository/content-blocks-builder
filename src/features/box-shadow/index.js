/**
 * External dependencies
 */
import { kebabCase } from "lodash";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import {
  Fill,
  __experimentalToolsPanelItem as ToolsPanelItem,
} from "@wordpress/components";
import { hasBlockSupport } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import { BoxShadowGroupControl } from "sdk/components";
import {
  handleChangeMultipleSettingField,
  buildBoxShadowStyle,
  getColorCSSValue,
  useShadow,
  CUSTOM_SHADOW_PRESETS,
  addEditProps,
  usePropsStyle,
  useBlockFeature,
} from "sdk/utils";
import {
  boldblocksHasSupport,
  getColorCSSValueDeprecatedV1,
} from "../../utils";
import { labels } from "../../utils/labels";

/**
 * Import styles
 */
import "./index.style.scss";

/**
 * Define feature name
 */
const featureName = "boxShadow";

/**
 * Get styles for the feature.
 *
 * @param {Object} attributes
 * @param {Object}
 */
function getFeatureStyle(
  { shadows, slug },
  { isBoxShadowDeprecatedV1, isCSSColorDeprecatedV1 },
) {
  let style = {};

  if (!shadows.length) {
    return style;
  }

  let shadowStyle;

  if (isCSSColorDeprecatedV1) {
    shadowStyle = buildBoxShadowStyle(shadows, getColorCSSValueDeprecatedV1);
  } else {
    shadowStyle = buildBoxShadowStyle(shadows, getColorCSSValue);
  }

  if (shadowStyle) {
    if (slug) {
      shadowStyle = `var(--wp--preset--shadow--${kebabCase(
        slug,
      )}, ${shadowStyle})`;
    }

    if (isBoxShadowDeprecatedV1) {
      style = { "box-shadow": shadowStyle };
    } else {
      style = { "--bb--box-shadow": shadowStyle };
    }
  }

  return style;
}

/**
 * Override the default edit UI to include new inspector controls for custom settings.
 *
 * @param {Function} BlockEdit Block edit component.
 * @return {Function} BlockEdit Modified block edit component.
 */
const withInspectorControls = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    if (!boldblocksHasSupport(props.name, featureName)) {
      return <BlockEdit {...props} />;
    }

    const { attributes, setAttributes } = props;

    const { boldblocks, boldblocks: { shadowSlug = "", shadows = [] } = {} } =
      attributes;

    const { shouldDisplayBlockControls, blocks, updateBlockAttributes } =
      useBlockFeature(props);

    const [createOnChange, createOnChangeSlug] = useShadow(
      { shadowSlug, shadows },
      handleChangeMultipleSettingField({
        setAttributes,
        attributes,
        blocks,
        updateBlockAttributes,
      }),
    );

    return (
      <>
        <BlockEdit {...props} />
        {shouldDisplayBlockControls && (
          <Fill name="cbb-panel-others">
            <ToolsPanelItem
              label={labels.boxShadow}
              panelId="cbb-panel-others"
              hasValue={() => !!shadows?.length}
              onDeselect={() => {
                setAttributes({
                  boldblocks: { ...boldblocks, shadows: [], shadowSlug: "" },
                });
              }}
            >
              <BoxShadowGroupControl
                label={labels.boxShadow}
                values={shadows}
                onChange={createOnChange("shadows")}
                hasPresets={true}
                customShadowPresets={CUSTOM_SHADOW_PRESETS}
                slug={shadowSlug}
                onChangeSlug={createOnChangeSlug("shadowSlug")}
              />
            </ToolsPanelItem>
          </Fill>
        )}
      </>
    );
  };
}, "withInspectorControls");
addFilter(
  "editor.BlockEdit",
  `boldblocks/${featureName}/withInspectorControls`,
  withInspectorControls,
);

/**
 * Override props assigned to save component to inject the CSS variables definition.
 *
 * @param {Object} props      Additional props applied to save element.
 * @param {Object} blockType  Block type.
 * @param {Object} attributes Block attributes.
 *
 * @return {Object} Filtered props applied to save element.
 */
export function addSaveProps(props, blockType, attributes) {
  if (!boldblocksHasSupport(blockType, featureName)) {
    return props;
  }

  const { boldblocks: { shadows = [], shadowSlug = "" } = {} } = attributes;

  let featureStyles;
  if (attributes?.isBlockEdit) {
    featureStyles = usePropsStyle({
      value: { shadows, slug: shadowSlug },
      getStyle: (value) => () => getFeatureStyle(value, {}),
    });
  } else {
    featureStyles = getFeatureStyle(
      { shadows, slug: shadowSlug },
      {
        isBoxShadowDeprecatedV1: hasBlockSupport(
          blockType,
          "BoldBlocksDeprecatedBoxShadowV1",
        ),
        isCSSColorDeprecatedV1: hasBlockSupport(
          blockType,
          "BoldBlocksDeprecatedCSSColorV1",
        ),
      },
    );
  }

  props.style = {
    ...props.style,
    ...featureStyles,
  };

  return props;
}
addFilter(
  "blocks.getSaveContent.extraProps",
  `boldblocks/${featureName}/addSaveProps`,
  addSaveProps,
);

/**
 * Filters registered block settings to extend the block edit wrapper
 * to apply the desired styles and className properly.
 *
 * @param {Object} settings Original block settings.
 *
 * @return {Object}.Filtered block settings.
 */
addFilter(
  "blocks.registerBlockType",
  `boldblocks/${featureName}/addEditProps`,
  addEditProps(
    addSaveProps,
    (settings, { featureName }) => boldblocksHasSupport(settings, featureName),
    { featureName },
  ),
);
