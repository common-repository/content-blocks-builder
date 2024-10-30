/**
 * External dependencies
 */
import clsx from "clsx";

/**
 * WordPress dependencies
 */
import { Icon, help, close } from "@wordpress/icons";
import { useState } from "@wordpress/element";

/**
 * Internal dependencies
 */
import { LabelControl } from "sdk/components";
import { LabelHelpControlStyled } from "./styles";

export const LabelHelpControl = ({
  label,
  isOpen = false,
  helpControls = null,
  isAtTop = true,
}) => {
  const [isOpenHelp, setIsOpenHelp] = useState(isOpen);
  return (
    <LabelHelpControlStyled
      className={clsx("label-help", { "at-top": isAtTop })}
    >
      <div
        className="label-help__header"
        onClick={() => {
          setIsOpenHelp(!isOpenHelp);
        }}
      >
        <LabelControl label={label} isResponsive={false} isBold={true} />
        <a className={clsx("toggle-help", { "is-open": isOpenHelp })}>
          <span className="help">
            <Icon icon={help} />
          </span>
          <span className="close">
            <Icon icon={close} />
          </span>
        </a>
      </div>
      {isOpenHelp && <div className="label-help__body">{helpControls}</div>}
    </LabelHelpControlStyled>
  );
};
