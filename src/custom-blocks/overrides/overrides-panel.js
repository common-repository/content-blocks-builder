/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { store as blockEditorStore } from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";
import { useMemo } from "@wordpress/element";
import { registerPlugin } from "@wordpress/plugins";
import {
  PluginDocumentSettingPanel,
  store as editorStore,
} from "@wordpress/editor";
import { useEntityProp } from "@wordpress/core-data";

/**
 * Internal dependencies
 */
import { CBB_BLOCK_TYPE } from "../../utils/constants";
import { isOverridableBlock } from "./utils";
import BlockQuickNavigation from "./block-quick-navigation";
import { labels } from "../../utils/labels";

export default function OverridesPanel() {
  const allClientIds = useSelect(
    (select) => select(blockEditorStore).getClientIdsWithDescendants(),
    [],
  );
  const { getBlock } = useSelect(blockEditorStore);
  const clientIdsWithOverrides = useMemo(
    () =>
      allClientIds.filter((clientId) => {
        const block = getBlock(clientId);
        return isOverridableBlock(block);
      }),
    [allClientIds, getBlock],
  );

  return <BlockQuickNavigation clientIds={clientIdsWithOverrides} />;
}

/**
 * Register the block overrides panel.
 */
registerPlugin("boldblocks-block-overrides", {
  render: () => {
    const { getCurrentPostType } = useSelect(
      (select) => select(editorStore),
      [],
    );

    // Only display the panel for the block content type
    if (getCurrentPostType() !== CBB_BLOCK_TYPE) {
      return null;
    }

    // Get meta, setMeta
    const [meta] = useEntityProp("postType", CBB_BLOCK_TYPE, "meta");
    const { boldblocks_is_readonly: isSynced = false } = meta;

    // Don't display the panel if the block is not synced.
    if (!isSynced) {
      return null;
    }

    return (
      <>
        <PluginDocumentSettingPanel
          name="block-overrides"
          title={labels.overrides}
          initialOpen={true}
        >
          <OverridesPanel />
        </PluginDocumentSettingPanel>
      </>
    );
  },
});
