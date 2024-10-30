/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";

/**
 * Internal dependencies
 */
import { CustomStyleEditor } from "../components/dependent-resources";
import { labels } from "../utils/labels";

/**
 * Render settings for custom styles
 */
addFilter(
  "boldblocks.manageVariations.customStyle",
  "boldblocks/freeview",
  (content, { customStyle }) => {
    let controls = null;
    if (customStyle) {
      controls = (
        <CustomStyleEditor
          id="variation-custom-style"
          value={customStyle}
          resourceType="stylesheet"
        />
      );
    } else {
      controls = <p>{labels.customCSSHelp}</p>;
    }
    return (
      <>
        {content}
        {controls}
      </>
    );
  },
);
