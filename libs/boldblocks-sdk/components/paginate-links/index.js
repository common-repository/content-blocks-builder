/**
 * External dependencies
 */
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

const PaginateLinksStyled = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1rem 0 0;
  font-size: 1.5em;

  > li {
    margin-bottom: 0;

    > * {
      display: block;
      padding: 0.5rem;
    }

    > a {
      cursor: pointer;

      &:focus {
        box-shadow: none;
        outline: 1px solid transparent;
      }
      &:focus-visible {
        box-shadow: 0 0 0 1px #2271b1;
        outline: 1px solid transparent;
      }
    }
  }
`;

export const PaginateLinks = ({
  total,
  current = 1,
  midSize = 2,
  endSize = 1,
  onChange,
  showAll = false,
  nextPrev = true,
}) => {
  if (total < 2) {
    return null;
  }

  const links = [];
  let dots = false;

  if (nextPrev && current && current > 1) {
    links.push(
      <a
        className="pagination-link pagination-link--prev"
        onClick={() => onChange(current - 1)}
        onKeyDown={(e) => {
          e.key === "Enter" ? onChange(current - 1) : "";
        }}
        tabIndex={0}
      >
        {__("Prev")}
      </a>,
    );
  }

  for (let i = 1; i <= total; i++) {
    if (i === current) {
      links.push(
        <span aria-current="page" className="pagination-link is-active">
          {i}
        </span>,
      );

      dots = true;
    } else {
      if (
        showAll ||
        i <= endSize ||
        (i >= current - midSize && i <= current + midSize) ||
        i > total - endSize
      ) {
        links.push(
          <a
            className="pagination-link"
            onClick={() => onChange(i)}
            onKeyDown={(e) => {
              e.key === "Enter" ? onChange(i) : "";
            }}
            tabIndex={0}
          >
            {i}
          </a>,
        );

        dots = true;
      } else if (dots && !showAll) {
        links.push(<span className="pagination-link dots">&hellip;</span>);

        dots = false;
      }
    }
  }

  if (nextPrev && current && current < total) {
    links.push(
      <a
        className="pagination-link pagination-link--next"
        onClick={() => onChange(current + 1)}
        onKeyDown={(e) => {
          e.key === "Enter" ? onChange(current + 1) : "";
        }}
        tabIndex={0}
      >
        {__("Next")}
      </a>,
    );
  }

  return (
    <PaginateLinksStyled className="pagination-links">
      {links.map((link, index) => (
        <li key={index}>{link}</li>
      ))}
    </PaginateLinksStyled>
  );
};
