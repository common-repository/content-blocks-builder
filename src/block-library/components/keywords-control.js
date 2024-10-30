/**
 * External dependencies
 */
import clsx from "clsx";
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { settings } from "@wordpress/icons";
import { Spinner, Icon } from "@wordpress/components";

/**
 * Internal dependencies
 */

export const KeywordsControlStyled = styled.div`
  .keywords-filter__label {
    display: flex;
    margin-right: 0.5em;
    font-weight: 500;

    svg {
      margin-right: 5px;
    }
  }

  .keywords-filter__clear {
    font-size: 14px;
    font-weight: 700;
  }

  ul {
    display: inline-flex;
    flex-wrap: wrap;
    margin: 0;

    li {
      margin: 0;

      span {
        display: inline-block;
        padding-top: 0.2em;
        padding-bottom: 0.2em;
        margin-right: 0.3em;
      }

      .keyword {
        cursor: pointer;
      }

      .keyword:not(.is-selected) {
        color: var(--wp-admin-theme-color, #007cba);
      }

      .is-selected {
        font-weight: 500;
      }

      .clear-filter {
        margin-right: 0;
        margin-left: 0.5em;
        text-decoration: underline;
      }
    }
  }
`;

/**
 * Sort type toolbar
 *
 * @param {Object} props
 * @returns
 */
export function KeywordsControl({
  items = [],
  keywords,
  isLoading,
  selectedKeywords,
  onChange,
}) {
  let filteredKeywords;
  if (items.length) {
    const allFilteredKeywords = [];
    items.forEach(({ keywordIds }) => {
      allFilteredKeywords.push(...keywordIds);
    });

    const uniquefilteredKeywords = [...new Set(allFilteredKeywords)];
    filteredKeywords = keywords.filter(({ id }) =>
      uniquefilteredKeywords.includes(id),
    );
  } else {
    filteredKeywords = keywords;
  }

  const onToggleKeyword = (keyword) => {
    let newKeywords = [];
    if (!selectedKeywords.length) {
      newKeywords.push(keyword);
    } else {
      newKeywords = [...selectedKeywords];
      const newIdIndex = selectedKeywords.findIndex(
        ({ id }) => id === keyword.id,
      );
      if (newIdIndex > -1) {
        newKeywords.splice(newIdIndex, 1);
      } else {
        newKeywords.push(keyword);
      }

      newKeywords.sort((a, b) => a.count - b.count);
    }

    onChange(newKeywords);
  };

  return (
    <KeywordsControlStyled
      className={clsx("keywords-filter", {
        "has-keywords": filteredKeywords && !!filteredKeywords.length,
      })}
    >
      {isLoading && <Spinner />}
      {filteredKeywords && !!filteredKeywords.length && (
        <div className="keywords-filter__keywords">
          <ul className="">
            <li className="keywords-filter__label">
              <Icon icon={settings} />
              <span className="">
                {__(" Keywords:", "content-blocks-builder")}
              </span>
            </li>
            {filteredKeywords.map((keyword, index) => (
              <li
                key={index}
                onClick={() => onToggleKeyword(keyword)}
                onKeyDown={(e) => {
                  e.key === "Enter" ? onToggleKeyword(keyword) : "";
                }}
                tabIndex={0}
              >
                <span
                  className={clsx("keyword", {
                    ["is-selected"]:
                      selectedKeywords.findIndex(
                        ({ id }) => id === keyword.id,
                      ) > -1,
                  })}
                >
                  {keyword.name}
                  {index !== filteredKeywords.length - 1 ? "," : ""}
                </span>
              </li>
            ))}
            {!!selectedKeywords.length && (
              <li
                className="keywords-filter__clear"
                onClick={() => {
                  onChange([]);
                }}
                onKeyDown={(e) => {
                  e.key === "Enter" ? onChange([]) : "";
                }}
                tabIndex={0}
              >
                <span
                  className="keyword clear-filter"
                  title={__(
                    "Clear filtered keywords",
                    "content-blocks-builder",
                  )}
                >
                  {__("Clear all", "content-blocks-builder")}
                </span>
              </li>
            )}
          </ul>
        </div>
      )}
    </KeywordsControlStyled>
  );
}
