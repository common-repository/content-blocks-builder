/**
 * External dependencies
 */
import { isEmpty, isObject, isString } from "lodash";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, Fill } from "@wordpress/components";
import { hasBlockSupport } from "@wordpress/blocks";
import { useMemo } from "@wordpress/element";

/**
 * Internal dependencies
 */
import {
  getBreakpointType,
  getAllBreakpoints,
  handleChangeResponsiveSettingGroupField,
  getResponsiveSettingGroupFieldValue,
  isUnsetValue,
  addAttributes,
  addEditProps,
  usePropsStyle,
  useBlockFeature,
} from "sdk/utils";
import { hasSupportLayout } from "../../utils";
import { getSpanStylesDeprecatedV1 } from "./deprecated";
import SizeLocationControl from "./size-location-control";

/**
 * Define feature name
 */
const layoutType = "layoutType";
const featureName = "gridItem";

const defaultGridItem = {
  columnSpan: {
    lg: {
      value: { span: "auto", start: "auto", order: "auto" },
      inherit: null,
    },
    md: { inherit: "lg" },
    sm: { inherit: null },
  },
  rowSpan: {
    lg: {
      value: { span: "auto", start: "auto" },
      inherit: null,
    },
    md: { inherit: "lg" },
    sm: { inherit: null },
  },
};

/**
 * Build style for grid column / grid row.
 *
 * @param {Object} gridItem
 * @param {String} prefix
 * @param {Boolean} hasOrder
 */
function getSpanStyles(gridItem, prefix, hasOrder = false) {
  let gridItemStyle = {};
  if (isObject(gridItem) && !isEmpty(gridItem)) {
    Object.keys(gridItem).forEach((breakpoint) => {
      let { value: { start, span, order } = {}, inherit } =
        gridItem[breakpoint] ?? {};
      if (isUnsetValue(start) && isUnsetValue(span) && isUnsetValue(order)) {
        if (inherit && isString(inherit)) {
          gridItemStyle = {
            ...gridItemStyle,
            [`${prefix}${breakpoint}`]: `var(${prefix}${inherit})`,
          };

          if (hasOrder) {
            const { value: { order } = {} } = gridItem[inherit] ?? {};
            if (order && order !== "auto") {
              gridItemStyle = {
                ...gridItemStyle,
                [`--bb--grid-item--order--${breakpoint}`]: `var(--bb--grid-item--order--${inherit})`,
              };
            }
          }
        }
      } else {
        if (!isUnsetValue(start) || !isUnsetValue(span)) {
          if (isUnsetValue(start)) {
            start = "auto";
          }

          if (isUnsetValue(span)) {
            span = "auto";
          }
          if (span !== "auto" && span > 0) {
            // Ignore auto and -1 value
            span = `span ${span}`;
          }

          gridItemStyle = {
            ...gridItemStyle,
            [`${prefix}${breakpoint}`]: `${start} / ${span}`,
          };
        }

        if (hasOrder && order && order !== "auto") {
          gridItemStyle = {
            ...gridItemStyle,
            [`--bb--grid-item--order--${breakpoint}`]: order + "",
          };
        }
      }
    });
  }

  return gridItemStyle;
}

/**
 * Get styles for grid item.
 *
 * @param {Object} gridItem
 * @param {Boolean} hasDeprecatedV1
 */
export function getGridItemStyles(gridItem, hasDeprecatedV1) {
  let gridItemStyles = {};
  if (!isEmpty(gridItem)) {
    const { columnSpan, rowSpan } = gridItem;
    if (hasDeprecatedV1) {
      gridItemStyles = {
        ...getSpanStylesDeprecatedV1(
          columnSpan,
          "--bb--grid-item--column--",
          true,
        ),
        ...getSpanStylesDeprecatedV1(rowSpan, "--bb--grid-item--row--"),
      };
    } else {
      gridItemStyles = {
        ...getSpanStyles(columnSpan, "--bb--grid-item--column--", true),
        ...getSpanStyles(rowSpan, "--bb--grid-item--row--"),
      };
    }
  }

  return gridItemStyles;
}

/**
 * Add custom attributes.
 *
 * @param {Object} settings Settings for the block.
 * @return {Object} settings Modified settings.
 */
// pretter-ignore
addFilter(
  "blocks.registerBlockType",
  `boldblocks/${featureName}/addAttributes`,
  addAttributes(
    {
      gridItem: defaultGridItem,
    },
    (settings, { featureName, layoutType }) =>
      hasSupportLayout(settings, featureName, layoutType),
    { featureName, layoutType },
  ),
);

/**
 * Override the default edit UI to include new inspector controls for custom settings.
 *
 * @param {Function} BlockEdit Block edit component.
 * @return {Function} BlockEdit Modified block edit component.
 */
const withInspectorControls = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    if (!hasSupportLayout(props.name, featureName, layoutType)) {
      return <BlockEdit {...props} />;
    }

    const { attributes, setAttributes, isSelected } = props;

    const { shouldDisplayBlockControls, blocks, updateBlockAttributes } =
      useBlockFeature(props);

    // Get all breakpoints
    const allBreakpoints = getAllBreakpoints();

    // Get current breakpoint
    const breakpoint = getBreakpointType();

    const getGridItemValue = ({ fieldName, defaultValue }) =>
      getResponsiveSettingGroupFieldValue({
        fieldName,
        groupName: "gridItem",
        attributes,
        breakpoint,
        defaultValue,
      });

    const onFeatureChange = (fieldName) => (newValue) => {
      handleChangeResponsiveSettingGroupField({
        fieldName,
        groupName: "gridItem",
        setAttributes,
        attributes,
        breakpoint,
        allBreakpoints,
        blocks,
        updateBlockAttributes,
      })(newValue);
    };

    const initialOpen = useMemo(() => {
      const gridItem = attributes?.boldblocks?.gridItem ?? {};
      if (
        gridItem?.columnSpan?.md?.value ||
        gridItem?.columnSpan?.sm?.value ||
        gridItem?.rowSpan?.md?.value ||
        gridItem?.rowSpan?.sm?.value
      ) {
        return true;
      }

      const columnLgValue = gridItem?.columnSpan?.lg?.value ?? {};
      if (
        (columnLgValue?.span && columnLgValue?.span !== "auto") ||
        (columnLgValue?.start && columnLgValue?.start !== "auto") ||
        (columnLgValue?.order && columnLgValue?.order !== "auto")
      ) {
        return true;
      }
      const rowLgValue = gridItem?.rowSpan?.lg?.value ?? {};
      if (
        (rowLgValue?.span && rowLgValue?.span !== "auto") ||
        (rowLgValue?.start && rowLgValue?.start !== "auto")
      ) {
        return true;
      }

      return false;
    }, [attributes?.boldblocks?.gridItem]);

    const settingsLabel = __("Grid item settings", "content-blocks-builder");
    const settingsControl = (
      <SizeLocationControl
        columnSpanValue={getGridItemValue({
          fieldName: "columnSpan",
          defaultValue: {
            span: "auto",
            start: "auto",
            order: "auto",
          },
        })}
        onColumnSpanChange={onFeatureChange("columnSpan")}
        rowSpanValue={getGridItemValue({
          fieldName: "rowSpan",
          defaultValue: { span: "auto", start: "auto" },
        })}
        onRowSpanChange={onFeatureChange("rowSpan")}
      />
    );

    return (
      <>
        <BlockEdit {...props} />
        {isSelected && <Fill name="cbb-block-toolbar">{settingsControl}</Fill>}
        {shouldDisplayBlockControls && (
          <InspectorControls>
            <PanelBody
              title={settingsLabel}
              initialOpen={initialOpen}
              className="boldblocks-panel-settings is-grid-settings"
            >
              {settingsControl}
            </PanelBody>
          </InspectorControls>
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
  if (!hasSupportLayout(blockType, featureName, layoutType)) {
    return props;
  }

  const { boldblocks: { gridItem = {} } = {} } = attributes;

  const hasDeprecatedV1 = hasBlockSupport(
    blockType,
    "BoldBlocksDeprecatedGridStyleV1",
  );

  const isDeprecatedDynamicStyle = hasBlockSupport(
    blockType,
    "CBBDeprecatedDynamicStyleV1",
  );

  let featureStyles = {};
  if (attributes?.isBlockEdit) {
    featureStyles = usePropsStyle({
      value: gridItem,
      getStyle: (value) => () => getGridItemStyles(value, hasDeprecatedV1),
    });
  } else {
    if (isDeprecatedDynamicStyle) {
      featureStyles = getGridItemStyles(gridItem, hasDeprecatedV1);
    }
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
    (settings, { featureName, layoutType }) =>
      hasSupportLayout(settings, featureName, layoutType),
    { featureName, layoutType },
  ),
);
