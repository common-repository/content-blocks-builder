/**
 * External dependencies
 */
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import { useState, useEffect, useContext } from "@wordpress/element";
import { Spinner, TextControl, Button, Notice } from "@wordpress/components";
import { useEntityProp, store as coreStore } from "@wordpress/core-data";
import { useDispatch } from "@wordpress/data";
import { applyFilters } from "@wordpress/hooks";

/**
 * Internal dependencies
 */
import { Widget, Fieldset } from "sdk/components";
import { DataContext } from "../../data";
import "./hooks";

const CategoryList = styled.ul`
  li {
    display: flex;
    align-items: center;
    align-self: start;
    flex-wrap: wrap;
    gap: 0.2em;
    padding: 6px 0;
    margin: 0;
    border-bottom: 1px solid #ddd;
  }

  .fieldset__item__actions {
    margin-left: auto;

    > * + * {
      margin-left: 8px;
    }
  }

  .components-base-control + .components-base-control {
    margin-left: 8px;
  }

  .components-base-control__field {
    margin-bottom: 0;
  }
`;

const PatternCategories = () => {
  const { Messages } = useContext(DataContext);
  const { saveEditedEntityRecord } = useDispatch(coreStore);
  const [isLoading, setIsLoading] = useState(true);
  const [registeredCategories, setRegisteredCategories] = useState([]);
  const [customCategories, setCustomCategories] = useEntityProp(
    "root",
    "site",
    "boldblocks_pattern_categories"
  );
  const [messageData, setMessageData] = useState({
    type: "success",
    message: "",
  });

  const [allCategoriesLabel, setAllCategoriesLabel] = useEntityProp(
    "root",
    "site",
    "boldblocks_pattern_categories_all_label"
  );

  useEffect(() => {
    apiFetch({ path: "boldblocks/v1/getPatternCategories" }).then((res) => {
      setRegisteredCategories(res);
      setIsLoading(false);
    });
  }, []);

  // Save button.
  const saveActions = () => {
    const [isLoading, setIsLoading] = useState(false);
    return (
      <>
        <Button
          variant="primary"
          onClick={(e) => {
            e.preventDefault();
            setIsLoading(true);
            saveEditedEntityRecord("root", "site")
              .then(() => {
                setMessageData({
                  type: "success",
                  message: Messages.Success,
                });
              })
              .catch((error) => {
                console.error(error);
                setMessageData({
                  type: "error",
                  message: Messages.Error,
                });
              })
              .finally(() => {
                setIsLoading(false);
              });
          }}
        >
          {Messages.UpdateSettings}
        </Button>
        {isLoading && <Spinner />}
      </>
    );
  };

  return (
    <Widget
      title={__("Manage pattern categories", "content-blocks-builder")}
      renderFooter={saveActions}
    >
      <p>
        {__(
          "You can create custom pattern categories for this site such as 'Carousel', 'Hero'... Don't register new categories with the same name and label as those already registered.",
          "content-blocks-builder"
        )}
      </p>
      <p>
        {__(
          "Following pattern categories are already registered:",
          "content-blocks-builder"
        )}
      </p>
      <Fieldset className="fieldset">
        {isLoading && <Spinner />}
        {registeredCategories.length > 0 && (
          <ul className="fieldset__list">
            {registeredCategories.map(({ name, label }) => (
              <li key={name}>
                <code>{name}</code>
                <span>{" - "}</span>
                <span>{label}</span>
              </li>
            ))}
          </ul>
        )}
      </Fieldset>
      {applyFilters("boldblocks.settings.patternCategories", null, {
        Fieldset,
        CategoryList,
        customCategories,
        setCustomCategories,
        registeredCategories,
      })}
      <Fieldset className="fieldset">
        <div className="fieldset__label">
          <strong>
            {__(
              "Change the label for the 'all custom patterns' category.",
              "content-blocks-builder"
            )}
          </strong>
        </div>
        <TextControl
          value={allCategoriesLabel ?? ""}
          onChange={setAllCategoriesLabel}
        />
      </Fieldset>
      {messageData && messageData?.message && (
        <Notice status={messageData?.type} isDismissible={false}>
          {messageData.message}
        </Notice>
      )}
    </Widget>
  );
};

export default PatternCategories;
