/**
 * WordPress dependencies
 */
import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import { useBlockEditingMode } from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";
import { store as editorStore } from "@wordpress/editor";
import { useEntityProp } from "@wordpress/core-data";

/**
 * Internal dependencies
 */
import { CBB_BLOCK_TYPE } from "../../utils/constants";
import BlockOverridesControls from "./block-overrides-controls";

/**
 * Overrides panel
 */
import { isSupportedBlock } from "./utils";
import "./overrides-panel";
import "./bindings-attributes";

/**
 * Override the default edit UI to include a new block inspector control for
 * assigning a partial syncing controls to supported blocks in the block editor.
 *
 * @param {Component} BlockEdit Original component.
 *
 * @return {Component} Wrapped component.
 */
const withBlockOverrideControls = createHigherOrderComponent(
  (BlockEdit) => (props) => {
    return (
      <>
        <BlockEdit {...props} />
        {props.isSelected && isSupportedBlock(props.name) && (
          <OverridesInspectorControls {...props} />
        )}
      </>
    );
  },
);

// Split into a separate component to avoid it run on every block.
function OverridesInspectorControls(props) {
  const { getCurrentPostType } = useSelect((select) => select(editorStore), []);

  if (CBB_BLOCK_TYPE !== getCurrentPostType()) {
    return null;
  }

  const blockEditingMode = useBlockEditingMode();
  const shouldShowBlockOverridesControls = blockEditingMode === "default";

  const [meta] = useEntityProp("postType", CBB_BLOCK_TYPE, "meta");
  const { boldblocks_is_readonly: isSyncedBlock = false } = meta;

  if (!isSyncedBlock) {
    return null;
  }

  return (
    <>
      {shouldShowBlockOverridesControls && (
        <BlockOverridesControls {...props} />
      )}
    </>
  );
}

addFilter(
  "editor.BlockEdit",
  "cbb/blockOverrides/with-block-override-controls",
  withBlockOverrideControls,
);
