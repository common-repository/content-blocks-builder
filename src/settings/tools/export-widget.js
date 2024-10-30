/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Button, CheckboxControl, Spinner } from "@wordpress/components";
import { useState, useContext } from "@wordpress/element";
import { download } from "@wordpress/icons";

/**
 * Internal dependencies
 */
import { Widget, Fieldset } from "sdk/components";
import { CoreBoldBlocks } from "../../utils/blocks.js";
import { ToolsContext } from "./utils";

// Select posts to export for post types: blocks, variations, patterns.
const ExportContentTypes = ({
  postType,
  title,
  value: selectedPosts = [],
  setValue: setSelectedPosts,
}) => {
  const data = useContext(ToolsContext);
  const type = postType.replace("boldblocks_", "");
  const typePlural = `${type}s`;
  const typePluralCaps = `${type.charAt(0).toUpperCase() + type.slice(1)}s`;

  const {
    [typePlural]: allPosts,
    [`isLoading${typePluralCaps}`]: isLoading,
    [`hasFinishedResolution${typePluralCaps}`]: hasFinishedResolution,
  } = data;

  // Is current block selected.
  const isChecked = (checkingSlug) =>
    selectedPosts.find(({ slug }) => slug === checkingSlug);

  const renderBlockTitle = (item, postType) => {
    let label = null;
    switch (postType) {
      case "boldblocks_block":
        label = <>{`boldblocks/${item?.slug}`}</>;
        break;

      case "boldblocks_variation":
        label = <>{item?.meta?.boldblocks_variation_name}</>;
        break;

      case "boldblocks_pattern":
        label = <>{`boldblocks/${item?.slug}`}</>;
        break;

      default:
        break;
    }

    return label;
  };

  let allItems = allPosts;
  // Ignore core blocks
  if (type === "block" && allItems?.length) {
    const coreSlugs = CoreBoldBlocks.map((blockName) =>
      blockName.replace("boldblocks/", "")
    );
    allItems = allItems.filter(({ slug }) => !coreSlugs.includes(slug));
  }

  return (
    <Fieldset className="fieldset">
      <div className="fieldset__label">
        <strong>{title}</strong>
      </div>
      {isLoading && <Spinner />}
      {allItems && allItems.length > 0 ? (
        <fieldset>
          <CheckboxControl
            label={__("Toggle All", "content-blocks-builder")}
            checked={selectedPosts.length === allItems.length}
            onChange={(checked) => {
              if (checked) {
                setSelectedPosts([...allItems]);
              } else {
                setSelectedPosts([]);
              }
            }}
          />
          <ul className="fieldset__list">
            {allItems.map((item) => (
              <li key={item?.slug}>
                <CheckboxControl
                  onChange={(checked) => {
                    let newSelectedBlocks = [];
                    if (checked) {
                      const seletecItem = allItems.find(
                        ({ slug }) => slug === item?.slug
                      );
                      newSelectedBlocks = [...selectedPosts, seletecItem];
                    } else {
                      newSelectedBlocks = selectedPosts.filter(
                        ({ slug }) => slug !== item?.slug
                      );
                    }

                    setSelectedPosts([...newSelectedBlocks]);
                  }}
                  checked={isChecked(item?.slug)}
                  label={renderBlockTitle(item, postType)}
                />
              </li>
            ))}
          </ul>
        </fieldset>
      ) : (
        <>
          {hasFinishedResolution && (
            <div>
              {__("There is no data to export.", "content-blocks-builder")}
            </div>
          )}
        </>
      )}
    </Fieldset>
  );
};

// Export data Widget.
const ExportWidget = () => {
  const { isLoading: isLoadingData } = useContext(ToolsContext);
  // Selected data to export.
  const [selectedBlocks, setSelectedBlocks] = useState([]);
  const [selectedVariations, setSelectedVariations] = useState([]);
  const [selectedPatterns, setSelectedPatterns] = useState([]);

  // Export button.
  const exportActions = () => (
    <Button
      variant="primary"
      disabled={
        (selectedBlocks.length === 0 &&
          selectedVariations.length === 0 &&
          selectedPatterns.length === 0) ||
        isLoadingData
      }
      icon={download}
      iconSize={16}
      onClick={(e) => {
        e.preventDefault();
        const jsonToDownload = {};
        if (selectedBlocks.length) {
          jsonToDownload.blocks = selectedBlocks.map(
            ({ title, content, slug, meta, keywords }) => ({
              title,
              content,
              slug,
              meta,
              keywords,
            })
          );
        }
        if (selectedVariations.length) {
          jsonToDownload.variations = selectedVariations.map(
            ({ title, content, slug, meta }) => ({
              title,
              content,
              slug,
              meta,
            })
          );
        }
        if (selectedPatterns.length) {
          jsonToDownload.patterns = selectedPatterns.map(
            ({ title, content, slug, meta, keywords }) => ({
              title,
              content,
              slug,
              meta,
              keywords,
            })
          );
        }

        downloadJson(
          `cbb-${new Date().toISOString().slice(0, 10)}.json`,
          jsonToDownload
        );
      }}
    >
      {__("Export data", "content-blocks-builder")}
    </Button>
  );

  const downloadJson = (filename, jsonData) => {
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: "text/json",
    });
    const link = document.createElement("a");

    link.download = filename;
    link.href = window.URL.createObjectURL(blob);
    link.dataset.downloadurl = ["text/json", link.download, link.href].join(
      ":"
    );

    const evt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });

    link.dispatchEvent(evt);
    link.remove();
  };

  return (
    <Widget
      title={__("Export data", "content-blocks-builder")}
      renderFooter={exportActions}
    >
      <p>
        {__(
          "Select the blocks, variations, patterns to export a .json file which you can then import to another WordPress site. Be sure to export all dependent blocks and/or variations.",
          "content-blocks-builder"
        )}
      </p>
      <ExportContentTypes
        postType="boldblocks_block"
        title={__("Select Blocks", "content-blocks-builder")}
        value={selectedBlocks}
        setValue={setSelectedBlocks}
      />
      <ExportContentTypes
        postType="boldblocks_variation"
        title={__("Select Variations", "content-blocks-builder")}
        value={selectedVariations}
        setValue={setSelectedVariations}
      />
      <ExportContentTypes
        postType="boldblocks_pattern"
        title={__("Select Patterns", "content-blocks-builder")}
        value={selectedPatterns}
        setValue={setSelectedPatterns}
      />
    </Widget>
  );
};

export default ExportWidget;
