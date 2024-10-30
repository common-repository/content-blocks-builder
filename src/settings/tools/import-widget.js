/**
 * External dependencies
 */
import { isArray, isEmpty, pick, uniqBy } from "lodash";
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
  Button,
  FormFileUpload,
  Spinner,
  RadioControl,
  Notice,
} from "@wordpress/components";
import { useState, useContext } from "@wordpress/element";
import { upload, file } from "@wordpress/icons";
import apiFetch from "@wordpress/api-fetch";
import { store as coreStore } from "@wordpress/core-data";
import { useDispatch } from "@wordpress/data";

/**
 * Internal dependencies
 */
import { Widget, Fieldset } from "sdk/components";
import { ToolsContext } from "./utils";
import { shareLabels } from "../../utils/shared-labels";

const PostsPreviewStyled = styled.div`
  margin-top: 12px;
`;

const PostsPreview = ({ posts, title }) => {
  return (
    isArray(posts) && (
      <PostsPreviewStyled className="posts-preview">
        <div className="fieldset__label">
          <strong>{title}</strong>
        </div>
        <ul className="fieldset__list">
          {posts.map(({ slug }) => (
            <li key={slug}>{`boldblocks/${slug}`}</li>
          ))}
        </ul>
      </PostsPreviewStyled>
    )
  );
};

// Import data widget.
const ImportWidget = () => {
  const { saveEditedEntityRecord } = useDispatch(coreStore);
  const data = useContext(ToolsContext);
  const {
    isLoading: isLoadingData,
    registeredCategories,
    customCategories,
    setCustomCategories,
    isLoadingPatternsCategories,
  } = data;

  const allPatternCategoryNames =
    !isLoadingPatternsCategories &&
    registeredCategories
      .concat(customCategories)
      .concat([{ name: "boldblocks" }]) // All custom patterns category
      .map(({ name }) => name);

  const [uploadedFile, setUploadedFile] = useState("");
  const [importedData, setImportedData] = useState({});
  const [importMessage, setImportMessage] = useState({});
  const [oldDataPolicy, setOldDataPolicy] = useState("ignore");

  let hasValidImportedData = (data) =>
    data?.blocks || data?.variations || data?.patterns;

  const processItem = (item, key) => {
    const { [key]: posts } = data;
    let foundItem;
    if (key === "variations") {
      foundItem =
        isArray(posts) &&
        posts.find(
          ({ meta: { boldblocks_variation_name: variationName } }) =>
            variationName === item?.meta?.boldblocks_variation_name,
        );
    } else {
      foundItem =
        isArray(posts) && posts.find(({ slug }) => slug === item?.slug);
    }

    if (!foundItem) {
      if (key === "variations") {
        return apiFetch({
          path: "boldblocks/v1/createVariation",
          method: "POST",
          data: { ...item, status: "publish" },
        });
      } else {
        return apiFetch({
          path: `wp/v2/boldblocks-${key}`,
          method: "POST",
          data: { ...item, status: "publish" },
        });
      }
    }

    if (oldDataPolicy === "override") {
      return apiFetch({
        path: `wp/v2/boldblocks-${key}/${foundItem.id}`,
        method: "POST",
        data: { ...item, status: "publish" },
      });
    }
  };

  const processImportingCategories = () => {
    saveEditedEntityRecord("root", "site");
  };

  // const images =
  // scrap images pattern: https?:\/\/[^"']*\.(?:png|jpg|jpeg|gif|svg|webp)

  // Import button.
  const importActions = () => {
    const [isLoading, setIsLoading] = useState(false);
    return (
      <>
        <Button
          variant="primary"
          disabled={
            !hasValidImportedData(importedData) ||
            !uploadedFile ||
            isLoadingData
          }
          icon={upload}
          iconSize={16}
          onClick={() => {
            setIsLoading(true);
            const validData = pick(importedData, [
              "blocks",
              "variations",
              "patterns",
            ]);
            Promise.all(
              Object.keys(validData).map(async (key) => {
                return Promise.all(
                  validData[key].map((item) => processItem(item, key)),
                ).then((response) => {
                  return { key, response };
                });
              }),
            )
              .then((res) => {
                const processedItems = res.reduce(
                  (previous, { key, response }) => ({
                    ...previous,
                    [key]: response.filter((item) => item),
                  }),
                  {},
                );

                // Has pattern imported.
                if (processedItems?.patterns && processedItems.patterns) {
                  const newPatternCategories = uniqBy(
                    processedItems.patterns.reduce(
                      (
                        previous,
                        {
                          meta: {
                            boldblocks_pattern_categories:
                              patternCategories = [],
                          },
                        },
                      ) => [...previous, ...patternCategories],
                      [],
                    ),
                    "name",
                  );

                  if (newPatternCategories.length) {
                    const importCategories = newPatternCategories.filter(
                      ({ name }) =>
                        !allPatternCategoryNames.find(
                          (catName) => name === catName,
                        ),
                    );

                    if (importCategories.length) {
                      setCustomCategories([
                        ...customCategories,
                        ...importCategories,
                      ]);

                      processImportingCategories();
                    }
                  }
                }

                if (
                  (processedItems?.blocks && processedItems.blocks.length) ||
                  (processedItems?.variations &&
                    processedItems.variations.length) ||
                  (processedItems?.patterns && processedItems.patterns.length)
                ) {
                  setImportMessage({
                    type: "success",
                    message: __(
                      "Data has been imported successfully!",
                      "content-blocks-builder",
                    ),
                  });
                } else {
                  setImportMessage({
                    type: "info",
                    message: __(
                      "No items have been imported! Please change your settings or upload another JSON file.",
                      "content-blocks-builder",
                    ),
                  });
                }
              })
              .catch((error) => {
                console.error(error);
                setImportMessage({
                  type: "error",
                  message: __(
                    "Import failed. Please make sure your data is correct!",
                    "content-blocks-builder",
                  ),
                });
              })
              .finally(() => {
                setIsLoading(false);

                // Clear uploaded file
                setUploadedFile("");
                setImportedData({});
              });
          }}
        >
          {__("Import data", "content-blocks-builder")}
        </Button>
        {isLoading && <Spinner />}
      </>
    );
  };

  return (
    <Widget
      title={__("Import data", "content-blocks-builder")}
      renderFooter={importActions}
    >
      <p>
        {__(
          "Upload your json file and click the import button.",
          "content-blocks-builder",
        )}
      </p>
      <Fieldset className="fieldset">
        <div className="fieldset__label">
          <strong>{__("Select file", "content-blocks-builder")}</strong>
        </div>
        <div className="file-upload">
          <FormFileUpload
            accept="application/JSON"
            variant="primary"
            onChange={(e) => {
              // Save uploaded file.
              setUploadedFile(e.target.files[0]);

              // Read the file content.
              const reader = new FileReader();
              reader.onload = (e) => {
                try {
                  const data = JSON.parse(e.target.result);
                  if (hasValidImportedData(data)) {
                    setImportedData(data);
                    setImportMessage({});
                  } else {
                    setImportedData({});
                    setImportMessage({
                      type: "error",
                      message: __(
                        "The uploaded file is in the wrong format. Please use a JSON file from the export functionality.",
                        "content-blocks-builder",
                      ),
                    });
                  }
                } catch (error) {
                  setImportedData({});
                  console.error(error);
                }
              };
              reader.readAsText(e.target.files[0]);

              // Clear the current value for the re-upload.
              e.target.value = "";
            }}
          >
            {__("Choose file to upload", "content-blocks-builder")}
          </FormFileUpload>
          {hasValidImportedData(importedData) && uploadedFile && (
            <>
              <div className="file-preview">
                <span className="icon">{file}</span>
                <span className="name">{uploadedFile?.name}</span>
                <Button
                  variant="tertiary"
                  className="delete"
                  onClick={() => {
                    setUploadedFile("");
                    setImportedData({});
                  }}
                >
                  {shareLabels.delete}
                </Button>
              </div>
              <div className="data-preview" style={{ flexBasis: "100%" }}>
                <p>
                  {__(
                    "Following data will be imported.",
                    "content-blocks-builder",
                  )}
                </p>
                <PostsPreview
                  posts={importedData?.blocks}
                  title={`${shareLabels.blocks}:`}
                />
                <PostsPreview
                  posts={importedData?.variations}
                  title={`${shareLabels.variations}:`}
                />
                <PostsPreview
                  posts={importedData?.patterns}
                  title={`${shareLabels.patterns}:`}
                />
              </div>
            </>
          )}
        </div>

        <div className="fieldset__label" style={{ marginTop: "12px" }}>
          <strong>{__("Import settings", "content-blocks-builder")}</strong>
        </div>
        <RadioControl
          selected={oldDataPolicy}
          onChange={setOldDataPolicy}
          options={[
            {
              value: "override",
              label: __("Replace old data.", "content-blocks-builder"),
            },
            {
              value: "ignore",
              label: __(
                "Existing items are ignored.",
                "content-blocks-builder",
              ),
            },
          ]}
        />
        {!isEmpty(importMessage) && (
          <>
            <Notice status={importMessage?.type} isDismissible={false}>
              {importMessage?.message}
            </Notice>
          </>
        )}
      </Fieldset>
    </Widget>
  );
};

export default ImportWidget;
