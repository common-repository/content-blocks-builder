/**
 * External dependencies
 */
import { map, isObject, isArray, isUndefined, isEmpty } from "lodash";

/**
 * WordPress dependencies
 */
import { __, sprintf } from "@wordpress/i18n";
import { useSelect, useDispatch } from "@wordpress/data";
import { registerPlugin } from "@wordpress/plugins";
import { useEffect, useMemo } from "@wordpress/element";
import {
  getBlockTypes,
  unregisterBlockType,
  unregisterBlockVariation,
} from "@wordpress/blocks";
import { store as noticesStore } from "@wordpress/notices";

/**
 * Internal dependencies
 */
import { log } from "sdk/utils";
import {
  getDependentBlockTypes,
  getVariationDependentBlockTypes,
  hasMissingBlocks,
  getEditPostURL,
  getNoticeActions,
  userCanManagePlugins,
} from "../utils";
import { store as boldblocksDataStore } from "../store";
import { shareLabels } from "../utils/shared-labels";

/**
 * Disable blocks if they have missing blocks
 */
registerPlugin("boldblocks-disable-blocks-with-missing-blocks", {
  render: () => {
    const { createWarningNotice } = useDispatch(noticesStore);
    const { getMissingBlockStatus } = useSelect(
      (select) => select(boldblocksDataStore),
      [],
    );
    const { loadMissingBlock, setMissingBlockStatus } =
      useDispatch(boldblocksDataStore);
    const canManagePlugins = userCanManagePlugins();

    const missingBlocks = useMemo(() => {
      const availableBlockTypes = getBlockTypes();
      const availableBlockNames = map(availableBlockTypes, "name");

      return (window?.BoldBlocksBlocks?.blocks ?? []).reduce(
        (prev, { id, name, title, blocks: rawBlocks, dependentBlocks }) => {
          if (!isArray(dependentBlocks) || !dependentBlocks.length) {
            let blocks;
            try {
              blocks = JSON.parse(rawBlocks);
            } catch (error) {
              log(error, "error");
            }

            if (blocks && isArray(blocks)) {
              dependentBlocks = getDependentBlockTypes(blocks, []);
            }
          }

          if (isArray(dependentBlocks) && !!dependentBlocks.length) {
            const missingBlock = hasMissingBlocks(
              dependentBlocks,
              availableBlockNames,
            );
            if (missingBlock) {
              prev.push({
                id,
                name,
                title,
                missingBlock,
              });
            }
          }

          return prev;
        },
        [],
      );
    }, []);

    useEffect(() => {
      if (!!missingBlocks.length) {
        missingBlocks.forEach((block) => {
          const { name } = block;
          unregisterBlockType(name);
        });
      }
    }, []);

    useEffect(() => {
      // The variable has been loaded and has some missing blocks
      if (!isUndefined(canManagePlugins) && !!missingBlocks.length) {
        missingBlocks.forEach(async (block) => {
          const { id, name, missingBlock } = block;
          const noticeId = `block-${id}`;
          if (!getMissingBlockStatus(noticeId)) {
            let actions = [
              {
                label: sprintf(shareLabels.editItem, shareLabels.block),
                url: getEditPostURL(id),
              },
            ];
            const filterValue = `block:${missingBlock}`;

            const noticeMessage = sprintf(
              __(
                "The block %s has been disabled because it contains a missing block %s.",
                "content-blocks-builder",
              ),
              name,
              missingBlock,
            );

            log(noticeMessage, "warn");

            let plugin;
            try {
              plugin = await loadMissingBlock(filterValue);
            } catch (error) {
              log(error, "error");
            }

            if (plugin && !isEmpty(plugin)) {
              actions.push(...getNoticeActions(plugin));
            }

            createWarningNotice(noticeMessage, { actions });
            setMissingBlockStatus(noticeId);
          }
        });
      }
    }, [canManagePlugins, missingBlocks.length]);

    return null;
  },
});

/**
 * Disable variations if they have missing blocks
 */
registerPlugin("boldblocks-disable-variations-with-missing-blocks", {
  render: () => {
    const { createWarningNotice } = useDispatch(noticesStore);
    const { getMissingBlockStatus } = useSelect(
      (select) => select(boldblocksDataStore),
      [],
    );
    const { loadMissingBlock, setMissingBlockStatus } =
      useDispatch(boldblocksDataStore);
    const canManagePlugins = userCanManagePlugins();

    const missingVariations = useMemo(() => {
      const availableBlockTypes = getBlockTypes();
      const availableBlockNames = map(availableBlockTypes, "name");

      return (window?.BoldBlocksVariations ?? []).reduce(
        (
          prev,
          { id, blockName, variationName, variationData, dependentBlocks },
        ) => {
          if (!isArray(dependentBlocks) || !dependentBlocks.length) {
            let variation;
            try {
              ({ variation } = JSON.parse(variationData));
            } catch (error) {
              log(error, "error");
            }

            if (variation && isObject(variation)) {
              const { innerBlocks = [] } = variation;
              dependentBlocks = getVariationDependentBlockTypes(
                innerBlocks,
                [],
              );
            }
          }

          if (isArray(dependentBlocks) && !!dependentBlocks.length) {
            const missingBlock = hasMissingBlocks(
              dependentBlocks,
              availableBlockNames,
            );
            if (missingBlock) {
              prev.push({
                id,
                variationName,
                blockName,
                missingBlock,
              });
            }
          }

          return prev;
        },
        [],
      );
    }, []);

    useEffect(() => {
      if (!!missingVariations.length) {
        missingVariations.forEach((variation) => {
          const { blockName, variationName } = variation;
          unregisterBlockVariation(blockName, variationName);
        });
      }
    }, []);

    useEffect(() => {
      if (!isUndefined(canManagePlugins) && !!missingVariations.length) {
        missingVariations.forEach(async (variation) => {
          const { id, missingBlock, variationName: name } = variation;

          const noticeId = `variation-${id}`;
          if (!getMissingBlockStatus(noticeId)) {
            let actions = [
              {
                label: sprintf(shareLabels.editItem, shareLabels.variation),
                url: getEditPostURL(id),
              },
            ];

            const noticeMessage = sprintf(
              __(
                "The variation %s has been disabled because it contains a missing block %s.",
                "content-blocks-builder",
              ),
              name,
              missingBlock,
            );

            log(noticeMessage, "warn");

            const filterValue = `block:${missingBlock}`;

            let plugin;
            try {
              plugin = await loadMissingBlock(filterValue);
            } catch (error) {
              log(error, "error");
            }

            if (plugin && !isEmpty(plugin)) {
              actions.push(...getNoticeActions(plugin));
            }

            createWarningNotice(noticeMessage, { actions });
            setMissingBlockStatus(noticeId);
          }
        });
      }
    }, [canManagePlugins, missingVariations.length]);

    return null;
  },
});
