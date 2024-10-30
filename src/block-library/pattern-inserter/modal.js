/**
 * External dependencies
 */
import clsx from "clsx";
import { map, isUndefined, capitalize, noop } from "lodash";
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Modal, Spinner } from "@wordpress/components";
import { useReducer, useMemo } from "@wordpress/element";
import { getBlockTypes } from "@wordpress/blocks";
import { useSelect, useDispatch } from "@wordpress/data";
import { useEntityRecords } from "@wordpress/core-data";

/**
 * Internal dependencies
 */
import { useLocalStorage } from "sdk/utils";
import { userCanManagePlugins } from "../../utils/role-and-cap";
import { useInsertionPoint } from "./utils";
import { store as libraryDataStore } from "../store";
import {
  LibraryContext,
  sharedInitialState,
  libraryReducer,
  dispatchLibraryState,
  useLibraryContent,
  cachedLibraryStateKey,
  getLibraryURL,
  getIsResolving,
  getHasFinishedResolution,
} from "../utils";
import { LibraryPageStyled } from "../components/styles/library-page";
import { LibraryHeader, TemplateGridControl } from "../components";
import { TemplateItemControl } from "./template-item-control";

// Modal styled
export const ModalStyled = styled(Modal)`
  .components-modal__content {
    display: flex;
    padding: 1rem;
    background-color: #f9f9f9;

    > div {
      width: 100%;
    }
  }

  .cbb-library {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 100%;
  }

  &.is-locked {
    pointer-events: none;
  }
`;

/**
 * The pattern inserter modal
 */
export function TemplatesModal({
  isModalOpen = false,
  setIsModalOpen,
  onCancel = noop,
  className,
}) {
  const contentType = "pattern";
  const contentTypeCapital = capitalize(contentType);
  const getItemsName = `get${contentTypeCapital}s`;
  const loadFullItemsName = `loadFull${contentTypeCapital}s`;
  const getKeywordsName = `get${contentTypeCapital}Keywords`;
  const getLibraryStateName = `get${contentTypeCapital}LibraryState`;
  const setLibraryStateName = `set${contentTypeCapital}LibraryState`;

  // State cache key
  const stateCacheKey = `${cachedLibraryStateKey}-${contentType}`;

  // Initial state
  const initialState = {
    ...sharedInitialState,
    contentType,
  };

  const {
    [getItemsName]: getItems,
    [getKeywordsName]: getKeywords,
    [getLibraryStateName]: getLibraryState,
    getPlugins,
  } = useSelect((select) => select(libraryDataStore), []);

  const { [setLibraryStateName]: setLibraryState } =
    useDispatch(libraryDataStore);

  // Handle modal close event.
  const closeModal = () => {
    setIsModalOpen(false);

    // Save state to the store
    setLibraryState({ ...libraryState, insertingItem: "" });

    onCancel();
  };

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

  const { currentPage = 1, pageSize = 6 } = libraryState;

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

  // Insert handler
  const [, onInsertPattern] = useInsertionPoint({ shouldFocusBlock: true });
  const insertPatternHandler = (item, blocks) => {
    onInsertPattern(item, blocks);

    updateLibraryState({ insertingItem: "" });

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

    closeModal();
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

  // Memorized context value
  const contextValue = useMemo(() => {
    return {
      libraryState,
      stateCacheKey,
      updateLibraryState,
      availableBlockNames,
      plugins,
      canManagePlugins,
      onInsertPattern: insertPatternHandler,
      localBlocks,
      localVariations,
      isResolvingLocalData:
        isResolvingLocalBlocks || isResolvingLocalVariations,
      isFinishedLoadingItemsData,
      itemsData,
      filteredFullItemsData,
      itemKeywords,
      isLoadingKeywords,
      closeModal,
      isModalOpen,
      contentType,
    };
  }, [
    libraryState,
    stateCacheKey,
    updateLibraryState,
    availableBlockNames,
    plugins,
    canManagePlugins,
    insertPatternHandler,
    localBlocks,
    isResolvingLocalBlocks,
    localVariations,
    isResolvingLocalVariations,
    isFinishedLoadingItemsData,
    itemsData,
    filteredFullItemsData,
    itemKeywords,
    isLoadingKeywords,
    closeModal,
    isModalOpen,
    contentType,
  ]);

  return (
    <LibraryContext.Provider value={contextValue}>
      <ModalStyled
        onRequestClose={() => closeModal()}
        className={clsx("template-modal", className, {
          "is-locked":
            libraryState?.installingPlugins?.length ||
            libraryState?.activatingPlugins?.length ||
            libraryState?.insertingItem ||
            libraryState?.isReloading,
        })}
        isFullScreen
        __experimentalHideHeader={true}
      >
        <LibraryPageStyled className="cbb-library">
          <LibraryHeader />
          {isLoadingGrid && <Spinner />}
          <div className="template-list-wrapper scrollbar">
            {isFinishedLoadingGrid && (
              <>
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
              </>
            )}
          </div>
        </LibraryPageStyled>
      </ModalStyled>
    </LibraryContext.Provider>
  );
}
