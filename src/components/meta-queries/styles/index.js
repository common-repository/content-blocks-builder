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

export const MetaQueryControlStyled = styled(GroupControl)`
  .group-control__body > div:nth-of-type(1),
  .group-control__body > div:nth-of-type(2) {
    flex-basis: calc(50% - 2px);
  }
`;
