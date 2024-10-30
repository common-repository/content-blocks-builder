/**
 * External dependencies
 */
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { close, help } from "@wordpress/icons";
import { Button } from "@wordpress/components";

/**
 * Internal dependencies
 */
import { shareLabels } from "../../../src/utils/shared-labels";

const HeaderActionsControlStyled = styled.div`
  display: flex;

  button {
    width: 40px;
    height: 40px;
  }
`;

/**
 * Header actions control
 *
 * @param {Object} props
 * @returns
 */
export const HeaderActionsControl = ({
  isOpenHelp,
  onToggleHelp,
  onCloseModal,
}) => {
  return (
    <HeaderActionsControlStyled className="template-header__actions">
      <Button
        className="template-header__help"
        onClick={onToggleHelp}
        icon={isOpenHelp ? close : help}
        iconSize={40}
        label={__("Toggle help", "content-blocks-builder")}
        aria-expanded={isOpenHelp}
      />
      {onCloseModal && (
        <Button
          className="template-header__close"
          onClick={onCloseModal}
          icon={close}
          iconSize={40}
          label={shareLabels.closeModal}
        />
      )}
    </HeaderActionsControlStyled>
  );
};
