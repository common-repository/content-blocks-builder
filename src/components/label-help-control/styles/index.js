/**
 * External dependencies
 */
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

export const LabelHelpControlStyled = styled.div`
  margin-bottom: 8px !important;

  .label-help__header {
    display: flex;
    align-items: center;
    cursor: pointer;

    .label-control {
      margin-bottom: 0 !important;
    }

    .toggle-help {
      margin-left: auto;

      span {
        display: block;
        line-height: 1;
      }

      .close {
        display: none;
      }

      &.is-open {
        .help {
          display: none;
        }

        .close {
          display: block;
        }
      }
    }
  }

  .label-help__body {
    padding: 4px 8px;
    border: 1px solid #ddd;

    > * {
      margin-top: 0;
      margin-bottom: 8px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    ul {
      padding-left: 16px;
      margin-right: 0;
      margin-left: 0;
      list-style: disc;

      > li {
        margin-bottom: 2px;
      }
    }
  }

  &.at-top {
    .label-help__header {
      margin-top: 1em;
      margin-bottom: 8px;
    }
  }
`;
