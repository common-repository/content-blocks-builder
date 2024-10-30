/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { _n, sprintf, __ } from "@wordpress/i18n";
import { speak } from "@wordpress/a11y";
import { useCallback } from "@wordpress/element";
import { useSelect, useDispatch } from "@wordpress/data";
import { store as blockEditorStore } from "@wordpress/block-editor";
import { isUnmodifiedDefaultBlock, cloneBlock } from "@wordpress/blocks";
import { store as noticesStore } from "@wordpress/notices";

/**
 * Internal dependencies
 */
import { store as libraryDataStore } from "../store";

/**
 * Get templates modal status
 *
 * @returns {String}
 */
export function getPatternInserterModalStatus() {
  return useSelect(
    (select) => select(libraryDataStore).getPatternInserterModalStatus(),
    [],
  );
}

/**
 * Set templates modal status
 */
export function getSetPatternInserterModalStatus() {
  const { setPatternInserterModalStatus } = useDispatch(libraryDataStore);

  return setPatternInserterModalStatus;
}

/**
 * Returns the insertion point state given the inserter config.
 *
 * @param {WPInserterConfig} config Inserter Config.
 * @return {Array} Insertion Point State (rootClientID, onInsertBlocks).
 */
export function useInsertionPoint({ shouldFocusBlock = true }) {
  const { getSelectedBlock } = useSelect(blockEditorStore);
  const { destinationRootClientId, destinationIndex } = useSelect((select) => {
    const {
      getSelectedBlockClientId,
      getBlockRootClientId,
      getBlockIndex,
      getBlockOrder,
    } = select(blockEditorStore);
    const selectedBlockClientId = getSelectedBlockClientId();

    let _destinationRootClientId;
    let _destinationIndex;

    if (selectedBlockClientId) {
      _destinationRootClientId = getBlockRootClientId(selectedBlockClientId);
      _destinationIndex = getBlockIndex(selectedBlockClientId) + 1;
    } else {
      // Insert at the end of the list.
      _destinationIndex = getBlockOrder(_destinationRootClientId).length;
    }

    return {
      destinationRootClientId: _destinationRootClientId,
      destinationIndex: _destinationIndex,
    };
  }, []);

  const { replaceBlocks, insertBlocks } = useDispatch(blockEditorStore);

  const onInsertBlocks = useCallback(
    (blocks, meta, shouldForceFocusBlock = false) => {
      const selectedBlock = getSelectedBlock();

      if (selectedBlock && isUnmodifiedDefaultBlock(selectedBlock)) {
        replaceBlocks(
          selectedBlock.clientId,
          blocks,
          null,
          shouldFocusBlock || shouldForceFocusBlock ? 0 : null,
          meta,
        );
      } else {
        insertBlocks(
          blocks,
          destinationIndex,
          destinationRootClientId,
          true,
          shouldFocusBlock || shouldForceFocusBlock ? 0 : null,
          meta,
        );
      }
      const blockLength = Array.isArray(blocks) ? blocks.length : 1;
      const message = sprintf(
        // translators: %d: the name of the block that has been added
        _n("%d block added.", "%d blocks added.", blockLength),
        blockLength,
      );
      speak(message);
    },
    [
      getSelectedBlock,
      replaceBlocks,
      insertBlocks,
      destinationRootClientId,
      destinationIndex,
      shouldFocusBlock,
    ],
  );

  const { createSuccessNotice } = useDispatch(noticesStore);
  const onInsertPattern = useCallback(
    (pattern, blocks) => {
      onInsertBlocks(
        (blocks ?? []).map((block) => cloneBlock(block)),
        pattern.title,
      );

      createSuccessNotice(
        sprintf(
          /* translators: %s: block pattern title. */
          __('Block pattern "%s" inserted.', "content-blocks-builder"),
          pattern.title,
        ),
        {
          type: "snackbar",
        },
      );
    },
    [createSuccessNotice, onInsertBlocks],
  );

  return [destinationRootClientId, onInsertPattern];
}
