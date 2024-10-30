/**
 * External dependencies
 */
import { isEmpty, pick } from "lodash";

/**
 * WordPress dependencies
 */
import { __, sprintf } from "@wordpress/i18n";
import { useSelect } from "@wordpress/data";
import { useEntityProp } from "@wordpress/core-data";
import { registerPlugin } from "@wordpress/plugins";
import {
  PanelBody,
  TextareaControl,
  ToggleControl,
} from "@wordpress/components";
import {
  PluginSidebar,
  PluginSidebarMoreMenuItem,
  PluginDocumentSettingPanel,
  store as editorStore,
} from "@wordpress/editor";
import { useRef } from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";
import { rawHandler } from "@wordpress/blocks";
import { applyFilters } from "@wordpress/hooks";

/**
 * Internal dependencies
 */
import { log } from "sdk/utils";
import { NestedPanelBody } from "sdk/components";
import {
  getDependentBlockTypes,
  buildInnerBlocksFromBlocks,
  refineCustomCSS,
} from "../utils";
import { updateDynamicStyle } from "../utils/editor";
import { CBB_VARIATION_TYPE } from "../utils/constants";
import { getEditPostURL } from "../utils/posts";
import { buildVariationData, useDefaultVariation } from "./utils";
import { BlockIcon } from "../components/block-icon";
import { HelpLink } from "../components/help-link";
import { shareLabels } from "../utils/shared-labels";

/**
 * Update blocks metadata
 */
apiFetch.use((options, next) => {
  const { method, path } = options;
  if (method === "PUT" && path.indexOf("/wp/v2/boldblocks-variations") === 0) {
    const { data = {}, data: { content, meta = {} } = {} } = options;
    const { changedFields = [] } = meta;
    if (!content && !changedFields?.length) {
      return next(options);
    }

    let changedMeta = pick(meta, changedFields);

    if (content) {
      const postData = wp.data
        .select("core")
        .getEntityRecord("postType", CBB_VARIATION_TYPE, data?.id);

      if (postData) {
        const {
          title: { raw: title },
          meta: {
            boldblocks_variation_data: storedVariationData,
            boldblocks_variation_block_name: blockName,
            boldblocks_variation_name: variationName,
          } = {},
        } = postData;

        const blocks = buildInnerBlocksFromBlocks(
          rawHandler({ HTML: content }),
        );

        const variationData = buildVariationData({
          blockName,
          variationName,
          title,
          block: blocks[0] ?? {},
        });

        const boldblocks_variation_data = JSON.stringify(variationData);
        if (boldblocks_variation_data !== storedVariationData) {
          changedMeta = {
            ...changedMeta,
            boldblocks_variation_data,
            boldblocks_variation_dependent_blocks:
              getDependentBlockTypes(blocks ?? []) ?? [],
          };
        }
      }
    }

    if (!isEmpty(changedMeta)) {
      log("Update variations metadata");
      log(changedMeta);
      options = { ...options, data: { ...data, meta: changedMeta } };
    }
  }
  return next(options);
});

/**
 * Register the custom variation meta.
 */
registerPlugin("boldblocks-variation-meta", {
  render: () => {
    const { getCurrentPostType, getCurrentPostId } = useSelect(
      (select) => select(editorStore),
      [],
    );

    // Only display block settings for CBB_VARIATION_TYPE content type
    if (getCurrentPostType() !== CBB_VARIATION_TYPE) {
      return null;
    }

    // Get meta, setMeta
    const [meta, setMeta] = useEntityProp(
      "postType",
      CBB_VARIATION_TYPE,
      "meta",
    );

    const changedMetaRef = useRef([]);

    const updateMeta = (name) => (newValue) => {
      if (!changedMetaRef.current.includes(name)) {
        changedMetaRef.current.push(name);
      }

      setMeta({
        ...meta,
        [name]: newValue,
        changedFields: changedMetaRef.current,
      });
    };

    const {
      boldblocks_variation_block_name: blockName,
      boldblocks_variation_icon: blockIcon = "",
      boldblocks_variation_description: description = "",
      boldblocks_variation_is_default: isDefault = false,
      boldblocks_variation_is_transformable: isTransformable = false,
      boldblocks_variation_hide_from_inserter: hideFromInserter = false,
      boldblocks_variation_custom_style: customStyle = "",
      boldblocks_variation_enable_style: enableStyle = false,
    } = meta;

    // Get the default variation
    const defaultVariation = useDefaultVariation(blockName);

    const enableDefault =
      !defaultVariation || defaultVariation?.id === getCurrentPostId();

    const pluginTitle = __("Variation settings", "content-blocks-builder");

    const PluginControls = (
      <>
        <BlockIcon
          label={__("Variation icon:", "content-blocks-builder")}
          value={blockIcon}
          onChange={updateMeta("boldblocks_variation_icon")}
        />
        <TextareaControl
          label={__("Variation description:", "content-blocks-builder")}
          value={description}
          onChange={updateMeta("boldblocks_variation_description")}
          rows={4}
        />
        <ToggleControl
          label={__("Is default variation?", "content-blocks-builder")}
          checked={isDefault}
          onChange={updateMeta("boldblocks_variation_is_default")}
          disabled={!enableDefault}
          help={
            !enableDefault &&
            defaultVariation && (
              <HelpLink
                href={getEditPostURL(defaultVariation?.id)}
                label={sprintf(
                  shareLabels.editItem,
                  shareLabels.defaultVariation,
                )}
              />
            )
          }
        />
        <ToggleControl
          label={__("Is transformable?", "content-blocks-builder")}
          checked={isTransformable}
          onChange={updateMeta("boldblocks_variation_is_transformable")}
          help={__(
            "By enabling this setting, some 'content' attributes will not be included in this variation. For example: id, content, text, title. And it will not effect to inner bocks.",
          )}
        />
        <ToggleControl
          label={__("Hide from the inserter", "content-blocks-builder")}
          checked={hideFromInserter}
          onChange={updateMeta("boldblocks_variation_hide_from_inserter")}
          help={__(
            "Hide this variation from the inserter. However, it will still be shown in the variation picker popup.",
            "content-blocks-builder",
          )}
        />
        <ToggleControl
          label={__(
            "Register a block style for this variation",
            "content-blocks-builder",
          )}
          checked={enableStyle}
          onChange={updateMeta("boldblocks_variation_enable_style")}
          help={__(
            "By enabling this setting, a custom block style will be generated. It's very helpful if the variation has some custom CSS.",
          )}
        />
        {applyFilters("boldblocks.variationSettings.additionalSettings", null, {
          meta,
          setMeta: updateMeta,
        })}
      </>
    );

    const manageStylesTitle = __(
      "Manage custom style",
      "content-blocks-builder",
    );

    const selector =
      blockName === "core/html"
        ? ".cbb-html-preview"
        : `.wp-block-post-content > .wp-block-${blockName
            .replace("core/", "")
            .replace("/", "-")}`;

    const disabledAnimationCSS =
      ".is-selected, .has-child-selected, .has-child-selected * {animation: none !important;}";

    const styleControls = applyFilters(
      "boldblocks.manageVariations.customStyle",
      null,
      {
        customStyle,
        onChangeCustomStyle: (value) => {
          let formatedValue = refineCustomCSS(value, { selector });
          const isHTMLPreview = blockName === "core/html";
          if (formatedValue) {
            formatedValue = `${formatedValue}${disabledAnimationCSS}`;
            updateDynamicStyle(
              "edit-variation-style-inline-css",
              formatedValue,
              false,
              isHTMLPreview,
            );
          } else {
            updateDynamicStyle(
              "edit-variation-style-inline-css",
              "",
              true,
              isHTMLPreview,
            );
          }

          updateMeta("boldblocks_variation_custom_style")(value);
        },
      },
    );

    return (
      <>
        <PluginDocumentSettingPanel
          name="content-block-settings"
          title={pluginTitle}
          initialOpen={true}
        >
          {PluginControls}
          <NestedPanelBody title={manageStylesTitle} initialOpen={false}>
            {styleControls}
          </NestedPanelBody>
        </PluginDocumentSettingPanel>
        <PluginSidebarMoreMenuItem target="variation-settings">
          {pluginTitle}
        </PluginSidebarMoreMenuItem>
        <PluginSidebar name="variation-settings" title={pluginTitle}>
          <PanelBody>{PluginControls}</PanelBody>
          <PanelBody title={manageStylesTitle} initialOpen={false}>
            {styleControls}
          </PanelBody>
        </PluginSidebar>
      </>
    );
  },
});
