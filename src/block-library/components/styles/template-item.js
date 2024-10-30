/**
 * External dependencies
 */
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */

export const TemplateItemStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #fff;
  border: 1px solid #ddd;
  transition: border-color 0.15s ease-in-out;

  .components-spinner {
    position: absolute;
    margin: 10px;
  }

  // The item preview
  .template-item__preview {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    min-height: 10rem;
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;

    .template-item__thumbnail {
      max-height: 18rem;
      min-height: 11rem;
      margin: 0 0.5rem;

      img {
        width: 100%;
      }
    }
  }

  // Notices on the preview
  .item-notices {
    position: absolute;
    bottom: 0;
    left: 0;

    .item-notice {
      width: 100%;
      padding: 4px 10px;
      margin: 0;
    }

    .components-notice__actions {
      gap: 8px;

      > .components-notice__action {
        margin: 4px 0 0 !important;
      }
    }
  }

  // Pro badges
  .template-item__badges {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;

    > * {
      display: inline-block;
      padding: 3px 6px;
      color: #fff;
      background-color: var(--wp-admin-theme-color, #007cba);
      border-radius: 2px;

      + * {
        margin-left: 4px;
      }
    }
  }

  // Footer
  .template-item__footer {
    padding: 12px !important;
    overflow: auto;
    background-color: #f0f0f0;
    border-top: 1px solid #ddd;

    > * {
      margin: 0 0 0.5rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  // Wrapper of title(s)
  .template-item__title-wrapper {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 4px !important;

    .template-item__title {
      width: 100%;
      margin-top: 0;
      margin-bottom: 4px !important;
      overflow: hidden;
      font-size: 1rem;
      line-height: 1.4;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    // With view details link
    &.is-pattern-title {
      align-items: center;
      .template-item__title {
        max-width: calc(100% - 80px);
      }

      .template-item__details {
        margin-left: auto;
      }
    }
  }

  // Make long description scrollable
  .template-item__description {
    max-height: 90px;
  }

  // Tutorials, resource links
  .template-item__links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem 0.5rem;
    width: 100%;
    margin: 0;

    li {
      margin-bottom: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .template-item__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;

    > *:not(button) {
      flex-basis: 100%;
    }
  }

  // Ready
  &.is-ready {
    .template-item__preview {
      cursor: pointer;

      &:focus {
        border: 1px solid var(--wp-admin-theme-color, #007cba);
      }
    }

    &:hover {
      border-color: var(--wp-admin-theme-color, #007cba);
    }
  }

  // Is inserting
  &.is-inserting {
    .template-item__preview {
      opacity: 0.6;
    }

    .components-spinner {
      top: calc(50% - 16px);
      left: calc(50% - 16px);
    }
  }

  // Has missing blocks
  &.has-missing-blocks {
    .template-item__preview {
      padding: 1.25rem;
    }
  }
`;
