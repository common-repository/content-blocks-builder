/**
 * External dependencies
 */
import styled from "@emotion/styled";

/**
 * Internal dependencies
 */
import { ToggleGroupControl } from "sdk/components";

export const ToggleGroupStyled = styled(ToggleGroupControl)`
  &.is-modal-position .components-button-group {
    > * {
      width: 33.3333%;
      margin-top: -1px;
      margin-left: -1px;
      white-space: nowrap;
      overflow: hidden;
    }
  }
`;
