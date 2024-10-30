/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import { useEffect } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import { store as blockEditorStore } from "@wordpress/block-editor";
import { store as editorStore } from "@wordpress/editor";

/**
 * Internal dependencies
 */

const updatePreviewFrame = (iframeNode, wrapperClass = "") => {
  if (iframeNode && iframeNode.nodeName.toLowerCase() === "iframe") {
    const wapperPreview = iframeNode?.contentWindow?.document?.body?.firstChild;
    if (wapperPreview) {
      iframeNode.contentWindow.document.body.classList.add(
        "editor-styles-wrapper",
      );
      iframeNode.contentWindow.document.body.style.background = "transparent";
      wapperPreview.classList.add(
        wrapperClass ? wrapperClass : "cbb-html-preview",
      );

      const wrapperNode = iframeNode.closest(".wp-block-boldblocks-custom");
      if (wrapperNode && wrapperNode.style.cssText) {
        wapperPreview.style.cssText = wrapperNode.style.cssText;
      }
    }
  }
};

/**
 * This adds class, style for the feature.
 *
 * @param {Function} BlockListBlock Original component.
 *
 * @return {Function} Wrapped component.
 */
export const withHTMLClassStyles = createHigherOrderComponent(
  (BlockListBlock) => (props) => {
    if (props?.name !== "core/html") {
      return <BlockListBlock {...props} />;
    }

    const { clientId } = props;

    const { currentPostType, currentPostSlug } = useSelect((select) => {
      const { getCurrentPostType, getEditedPostSlug } = select(editorStore);
      return {
        currentPostType: getCurrentPostType(),
        currentPostSlug: getEditedPostSlug(),
      };
    }, []);

    const parentBlockName = useSelect(
      (select) => {
        const { getBlock, getBlockParents, getBlocks } =
          select(blockEditorStore);
        const blocks = getBlockParents(clientId, true);
        if (blocks?.length) {
          const { name } = getBlock(blocks[0]);
          if (name.startsWith("boldblocks/")) {
            return `wp-block-${name.replace("/", "-")}`;
          }
        } else {
          if (
            getBlocks()?.length === 1 &&
            currentPostType === "boldblocks_block"
          ) {
            return `wp-block-boldblocks-${currentPostSlug}`;
          }
        }

        return "";
      },
      [clientId, currentPostType],
    );

    useEffect(() => {
      const selector = `block-${clientId}`;
      let targetNode = document.getElementById(selector);
      if (!targetNode) {
        const editorCanvas = document.querySelector(
          'iframe[name="editor-canvas"]',
        );
        if (editorCanvas) {
          targetNode =
            editorCanvas.contentWindow.document.getElementById(selector);
        }
      }

      if (!targetNode) {
        return;
      }

      updatePreviewFrame(targetNode?.firstChild, parentBlockName);

      // Create a MutationObserver instance
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation?.addedNodes?.length) {
            updatePreviewFrame(mutation.addedNodes[0], parentBlockName);
          }
        });
      });

      // Configure the observer to observe attribute changes
      const config = { childList: true };

      // Start observing the target node for mutations
      observer.observe(targetNode, config);

      return () => observer.disconnect();
    }, [clientId]);

    return (
      <>
        <BlockListBlock {...props} />
      </>
    );
  },
);
addFilter(
  "editor.BlockListBlock",
  `boldblocks/coreHTML/withHTMLClassStyles`,
  withHTMLClassStyles,
);
