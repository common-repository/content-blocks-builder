/**
 * External dependencies
 */
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */

// Page wrapper
export const LibraryPageStyled = styled.div`
  .scrollbar {
    overflow: auto;

    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }

    &::-webkit-scrollbar-thumb,
    &::-webkit-scrollbar-track {
      border-radius: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #b9b9b9;
    }

    &::-webkit-scrollbar-track {
      background-color: #e2e2e2;
    }
  }

  // Header notices
  .cbb-library__notices {
    .cbb-library-notice {
      margin: 0 0 10px 0;
      padding-right: 10px;
    }

    .components-notice__content {
      display: flex;
      flex-wrap: wrap;
    }

    .notice-message {
      margin-right: 12px;
    }

    .components-notice__actions {
      gap: 12px;

      > .components-notice__action {
        margin-left: 0 !important;
      }
    }
  }

  .template-list-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    max-height: 100%;
    margin-bottom: 0;
    overflow: auto;

    .pagination-links {
      padding-top: 0.5rem;
      margin: auto 0 0;
    }
  }

  .template-list-not-found {
    padding: 0.5rem;
    background-color: #fff;
    border: 1px solid #ddd;
  }

  &.is-locked {
    pointer-events: none;
  }

  &.is-library-page {
    margin-top: 20px;
  }
`;
