/**
 * External dependencies
 */
import clsx from "clsx";
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import { Button, ComboboxControl, FormTokenField } from "@wordpress/components";

/**
 * Internal dependencies
 */

// Fonts styled
const FontsStyled = styled.div`
  .fonts__actions {
    display: flex;
    gap: 8px;
    margin-top: 12px;
  }

  &.is-fullview {
    margin-top: 12px;

    .fonts__headings-body {
      display: grid;
      gap: 12px;

      .font__actions {
        margin-bottom: 0;
      }

      @media (min-width: 960px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));

        .font {
          display: flex;
          flex-direction: column;
        }

        .font__item {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .font__preview {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .font__preview__text {
          flex-grow: 1;
        }

        .font__family__value {
          height: 36px;
        }

        .font__variants__value {
          height: 40px;
        }

        .font__actions {
          margin-top: auto;
        }
      }
    }
  }
`;

// Font styled
const FontStyled = styled.div`
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
  .components-combobox-control__suggestions-container,
  .components-form-token-field__input-container {
    width: auto;
  }

  label:empty {
    display: none;
  }

  h3 {
    margin-top: 16px;
    margin-bottom: 0.25em;
    font-size: 1.25em;
    text-transform: none;
  }

  .font {
    &__item {
      > * {
        margin-top: 0;
        margin-bottom: 8px;

        > * {
          margin-bottom: 4px;
        }
      }
    }

    &__label {
      padding-bottom: 4px;
      margin-top: 10;
      margin-bottom: 10px;
      border-bottom: 1px solid #ddd;
    }

    &__item__value {
      padding: 8px;
      border: 1px solid #ddd;
    }

    &__preview {
      &__text {
        font-size: 16px;
        line-height: 1.5;
      }
    }

    // Variants
    &__variants__edit {
      p {
        margin: 0;
      }
    }

    // Actions
    &__actions {
      display: flex;
      gap: 8px;
      margin: 10px 0;
    }
  }

  &.is-fullview {
    padding: 10px;
    border: 1px solid #ddd;

    .font__label {
      margin-top: 0;
    }
  }
`;

/**
 * Display font
 *
 * @param {Object}
 */
const FontControl = ({
  label,
  editLabel = __("Edit font", "content-blocks-builder"),
  value,
  allFontFamilies,
  text,
  isInSidebar = false,
  style = {},
  isEditable,
  onChange,
}) => {
  const { fontFamily, fontVariants = [], allFontVariants = [] } = value;
  const [isEdit, setIsEdit] = useState(false);

  return (
    <FontStyled
      className={clsx("font", {
        "is-edit": isEdit,
        "is-view": !isEdit,
        "is-fullview": !isInSidebar,
      })}
    >
      <h3 className="font__label">
        <strong>{label}</strong>
      </h3>
      <div className="font__item">
        <div className="font__family">
          <div className="font__item__label font__family__label">
            {__("Family:", "content-blocks-builder")}
          </div>
          {!isEdit ? (
            <div
              className="font__item__value font__family__value"
              style={{ ...style, fontFamily }}
            >
              {fontFamily}
            </div>
          ) : (
            <div className="font__family__edit">
              <ComboboxControl
                value={fontFamily}
                options={allFontFamilies}
                onChange={(fontFamily) => {
                  onChange({ ...value, fontFamily });
                }}
              />
            </div>
          )}
        </div>
        <div className="font__variants">
          <div className="font__item__label font__variants__label">
            {__("Variants:", "content-blocks-builder")}
          </div>
          {!isEdit ? (
            <div className="font__item__value font__variants__value">
              {!!fontVariants.length
                ? fontVariants.map((variant, index) => (
                    <span className="font__variant" key={variant}>
                      {variant}
                      {index < fontVariants.length - 1 ? ", " : ""}
                    </span>
                  ))
                : !!allFontVariants.length &&
                  allFontVariants.map((variant, index) => (
                    <span className="font__variant" key={variant}>
                      {variant}
                      {index < allFontVariants.length - 1 ? ", " : ""}
                    </span>
                  ))}
            </div>
          ) : (
            <div className="font__variants__edit">
              <FormTokenField
                label=""
                value={fontVariants}
                suggestions={allFontVariants}
                onChange={(fontVariants) => {
                  onChange({ ...value, fontVariants });
                }}
                placeholder={__(
                  "Choose variants to load",
                  "content-blocks-builder",
                )}
                __experimentalExpandOnFocus={true}
                __experimentalShowHowTo={false}
              />
              <p>
                {__(
                  "Leave it blank to load all available variants: ",
                  "content-blocks-builder",
                )}
                {!!allFontVariants.length &&
                  allFontVariants.map((variant, index) => (
                    <span className="font__variant" key={variant}>
                      {variant}
                      {index < allFontVariants.length - 1 ? ", " : ""}
                    </span>
                  ))}
              </p>
            </div>
          )}
        </div>
        <div className="font__preview">
          <div className="font__item__label font__preview__label">
            {__("Font preview:", "content-blocks-builder")}
          </div>
          <div
            className="font__item__value font__preview__text"
            style={{ ...style, fontFamily }}
          >
            {text}
          </div>
        </div>
      </div>
      {isEditable && (
        <div className="font__actions">
          {!isEdit && (
            <Button
              variant="primary"
              size="small"
              onClick={() => {
                setIsEdit(true);
              }}
            >
              {editLabel}
            </Button>
          )}
          {isEdit && (
            <>
              <Button
                variant="primary"
                size="small"
                onClick={() => {
                  setIsEdit(false);
                }}
              >
                {__("Back to preview", "content-blocks-builder")}
              </Button>
            </>
          )}
        </div>
      )}
    </FontStyled>
  );
};

/**
 * Display fonts
 *
 * @param {Object}
 */
export const FontsControl = ({
  value,
  allFontFamilies,
  onChange,
  onReset,
  isInSidebar = false,
  isEditable,
  isFontsChanged,
}) => {
  const { headings, body } = value;
  return (
    <FontsStyled className={clsx("fonts", { "is-fullview": !isInSidebar })}>
      <div className="fonts__headings-body">
        <FontControl
          label={__("Headings font", "content-blocks-builder")}
          editLabel={__("Edit headings font", "content-blocks-builder")}
          value={headings}
          onChange={(headings) => {
            onChange({ ...value, headings });
          }}
          allFontFamilies={allFontFamilies}
          style={{ fontWeight: "bold", fontSize: "1.25rem" }}
          text={"The spectacle before us was indeed sublime."}
          isInSidebar={isInSidebar}
          isEditable={isEditable}
        />
        <FontControl
          label={__("Body font", "content-blocks-builder")}
          editLabel={__("Edit body font", "content-blocks-builder")}
          value={body}
          onChange={(body) => {
            onChange({ ...value, body });
          }}
          allFontFamilies={allFontFamilies}
          style={{ fontSize: "1rem" }}
          text={
            "By the same illusion which lifts the horizon of the sea to the level of the spectator on a hillside, the sable cloud beneath was dished out, and the car seemed to float in the middle of an immense dark sphere, whose upper half was strewn with silver."
          }
          isInSidebar={isInSidebar}
          isEditable={isEditable}
        />
      </div>
      <div className="fonts__others"></div>
      {isEditable && (
        <div className="fonts__actions">
          <Button
            variant="primary"
            onClick={() => {
              const originalValue = { ...value };
              onChange({
                ...originalValue,
                headings: originalValue.body,
                body: originalValue.headings,
              });
            }}
          >
            {__("Swap fonts", "content-blocks-builder")}
          </Button>
          {isFontsChanged && (
            <Button variant="secondary" onClick={onReset}>
              {__("Reset fonts", "content-blocks-builder")}
            </Button>
          )}
        </div>
      )}
    </FontsStyled>
  );
};
