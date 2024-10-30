/**
 * External dependencies
 */
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */
import { RadioControl } from "@wordpress/components";

export const HorizontalRadioControl = styled(RadioControl)`
  .components-flex {
    flex-direction: row;
    justify-content: flex-start;
    gap: 8px;
  }
`;
