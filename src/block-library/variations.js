/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import domReady from "@wordpress/dom-ready";
import { createRoot } from "@wordpress/element";
import { registerCoreBlocks } from "@wordpress/block-library";

/**
 * Internal dependencies
 */
import LibraryPage from "./library-page";

// Register core blocks.
registerCoreBlocks();

/**
 * Kick start
 */
domReady(() => {
  createRoot(document.querySelector(".js-boldblocks-settings-root")).render(
    <LibraryPage contentType="variation" className="is-library-page" />,
  );
});
