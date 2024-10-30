/**
 * External dependencies
 */
import { noop } from "lodash";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import {
  TextControl,
  Button,
  Modal,
  Flex,
  FlexItem,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import { shareLabels } from "../../utils/shared-labels";

/**
 * Form for adding custom variation
 *
 * @param {BlockEditModalProps} props Component props.
 *
 * @return {WPComponent}.
 */
export default function BlockEditModal({
  modalTitle,
  title: initialTitle,
  titleHelp,
  setIsModalOpen,
  onSubmit = noop,
  onCancel = noop,
  className,
}) {
  const [title, setTitle] = useState(initialTitle);

  // Handle modal close event.
  const closeModal = () => {
    setIsModalOpen(false);
    setTitle("");
    onCancel();
  };

  return (
    <Modal
      title={modalTitle}
      closeLabel={shareLabels.closeModal}
      onRequestClose={() => closeModal()}
      overlayClassName="reusable-blocks-menu-items__convert-modal"
      className={className}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(title);

          closeModal();
        }}
      >
        <TextControl
          label={shareLabels.name}
          value={title}
          onChange={setTitle}
          help={titleHelp}
          className="title-input"
        />
        <Flex
          className="reusable-blocks-menu-items__convert-modal-actions"
          justify="flex-end"
        >
          <FlexItem>
            <Button variant="secondary" onClick={() => closeModal()}>
              {shareLabels.cancel}
            </Button>
          </FlexItem>
          <FlexItem>
            <Button variant="primary" type="submit" disabled={!title}>
              {shareLabels.save}
            </Button>
          </FlexItem>
        </Flex>
      </form>
    </Modal>
  );
}
