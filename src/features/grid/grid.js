/**
 * External dependencies
 */
import { isEmpty, isObject, isString, isUndefined } from "lodash";

/**
 * WordPress dependencies
 */
import { __, sprintf } from "@wordpress/i18n";
import { addFilter, applyFilters } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import {
  PanelBody,
  TextareaControl,
  __experimentalVStack as VStack,
} from "@wordpress/components";
import {
  InspectorControls,
  store as blockEditorStore,
} from "@wordpress/block-editor";
import { hasBlockSupport } from "@wordpress/blocks";
import { useSelect } from "@wordpress/data";

/**
 * Internal dependencies
 */
import { LabelControl } from "sdk/components";
import {
  getBreakpointType,
  getAllBreakpoints,
  buildResponsiveSettingValue,
  getValueByBreakpointFromResponsiveValue,
  handleChangeResponsiveSettingGroupField,
  getResponsiveSettingGroupFieldValue,
  handleChangeSettingField,
  getSettingFieldValue,
  addAttributes,
  addEditProps,
  usePropsStyle,
} from "sdk/utils";
import { hasSupportLayout } from "../../utils";
import { labels } from "../../utils/labels";
import GapControl from "../../components/gap-control";
import LayoutPresetsControl from "./layout-presets-control";
import { layoutPresets, getGridGapStyle } from "./utils";
import { getGridGapStyleDeprecatedV1 } from "./deprecated";
import { HelpLink } from "../../components/help-link";

/**
 * Define feature name
 */
const layoutType = "layoutType";
const featureName = "grid";

/**
 * Get styles for grid.
 *
 * @param {Object} grid
 * @param {Boolean} hasDeprecatedV1
 */
export function getGridStyles(grid, hasDeprecatedV1) {
  let gridStyles = {};
  if (!isEmpty(grid)) {
    const { columns, rows, gap } = grid;
    if (isObject(columns) && !isEmpty(columns)) {
      let columnStyle = {};
      Object.keys(columns).forEach((breakpoint) => {
        const { value, inherit } = columns[breakpoint];
        if (isUndefined(value)) {
          if (inherit && isString(inherit)) {
            columnStyle = {
              ...columnStyle,
              [`--bb--grid--columns--${breakpoint}`]: `var(--bb--grid--columns--${inherit})`,
            };
          }
        } else {
          columnStyle = {
            ...columnStyle,
            [`--bb--grid--columns--${breakpoint}`]: value + "",
          };
        }
      });

      if (!isEmpty(columnStyle)) {
        gridStyles = { ...gridStyles, ...columnStyle };
      }
    }

    if (isObject(rows) && !isEmpty(rows)) {
      let rowstyle = {};
      Object.keys(rows).forEach((breakpoint) => {
        const { value, inherit } = rows[breakpoint];
        if (isUndefined(value)) {
          if (inherit && isString(inherit)) {
            rowstyle = {
              ...rowstyle,
              [`--bb--grid--rows--${breakpoint}`]: `var(--bb--grid--rows--${inherit})`,
            };
          }
        } else {
          rowstyle = {
            ...rowstyle,
            [`--bb--grid--rows--${breakpoint}`]: value + "",
          };
        }
      });

      if (!isEmpty(rowstyle)) {
        gridStyles = { ...gridStyles, ...rowstyle };
      }
    }

    if (isObject(gap) && !isEmpty(gap)) {
      let gapStyle = {};
      if (hasDeprecatedV1) {
        gapStyle = getGridGapStyleDeprecatedV1(gap);
      } else {
        gapStyle = getGridGapStyle(gap);
      }

      if (!isEmpty(gapStyle)) {
        gridStyles = { ...gridStyles, ...gapStyle };
      }
    }
  }

  return gridStyles;
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
      grid: {
        columns: {
          lg: {
            value: "none",
            inherit: null,
          },
          md: { inherit: "lg" },
          sm: { inherit: null },
        },
        gap: {
          lg: {
            value: { row: "1rem", column: "1rem" },
            inherit: null,
          },
          md: { inherit: "lg" },
          sm: { inherit: "lg" },
        },
      },
    },
    (settings, { featureName, layoutType }) =>
      hasSupportLayout(settings, featureName, layoutType, {
        context: "AddAttributes",
      }),
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
    if (
      !hasSupportLayout(props.name, featureName, layoutType, {
        context: "BlockEdit",
      })
    ) {
      return <BlockEdit {...props} />;
    }

    // Allow the ability to cancel the support.
    if (!applyFilters("boldblocks.hasSupportGrid", true, { props })) {
      return <BlockEdit {...props} />;
    }

    const { getBlock, getBlockParentsByBlockName } = useSelect((select) =>
      select(blockEditorStore),
    );

    const { attributes, setAttributes, isSelected } = props;

    // Get all breakpoints
    const allBreakpoints = getAllBreakpoints();

    // Get current breakpoint
    const breakpoint = getBreakpointType();

    const getGridResponsiveGroupFieldValue = ({ fieldName, defaultValue }) =>
      getResponsiveSettingGroupFieldValue({
        fieldName,
        groupName: "grid",
        attributes,
        breakpoint,
        defaultValue,
      });

    const handleGridResponsiveGroupFieldChange = (fieldName) =>
      handleChangeResponsiveSettingGroupField({
        fieldName,
        groupName: "grid",
        setAttributes,
        attributes,
        breakpoint,
        allBreakpoints,
      });

    // Get template columns.
    const columnsByBreakpoint = getGridResponsiveGroupFieldValue({
      fieldName: "columns",
      defaultValue: "none",
    });

    // Get template rows.
    const rowsByBreakpoint = getGridResponsiveGroupFieldValue({
      fieldName: "rows",
      defaultValue: "",
    });

    // Handle layout change
    const handleLayoutChange = (layout) => {
      const {
        attributes: {
          grid: { columns },
        },
      } = layout;

      // Update grid columns.
      handleGridResponsiveGroupFieldChange("columns")(columns);
    };

    return (
      <>
        <BlockEdit {...props} />
        {isSelected && (
          <InspectorControls>
            <PanelBody
              title={__("Grid settings", "content-blocks-builder")}
              initialOpen={true}
              className="boldblocks-panel-settings is-grid-settings"
            >
              <VStack spacing={3}>
                <p>
                  {__(
                    "Choose a predefined layout or input a custom value for grid-template-columns.",
                    "content-blocks-builder",
                  )}
                </p>
                <LayoutPresetsControl
                  label={__("Choose a layout", "content-blocks-builder")}
                  value={columnsByBreakpoint}
                  layouts={layoutPresets}
                  breakpoint={breakpoint}
                  onChange={handleLayoutChange}
                />
                <LabelControl
                  label={__("Grid template columns", "content-blocks-builder")}
                  isResponsive={true}
                />
                <TextareaControl
                  value={columnsByBreakpoint}
                  onChange={handleGridResponsiveGroupFieldChange("columns")}
                  rows={2}
                  help={
                    <HelpLink
                      href="https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns"
                      label={sprintf(labels.learnS, "grid-template-columns")}
                    />
                  }
                />
                <LabelControl
                  label={__("Grid template rows", "content-blocks-builder")}
                  isResponsive={true}
                />
                <TextareaControl
                  value={rowsByBreakpoint}
                  onChange={handleGridResponsiveGroupFieldChange("rows")}
                  rows={2}
                  placeholder="auto"
                  help={
                    <HelpLink
                      href="https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows"
                      label={sprintf(labels.learnS, "grid-template-rows")}
                    />
                  }
                />
                <GapControl
                  label={__("Gap", "content-blocks-builder")}
                  values={getGridResponsiveGroupFieldValue({
                    fieldName: "gap",
                    defaultValue: {},
                  })}
                  onChange={handleGridResponsiveGroupFieldChange("gap")}
                />
              </VStack>
            </PanelBody>
            {applyFilters("boldblocks.grid.additionalSettings", null, {
              props,
              breakpoint,
              allBreakpoints,
              buildResponsiveSettingValue,
              getValueByBreakpointFromResponsiveValue,
              handleGridSettingFieldChange: (fieldName) =>
                handleChangeSettingField({
                  fieldName,
                  setAttributes,
                  attributes,
                }),
              getGridSettingFieldValue: ({ fieldName, defaultValue }) =>
                getSettingFieldValue({ fieldName, defaultValue, attributes }),
              getBlock,
              getBlockParentsByBlockName,
            })}
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
  if (
    !hasSupportLayout(blockType, featureName, layoutType, {
      context: "EditProps",
    })
  ) {
    return props;
  }

  const { boldblocks: { grid = {} } = {} } = attributes;

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
      value: grid,
      getStyle: (value) => () => getGridStyles(value, hasDeprecatedV1),
    });
  } else {
    if (isDeprecatedDynamicStyle) {
      featureStyles = getGridStyles(grid, hasDeprecatedV1);
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
