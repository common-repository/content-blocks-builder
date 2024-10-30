/**
 * External dependencies
 */
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */

export const TemplateGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;

  @media (min-width: 782px) {
    // $break-medium
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1280px) {
    // $break-wide
    grid-template-columns: repeat(3, 1fr);
  }
`;
