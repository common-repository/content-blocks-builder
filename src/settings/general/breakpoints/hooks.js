/**
 * External dependencies
 */
import { isUndefined, isEmpty } from "lodash";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { Button, Spinner, TextControl, Notice } from "@wordpress/components";
import { useState } from "@wordpress/element";

/**
 * Internal depencencies
 */
import { shareLabels } from "../../../utils/shared-labels";

const PatternCategoryControl = ({
  value,
  onChange,
  onDelete,
  validateData,
  isEdit = false,
}) => {
  const [tempValue, setTempValue] = useState(value);
  const { name, label } = tempValue;
  const [message, setMessage] = useState("");

  const [editMode, setEditMode] = useState(
    isEdit || isEmpty(name) || isEmpty(label),
  );
  return (
    <>
      {editMode ? (
        <>
          <TextControl
            placeholder={shareLabels.name}
            value={name}
            onChange={(next) => {
              setTempValue({ ...tempValue, name: next });
            }}
            className="category__name"
          />
          <TextControl
            placeholder={shareLabels.label}
            value={label}
            onChange={(next) => {
              setTempValue({ ...tempValue, label: next });
            }}
            className="category__label"
          />
          <div className="fieldset__item__actions">
            <Button
              size="small"
              variant="secondary"
              onClick={() => {
                const isValidData = validateData(tempValue);
                if (isValidData?.type === "success") {
                  const { name, label } = tempValue;
                  onChange({ name: name.trim(), label: label.trim() });
                  setEditMode(false);
                } else {
                  setMessage(isValidData?.message);
                }
              }}
            >
              {shareLabels.save}
            </Button>
            {value?.name && value?.label && (
              <Button
                size="small"
                variant="secondary"
                onClick={() => {
                  setTempValue(value);
                  setEditMode(false);
                }}
              >
                {shareLabels.cancel}
              </Button>
            )}
            <Button
              size="small"
              variant="secondary"
              isDestructive
              onClick={() => {
                onDelete();
              }}
            >
              {shareLabels.delete}
            </Button>
          </div>
          {message && (
            <Notice className="message" status="error" isDismissible={false}>
              {message}
            </Notice>
          )}
        </>
      ) : (
        <>
          <code>{name}</code>
          <span>{" - "}</span>
          <span>{label}</span>
          <div className="fieldset__item__actions">
            <Button
              size="small"
              variant="secondary"
              onClick={() => {
                setEditMode(true);
              }}
            >
              {shareLabels.edit}
            </Button>
            <Button
              size="small"
              variant="secondary"
              isDestructive
              onClick={() => {
                onDelete();
              }}
            >
              {shareLabels.delete}
            </Button>
          </div>
        </>
      )}
    </>
  );
};

/**
 * Render custom categories management
 */
addFilter(
  "boldblocks.settings.patternCategories",
  "boldblocks/premium",
  (
    content,
    {
      Fieldset,
      CategoryList,
      customCategories,
      setCustomCategories,
      registeredCategories,
    },
  ) => {
    const validateData = (value) => {
      let { name, label } = value ?? {};
      name = name.trim();
      label = label.trim();
      if (!name || !label) {
        return {
          type: "error",
          message: __(
            "Both name and label are required!",
            "content-blocks-builder",
          ),
        };
      }

      const foundItem = registeredCategories.find(
        ({ name: itemName, label: itemLabel }) =>
          itemName === name || itemLabel === label,
      );

      if (foundItem) {
        return {
          type: "error",
          message: __(
            "Name and label should not be in the list of already registered categories.",
            "content-blocks-builder",
          ),
        };
      }

      return { type: "success" };
    };

    return (
      <>
        <Fieldset className="fieldset">
          <div className="fieldset__label">
            <strong>
              {__("Manage custom categories", "content-blocks-builder")}
            </strong>
            <p>
              {__(
                "Click the 'Update Settings' button to save data to the database.",
                "content-blocks-builder",
              )}
            </p>
          </div>
          <CategoryList className="category__list">
            {isUndefined(customCategories) && <Spinner />}
            {customCategories &&
              customCategories.length > 0 &&
              customCategories.map((item, index) => (
                <li key={item?.name}>
                  <PatternCategoryControl
                    value={item}
                    validateData={validateData}
                    onChange={(value) => {
                      const newCategories = [...customCategories];
                      newCategories[index] = value;
                      setCustomCategories(newCategories);
                    }}
                    onDelete={() => {
                      const newCategories = [...customCategories];
                      newCategories.splice(index, 1);
                      setCustomCategories(newCategories);
                    }}
                  />
                </li>
              ))}
          </CategoryList>
          {customCategories && (
            <Button
              variant="primary"
              size="small"
              onClick={() => {
                setCustomCategories([
                  ...customCategories,
                  { name: "", label: "" },
                ]);
              }}
            >
              {__("Add category", "content-blocks-builder")}
            </Button>
          )}
        </Fieldset>
      </>
    );
  },
);
