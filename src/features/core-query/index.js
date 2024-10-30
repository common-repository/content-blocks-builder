/**
 * External dependencies
 */
import clsx from "clsx";
import { isEmpty } from "lodash";
import { nanoid } from "nanoid";
import isDeepEqual from "fast-deep-equal/react";

/**
 * WordPress dependencies
 */
import { __, sprintf } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import {
  BlockControls,
  InspectorControls,
  store as blockEditorStore,
} from "@wordpress/block-editor";
import {
  PanelBody,
  BaseControl,
  SelectControl,
  TextControl,
  ToggleControl,
  FormTokenField,
  __experimentalToolsPanel as ToolsPanel,
  __experimentalToolsPanelItem as ToolsPanelItem,
  __experimentalVStack as VStack,
} from "@wordpress/components";
import { createHigherOrderComponent, usePrevious } from "@wordpress/compose";
import { useEffect, useMemo, useRef } from "@wordpress/element";
import { useSelect, useDispatch } from "@wordpress/data";

/**
 * Internal dependencies
 */
import { getBreakpointType, useValueRef } from "sdk/utils";
import { useSanitizeValue, getPreviewMode } from "../../utils";
import { labels } from "../../utils/labels";
import CustomLayoutToolbar from "./components/custom-layout-toolbar";
import { HorizontalRadioControl } from "./components/horizontal-radio-control";
import SizeLocationControl from "../grid/size-location-control";
import { getGridStyles } from "../grid/grid";
import { getGridItemStyles } from "../grid/grid-item";
import { MetaQueries } from "../../components/meta-queries";
import { LabelHelpControl } from "../../components/label-help-control";
import { HelpLink } from "../../components/help-link";
import { toType, triggerEvent } from "../../utils/dom";
import { displayLayoutToCBBLayout } from "./deprecated";
import {
  buildEditLayoutStyle,
  buildCarouselEditStyle,
} from "../carousel/utils";
import {
  MAX_GRID_ITEMS,
  SORTING_SUGGESTIONS,
  findPostTemplateBlock,
  buildGridEditorStyle,
} from "./utils";
import { triggerCarouselPreview } from "../carousel/carousel-editor";

// Custom migrate cbb layout
addFilter(
  "blocks.registerBlockType",
  `boldblocks/postTemplate/addAttributes`,
  (settings) => {
    if (settings.name === "core/query") {
      if (toType(settings.deprecated) === "array") {
        if (settings.deprecated.length <= 5) {
          settings.deprecated = [
            displayLayoutToCBBLayout,
            ...settings.deprecated,
          ];
        } else {
          // Insert before the core migration for displayLayout
          settings.deprecated = [
            ...settings.deprecated.slice(0, 5),
            displayLayoutToCBBLayout,
            ...settings.deprecated.slice(5),
          ];
        }
      }
    }

    return settings;
  },
);

// Support custom layout for the query loop block
addFilter(
  "boldblocks.hasSupportLayout",
  "boldblocks/customLayout/queryLoop",
  (hasSupport, { blockType, featureName, contextProps: { context } }) => {
    if (hasSupport) {
      return hasSupport;
    }

    if (!["carousel", "grid"].includes(featureName)) {
      return hasSupport;
    }

    const blockTypeName =
      toType(blockType) === "object" ? blockType?.name : blockType;

    if (
      featureName === "carousel" &&
      ["core/query", "core/post-template"].includes(blockTypeName)
    ) {
      return true;
    }

    if (featureName === "grid" && context !== "EditProps") {
      if (blockTypeName === "core/post-template") {
        return true;
      }
    }

    return hasSupport;
  },
);

addFilter(
  "boldblocks.hasSupportCarousel",
  "boldblocks/customLayout/coreQueryCarouselLayout",
  (hasSupport, { props, context }) => {
    if (
      props.name === "core/query" &&
      props?.attributes?.displayLayout?.type !== "carousel"
    ) {
      return false;
    }

    if (
      props.name === "core/post-template" &&
      (props?.attributes?.boldblocks?.layout?.type !== "carousel" ||
        context === "SaveProps")
    ) {
      return false;
    }

    return hasSupport;
  },
);

addFilter(
  "boldblocks.hasSupportGrid",
  "boldblocks/customLayout/coreQueryGridLayout",
  (hasSupport, { props }) => {
    if (
      props.name === "core/post-template" &&
      props?.attributes?.boldblocks?.layout?.type !== "responsiveGrid"
    ) {
      return false;
    }

    return hasSupport;
  },
);

/**
 * Override the default edit UI to include new inspector controls for custom settings.
 *
 * @param {Function} BlockEdit Block edit component.
 * @return {Function} BlockEdit Modified block edit component.
 */
const withAdvancedFilterAndSorting = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    if (props.name !== "core/query") {
      return <BlockEdit {...props} />;
    }

    const {
      attributes: { query = {} },
      setAttributes,
    } = props;

    const {
      cbb = {},
      cbb: {
        postTypes = "",
        include = "",
        parent = "",
        sorting = [],
        metaQuery = {},
      } = {},
    } = query;

    const { relation: metaRelation = "AND", queries = [] } = metaQuery;

    const [rawPostTypes, setRawPostTypes] = useSanitizeValue(
      postTypes,
      (postTypes) => {
        if (postTypes) {
          let postTypesArray = postTypes.split(",");
          postTypesArray = postTypesArray.reduce((prev, current) => {
            current = current.trim();
            if (current) {
              prev.push(current);
            }

            return prev;
          }, []);

          postTypes = postTypesArray.join(",");
        }

        return postTypes;
      },
      (postTypes) =>
        setAttributes({ query: { ...query, cbb: { ...cbb, postTypes } } }),
      1000,
    );

    const [rawInclude, setRawInclude] = useSanitizeValue(
      include,
      (include) => {
        if (include) {
          let includeArray = include.split(",");
          includeArray = includeArray.reduce((prev, current) => {
            current = parseInt(current);
            if (current > 0) {
              prev.push(current);
            }

            return prev;
          }, []);

          include = includeArray.join(",");
        }

        return include;
      },
      (include) =>
        setAttributes({ query: { ...query, cbb: { ...cbb, include } } }),
      1000,
    );

    const [rawParent, setRawParent] = useSanitizeValue(
      parent,
      (parent) => {
        if (parent) {
          let includeArray = parent.split(",");
          includeArray = includeArray.reduce((prev, current) => {
            current = parseInt(current);
            if (current > 0) {
              prev.push(current);
            }

            return prev;
          }, []);

          parent = includeArray.join(",");
        }

        return parent;
      },
      (parent) =>
        setAttributes({ query: { ...query, cbb: { ...cbb, parent } } }),
      1000,
    );

    const [rawSorting, setRawSorting] = useSanitizeValue(
      sorting,
      (sorting) => sorting,
      (sorting) =>
        setAttributes({ query: { ...query, cbb: { ...cbb, sorting } } }),
      1000,
    );

    const [rawQueries, setRawQueries] = useSanitizeValue(
      queries,
      (rawQueries) => {
        if (!rawQueries?.length) {
          return [];
        }

        rawQueries = rawQueries
          .map((query) => {
            if (!query?.key) {
              return false;
            }

            if (!["EXISTS", "NOT EXISTS"].includes(query?.compare)) {
              if (query?.query_string) {
                query.query_string = query.query_string
                  .replace(/[^\w\-]/g, "")
                  .trim();
              }

              if (!query?.query_string && !query?.value) {
                return false;
              }
            }

            if (
              ["IN", "NOT IN", "BETWEEN", "NOT BETWEEN"].includes(
                query?.compare,
              )
            ) {
              const valueArray = query.value
                .split(/,\s*(?=(?:[^"]*"[^"]*")*[^"]*$)/)
                .filter((i) => i.trim());

              if (["BETWEEN", "NOT BETWEEN"].includes(query?.compare)) {
                if (valueArray.length !== 2) {
                  return false;
                }
              }

              query = { ...query, value: valueArray.join(",") };
            }

            return { ...query, key: query.key.trim() };
          })
          .filter((i) => i);

        return rawQueries;
      },
      (newQueries) => {
        if (!isDeepEqual(queries, newQueries)) {
          setAttributes({
            query: {
              ...query,
              cbb: {
                ...cbb,
                metaQuery: { ...metaQuery, queries: newQueries },
              },
            },
          });
        }
      },
      1500,
    );

    const metaKeySorts = queries.reduce((prev, { key }) => {
      if (!prev?.length) {
        return [
          { value: `${key}/asc`, label: "" },
          { value: `${key}/desc`, label: "" },
        ];
      }

      if (!prev.find(({ value }) => value === `${key}/asc`)) {
        prev = [
          ...prev,
          { value: `${key}/asc`, label: "" },
          { value: `${key}/desc`, label: "" },
        ];
      }

      return prev;
    }, []);

    let sortingSuggestiongs = SORTING_SUGGESTIONS.concat(metaKeySorts);
    sortingSuggestiongs = useMemo(() => {
      if (!!rawSorting?.length) {
        if (rawSorting.indexOf("rand") !== -1) {
          sortingSuggestiongs = [];
        } else {
          // Refine the suggesions
          sortingSuggestiongs = sortingSuggestiongs.filter(({ value }) => {
            if (value === "rand") {
              return false;
            }

            if (rawSorting.indexOf(value) !== -1) {
              return true;
            } else {
              const items = value.split("/");
              const oppositeItem = `${items[0]}/${
                items[1] === "asc" ? "desc" : "asc"
              }`;

              if (rawSorting.indexOf(oppositeItem) !== -1) {
                return false;
              }
            }

            return true;
          });
        }
      }

      return sortingSuggestiongs;
    }, [rawSorting]);

    const filterByPostTypesLabel = __(
      "Query Additional Post Types",
      "content-blocks-builder",
    );

    const filterByCustomIDsLabel = __(
      "Filter By Post IDs",
      "content-blocks-builder",
    );

    const filterByByMetaQueriesLabel = __(
      "Filter By Meta Queries",
      "content-blocks-builder",
    );

    const filterByParentLabel = __(
      "Filter By Parent",
      "content-blocks-builder",
    );

    const filterByContextLabel = __(
      "Filter By Context",
      "content-blocks-builder",
    );

    const advancedSortingLabel = __(
      "Advanced Sorting",
      "content-blocks-builder",
    );

    return (
      <>
        <BlockEdit {...props} />
        {props.isSelected && (
          <>
            <InspectorControls>
              <ToolsPanel
                className="core-query-toolspanel__filters"
                label={__(
                  "Extended Filters & Sorting",
                  "content-blocks-builder",
                )}
                resetAll={() => {
                  setAttributes({
                    query: {
                      ...query,
                      cbb: {
                        ...cbb,
                        postTypes: "",
                        include: "",
                        metaQuery: {},
                        ignoreCurrentPost: null,
                        queryRelatedPosts: null,
                        sorting: [],
                        orderbyFromQueryString: null,
                      },
                    },
                  });
                }}
              >
                <ToolsPanelItem
                  label={filterByPostTypesLabel}
                  hasValue={() => !!rawPostTypes}
                  onDeselect={() => setRawPostTypes("")}
                >
                  <BaseControl label={filterByPostTypesLabel} />
                  <TextControl
                    label={__("Input post types", "content-blocks-builder")}
                    value={rawPostTypes}
                    onChange={setRawPostTypes}
                    placeholder="product,portfolio"
                    help={labels.comma}
                    autoComplete="off"
                  />
                </ToolsPanelItem>
                <ToolsPanelItem
                  label={filterByCustomIDsLabel}
                  hasValue={() => !!rawInclude}
                  onDeselect={() => setRawInclude("")}
                >
                  <BaseControl label={filterByCustomIDsLabel} />
                  <TextControl
                    label={__("Input post ids", "content-blocks-builder")}
                    value={rawInclude}
                    onChange={setRawInclude}
                    placeholder="1,2,3"
                    help={`${__(
                      "The order of the post IDs also determines the order of the posts.",
                      "content-blocks-builder",
                    )} ${labels.comma}`}
                    autoComplete="off"
                  />
                </ToolsPanelItem>
                <ToolsPanelItem
                  label={filterByParentLabel}
                  hasValue={() => !!rawParent}
                  onDeselect={() =>
                    setAttributes({
                      query: { ...query, cbb: { ...cbb, parent: "" } },
                    })
                  }
                >
                  <VStack spacing={3}>
                    <BaseControl label={filterByParentLabel} />
                    <TextControl
                      label={__("Input parent ids", "content-blocks-builder")}
                      value={rawParent}
                      onChange={setRawParent}
                      help={labels.comma}
                      autoComplete="off"
                    />
                  </VStack>
                </ToolsPanelItem>
                <ToolsPanelItem
                  label={filterByByMetaQueriesLabel}
                  hasValue={() => !!metaQuery?.queries?.length}
                  onDeselect={() =>
                    setAttributes({
                      query: { ...query, cbb: { ...cbb, metaQuery: {} } },
                    })
                  }
                >
                  <VStack spacing={3}>
                    <BaseControl label={filterByByMetaQueriesLabel} />
                    {rawQueries?.length > 1 && (
                      <HorizontalRadioControl
                        label={__(
                          "Relationship between meta queries",
                          "content-blocks-builder",
                        )}
                        selected={metaRelation}
                        onChange={(relation) =>
                          setAttributes({
                            query: {
                              ...query,
                              cbb: {
                                ...cbb,
                                metaQuery: { ...metaQuery, relation },
                              },
                            },
                          })
                        }
                        options={[
                          { value: "AND", label: "AND" },
                          { value: "OR", label: "OR" },
                        ]}
                      />
                    )}

                    <MetaQueries
                      label={__("Meta query builder", "content-blocks-builder")}
                      values={rawQueries}
                      onChange={setRawQueries}
                    />
                  </VStack>
                </ToolsPanelItem>
                <ToolsPanelItem
                  label={filterByContextLabel}
                  hasValue={() =>
                    cbb?.ignoreCurrentPost ||
                    cbb?.queryRelatedPosts ||
                    (query?.sticky === "exclude" && cbb?.ignoreStickyPosts)
                  }
                  onDeselect={() =>
                    setAttributes({
                      query: {
                        ...query,
                        cbb: {
                          ...cbb,
                          ignoreCurrentPost: null,
                          ignoreStickyPosts: null,
                          queryRelatedPosts: null,
                          queryFallbackPosts: null,
                        },
                      },
                    })
                  }
                >
                  <VStack spacing={3}>
                    <BaseControl label={filterByContextLabel} />
                    <ToggleControl
                      label={__(
                        "Ignore current item",
                        "content-blocks-builder",
                      )}
                      checked={cbb?.ignoreCurrentPost ?? false}
                      onChange={(ignoreCurrentPost) =>
                        setAttributes({
                          query: {
                            ...query,
                            cbb: { ...cbb, ignoreCurrentPost },
                          },
                        })
                      }
                    />

                    <ToggleControl
                      label={__(
                        "Query related items",
                        "content-blocks-builder",
                      )}
                      checked={cbb?.queryRelatedPosts ?? false}
                      onChange={(queryRelatedPosts) =>
                        setAttributes({
                          query: {
                            ...query,
                            cbb: { ...cbb, queryRelatedPosts },
                          },
                        })
                      }
                      help={__(
                        "Automatically query items that have the same taxonomies as the current item.",
                        "content-blocks-builder",
                      )}
                    />
                    {cbb?.queryRelatedPosts && (
                      <ToggleControl
                        label={__(
                          "Query recent items if don't have enough related items",
                          "content-blocks-builder",
                        )}
                        checked={cbb?.queryFallbackPosts ?? false}
                        onChange={(queryFallbackPosts) =>
                          setAttributes({
                            query: {
                              ...query,
                              cbb: { ...cbb, queryFallbackPosts },
                            },
                          })
                        }
                      />
                    )}
                    {query?.sticky === "exclude" && (
                      <ToggleControl
                        label={__(
                          "Ignore sticky posts instead of excluding them.",
                          "content-blocks-builder",
                        )}
                        checked={cbb?.ignoreStickyPosts ?? false}
                        onChange={(ignoreStickyPosts) =>
                          setAttributes({
                            query: {
                              ...query,
                              cbb: { ...cbb, ignoreStickyPosts },
                            },
                          })
                        }
                      />
                    )}
                    <BaseControl
                      help={__(
                        "These context settings only apply to the front end and do not change anything on the back end.",
                        "content-blocks-builder",
                      )}
                    />
                  </VStack>
                </ToolsPanelItem>
                <ToolsPanelItem
                  label={advancedSortingLabel}
                  hasValue={() =>
                    !!sorting?.length || cbb?.orderbyFromQueryString
                  }
                  onDeselect={() =>
                    setAttributes({
                      query: {
                        ...query,
                        cbb: {
                          ...cbb,
                          sorting: [],
                          orderbyFromQueryString: null,
                        },
                      },
                    })
                  }
                >
                  <LabelHelpControl
                    label={advancedSortingLabel}
                    helpControls={
                      <ul>
                        <li>
                          {__(
                            "Support sorting with multiple criteria. However, random sorting may affect performance and cannot be combined with other sorting methods.",
                            "content-blocks-builder",
                          )}
                        </li>
                        <li>
                          {__(
                            "To make a meta field sortable, you have to filter it with the meta query builder first.",
                            "content-blocks-builder",
                          )}
                        </li>
                        <li>
                          <HelpLink href="https://developer.wordpress.org/reference/classes/wp_query/#order-orderby-parameters" />
                        </li>
                      </ul>
                    }
                    isAtTop={false}
                  />
                  <VStack spacing={3}>
                    <FormTokenField
                      label={__(
                        "Select order by/order",
                        "content-blocks-builder",
                      )}
                      value={rawSorting}
                      onChange={setRawSorting}
                      suggestions={sortingSuggestiongs.map(
                        ({ value }) => value,
                      )}
                      __experimentalExpandOnFocus={true}
                      __experimentalRenderItem={({ item }) => {
                        const { label = "" } =
                          sortingSuggestiongs.find(
                            ({ value }) => item === value,
                          ) ?? {};

                        if (label) {
                          return <div>{`${item} — ${label}`}</div>;
                        }

                        return item;
                      }}
                    />
                    <ToggleControl
                      label={__(
                        "Get orderby from query string",
                        "content-blocks-builder",
                      )}
                      checked={cbb?.orderbyFromQueryString ?? false}
                      onChange={(orderbyFromQueryString) =>
                        setAttributes({
                          query: {
                            ...query,
                            cbb: { ...cbb, orderbyFromQueryString },
                          },
                        })
                      }
                      help={__(
                        "The forward character '/' should be encode as '%2F' in the query string. For example: orderby=rand, or orderby=title%2Fdesc, or orderby[]=title%2Fasc&orderby[]=date%2Fasc",
                        "content-blocks-builder",
                      )}
                    />
                  </VStack>
                </ToolsPanelItem>
              </ToolsPanel>
            </InspectorControls>
          </>
        )}
      </>
    );
  };
}, "withAdvancedFilterAndSorting");
addFilter(
  "editor.BlockEdit",
  `boldblocks/coreQuery/withAdvancedFilterAndSorting`,
  withAdvancedFilterAndSorting,
);

/**
 * Override the default edit UI to include new inspector controls for custom settings.
 *
 * @param {Function} BlockEdit Block edit component.
 * @return {Function} BlockEdit Modified block edit component.
 */
const withNewCustomLayout = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    if (props.name !== "core/post-template") {
      return <BlockEdit {...props} />;
    }

    const {
      getBlockParentsByBlockName,
      getSelectedBlockClientId,
      __unstableGetEditorMode,
    } = useSelect((select) => select(blockEditorStore), []);
    const { selectBlock } = useDispatch(blockEditorStore);

    const coreQueries = getBlockParentsByBlockName(
      props.clientId,
      "core/query",
    );
    const coreQueryId = coreQueries.length ? coreQueries[0] : "";

    const {
      attributes: {
        boldblocks,
        boldblocks: { layout: cbbLayout = { type: "default" } } = {},
        layout = {},
      },
      setAttributes,
      clientId,
    } = props;

    const layoutType =
      cbbLayout?.type && cbbLayout?.type !== "default"
        ? cbbLayout?.type
        : layout?.type
        ? layout.type
        : "default";

    const displayLayout = { ...layout, type: layoutType };

    const setDisplayLayout = (newDisplayLayout) => {
      let updated = {
        boldblocks: { ...boldblocks, layout: { ...newDisplayLayout } },
      };

      // A little hack to render carousel preview.
      selectBlock(coreQueryId);
      selectBlock(props.clientId);

      if (newDisplayLayout?.type === "grid") {
        updated = {
          ...updated,
          layout: { ...layout, type: newDisplayLayout.type },
        };
      } else {
        updated = {
          ...updated,
          layout: { ...layout, type: "default" },
        };
      }
      setAttributes(updated);
    };

    // Get previous layout
    const prevLayoutType = usePrevious(layoutType);

    // Get current preview mode
    let previewMode = getPreviewMode(clientId);

    // Zoom out mode
    const isZoomOut =
      __unstableGetEditorMode && __unstableGetEditorMode() === "zoom-out"
        ? true
        : false;

    if (isZoomOut) {
      previewMode = "EDIT";
    }

    const valueRef = useValueRef(boldblocks?.carousel ?? {});
    const ref = useRef();
    useEffect(() => {
      if (ref.current) {
        if (layoutType === "carousel") {
          return triggerCarouselPreview({
            props,
            previewMode,
            blockElement: ref.current.closest(".js-carousel-layout"),
            carousel: valueRef.current,
            getSelectedBlockClientId,
            selectBlock,
          });
        } else if (prevLayoutType === "carousel") {
          triggerEvent(window, "cbb.carousel.disposed", {
            blockElement: ref.current.closest(".js-carousel-layout"),
            clientId,
          });
        }
      }
    }, [
      ref.current,
      layoutType,
      prevLayoutType,
      previewMode,
      clientId,
      valueRef.current,
    ]);

    return (
      <>
        {props.isSelected && (
          <BlockControls group="default">
            <CustomLayoutToolbar
              displayLayout={displayLayout}
              setDisplayLayout={setDisplayLayout}
            />
          </BlockControls>
        )}
        <BlockEdit {...props} />
        {(layoutType === "carousel" || prevLayoutType === "carousel") && (
          <div ref={ref} style={{ display: "none" }} />
        )}
      </>
    );
  };
}, "withNewCustomLayout");
addFilter(
  "editor.BlockEdit",
  `boldblocks/coreQuery/withNewCustomLayout`,
  withNewCustomLayout,
);

/**
 * Add grid items layout to the core query template block.
 */
addFilter(
  "boldblocks.grid.additionalSettings",
  "boldblocks.queryLoop.grid",
  (
    content,
    {
      props,
      breakpoint,
      allBreakpoints,
      buildResponsiveSettingValue,
      getValueByBreakpointFromResponsiveValue,
      getGridSettingFieldValue,
      handleGridSettingFieldChange,
      getBlock,
      getBlockParentsByBlockName,
    },
  ) => {
    if (!["core/query", "core/post-template"].includes(props.name)) {
      return <>{content}</>;
    }

    // let layoutType,
    let perPage = 12;

    if (props.name === "core/post-template") {
      const coreQueries = getBlockParentsByBlockName(
        props.clientId,
        "core/query",
      );
      if (coreQueries.length) {
        const coreQuery = getBlock(coreQueries[0]);
        if (coreQuery) {
          perPage = coreQuery?.attributes?.query?.perPage ?? 6;
        }
      }
    } else {
      perPage = props?.attributes?.query?.perPage ?? 6;
    }

    const gridItemCount = Math.min(MAX_GRID_ITEMS, perPage);
    const editingItem = getGridSettingFieldValue({
      fieldName: "editingItem",
      defaultValue: 0,
    });
    let itemOptions = [...Array(gridItemCount).keys()].map((i) => ({
      value: i + 1,
      label: i + 1,
    }));

    itemOptions.unshift({
      value: 0,
      label: __("Select an item", "content-blocks-builder"),
    });

    itemOptions.push({
      value: -1,
      label: __("Show all", "content-blocks-builder"),
    });

    const grid = getGridSettingFieldValue({
      fieldName: "grid",
      defaultValue: {},
    });

    const { items = {} } = grid;

    const getItemValue = (index) => items[`item${index}`] ?? {};

    const handleGridChange = handleGridSettingFieldChange("grid");

    const getColumnSpanValue = (index) =>
      getValueByBreakpointFromResponsiveValue({
        fieldValue: getItemValue(index)?.columnSpan ?? {},
        breakpoint,
        defaultValue: { span: "auto", start: "auto", order: "auto" },
      });

    const getRowSpanValue = (index) =>
      getValueByBreakpointFromResponsiveValue({
        fieldValue: getItemValue(index)?.rowSpan ?? {},
        breakpoint,
        defaultValue: { span: "auto", start: "auto" },
      });

    const handleAttributeChange =
      ({ attributeName, editingItem }) =>
      (newValue) => {
        const editingItemValue = getItemValue(editingItem);
        const { [attributeName]: fieldValue = { sm: { inherit: null } } } =
          editingItemValue;

        handleGridChange({
          ...grid,
          items: {
            ...items,
            [`item${editingItem}`]: {
              ...editingItemValue,
              [attributeName]: buildResponsiveSettingValue({
                breakpoint,
                allBreakpoints,
                fieldValue,
                newValue,
              }),
            },
          },
        });
      };

    const GridItemControl = ({ editingItem }) => {
      return (
        <SizeLocationControl
          columnSpanValue={getColumnSpanValue(editingItem)}
          onColumnSpanChange={handleAttributeChange({
            attributeName: "columnSpan",
            editingItem,
          })}
          rowSpanValue={getRowSpanValue(editingItem)}
          onRowSpanChange={handleAttributeChange({
            attributeName: "rowSpan",
            editingItem,
          })}
        />
      );
    };

    return (
      <>
        {content}
        <PanelBody
          title={__("Grid items settings", "content-blocks-builder")}
          initialOpen={editingItem !== 0}
          className="boldblocks-panel-settings is-grid-settings"
        >
          <VStack spacing={3}>
            <SelectControl
              label={__("Grid item", "content-blocks-builder")}
              value={editingItem}
              onChange={handleGridSettingFieldChange("editingItem")}
              options={itemOptions}
            />

            {editingItem == -1 ? (
              <>
                {[...Array(gridItemCount).keys()].map((i) => (
                  <>
                    <h3 style={{ borderBottom: "1px solid #ddd" }}>
                      {sprintf(__("Item %d", "content-blocks-builder"), i + 1)}
                    </h3>
                    <GridItemControl editingItem={i + 1} key={i} />
                  </>
                ))}
              </>
            ) : (
              editingItem > 0 && <GridItemControl editingItem={editingItem} />
            )}
          </VStack>
        </PanelBody>
      </>
    );
  },
);

/**
 * This adds class, style for the feature.
 *
 * @param {Function} BlockListBlock Original component.
 *
 * @return {Function} Wrapped component.
 */
export const withGridLayoutClassStyles = createHigherOrderComponent(
  (BlockListBlock) => (props) => {
    const { name } = props;

    // We need core/query here because we need the deprecated to work
    if (!(name === "core/query" || name === "core/post-template")) {
      return <BlockListBlock {...props} />;
    }

    const { attributes, clientId } = props;

    let layoutType;
    if (name === "core/query") {
      layoutType = attributes?.displayLayout?.type;
    } else {
      layoutType = attributes?.boldblocks?.layout?.type;
    }

    const { boldblocks: { grid = {} } = {} } = attributes;

    const isGridLayout =
      layoutType === "grid" || layoutType === "responsiveGrid";

    useEffect(() => {
      if (isGridLayout) {
        const selector = `block-${clientId}`;
        let targetNode = document.getElementById(selector);
        if (!targetNode) {
          const editorCanvas = document.querySelector(
            'iframe[name="editor-canvas"]',
          );
          if (editorCanvas) {
            targetNode =
              editorCanvas.contentWindow.document.getElementById(selector);
          }
        }

        // Target the core query block
        targetNode = targetNode ? targetNode.closest(".wp-block-query") : null;

        if (!targetNode) {
          return;
        }

        // Create a MutationObserver instance
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (
              mutation.type === "attributes" &&
              mutation.attributeName === "data-is-drop-zone" &&
              mutation.target.parentNode
            ) {
              let target = mutation.target;
              if (
                target.nodeName.toLowerCase() !== "li" &&
                "li" === target.parentNode.nodeName.toLowerCase()
              ) {
                target = target.parentNode;
              }

              if (
                target.nodeName.toLowerCase() === "li" &&
                target.parentNode &&
                target.classList.contains("wp-block-post")
              ) {
                const list = target.parentNode.children;
                for (let i = 0, order = 1; i < list.length; i++) {
                  if (list[i].style.display !== "none") {
                    list[i].setAttribute("data-order", order++);
                  }
                }
              }
            }
          });
        });

        // Configure the observer to observe attribute changes
        const config = { subtree: true, attributes: true };

        // Start observing the target node for mutations
        observer.observe(targetNode, config);

        return () => observer.disconnect();
      }
    }, [isGridLayout, grid?.items]);

    if (!isGridLayout) {
      return <BlockListBlock {...props} />;
    }

    const { items = {} } = grid;

    const gridStyleObject = getGridStyles(grid, false);
    const itemsStyleObject = Object.keys(items).reduce(
      (accumulator, current) => {
        const itemStyle = getGridItemStyles(items[current], false);
        if (!isEmpty(itemStyle)) {
          accumulator = {
            ...accumulator,
            [current.substring(4)]: itemStyle,
          };
        }

        return accumulator;
      },
      {},
    );

    const selector = `${props.name.replace("/", "-")}-${nanoid(5)}`;
    const gridSelector =
      name === "core/query" ? `.${selector} > ul` : `.${selector}`;

    const style = buildGridEditorStyle({
      gridStyleObject,
      itemsStyleObject,
      gridSelector,
      itemSelector: "li",
    });

    return (
      <>
        <BlockListBlock
          {...props}
          className={clsx(props?.className, {
            [selector]: style,
          })}
        />
        {style && <style>{style}</style>}
      </>
    );
  },
);
addFilter(
  "editor.BlockListBlock",
  `boldblocks/coreQuery/withGridLayoutClassStyles`,
  withGridLayoutClassStyles,
);

/**
 * This adds class, style for the feature.
 *
 * @param {Function} BlockListBlock Original component.
 *
 * @return {Function} Wrapped component.
 */
export const withNewCoreQueryCarouselClassStyles = createHigherOrderComponent(
  (BlockListBlock) => (props) => {
    if (props.name !== "core/query") {
      return <BlockListBlock {...props} />;
    }

    const breakpoint = getBreakpointType();

    const { getBlock, getBlocks } = useSelect(
      (select) => select(blockEditorStore),
      [],
    );

    const coreQuery = getBlock(props.clientId);
    const postTemplate = findPostTemplateBlock(coreQuery.innerBlocks);
    const postTemplateId = postTemplate ? postTemplate?.clientId : "";
    let previewMode = getPreviewMode(postTemplateId);
    if (
      !postTemplate ||
      postTemplate?.attributes?.boldblocks?.layout?.type !== "carousel"
    ) {
      return <BlockListBlock {...props} />;
    }

    const carousel = postTemplate?.attributes?.boldblocks?.carousel ?? {};

    // Get all slide blocks
    const slides = getBlocks(postTemplateId);

    // Get slides count
    const slideCount = slides.length;

    // Get current breakpoint
    if (breakpoint === "lg" && !previewMode) {
      previewMode = "EDIT";
    }

    let wrapperProps = props.wrapperProps;
    wrapperProps = {
      ...props.wrapperProps,
      "data-preview-mode": previewMode,
    };

    const selector = `${props.name.replace("/", "-")}-${nanoid(5)}`;

    const wraperSelector = "ul";

    const cssVariables = buildEditLayoutStyle(carousel, slideCount, breakpoint);

    const style = buildCarouselEditStyle(
      `.${selector}`,
      wraperSelector,
      cssVariables,
    );

    return (
      <>
        <BlockListBlock
          {...props}
          className={clsx(props?.className, "js-carousel-layout", {
            [selector]: style,
          })}
          wrapperProps={wrapperProps}
        />
        {style && <style>{style}</style>}
      </>
    );
  },
);
addFilter(
  "editor.BlockListBlock",
  `boldblocks/coreQuery/withNewCoreQueryCarouselClassStyles`,
  withNewCoreQueryCarouselClassStyles,
);

/**
 * This adds class, style for the feature.
 *
 * @param {Function} BlockListBlock Original component.
 *
 * @return {Function} Wrapped component.
 */
export const withNewCoreTemplateCarouselClassStyles =
  createHigherOrderComponent((BlockListBlock) => (props) => {
    if (props.name !== "core/post-template") {
      return <BlockListBlock {...props} />;
    }

    const breakpoint = getBreakpointType();
    const { getBlocks } = useSelect((select) => select(blockEditorStore), []);

    if (props?.attributes?.boldblocks?.layout?.type !== "carousel") {
      return <BlockListBlock {...props} />;
    }

    const carousel = props?.attributes?.boldblocks?.carousel ?? {};

    // Get all slide blocks
    const slides = getBlocks(props.clientId);

    // Get slides count
    const slideCount = slides.length;

    const selector = `${props.name.replace("/", "-")}-${nanoid(5)}`;

    const cssVariables = buildEditLayoutStyle(carousel, slideCount, breakpoint);

    const style = `.${selector} {${cssVariables}}`;

    return (
      <>
        <BlockListBlock
          {...props}
          className={clsx(props?.className, {
            [selector]: style,
          })}
        />
        {style && <style>{style}</style>}
      </>
    );
  });
addFilter(
  "editor.BlockListBlock",
  `boldblocks/coreQuery/withNewCoreTemplateCarouselClassStyles`,
  withNewCoreTemplateCarouselClassStyles,
);
