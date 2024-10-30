/**
 * External dependencies
 */
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */

export const GroupSettingWrapper = styled.div`
  padding: 12px 12px 0;
  margin: 0 -8px 24px;
  border: 1px solid #ddd;

  > * {
    margin-top: 0 !important;
    margin-bottom: 12px !important;

    .components-range-control__number {
      margin-bottom: 0 !important;
    }
  }

  .block-editor-panel-color-gradient-settings {
    margin-top: 12px;
    margin-bottom: 12px;
  }
`;
