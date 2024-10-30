/**
 * WordPress dependencies
 */
import { __, sprintf } from "@wordpress/i18n";
import { speak } from "@wordpress/a11y";
import {
  Button,
  TextControl,
  Modal,
  __experimentalHStack as HStack,
  __experimentalVStack as VStack,
  __experimentalText as Text,
} from "@wordpress/components";
import { useState, useId } from "@wordpress/element";

/**
 * Internal dependencies
 */
import { labels } from "../../utils/labels";
import { shareLabels } from "../../utils/shared-labels";

export function AllowOverridesModal({
  placeholder,
  initialName = "",
  onClose,
  onSave,
}) {
  const [editedBlockName, setEditedBlockName] = useState(initialName);
  const descriptionId = useId();

  const isNameValid = !!editedBlockName.trim();

  const handleSubmit = () => {
    if (editedBlockName !== initialName) {
      const message = sprintf(
        /* translators: %s: new name/label for the block */
        __('Block name changed to: "%s".', "content-blocks-buider"),
        editedBlockName,
      );

      // Must be assertive to immediately announce change.
      speak(message, "assertive");
    }
    onSave(editedBlockName);

    // Immediate close avoids ability to hit save multiple times.
    onClose();
  };

  return (
    <Modal
      title={labels.enableOverrides}
      onRequestClose={onClose}
      focusOnMount="firstContentElement"
      aria={{ describedby: descriptionId }}
      size="small"
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();

          if (!isNameValid) {
            return;
          }

          handleSubmit();
        }}
      >
        <VStack spacing="6">
          <Text id={descriptionId}>
            {__(
              "Overrides are changes you make to a block within a synced block instance. Use overrides to customize a synced block instance to suit its new context. Name this block to specify an override.",
              "content-blocks-buider",
            )}
          </Text>
          <TextControl
            __next40pxDefaultSize
            value={editedBlockName}
            label={shareLabels.name}
            help={__(
              'For example, if you are creating a recipe block, you use "Recipe Title", "Recipe Description", etc.',
              "content-blocks-buider",
            )}
            placeholder={placeholder}
            onChange={setEditedBlockName}
          />
          <HStack justify="right">
            <Button __next40pxDefaultSize variant="tertiary" onClick={onClose}>
              {shareLabels.cancel}
            </Button>

            <Button
              __next40pxDefaultSize
              aria-disabled={!isNameValid}
              variant="primary"
              type="submit"
            >
              {__("Enable", "content-blocks-buider")}
            </Button>
          </HStack>
        </VStack>
      </form>
    </Modal>
  );
}

export function DisallowOverridesModal({ onClose, onSave }) {
  const descriptionId = useId();

  return (
    <Modal
      title={labels.disableOverrides}
      onRequestClose={onClose}
      aria={{ describedby: descriptionId }}
      size="small"
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSave();
          onClose();
        }}
      >
        <VStack spacing="6">
          <Text id={descriptionId}>
            {__(
              "Are you sure you want to disable overrides? Disabling overrides will revert all applied overrides for this block throughout instances of this block.",
              "content-blocks-buider",
            )}
          </Text>

          <HStack justify="right">
            <Button __next40pxDefaultSize variant="tertiary" onClick={onClose}>
              {shareLabels.cancel}
            </Button>

            <Button __next40pxDefaultSize variant="primary" type="submit">
              {__("Disable", "content-blocks-buider")}
            </Button>
          </HStack>
        </VStack>
      </form>
    </Modal>
  );
}
