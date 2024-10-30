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
import { GroupControl } from "sdk/components";

export const AttributesControlStyled = styled(GroupControl)`
  > .group-control__body {
    align-items: flex-start;
  }

  .block-editor-panel-color-gradient-settings,
  .components-toggle-control {
    width: 100%;
  }

  .attribute-value-control {
    width: 100%;

    > * {
      margin-bottom: 0;

      > * {
        margin-bottom: 0;
      }
    }

    .readonly-value {
      word-break: break-all;
    }
  }

  .attribute-readonly-control {
    margin-top: 8px !important;
    margin-bottom: 8px !important;
  }

  .attribute-help {
    margin-bottom: 8px !important;
    font-style: italic;
  }

  .field-details,
  .field-details > span {
    display: block;
    margin-top: 4px;
  }

  .field-details {
    margin-top: 8px !important;
  }
`;

export const BlockAttributesStyled = styled.div`
  margin-bottom: 12px;

  .group-control__body {
    align-items: flex-start;
  }

  .block-custom-attributes {
    padding: 6px 12px 2px;
    border: 1px solid #ddd;
  }

  .components-toggle-control {
    margin-top: 12px;
  }

  .button-add-item {
    margin-top: 8px;
  }
`;
