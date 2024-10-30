/**
 * External dependencies
 */
import { isObject, isEmpty, noop } from "lodash";
import fuzzysort from "fuzzysort";

/**
 * WordPress dependencies
 */
import { sprintf, __ } from "@wordpress/i18n";
import { createContext, useMemo, useReducer } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import apiFetch from "@wordpress/api-fetch";

/**
 * Internal dependencies
 */
import { store as libraryDataStore } from "./store";
import { SearchParams } from "../utils/searchparams";

// Modal context
export const LibraryContext = createContext();

// Cache key prefix
export const cachedLibraryStateKey = "bb-library-state";

const getInitialKewwords = () => {
  let keywords = new SearchParams().get("keywordIds", "");
  if (keywords) {
    keywords = keywords.split(",").map((id) => ({ id: parseInt(id) }));
  } else {
    keywords = [];
  }

  return keywords;
};

// Shared initial state
export const sharedInitialState = {
  pageSize: 6,
  currentPage: 1,
  sortType: "featured",
  selectedKeywords: getInitialKewwords(),
  isOpenHelp: false,
  searchTerm: new SearchParams().get("s", ""),
  insertingItem: "",
  isReloading: false,
  installingPlugins: [],
  activatingPlugins: [],
};

export const libraryReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_STATE": {
      return { ...state, ...action.payload };
    }

    default:
      return state;
  }
};

export const dispatchLibraryState = (dispatch, payload) =>
  dispatch({
    type: "UPDATE_STATE",
    payload,
  });

export const filterItemsByKeywords = (keywords, items) => {
  let filteredItems = [];
  if (!keywords.length || !items.length) {
    return items;
  }

  const [firstKeyword, ...restKeywords] = keywords;
  filteredItems = items.filter(
    ({ keywordIds: keywords }) => keywords.indexOf(firstKeyword.id) > -1,
  );

  return filterItemsByKeywords(restKeywords, filteredItems);
};

const searchOptions = {
  limit: 60,
  threshold: -100,
  keys: ["title", "keywords", "description"],
};

export const searchItems = (searchTerm, items) => {
  let searchedItems;
  if (!searchTerm || searchTerm.length < 3) {
    searchedItems = items;
  } else {
    const results = fuzzysort.go(searchTerm, items, searchOptions);
    if (results.length) {
      searchedItems = results.map(({ obj }) => obj);
    } else {
      searchedItems = [];
    }
  }

  return searchedItems;
};

const sortItemCb = (
  sortType,
  args = { "30_days": "count_30", "7_days": "count_7" },
) => {
  let cb;

  if (sortType === "featured") {
    cb = (a, b) => b.order - a.order;
  } else if (sortType === "latest") {
    cb = (a, b) => b.id - a.id;
  } else if (sortType === "30_days") {
    cb = (a, b) => b.meta[args["30_days"]] - a.meta[args["30_days"]];
  } else if (sortType === "7_days") {
    cb = (a, b) => b.meta[args["7_days"]] - a.meta[args["7_days"]];
  }
  return cb;
};

// Build content the library page
export const useLibraryContent = (libraryState, items, loadFullItems) => {
  const { pageSize, currentPage, sortType, selectedKeywords, searchTerm } =
    libraryState;

  // Filter by keywords
  const keywordIds = selectedKeywords.join(",");
  const filteredItems = useMemo(() => {
    return filterItemsByKeywords(selectedKeywords, items);
  }, [keywordIds, items]);

  // Search
  const searchedItems = useMemo(() => {
    // Only sorting when no search.
    if (searchTerm && searchTerm.length >= 3) {
      return searchItems(searchTerm, filteredItems);
    }

    return filteredItems;
  }, [searchTerm, filteredItems]);

  // Sorting
  const sortedItems = useMemo(() => {
    return searchedItems.sort(sortItemCb(sortType));
  }, [searchedItems, sortType]);

  let currentPageItems = sortedItems.slice(
    (currentPage - 1) * pageSize,
    pageSize * currentPage,
  );

  currentPageItems = currentPageItems.map((item) => {
    return { ...item, loadingFullData: !item?.slug };
  });

  let itemIds = currentPageItems
    .map(({ id, loadingFullData }) => (loadingFullData ? id : false))
    .filter((i) => i);

  const [, forceRender] = useReducer(() => ({}));
  if (itemIds.length) {
    const result = loadFullItems(itemIds);
    result.then(() => {
      forceRender();
    });
  }

  return [currentPageItems, sortedItems];
};

// Get library URL by content type
export const getLibraryURL = (contentType = "block") => {
  let url;
  switch (contentType) {
    case "block":
      url = window?.BoldBlocksBlockLibrary?.URL;
      break;

    case "variation":
      url = window?.BoldBlocksVariationLibrary?.URL;
      break;

    case "pattern":
      url = window?.BoldBlocksPatternLibrary?.URL;
      break;

    default:
      url = "https://boldpatterns.net";
      break;
  }

  if (!url) {
    url = "https://boldpatterns.net";
  }

  return url;
};

// Parse blocks from raw data
export const refinePreviewData = (rawBlocks) => {
  rawBlocks = (rawBlocks ?? "").replaceAll(
    /\w+:\/\/\S*(w=(\d*))&(h=(\d*))&\w+\S*"/g,
    (url, w, width, h, height) => {
      if (width > 800) {
        return url
          .replace(w, "w=" + Math.floor(Number(width) / 2))
          .replace(h, "h=" + Math.floor(Number(height) / 2));
      }

      return url;
    },
  );

  let blocks;
  if (rawBlocks) {
    blocks = JSON.parse(rawBlocks);

    if (!!blocks.length) {
      const { attributes: { boldblocks: { height } = {} } = {} } =
        blocks[0] ?? {};

      if (isObject(height) && !isEmpty(height)) {
        let { lg: { value: { value } } = {} } = height;

        if (value === "100vh") {
          blocks[0] = {
            ...blocks[0],
            attributes: {
              ...blocks[0].attributes,
              boldblocks: {
                ...blocks[0].attributes.boldblocks,
                height: {
                  ...height,
                  lg: { value: { height: "96vh", value: "96vh" } },
                },
              },
            },
          };
        }
      }
    }
  }
  return blocks;
};

export const findExistVariation = (slug, localVariations) =>
  localVariations.find((item) => slug === item.slug);

const buildBlocksFromInnerTemplate = (blocks) => {
  let blockData = [];
  if (!blocks.length) {
    return blockData;
  }

  for (let i = 0; i < blocks.length; i++) {
    let [name, attributes, innerBlocks] = blocks[i];
    innerBlocks = buildBlocksFromInnerTemplate(innerBlocks);

    blockData.push({ name, attributes, innerBlocks });
  }

  return blockData;
};

export const getBlocksFromVariationData = (variationDataRaw) => {
  if (!variationDataRaw) {
    return [];
  }

  const variationData = JSON.parse(variationDataRaw);

  const {
    blockName: name,
    variation: { attributes, innerBlocks },
  } = variationData;

  return [
    {
      name,
      attributes,
      innerBlocks: buildBlocksFromInnerTemplate(innerBlocks),
    },
  ];
};

export const importData = ({
  contentType,
  item,
  existingId = false,
  localVariations,
  finishCallback,
}) => {
  if (contentType === "block") {
    importBlock({ item, existingId, localVariations, finishCallback });
  } else {
    importVariation({ item, existingId, finishCallback });
  }
};

export const importBlock = async ({
  item,
  existingId = false,
  localVariations,
  finishCallback = noop,
}) => {
  const {
    title,
    slug,
    content,
    keywords,
    variations,
    parentVariations,
    meta: {
      boldblocks_is_pro,
      boldblocks_has_pro_features,
      boldblocks_download_count,
      boldblocks_download_7_count,
      boldblocks_download_30_count,
      boldblocks_download_stats,
      boldblocks_tutorials,
      boldblocks_external_resources,
      is_pro,
      has_pro_features,
      download_count,
      download_7_count,
      download_30_count,
      download_stats,
      tutorials,
      external_resources,
      ...meta
    } = {},
  } = item;

  const block = {
    title,
    slug,
    content,
    meta,
    keywords,
  };

  const variationData = [];

  if (variations && variations?.length) {
    variationData.push(
      ...variations.map(({ title, content, slug, meta }) => ({
        title,
        content,
        slug,
        meta,
      })),
    );
  }

  if (parentVariations && parentVariations?.length) {
    variationData.push(
      ...parentVariations.map(({ title, content, slug, meta }) => ({
        title,
        content,
        slug,
        meta,
      })),
    );
  }

  let messages = [];

  return apiFetch({
    path: existingId
      ? `wp/v2/boldblocks-blocks/${existingId}`
      : "wp/v2/boldblocks-blocks",
    method: "POST",
    data: { ...block, status: "publish" },
  })
    .then((res) => {
      messages.push({
        id: res.id,
        slug: block.slug,
        type: "success",
        message: sprintf(
          __(
            "The block '%s' has been imported successfully.",
            "content-blocks-builder",
          ),
          block.title,
        ),
      });
      if (variationData.length) {
        Promise.all(
          variationData.map(async (item) => {
            const existVariation = findExistVariation(
              item.slug,
              localVariations,
            );
            return apiFetch({
              path: !existVariation
                ? "boldblocks/v1/createVariation"
                : `wp/v2/boldblocks-variations/${existVariation.id}`,
              method: "POST",
              data: { ...item, status: "publish" },
            })
              .then((res) => ({
                id: existVariation ? res.id : res?.post?.id,
                slug: item.slug,
                type: "success",
                message: sprintf(
                  __(
                    "The variation '%s' has been imported successfully.",
                    "content-blocks-builder",
                  ),
                  item.title,
                ),
              }))
              .catch((error) => {
                console.error(error);
                return {
                  slug: item.slug,
                  type: "error",
                  message: sprintf(
                    __(
                      "Failed to import variation: '%s'.",
                      "content-blocks-builder",
                    ),
                    item.title,
                  ),
                };
              });
          }),
        ).then((res) => {
          messages.push(...res);

          finishCallback(messages);
        });
      } else {
        finishCallback(messages);
      }

      return messages;
    })
    .catch((error) => {
      console.error(error);

      messages.push({
        slug: block.slug,
        type: "error",
        message: sprintf(
          __("Failed to import block: '%s'.", "content-blocks-builder"),
          block.title,
        ),
      });

      finishCallback(messages);

      return messages;
    });
};

export const importVariation = async ({
  item,
  existingId = false,
  finishCallback = noop,
}) => {
  const {
    title,
    slug,
    content,
    meta: {
      boldblocks_is_pro,
      boldblocks_has_pro_features,
      boldblocks_download_count,
      boldblocks_download_7_count,
      boldblocks_download_30_count,
      boldblocks_download_stats,
      boldblocks_tutorials,
      boldblocks_external_resources,
      is_pro,
      has_pro_features,
      download_count,
      download_7_count,
      download_30_count,
      download_stats,
      tutorials,
      external_resources,
      boldblocks_is_queryable,
      ...meta
    } = {},
  } = item;

  const variation = {
    title,
    slug,
    content,
    meta,
  };

  let messages = [];

  return apiFetch({
    path: existingId
      ? `wp/v2/boldblocks-variations/${existingId}`
      : "boldblocks/v1/createVariation",
    method: "POST",
    data: { ...variation, status: "publish" },
  })
    .then((res) => {
      messages.push({
        id: existingId ? res.id : res?.post?.id,
        slug: variation.slug,
        type: "success",
        message: sprintf(
          __(
            "The variation '%s' has been imported successfully.",
            "content-blocks-builder",
          ),
          variation.title,
        ),
      });

      finishCallback(messages);

      return messages;
    })
    .catch((error) => {
      console.error(error);

      messages.push({
        slug: variation.slug,
        type: "error",
        message: sprintf(
          __("Failed to import variation: '%s'.", "content-blocks-builder"),
          variation.title,
        ),
      });

      finishCallback(messages);

      return messages;
    });
};

/**
 * Decode html
 *
 * @param {String} html
 * @returns {String}
 */
export const decodeHtml = (html) => {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

export const getIsResolving = (
  selector,
  args = [],
  store = libraryDataStore,
) => {
  return useSelect((select) => select(store).isResolving(selector, args), []);
};

export const getHasFinishedResolution = (
  selector,
  args = [],
  store = libraryDataStore,
) => {
  return useSelect(
    (select) => select(store).hasFinishedResolution(selector, args),
    [],
  );
};
