/**
 * External dependencies
 */
import clsx from "clsx";
import { debounce } from "lodash";
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { SearchControl, Notice } from "@wordpress/components";
import { useContext, useRef, useEffect } from "@wordpress/element";

/**
 * Internal dependencies
 */
import { LibraryContext } from "../utils";
import {
  HeaderActionsControl,
  SortControl,
  KeywordsControl,
} from "../components";

const SearchControlStyled = styled(SearchControl)`
  > * {
    margin-bottom: 0;
  }
`;

const LibraryHeaderStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;

  .is-library-page > & {
    padding: 6px 8px;
    background-color: #fff;
    border: 1px solid #ddd;
  }

  .search-box {
    flex-grow: 1;

    > * {
      margin-bottom: 0;
    }
  }

  .keywords-filter {
    flex: 1 0 100%;
    order: 2;
    align-self: center;
  }

  .template-header__actions {
    margin-left: auto;
  }

  // $break-wide
  @media (min-width: 1280px) {
    // Force the header in one line.
    flex-wrap: nowrap;

    // Don't shink search ans sort
    .search-box,
    .sort-box {
      flex: 0 0 auto;
    }

    .search-box {
      width: 320px;
    }

    // Grow and shink filter
    .keywords-filter {
      flex: 1 1 auto;
      order: 0;
    }
  }
`;

const HeaderHelpStyled = styled(Notice)`
  margin: auto 0 1rem;
  font-size: 1.2em;

  p {
    margin: 0;
  }
`;

/**
 * The header of the library page/modal
 * @returns Component
 */
export const LibraryHeader = ({ className }) => {
  const {
    libraryState,
    updateLibraryState,
    itemsData,
    filteredFullItemsData,
    itemKeywords,
    isLoadingKeywords,
    isFinishedLoadingItemsData,
    closeModal = null,
    isModalOpen,
    contentType,
  } = useContext(LibraryContext);

  const { searchTerm, sortType, selectedKeywords, isOpenHelp } = libraryState;

  // Search
  const debounceSearch = debounce((searchTerm) => {
    if (searchTerm.length >= 3) {
      updateLibraryState({ searchTerm, currentPage: 1 });
    } else {
      updateLibraryState({ searchTerm });
    }
  }, 500);

  // Focus on search box
  const searchRef = useRef(null);
  useEffect(() => {
    if (isFinishedLoadingItemsData) {
      searchRef.current && searchRef.current.focus();
    }
  }, [isModalOpen, isFinishedLoadingItemsData]);
  return (
    <>
      <LibraryHeaderStyled className={clsx("template-header", className)}>
        <SearchControlStyled
          className="search-box"
          label={__("Search...", "content-blocks-builder")}
          value={searchTerm}
          onChange={debounceSearch}
          ref={searchRef}
        />
        <SortControl
          onChange={(value) => {
            updateLibraryState({
              sortType: value,
              currentPage: 1,
            });
          }}
          value={sortType}
        />
        <KeywordsControl
          items={
            filteredFullItemsData.length !== itemsData.length
              ? filteredFullItemsData
              : []
          }
          keywords={itemKeywords}
          isLoading={isLoadingKeywords}
          selectedKeywords={selectedKeywords}
          onChange={(newKeywords) => {
            updateLibraryState({
              selectedKeywords: newKeywords,
              currentPage: 1,
            });
          }}
        />
        <HeaderActionsControl
          isOpenHelp={isOpenHelp}
          onToggleHelp={() => {
            updateLibraryState({ isOpenHelp: !isOpenHelp });
          }}
          onCloseModal={closeModal}
        />
      </LibraryHeaderStyled>
      {isOpenHelp && (
        <HeaderHelpStyled
          status="info"
          className="library__help"
          isDismissible={false}
        >
          <p>
            <strong>
              {contentType === "pattern"
                ? __(
                    "Click on the preview to insert.",
                    "content-blocks-builder",
                  )
                : __(
                    "Click on the preview to import.",
                    "content-blocks-builder",
                  )}
            </strong>
          </p>
          <p>
            {__(
              "Items with Pro features like parallax, animations... require the Pro version to work full-functional. They will still work perfectly fine on the Free version but without Pro features.",
              "content-blocks-builder",
            )}
          </p>
          <p>
            {__(
              "Some items require additional blocks, variations from the library. These dependent blocks or variations must be imported first in order to use these items.",
              "content-blocks-builder",
            )}
          </p>
          <p>
            {__(
              "Some items require blocks in external plugins. You have to install and activate those required plugins to use these items. All external plugins are developed and maintained by us, so they are safe to use.",
              "content-blocks-builder",
            )}
          </p>
        </HeaderHelpStyled>
      )}
    </>
  );
};
