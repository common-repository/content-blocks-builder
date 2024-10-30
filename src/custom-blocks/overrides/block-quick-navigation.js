/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useSelect, useDispatch } from "@wordpress/data";
import {
  Button,
  Flex,
  FlexBlock,
  FlexItem,
  __experimentalVStack as VStack,
  __experimentalTruncate as Truncate,
} from "@wordpress/components";
import {
  __experimentalGetBlockLabel,
  store as blocksStore,
} from "@wordpress/blocks";
import { BlockIcon, store as blockEditorStore } from "@wordpress/block-editor";

/**
 * Internal dependencies
 */

export default function BlockQuickNavigation({ clientIds }) {
  return (
    <VStack spacing={1}>
      {!clientIds.length ? (
        <>{__("No overridable blocks.", "content-blocks-builder")}</>
      ) : (
        clientIds.map((clientId) => (
          <BlockQuickNavigationItem key={clientId} clientId={clientId} />
        ))
      )}
    </VStack>
  );
}

function BlockQuickNavigationItem({ clientId }) {
  const { name, icon, isSelected } = useSelect(
    (select) => {
      const {
        getBlockName,
        getBlockAttributes,
        isBlockSelected,
        hasSelectedInnerBlock,
      } = select(blockEditorStore);
      const { getBlockType } = select(blocksStore);

      const blockType = getBlockType(getBlockName(clientId));
      const attributes = getBlockAttributes(clientId);

      return {
        name:
          blockType &&
          __experimentalGetBlockLabel(blockType, attributes, "list-view"),
        icon: blockType?.icon,
        isSelected:
          isBlockSelected(clientId) ||
          hasSelectedInnerBlock(clientId, /* deep: */ true),
      };
    },
    [clientId],
  );
  const { selectBlock } = useDispatch(blockEditorStore);

  return (
    <Button isPressed={isSelected} onClick={() => selectBlock(clientId)}>
      <Flex>
        <FlexItem>
          <BlockIcon icon={icon} />
        </FlexItem>
        <FlexBlock style={{ textAlign: "left" }}>
          <Truncate>{name}</Truncate>
        </FlexBlock>
      </Flex>
    </Button>
  );
}
