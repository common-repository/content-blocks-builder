/**
 * External dependencies
 */
import clsx from "clsx";
import styled from "@emotion/styled";
import { noop } from "lodash";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */

// Font presets styled
const FontsPresetStyled = styled.div`
  /*
  $break-huge: 1440px;
  $break-wide: 1280px;
  $break-xlarge: 1080px;
  $break-large: 960px;	// admin sidebar auto folds
  $break-medium: 782px;	// adminbar goes big
  $break-small: 600px;
  $break-mobile: 480px;
  $break-zoomed-in: 280px;
  */

  margin-top: 12px;

  .font-pair {
    position: relative;
    height: 100%;
    padding: 0.5rem;
    font-size: 1.25rem;
    line-height: 1.5;
    cursor: pointer;
    border: 1px solid #ddd;
    border-radius: 3px;
    box-sizing: border-box;

    &:hover {
      border: 1px solid #000;
    }

    &.is-active {
      border: 1px solid #000;
      box-shadow: 0 0 5px #000;
    }

    .button-remove {
      position: absolute;
      top: 0;
      right: 0;
      color: #ddd;
    }

    &:hover {
      .button-remove {
        color: #000;
      }
    }
  }

  h3 {
    margin-top: 0;
    margin-bottom: 0.25em;
    font-size: 1.25em;
    text-transform: none;
  }

  // Fonts presets
  .fonts-presets__list {
    margin: 0 -0.25rem;
    height: 260px;
    overflow-y: auto;

    > * {
      padding: 0.25rem;
      box-sizing: border-box;
    }
  }

  // Grid style
  &.is-grid {
    .fonts-presets__list {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -0.25rem;

      > * {
        flex: 0 0 100%;
        padding: 0.25rem;
        box-sizing: border-box;

        @media (min-width: 600px) {
          flex: 0 0 50%;
        }

        @media (min-width: 960px) {
          flex: 0 0 percentage(1 / 3);
        }
        @media (min-width: 1280px) {
          flex: 0 0 20%;
        }
      }
    }
  }
`;

/**
 * Display preset fonts
 *
 * @param {Object}
 */
export const FontsPresetsControl = ({
  presets = [],
  onChange = noop,
  isGrid = false,
}) => {
  return (
    <FontsPresetStyled
      className={clsx("fonts-presets", {
        "is-grid": isGrid,
      })}
    >
      <h3 className="fonts-presets__label">
        <strong>
          {__("Choose a predefined combination:", "content-blocks-builder")}
        </strong>
      </h3>
      <div className="fonts-presets__list">
        {presets.map((pairFont, index) => (
          <div
            className="fonts-preset"
            key={index}
            onClick={() => {
              onChange(pairFont);
            }}
          >
            <div
              className={clsx("font-pair", {
                "is-active": pairFont?.isActive,
              })}
            >
              <div
                className="font-pair__body"
                style={{ fontFamily: pairFont?.body?.fontFamily }}
              >
                {pairFont?.body?.fontFamily}
              </div>
              <div
                className="font-pair__headings"
                style={{
                  fontFamily: pairFont?.headings?.fontFamily,
                  fontWeight: "bold",
                }}
              >
                {pairFont?.headings?.fontFamily}
              </div>
            </div>
          </div>
        ))}
      </div>
    </FontsPresetStyled>
  );
};
