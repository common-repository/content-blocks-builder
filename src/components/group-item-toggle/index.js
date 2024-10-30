/**
 * External dependencies
 */
import clsx from "clsx";
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */
import { Icon, chevronDown } from "@wordpress/icons";

/**
 * Internal dependencies
 */

const GroupItemToggleStyled = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0 !important;

  h2 {
    margin: 0;
  }

  .icon {
    margin-left: auto;
    line-height: 1;
  }

  &.is-opened {
    svg {
      transform: rotate(180deg);
    }
  }

  &.is-closed ~ * {
    display: none;
  }
`;

export const GroupItemToggle = ({ isOpen, setIsOpen, label, className }) => {
  if (!label) {
    return null;
  }

  return (
    <GroupItemToggleStyled
      className={clsx("group-item-toggle", className, {
        "is-opened": isOpen,
        "is-closed": !isOpen,
      })}
    >
      <h2>{label}</h2>
      <a className="icon" onClick={() => setIsOpen(!isOpen)} href="#">
        <Icon icon={chevronDown} />
      </a>
    </GroupItemToggleStyled>
  );
};
