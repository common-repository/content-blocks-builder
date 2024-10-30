/**
 * External dependencies
 */
import { isArray, isUndefined } from "lodash";
/**
 * WordPress dependencies
 */
import { useEntityProp, useEntityRecords } from "@wordpress/core-data";
import { createContext, useState, useEffect } from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";

/**
 * Load custom content types
 *
 * @param {String} postType
 * @returns {Array}
 */
export const useContentType = (postType) => {
  // Query all content type data.
  const {
    records: rawPosts,
    isResolving: isLoading,
    hasResolved: hasFinishedResolution,
  } = useEntityRecords("postType", postType, {
    per_page: -1,
    _cbb_load_all: true,
  });

  // Convert to expected format.
  const allPosts = isArray(rawPosts)
    ? rawPosts.map((item) => {
        const {
          id,
          title: { raw: title, rendered: renderedTitle },
          content: { raw: content },
          slug,
          type,
          meta,
          ...otherProps
        } = item;

        return {
          id,
          title,
          content,
          slug,
          type,
          meta,
          renderedTitle,
          ...otherProps,
        };
      })
    : [];

  return [allPosts, isLoading, hasFinishedResolution];
};

/**
 * Get pattern categories
 *
 * @returns {Object}
 */
export const usePatternCategories = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [registeredCategories, setRegisteredCategories] = useState([]);
  const [customCategories, setCustomCategories] = useEntityProp(
    "root",
    "site",
    "boldblocks_pattern_categories",
  );

  useEffect(() => {
    apiFetch({ path: "boldblocks/v1/getPatternCategories" }).then((res) => {
      setRegisteredCategories(res);
      setIsLoading(false);
    });
  }, []);

  return {
    registeredCategories,
    customCategories,
    setCustomCategories,
    isLoading: isLoading || isUndefined(customCategories),
  };
};

/**
 * Load all data
 *
 * @returns {Object}
 */
export const useImportExportData = () => {
  const [blocks, isLoadingBlocks, hasFinishedResolutionBlocks] =
    useContentType("boldblocks_block");
  const [variations, isLoadingVariations, hasFinishedResolutionVariations] =
    useContentType("boldblocks_variation");
  const [patterns, isLoadingPatterns, hasFinishedResolutionPatterns] =
    useContentType("boldblocks_pattern");

  const {
    registeredCategories,
    customCategories,
    setCustomCategories,
    isLoading: isLoadingPatternsCategories,
  } = usePatternCategories();

  return {
    blocks,
    isLoadingBlocks,
    hasFinishedResolutionBlocks,
    variations,
    isLoadingVariations,
    hasFinishedResolutionVariations,
    patterns,
    isLoadingPatterns,
    hasFinishedResolutionPatterns,
    registeredCategories,
    customCategories,
    setCustomCategories,
    isLoadingPatternsCategories,
    isLoading:
      isLoadingBlocks ||
      isLoadingVariations ||
      isLoadingPatterns ||
      isLoadingPatternsCategories,
  };
};

export const ToolsContext = createContext();
