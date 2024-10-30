/**
 * External dependencies
 */
import clsx from "clsx";
import { map, isUndefined, capitalize } from "lodash";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Spinner, Notice } from "@wordpress/components";
import { useState, useReducer, useMemo } from "@wordpress/element";
import { getBlockTypes } from "@wordpress/blocks";
import { useSelect, useDispatch } from "@wordpress/data";
import { useEntityRecords } from "@wordpress/core-data";

/**
 * Internal dependencies
 */
import { useLocalStorage } from "sdk/utils";
import { userCanManagePlugins } from "../utils/role-and-cap";
import { getEditPostURL } from "../utils/posts";
import { store as libraryDataStore } from "./store";
import {
  LibraryContext,
  sharedInitialState,
  libraryReducer,
  dispatchLibraryState,
  useLibraryContent,
  cachedLibraryStateKey,
  getLibraryURL,
  importData,
  getIsResolving,
  getHasFinishedResolution,
} from "./utils";

import { LibraryPageStyled } from "./components/styles";
import {
  LibraryHeader,
  TemplateGridControl,
  TemplateItemControl,
} from "./components";
import { shareLabels } from "../utils/shared-labels";

/**
 * The block library page
 */
const LibraryPage = ({ className, contentType }) => {
  const contentTypeCapital = capitalize(contentType);
  const getItemsName = `get${contentTypeCapital}s`;
  const loadFullItemsName = `loadFull${contentTypeCapital}s`;
  const getKeywordsName = `get${contentTypeCapital}Keywords`;
  const getLibraryStateName = `get${contentTypeCapital}LibraryState`;

  // State cache key
  const stateCacheKey = `${cachedLibraryStateKey}-${contentType}`;

  // Initial state
  const initialState = {
    ...sharedInitialState,
    importedItems: [],
    contentType,
  };

  const {
    [getItemsName]: getItems,
    [getKeywordsName]: getKeywords,
    [getLibraryStateName]: getLibraryState,
    getPlugins,
  } = useSelect((select) => select(libraryDataStore), []);

  // Query plugins data
  const canManagePlugins = userCanManagePlugins();

  let plugins = getPlugins();
  const isLoadingPlugins = getIsResolving("getPlugins");
  let isFinishedLoadingPlugins = getHasFinishedResolution("getPlugins");
  if (!isUndefined(canManagePlugins) && !canManagePlugins) {
    isFinishedLoadingPlugins = true;
  }

  // Query data
  const itemsData = getItems();
  const isLoadingItemsData = getIsResolving(getItemsName);
  const isFinishedLoadingItemsData = getHasFinishedResolution(getItemsName);

  // Query keywords
  const itemKeywords = getKeywords();
  const isLoadingKeywords = getIsResolving(getKeywordsName);

  // Page state
  const [savedLibraryState, setSavedLibraryState] =
    useLocalStorage(stateCacheKey);

  const [libraryState, dispatch] = useReducer(
    libraryReducer,
    initialState,
    () => {
      const libraryState = Object.assign(
        initialState,
        getLibraryState(),
        savedLibraryState ?? {},
      );

      // Clear cache
      setSavedLibraryState(null);

      return libraryState;
    },
  );

  const { currentPage = 1, pageSize = 6, importedItems } = libraryState;

  const updateLibraryState = (payload) =>
    dispatchLibraryState(dispatch, payload);

  const { [loadFullItemsName]: loadFullItems } = useDispatch(libraryDataStore);

  // Build data for grid
  const [fullItemsData, filteredFullItemsData] = useLibraryContent(
    libraryState,
    itemsData,
    loadFullItems,
  );

  // Get grid loading status
  const isLoadingGrid =
    isLoadingItemsData || isLoadingPlugins || isUndefined(canManagePlugins);
  const isFinishedLoadingGrid =
    isFinishedLoadingItemsData && isFinishedLoadingPlugins;

  // Query available block names
  const availableBlockTypes = getBlockTypes();
  const availableBlockNames = map(availableBlockTypes, "name");

  // Import handler
  const importItemHandler = ({
    contentType,
    item,
    isExisting,
    localBlocks,
    localVariations,
    setImportingMessages,
    setIsOpenConfirm,
  }) => {
    const existingItem = isExisting
      ? localBlocks.find(({ slug }) => slug === item?.slug)
      : false;

    // Import data
    importData({
      contentType,
      item,
      existingId: existingItem ? existingItem.id : false,
      localVariations,
      finishCallback: (messages) => {
        updateLibraryState({
          insertingItem: "",
          importedItems: [
            ...importedItems,
            ...messages.map(({ slug }) => slug),
          ],
        });
        setImportingMessages(messages);
        setIsOpenConfirm(false);
      },
    });

    // Submit download
    fetch(
      `${getLibraryURL(
        contentType,
      )}/wp-json/boldblocks/v1/submitDownload${contentTypeCapital}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: item.id }),
        credentials: "omit",
      },
    );
  };

  const { records: localBlocks, isResolving: isResolvingLocalBlocks } =
    useEntityRecords("postType", "boldblocks_block", {
      per_page: -1,
      _cbb_load_all: true,
    });

  const { records: localVariations, isResolving: isResolvingLocalVariations } =
    useEntityRecords("postType", "boldblocks_variation", {
      per_page: -1,
      _cbb_load_all: true,
    });

  const [importingMessages, setImportingMessages] = useState([]);

  // Memorized context value
  const contextValue = useMemo(() => {
    return {
      libraryState,
      stateCacheKey,
      updateLibraryState,
      availableBlockNames,
      plugins,
      canManagePlugins,
      onImportItem: importItemHandler,
      localBlocks,
      localVariations,
      isResolvingLocalData:
        isResolvingLocalBlocks || isResolvingLocalVariations,
      isFinishedLoadingItemsData,
      importingMessages,
      setImportingMessages,
      itemsData,
      filteredFullItemsData,
      itemKeywords,
      isLoadingKeywords,
      contentType,
    };
  }, [
    libraryState,
    stateCacheKey,
    updateLibraryState,
    availableBlockNames,
    plugins,
    canManagePlugins,
    importItemHandler,
    localBlocks,
    isResolvingLocalBlocks,
    localVariations,
    isResolvingLocalVariations,
    isFinishedLoadingItemsData,
    importingMessages,
    setImportingMessages,
    itemsData,
    filteredFullItemsData,
    itemKeywords,
    isLoadingKeywords,
    contentType,
  ]);

  return (
    <LibraryContext.Provider value={contextValue}>
      <LibraryPageStyled
        className={clsx("cbb-library", className, {
          "is-locked":
            libraryState?.installingPlugins?.length ||
            libraryState?.activatingPlugins?.length ||
            libraryState?.insertingItem ||
            libraryState?.isReloading,
        })}
      >
        {importingMessages && (
          <div className="cbb-library__notices">
            {importingMessages.map(({ type, message, slug, id }) => (
              <Notice
                key={slug}
                className="cbb-library-notice"
                status={type}
                isDismissible={true}
                onRemove={() =>
                  setImportingMessages([
                    ...importingMessages.filter((item) => item.slug !== slug),
                  ])
                }
                actions={
                  id
                    ? [
                        {
                          label: shareLabels.edit,
                          url: getEditPostURL(id),
                        },
                      ]
                    : []
                }
              >
                <span className="notice-message">{message}</span>
              </Notice>
            ))}
          </div>
        )}
        <LibraryHeader />
        {isLoadingGrid && <Spinner />}
        <div className="template-list-wrapper scrollbar">
          {isFinishedLoadingGrid && (
            <TemplateGridControl
              items={fullItemsData}
              allItems={filteredFullItemsData}
              onChangePage={(i) => {
                updateLibraryState({ currentPage: i });
              }}
              currentPage={currentPage}
              pageSize={pageSize}
              TemplateItemControl={TemplateItemControl}
            />
          )}
        </div>
      </LibraryPageStyled>
    </LibraryContext.Provider>
  );
};

export default LibraryPage;
