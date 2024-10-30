/**
 * External dependencies
 */
import { isEmpty, omit, pick, find } from "lodash";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useSelect, useDispatch } from "@wordpress/data";
import { useEntityProp } from "@wordpress/core-data";
import { registerPlugin } from "@wordpress/plugins";
import { store as editPostStore } from "@wordpress/edit-post";
import {
  PanelBody,
  SelectControl,
  ToggleControl,
  TextControl,
  TextareaControl,
  BaseControl,
} from "@wordpress/components";
import {
  PluginSidebar,
  PluginSidebarMoreMenuItem,
  PluginDocumentSettingPanel,
  store as editorStore,
} from "@wordpress/editor";
import { useRef, useEffect, useMemo } from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";
import { rawHandler, hasBlockSupport } from "@wordpress/blocks";
import { applyFilters } from "@wordpress/hooks";

/**
 * Internal dependencies
 */
import { log } from "sdk/utils";
import { NestedPanelBody } from "sdk/components";
import {
  isPremium,
  buildInnerBlocksFromBlocks,
  getDependentBlockTypes,
  refineCustomCSS,
} from "../utils";
import { labels } from "../utils/labels";
import { updateDynamicStyle } from "../utils/editor";
import { CBB_BLOCK_TYPE } from "../utils/constants";
import { BlockIcon } from "../components/block-icon";
import { HelpLink } from "../components/help-link";
import BlockSupports from "../components/block-supports";
import { BlockAttributes } from "../components/custom-attributes";
import BlockVariation from "../components/block-variation";
import {
  BoldBlocksFeatures,
  ParentBlockFeatures,
  PremiumFeatures,
  AccordionFeatures,
} from "./utils";

/**
 * Update blocks metadata
 */
apiFetch.use((options, next) => {
  const { method, path } = options;
  if (method === "PUT" && path.indexOf("/wp/v2/boldblocks-blocks") === 0) {
    const { data = {}, data: { content, meta = {} } = {} } = options;
    const { changedFields = [] } = meta;
    if (!content && !changedFields?.length) {
      return next(options);
    }

    let changedMeta = pick(meta, changedFields);

    if (content) {
      const blocks = buildInnerBlocksFromBlocks(rawHandler({ HTML: content }));
      const boldblocks_block_blocks = JSON.stringify(blocks);

      // Update metadata
      if (meta?.boldblocks_block_blocks !== boldblocks_block_blocks) {
        changedMeta = {
          ...changedMeta,
          boldblocks_block_blocks,
          boldblocks_block_dependent_blocks:
            getDependentBlockTypes(blocks ?? []) ?? [],
        };
      }
    }
    if (!isEmpty(changedMeta)) {
      log("Update blocks metadata");
      log(changedMeta);
      options = { ...options, data: { ...data, meta: changedMeta } };
    }
  }
  return next(options);
});

/**
 * Register the custom content block meta.
 */
registerPlugin("boldblocks-content-block-meta", {
  render: () => {
    const {
      getCurrentPostType,
      getEditedPostSlug,
      getEditedPostContent,
      getEditedPostAttribute,
    } = useSelect((select) => select(editorStore), []);

    // Only display block settings for boldblocks_block content type
    if (getCurrentPostType() !== CBB_BLOCK_TYPE) {
      return null;
    }

    const postSlug = getEditedPostSlug();
    const postContent = getEditedPostContent();
    const postTitle = getEditedPostAttribute("title");
    const postStatus = getEditedPostAttribute("status");

    // Get meta, setMeta
    const [savedMeta, setMeta] = useEntityProp(
      "postType",
      CBB_BLOCK_TYPE,
      "meta",
    );

    const changedMetaRef = useRef([]);
    const metaRef = useRef(savedMeta);

    const updateMeta = (name) => (newValue) => {
      if (!changedMetaRef.current.includes(name)) {
        changedMetaRef.current.push(name);
      }
      metaRef.current = {
        ...metaRef.current,
        [name]: newValue,
        changedFields: changedMetaRef.current,
      };
      setMeta({ ...metaRef.current });
    };

    // Template lock options
    const templateLockOptions = [
      { label: __("None", "content-blocks-builder"), value: "false" },
      { label: __("All", "content-blocks-builder"), value: "all" },
      { label: __("Insert", "content-blocks-builder"), value: "insert" },
      {
        label: __("Content Only", "content-blocks-builder"),
        value: "contentOnly",
      },
    ];

    // Repeater block layout options
    const layoutTypeOptions = [
      {
        value: "vstack",
        label: __("Default (vertical stack)", "content-blocks-builder"),
      },
      { value: "grid", label: __("Grid", "content-blocks-builder") },
      { value: "carousel", label: __("Carousel", "content-blocks-builder") },
      { value: "accordion", label: __("Accordion", "content-blocks-builder") },
    ];

    const {
      boldblocks_template_lock: templateLock,
      boldblocks_block_description: blockDescription,
      boldblocks_block_class: blockClasses = "",
      boldblocks_block_icon: blockIcon = "",
      boldblocks_block_supports: blockSupports,
      boldblocks_enable_repeater: enableRepeater = false,
      boldblocks_parent_layout_type: layoutType = "vstack",
      boldblocks_parent_block_icon: parentBlockIcon = "",
      boldblocks_parent_block_supports: parentBlockSupports,
      boldblocks_disable_standalone: disableStandalone = false,
      boldblocks_enable_variation_picker: enableVariationPicker = false,
      boldblocks_parent_block_title: parentTitle,
      boldblocks_parent_block_description: parentDescription,
      boldblocks_is_fixed_nested_item_count: isFixedNestedItemCount = false,
      boldblocks_nested_item_count: nestedItemCount = 1,
      boldblocks_parent_block_class: parentClasses = "",
      boldblocks_parent_enable_variation_picker:
        parentEnableVariationPicker = false,
      boldblocks_block_external_scripts: externalScripts = [],
      boldblocks_block_custom_scripts: customScripts = [],
      boldblocks_block_external_styles: externalStyles = [],
      boldblocks_block_custom_styles: customStyles = [],
      boldblocks_block_attributes: blockAttributes = [],
      boldblocks_parent_block_attributes: parentBlockAttributes = [],
      boldblocks_enable_custom_attributes: enableCustomAttributes = false,
      boldblocks_parent_enable_custom_attributes:
        enableParentCustomAttributes = false,
      boldblocks_hide_on_frontend: hideOnFrontend = false,
      boldblocks_is_readonly: isSynced = false,
      boldblocks_is_transformable: isTransformable = false,
      boldblocks_is_hidden: isHidden = false,
      boldblocks_block_parent: blockParent = "",
      boldblocks_block_ancestor: blockAncestor = "",
      boldblocks_block_allowed_blocks: allowedBlocks = "",
      boldblocks_block_dependent_blocks: dependentBlocks,
    } = metaRef.current;

    // Handle supports for repeater enable blocks
    let boldblocksFeatures = { ...BoldBlocksFeatures };
    if (enableRepeater) {
      boldblocksFeatures = omit(boldblocksFeatures, [
        "justifyAlignment",
        "toggle",
      ]);

      if (layoutType === "grid") {
        boldblocksFeatures = omit(boldblocksFeatures, ["verticalAlignment"]);
      }
    }

    // Supported features
    // For child blocks
    let childBlockFeatures = applyFilters("boldblocks.customBlocks.features", {
      ...boldblocksFeatures,
    });

    // For parent blocks
    let parentBlockFeatures = applyFilters(
      "boldblocks.customBlocks.parentFeatures",
      {
        ...omit(boldblocksFeatures, ["aspectRatio"]),
        ...ParentBlockFeatures,
      },
    );

    // Ignore features for specific layout types
    if (enableRepeater) {
      if (layoutType === "accordion") {
        childBlockFeatures = pick(childBlockFeatures, AccordionFeatures);
        parentBlockFeatures = pick(parentBlockFeatures, AccordionFeatures);
      } else if (layoutType !== "grid") {
        childBlockFeatures = omit(childBlockFeatures, ["sticky"]);
      }
    }

    const updateSupportFeature =
      (fieldName, fieldValue, featureName) => (featureValue) => {
        updateMeta(fieldName)({ ...fieldValue, [featureName]: featureValue });
      };

    const restrictBlockSupports = (blockSupports, availableFeatures) => {
      return Object.keys(blockSupports).reduce((previous, current) => {
        let value = blockSupports[current];
        if (!Object.keys(availableFeatures).includes(current)) {
          value = false;
        }
        return { ...previous, [current]: value };
      }, {});
    };

    const updateBlockFeatures = (enableRepeater, layoutType) => {
      if (enableRepeater) {
        updateMeta("boldblocks_block_supports")(
          restrictBlockSupports(blockSupports, childBlockFeatures),
        );

        updateMeta("boldblocks_parent_block_supports")(
          restrictBlockSupports(parentBlockSupports, parentBlockFeatures),
        );
      }
    };

    const spaceLabel = __(
      "Separate multiple classes with spaces.",
      "content-blocks-builder",
    );
    const pluginTitle = __("Content block settings", "content-blocks-builder");

    const PluginControls = (
      <>
        <ToggleControl
          label={__("Synced block overrides", "content-blocks-builder")}
          checked={isSynced}
          onChange={updateMeta("boldblocks_is_readonly")}
          help={__(
            "Sync layout and style across multiple locations.",
            "content-blocks-builder",
          )}
          disabled={layoutType === "accordion"}
        />
        {isSynced && (
          <BaseControl
            help={__(
              "Overridable block types: Heading, Paragraph, Image, Button, Embed, Video, Audio, Code, Verse, Preformatted, Pullquote, SVG Block, Counting number block, Youtube block, and the background image/video of CBB blocks",
              "content-blocks-builder",
            )}
          />
        )}
        {!isSynced && (
          <SelectControl
            label={__("Template lock", "content-blocks-builder")}
            options={templateLockOptions}
            onChange={updateMeta("boldblocks_template_lock")}
            value={templateLock}
          />
        )}
        <TextareaControl
          label={__("Block description", "content-blocks-builder")}
          value={blockDescription}
          onChange={updateMeta("boldblocks_block_description")}
          rows={4}
        />
        <TextControl
          autoComplete="off"
          label={__("Block CSS class(es)", "content-blocks-builder")}
          value={blockClasses}
          onChange={updateMeta("boldblocks_block_class")}
          help={spaceLabel}
        />
        <BlockIcon
          label={__("Block icon", "content-blocks-builder")}
          value={blockIcon}
          onChange={updateMeta("boldblocks_block_icon")}
        />
        <BlockSupports
          label={__("Extended block supports", "content-blocks-builder")}
          name="boldblocks_block_supports"
          value={blockSupports}
          features={childBlockFeatures}
          onChange={updateSupportFeature}
          premiumFeatures={PremiumFeatures}
          isPremium={isPremium}
        />
        {blockSupports?.customAttributes && (
          <BlockAttributes
            attributes={blockAttributes}
            onChangeAttributes={updateMeta("boldblocks_block_attributes")}
            enableCustomAttributes={enableCustomAttributes}
            onChangeEnableCustomAttributes={updateMeta(
              "boldblocks_enable_custom_attributes",
            )}
            label={__("Block custom attributes", "content-blocks-builder")}
          />
        )}
        <BlockVariation
          blockName={`boldblocks/${postSlug}`}
          blockContent={postContent}
          blockTitle={postTitle}
          blockStatus={postStatus}
        />
        <ToggleControl
          label={__(
            "Show the block variation picker if it has some",
            "content-blocks-builder",
          )}
          checked={enableVariationPicker}
          onChange={updateMeta("boldblocks_enable_variation_picker")}
        />
        <TextControl
          autoComplete="off"
          label={__("Parent block(s)", "content-blocks-builder")}
          value={blockParent}
          onChange={updateMeta("boldblocks_block_parent")}
          help={
            <>
              {__(
                "The block is only available when nested within parent block(s).",
                "content-blocks-builder",
              )}
              {` ${labels.comma} `}
              <HelpLink href="https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#parent" />
            </>
          }
          placeholder="core/group,boldblocks/group"
        />
        <TextControl
          autoComplete="off"
          label={__("Ancestor block(s)", "content-blocks-builder")}
          value={blockAncestor}
          onChange={updateMeta("boldblocks_block_ancestor")}
          help={
            <>
              {__(
                "The block is only available when nested within the subtree of ancestor block(s).",
                "content-blocks-builder",
              )}
              {` ${labels.comma} `}
              <HelpLink href="https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#ancestor" />
            </>
          }
          placeholder="core/group,boldblocks/group"
        />
        <TextControl
          autoComplete="off"
          label={__("Allowed block(s)", "content-blocks-builder")}
          value={allowedBlocks}
          onChange={updateMeta("boldblocks_block_allowed_blocks")}
          help={
            <>
              {__(
                "A comma-separated list of block names that can be used as direct children of this block.",
                "content-blocks-builder",
              )}{" "}
              <HelpLink href="https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#allowed-blocks" />
            </>
          }
          placeholder="core/heading,core/image"
        />
        {!isSynced && (
          <ToggleControl
            label={__("Is transformable", "content-blocks-builder")}
            checked={isTransformable}
            onChange={updateMeta("boldblocks_is_transformable")}
            help={__(
              "This setting allows you to convert other blocks into this block.",
              "content-blocks-builder",
            )}
          />
        )}
        <ToggleControl
          label={__("Is hidden", "content-blocks-builder")}
          checked={isHidden}
          onChange={updateMeta("boldblocks_is_hidden")}
          help={__(
            "This setting allows you to hide the block from the inserter.",
            "content-blocks-builder",
          )}
        />
        <ToggleControl
          label={__(
            "Hide the block on the front end",
            "content-blocks-builder",
          )}
          checked={hideOnFrontend}
          onChange={updateMeta("boldblocks_hide_on_frontend")}
          help={__(
            "This setting allow you to hide the block from showing on the front end.",
            "content-blocks-builder",
          )}
        />
        <ToggleControl
          label={__(
            "Create a repeater parent block for this block",
            "content-blocks-builder",
          )}
          checked={enableRepeater}
          onChange={(value) => {
            updateMeta("boldblocks_enable_repeater")(value);

            // Update block supports
            updateBlockFeatures(value, layoutType);
          }}
        />
        {enableRepeater && (
          <>
            <SelectControl
              label={__("Parent block layout", "content-blocks-builder")}
              options={
                !isSynced
                  ? layoutTypeOptions
                  : layoutTypeOptions.filter(
                      ({ value }) => value !== "accordion",
                    )
              }
              onChange={(value) => {
                updateMeta("boldblocks_parent_layout_type")(value);

                // Update block supports
                updateBlockFeatures(enableRepeater, value);
              }}
              value={layoutType}
            />
            <TextControl
              label={__("Parent block title", "content-blocks-builder")}
              value={parentTitle}
              onChange={updateMeta("boldblocks_parent_block_title")}
              help={__(
                "The default value is: 'Repeater: $post_title'",
                "content-blocks-builder",
              )}
            />
            <TextareaControl
              label={__("Parent block description", "content-blocks-builder")}
              value={parentDescription}
              onChange={updateMeta("boldblocks_parent_block_description")}
              rows={4}
            />
            <TextControl
              autoComplete="off"
              label={__("Parent block CSS class(es)", "content-blocks-builder")}
              value={parentClasses}
              onChange={updateMeta("boldblocks_parent_block_class")}
              help={spaceLabel}
            />
            <BlockIcon
              label={__("Parent block icon", "content-blocks-builder")}
              value={parentBlockIcon}
              onChange={updateMeta("boldblocks_parent_block_icon")}
            />
            <BlockSupports
              label={__(
                "Parent block extended block supports",
                "content-blocks-builder",
              )}
              name="boldblocks_parent_block_supports"
              value={parentBlockSupports}
              features={parentBlockFeatures}
              premiumFeatures={PremiumFeatures}
              onChange={updateSupportFeature}
              isPremium={isPremium}
            />
            {parentBlockSupports?.customAttributes && (
              <BlockAttributes
                attributes={parentBlockAttributes}
                onChangeAttributes={updateMeta(
                  "boldblocks_parent_block_attributes",
                )}
                enableCustomAttributes={enableParentCustomAttributes}
                onChangeEnableCustomAttributes={updateMeta(
                  "boldblocks_parent_enable_custom_attributes",
                )}
                label={__(
                  "Parent block custom attributes",
                  "content-blocks-builder",
                )}
              />
            )}
            <BlockVariation
              blockName={`boldblocks/${postSlug}-repeater`}
              blockChildName={`boldblocks/${postSlug}`}
              blockContent={postContent}
              blockTitle={parentTitle ? parentTitle : `Repeater: ${postTitle}`}
              blockStatus={postStatus}
            />
            <ToggleControl
              label={__(
                "Show the block variation picker for the parent block if it has some",
                "content-blocks-builder",
              )}
              checked={parentEnableVariationPicker}
              onChange={updateMeta("boldblocks_parent_enable_variation_picker")}
            />
            <ToggleControl
              label={__(
                "Make this repeater block have only a fixed number of child blocks",
                "content-blocks-builder",
              )}
              checked={isFixedNestedItemCount}
              onChange={updateMeta("boldblocks_is_fixed_nested_item_count")}
            />
            {isFixedNestedItemCount && (
              <TextControl
                type="number"
                label={__("Number of child blocks", "content-blocks-builder")}
                value={nestedItemCount}
                onChange={updateMeta("boldblocks_nested_item_count")}
                min={1}
              />
            )}
            {layoutType === "vstack" && (
              <ToggleControl
                label={__(
                  "Restrict the child block so that it's only available as a nested block of this repeater block",
                  "content-blocks-builder",
                )}
                checked={disableStandalone}
                onChange={updateMeta("boldblocks_disable_standalone")}
              />
            )}
          </>
        )}
        {applyFilters("boldblocks.blockSettings.additionalSettings", null, {
          meta: metaRef.current,
          setMeta: updateMeta,
        })}
      </>
    );

    const manageScriptsTitle = __("Manage scripts", "content-blocks-builder");
    const disabledScriptsTitle = __(
      "Manage external JS resources and custom JS code, available only in the Premium vearion.",
      "content-blocks-builder",
    );

    const manageStylesTitle = __(
      "Manage stylesheets",
      "content-blocks-builder",
    );
    const disabledStylesTitle = __(
      "Manage external stylesheets and custom CSS code, available only in the Premium version.",
      "content-blocks-builder",
    );

    const scriptControls = applyFilters(
      "boldblocks.manageBlocks.customScripts",
      null,
      {
        externalScripts,
        customScripts,
        onChangeExternalScripts: (values) =>
          updateMeta("boldblocks_block_external_scripts")(values),
        onChangeCustomScripts: (values) =>
          updateMeta("boldblocks_block_custom_scripts")(values),
        disabledScriptsTitle,
      },
    );

    const isHTMLPreview =
      dependentBlocks &&
      dependentBlocks?.length === 1 &&
      dependentBlocks[0] === "core/html";
    const selector = isHTMLPreview
      ? `.wp-block-boldblocks-${postSlug}`
      : ".wp-block-post-content";
    const inlineHandle = "edit-boldblocks-custom-blocks-inline-css";
    const resetEditorCSS =
      ".wp-block-post-content{position:relative!important;top:unset!important;right:unset!important;bottom:unset!important;left:unset!important;display:block!important;width:auto!important;max-width:none!important;height:auto!important;max-height:none!important;}.is-selected,.has-child-selected,.has-child-selected * {animation:none!important;}";

    const styleControls = applyFilters(
      "boldblocks.manageBlocks.customStyles",
      null,
      {
        externalStyles,
        customStyles,
        onChangeExternalStyles: (values) =>
          updateMeta("boldblocks_block_external_styles")(values),
        onChangeCustomStyles: (values) => {
          if (values?.length) {
            let dynamicStyle = values.reduce((prev, { value }) => {
              let formatedValue = refineCustomCSS(value, { selector });
              if (formatedValue) {
                prev = `${prev}${formatedValue}`;
              }

              return prev;
            }, "");

            if (dynamicStyle) {
              dynamicStyle = `${dynamicStyle}${resetEditorCSS}`;
              updateDynamicStyle(
                inlineHandle,
                dynamicStyle,
                false,
                isHTMLPreview,
              );
            } else {
              updateDynamicStyle(inlineHandle, "", true, isHTMLPreview);
            }
          } else {
            updateDynamicStyle(inlineHandle, "", true, isHTMLPreview);
          }
          updateMeta("boldblocks_block_custom_styles")(values);
        },
        disabledStylesTitle,
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
          <NestedPanelBody title={manageScriptsTitle} initialOpen={false}>
            {scriptControls}
          </NestedPanelBody>
          <NestedPanelBody title={manageStylesTitle} initialOpen={false}>
            {styleControls}
          </NestedPanelBody>
        </PluginDocumentSettingPanel>
        <PluginSidebarMoreMenuItem target="content-block-settings">
          {pluginTitle}
        </PluginSidebarMoreMenuItem>
        <PluginSidebar name="content-block-settings" title={pluginTitle}>
          <PanelBody>{PluginControls}</PanelBody>
          <PanelBody title={manageScriptsTitle} initialOpen={false}>
            {scriptControls}
          </PanelBody>
          <PanelBody title={manageStylesTitle} initialOpen={false}>
            {styleControls}
          </PanelBody>
        </PluginSidebar>
      </>
    );
  },
});

registerPlugin("boldblocks-prevent-block-nested-in-itself", {
  render: () => {
    const { getCurrentPostType, getCurrentPostId } = useSelect(
      (select) => select(editorStore),
      [],
    );

    const hiddenBlockTypes = useSelect(
      (select) => select(editPostStore).getHiddenBlockTypes(),
      [],
    );

    const { hideBlockTypes, showBlockTypes } = useDispatch(editPostStore);

    const { blocks: customBlocks = [] } = BoldBlocksBlocks || {};
    let shownBlocks = [];
    let hiddenBlocks = useMemo(
      () =>
        customBlocks.reduce(
          (prev, { name, parent: { name: parentName } = {}, isHidden }) => {
            if (isHidden) {
              prev.push(name);
              if (parentName) {
                prev.push(parentName);
              }
            }

            return prev;
          },
          [],
        ),
      [],
    );

    if (getCurrentPostType() === CBB_BLOCK_TYPE) {
      const currentPostId = getCurrentPostId();

      const block = find(customBlocks, ["id", currentPostId]);
      if (block) {
        const { name, parent: { name: parentName } = {} } = block;
        if (name) {
          hiddenBlocks.push(name);
        }

        if (parentName) {
          hiddenBlocks.push(parentName);
        }
      }
    }

    if (hiddenBlockTypes.length) {
      shownBlocks = hiddenBlockTypes.filter(
        (name) =>
          hiddenBlocks.indexOf(name) === -1 && hasBlockSupport(name, "cbb"),
      );
    }

    useEffect(() => {
      if (!!shownBlocks.length) {
        showBlockTypes(shownBlocks);
      }

      if (!!hiddenBlocks.length) {
        hideBlockTypes(hiddenBlocks);
      }
    }, [shownBlocks.length, hiddenBlocks.length]);

    return null;
  },
});
