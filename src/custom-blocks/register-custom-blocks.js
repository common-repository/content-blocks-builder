/**
 * External dependencies
 */
import clsx from "clsx";

/**
 * WordPress dependencies
 */
import { __, _x } from "@wordpress/i18n";
import { blockDefault } from "@wordpress/icons";
import {
  store as blocksStore,
  registerBlockType,
  getCategories,
  setCategories,
  createBlocksFromInnerBlocksTemplate,
} from "@wordpress/blocks";
import { useSelect, useDispatch } from "@wordpress/data";
import { applyFilters } from "@wordpress/hooks";
import {
  store as blockEditorStore,
  InnerBlocks,
  useBlockProps,
  useInnerBlocksProps,
  BlockContextProvider,
} from "@wordpress/block-editor";
import { Disabled } from "@wordpress/components";
import { Fragment, useEffect, useRef, useMemo } from "@wordpress/element";

/**
 * Internal dependencies
 */
import { InlineSVG } from "sdk/components";
import { log, useValueRef } from "sdk/utils";
import Placeholder from "./placeholder";
import {
  buildTemplateFromBlocks,
  sanitizeClassString,
  limitSVGDimension,
  getLayout,
  getCoreFeatures,
  CBBCoreBlockSupports,
} from "../utils";
import deprecatedData from "./deprecated";
import buildTransforms from "./transforms";
import {
  setBlockEditMode,
  hasOverridableBlocks,
  applyInitialContentValuesToInnerBlocks,
} from "./overrides/utils";

/**
 * Register content blocks
 */
// Add BoldBlocks category
setCategories([
  {
    slug: "boldblocks",
    title: __("Custom Blocks", "content-blocks-builder"),
  },
  ...getCategories(),
]);
const { blocks: customBlocks, variationBlockName } = BoldBlocksBlocks || {};
if (customBlocks && customBlocks.length) {
  customBlocks.forEach(
    ({
      id,
      name,
      parentName,
      title,
      blocks: rawBlocks,
      description,
      templateLock = "all",
      standalone,
      parent,
      className,
      blockIcon,
      blockSupports: boldblocksSupports = {},
      blockAttributes = [],
      enableVariationPicker,
      blockVersion,
      isSyncedBlock = false,
      isTransformable = false,
      allowedBlocks = [],
    }) => {
      let templateBlocks;
      try {
        templateBlocks = JSON.parse(rawBlocks);
      } catch (error) {
        log(error, "error");
      }

      if (templateLock === "inherit") {
        templateLock = undefined;
      } else if (!templateBlocks?.length) {
        templateBlocks = [];
        // Clear template lock for empty blocks
        templateLock = false;
      }

      if (isSyncedBlock) {
        // Allow changing the wrapper attributes of synced blocks when edit it's variations
        if (name === variationBlockName) {
          templateLock = "all";
        } else {
          templateLock = "contentOnly";
        }
      }

      const template = buildTemplateFromBlocks(templateBlocks);
      const isSyncedBlockOverrides =
        isSyncedBlock && hasOverridableBlocks(templateBlocks);

      // Layout type
      const layoutType = parent ? parent["layoutType"] ?? "vstack" : false;
      const layoutItem = layoutType ? `${layoutType}Item` : "standalone";

      const coreSpacing = getCoreFeatures(layoutItem);
      const parentCoreSpacing = layoutType ? getCoreFeatures(layoutType) : {};

      let blockInfo = {
        id,
        name,
        parentName,
        template,
        templateLock: templateLock ? templateLock : "None",
        layoutType: layoutItem,
        isSyncedBlockOverrides,
      };

      const sharedSupports = {
        blockVersion,
        copyPaste: true,
        devicePreview: true,
      };

      // Add default features.
      boldblocksSupports = {
        ...boldblocksSupports,
        ...sharedSupports,
        blockAttributes,
        blockInfo,
      };

      const blockSupports = {
        ...CBBCoreBlockSupports,
        ...coreSpacing,
        filter: {
          duotone: boldblocksSupports?.background,
          __experimentalDefaultControls: { duotone: false },
        },
        align:
          layoutItem === "standalone" || layoutItem === "vstackItem"
            ? ["wide", "full"]
            : false,
        layout: layoutItem !== "accordionItem",
        boldblocks: {
          ...boldblocksSupports,
          layoutType: layoutItem,
          syncContent: true,
          isSyncedBlock,
        },
      };

      // Make grid/carousel/accordion item only nested inside the parent block.
      if (
        layoutType === "grid" ||
        layoutType === "carousel" ||
        layoutType === "accordion"
      ) {
        standalone = false;
      }

      const blockClass = clsx(
        "wp-block-boldblocks-custom",
        { [`is-${layoutType}-item`]: layoutType, "has-parent": parent },
        sanitizeClassString(className),
      );

      const renderBlockInner = (
        layoutType,
        children,
        props = {},
        isEdit = false,
      ) => {
        if (layoutType === "carousel") {
          return <div className="carousel__inner">{children}</div>;
        } else if (layoutType === "accordionItem") {
          const {
            attributes: {
              boldblocks: { accordionItem: { id = "" } = {} } = {},
            } = {},
          } = props;
          return (
            <div
              id={`c-${id}`}
              className={clsx("accordion-collapse", {
                collapse: !isEdit,
              })}
            >
              <div className="accordion-body">{children}</div>
            </div>
          );
        }

        return children;
      };

      // Separate save function to re-use it in deprecated.
      const saveChildBlock =
        (supports = {}) =>
        (props) => {
          const { attributes: { tagName: Tag = "div" } = {} } = props;
          return (
            <Tag
              {...useBlockProps.save({
                className: blockClass,
              })}
            >
              {applyFilters("boldblocks.save.blockInner", null, {
                ...props,
                name,
                supports,
              })}
              {renderBlockInner(
                `${layoutType}Item`,
                <InnerBlocks.Content />,
                props,
              )}
            </Tag>
          );
        };

      const blockSettings = {
        apiVersion: 3,
        category: "boldblocks",
        title,
        description,
        icon: blockIcon ? (
          <InlineSVG markup={blockIcon} sanitizeAttribute={limitSVGDimension} />
        ) : (
          blockDefault
        ),
        supports: blockSupports,
        usesContext: [
          "boldblocks/boldblocks",
          "postId",
          "postType",
          "cbb/isSyncedBlock",
          "cbb/syncedBlockId",
          "cbb/overrides",
        ],
        attributes: {
          boldblocks: { type: "object", default: {} },
          innerContents: { type: "object" },
          tagName: { type: "string", default: "div" },
        },
        example: { innerBlocks: templateBlocks },
        deprecated: deprecatedData.map((item) => ({
          ...item,
          attributes: { boldblocks: { type: "object", default: {} } },
          supports: { ...blockSupports, ...(item?.supports ?? {}) },
          save: saveChildBlock(item?.supports ?? {}),
        })),
        transforms: isTransformable
          ? buildTransforms(
              name,
              layoutType ? `${layoutType}Item` : "standalone",
            )
          : null,
        edit(props) {
          const {
            clientId,
            attributes: { innerContents = {}, tagName: Tag = "div" } = {},
            context: { "cbb/isSyncedBlock": isInsideSyncedBlock = false },
          } = props;

          const ref = useRef();
          const blockProps = useBlockProps({
            ref,
            className: blockClass,
            attributes: {},
          });

          const { getBlocks } = useSelect(
            (select) => select(blockEditorStore),
            [],
          );

          const {
            setBlockEditingMode,
            replaceInnerBlocks,
            __unstableMarkNextChangeAsNotPersistent,
          } = useDispatch(blockEditorStore);

          const innerBlocks = useMemo(() => {
            let innerTemplates = isSyncedBlockOverrides
              ? applyInitialContentValuesToInnerBlocks(
                  templateBlocks,
                  innerContents, // Don't add it to the dependency list
                )
              : templateBlocks;

            return isSyncedBlock
              ? createBlocksFromInnerBlocksTemplate(innerTemplates)
              : getBlocks(clientId);
          }, [isSyncedBlock, isSyncedBlockOverrides, templateBlocks, clientId]);
          const hasInnerBlocks = innerBlocks?.length;

          // Replace with the real content
          useEffect(() => {
            if (!isSyncedBlock) {
              return;
            }

            __unstableMarkNextChangeAsNotPersistent();
            replaceInnerBlocks(clientId, innerBlocks);
          }, [isSyncedBlock, clientId, innerBlocks]);

          useEffect(() => {
            if (isSyncedBlock) {
              // Set edit mode
              setBlockEditMode(
                setBlockEditingMode,
                innerBlocks,
                !isSyncedBlockOverrides ||
                  isInsideSyncedBlock ||
                  props.name === variationBlockName
                  ? "disabled"
                  : undefined,
              );
            }
          }, [
            isSyncedBlock,
            innerBlocks,
            isSyncedBlockOverrides,
            isInsideSyncedBlock,
            props.name,
            variationBlockName,
            setBlockEditMode,
            setBlockEditingMode,
          ]);

          const { children, ...innerBlocksProps } = useInnerBlocksProps(
            blockProps,
            {
              template,
              allowedBlocks: allowedBlocks?.length ? allowedBlocks : null,
              templateLock,
              renderAppender: templateLock
                ? false
                : hasInnerBlocks
                ? undefined
                : InnerBlocks.ButtonBlockAppender,
              layout: getLayout(`${layoutType}Item`, props, false),
            },
          );

          const hasVariations = useSelect(
            (select) => select(blocksStore).getBlockVariations(name).length > 0,
            [name],
          );

          if (enableVariationPicker && hasVariations && !hasInnerBlocks) {
            return <Placeholder {...props} allowSkip={true} />;
          }

          const isDisabledContext = isSyncedBlock && !isSyncedBlockOverrides;
          const Wrapper = isDisabledContext ? Disabled : Fragment;
          const wrapperProps = isDisabledContext ? { isDisabled: true } : {};

          const contentsRef = useValueRef(innerContents);
          const contextValue = useMemo(() => {
            return isSyncedBlockOverrides
              ? {
                  "cbb/isSyncedBlock": true,
                  "cbb/syncedBlockId": clientId,
                  "cbb/overrides": contentsRef.current,
                }
              : {};
          }, [isSyncedBlockOverrides, clientId, contentsRef.current]);

          return (
            <BlockContextProvider value={contextValue}>
              {applyFilters("boldblocks.edit.blockEditInner", null, {
                ...props,
                ref,
              })}
              <Tag {...innerBlocksProps}>
                <Wrapper {...wrapperProps}>
                  {applyFilters(
                    "boldblocks.edit.blockInner",
                    null,
                    { ...props, ref },
                    true,
                  )}
                  {renderBlockInner(`${layoutType}Item`, children, props, true)}
                </Wrapper>
              </Tag>
            </BlockContextProvider>
          );
        },
        save: saveChildBlock(),
      };

      if (parent && !standalone) {
        blockSettings.parent = [parent.name];
      }

      registerBlockType(name, blockSettings);

      // Register the repeater block if neccessary.
      if (parent) {
        const {
          title: parentTitle,
          description: parentDescription,
          nestedItemCount,
          blockIcon: parentBlockIcon,
          blockSupports: parentBoldBlocksSupports = {},
          blockAttributes: parentBlockAttributes = [],
          enableVariationPicker: parentEnableVariationPicker,
        } = parent;

        const { className: parentClassName = "" } = parent;

        // Sanizite class string
        const parentBlockClass = clsx(
          "wp-block-boldblocks-custom-parent",
          { [`is-${layoutType}`]: layoutType },
          sanitizeClassString(parentClassName),
        );

        // Separate save function to re-use it in deprecated.
        const saveParentBlock =
          (supports = {}) =>
          (props) => {
            const { attributes: { tagName: Tag = "div" } = {} } = props;
            return (
              <Tag
                {...useBlockProps.save({
                  className: parentBlockClass,
                })}
              >
                <>
                  {applyFilters("boldblocks.save.blockInner", null, {
                    ...props,
                    name: parentName,
                    supports,
                  })}
                  {renderBlockInner(layoutType, <InnerBlocks.Content />)}
                </>
              </Tag>
            );
          };

        const hasFixedNestedItems =
          nestedItemCount && parseInt(nestedItemCount, 10) > 0;

        let parentBlockInfo = {
          id,
          name: parentName,
          childName: name,
          templateLock: hasFixedNestedItems ? "Insert" : "None",
          layoutType,
        };

        const parentBlockSupports = {
          ...CBBCoreBlockSupports,
          ...parentCoreSpacing,
          filter: {
            duotone: parentBoldBlocksSupports?.background,
            __experimentalDefaultControls: { duotone: false },
          },
          align: ["wide", "full"],
          layout: layoutType === "vstack",
          boldblocks: {
            ...parentBoldBlocksSupports,
            ...sharedSupports,
            blockAttributes: parentBlockAttributes,
            layoutType,
            blockInfo: parentBlockInfo,
          },
        };

        const parentBlockSettings = {
          apiVersion: 3,
          category: "boldblocks",
          title: parentTitle,
          description: parentDescription,
          icon: parentBlockIcon ? (
            <InlineSVG
              markup={parentBlockIcon}
              sanitizeAttribute={limitSVGDimension}
            />
          ) : (
            blockDefault
          ),
          supports: parentBlockSupports,
          providesContext: {
            "boldblocks/boldblocks": "boldblocks",
          },
          usesContext: ["postId", "postType"],
          attributes: {
            boldblocks: { type: "object", default: {} },
            tagName: { type: "string", default: "div" },
          },
          example: {
            innerBlocks: [
              {
                name,
                innerBlocks: templateBlocks,
              },
            ],
          },
          deprecated: deprecatedData.map((item) => ({
            ...item,
            attributes: { boldblocks: { type: "object", default: {} } },
            supports: { ...parentBlockSupports, ...(item?.supports ?? {}) },
            save: saveParentBlock(item?.supports ?? {}),
          })),
          transforms: isTransformable
            ? buildTransforms(parentName, layoutType, name)
            : null,
          edit(props) {
            const { clientId, attributes: { tagName: Tag = "div" } = {} } =
              props;

            let parentTemplate = [];
            if (hasFixedNestedItems) {
              for (
                let i = 0, count = parseInt(nestedItemCount);
                i < count;
                i++
              ) {
                parentTemplate.push([name]);
              }
            } else {
              parentTemplate = [[name]];
            }

            const hasVariations = useSelect(
              (select) =>
                select(blocksStore).getBlockVariations(parentName).length > 0,
              [parentName],
            );

            const ref = useRef();
            const blockProps = useBlockProps({
              ref,
              className: parentBlockClass,
            });

            const hasInnerBlocks = useSelect(
              (select) => !!select(blockEditorStore).getBlocks(clientId).length,
              [clientId],
            );

            const { children, ...innerBlocksProps } = useInnerBlocksProps(
              blockProps,
              {
                template: parentTemplate,
                allowedBlocks: [name],
                templateLock: hasFixedNestedItems ? "insert" : false,
                orientation:
                  layoutType === "grid" || layoutType === "carousel"
                    ? "horizontal"
                    : null,
                renderAppender: hasFixedNestedItems
                  ? false
                  : hasInnerBlocks
                  ? undefined
                  : InnerBlocks.ButtonBlockAppender,
                layout: getLayout(layoutType, props, true),
              },
            );

            if (
              parentEnableVariationPicker &&
              !hasInnerBlocks &&
              !hasFixedNestedItems &&
              hasVariations
            ) {
              return <Placeholder {...props} allowSkip={true} />;
            }

            return (
              <>
                {applyFilters("boldblocks.edit.blockEditInner", null, {
                  ...props,
                  ref,
                })}
                <Tag {...innerBlocksProps}>
                  <>
                    {applyFilters(
                      "boldblocks.edit.blockInner",
                      null,
                      { ...props, ref },
                      true,
                    )}
                    {renderBlockInner(layoutType, children, props, true)}
                  </>
                </Tag>
              </>
            );
          },
          save: saveParentBlock(),
        };

        registerBlockType(parentName, parentBlockSettings);
      }
    },
  );
}
