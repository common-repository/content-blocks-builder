/**
 * External dependencies
 */
import { isEmpty, isUndefined, isString, isNil } from "lodash";

/**
 * Internal dependencies
 */
import {
  isValidSettingObject,
  getStyleForResponsiveToggleGroupField,
  getColorCSSValue,
  isUnsetValue,
} from "sdk/utils";

export const COLLAPSE = "collapse";
export const MODAL = "modal";
export const OFFCANVAS = "offcanvas";
export const POPOVER = "popover";

export const getToggleDataSet = (toggle, CSSId = "") => {
  let dataset = {};
  if (toggle?.enable) {
    const type = toggle?.type ?? COLLAPSE;
    const initialState =
      type !== POPOVER ? toggle?.initialState ?? "hidden" : "hidden";
    dataset = {
      "data-toggle-element": toggle?.toggleElement,
      "data-toggle-type": type,
      "data-toggle-state": initialState,
    };

    if (toggle?.focusFirstElement) {
      dataset["data-toggle-focus-first-element"] = true;
    }

    if (type === COLLAPSE) {
      if (
        toggle?.transitionProperty &&
        toggle?.transitionProperty === "width"
      ) {
        dataset["data-transition-property"] = "width";
      }
    } else if ([MODAL, OFFCANVAS, POPOVER].includes(type)) {
      let modal = {};
      if (toggle?.title) {
        modal["title"] = toggle.title;
      }

      if (toggle?.hideCloseButton) {
        modal["hideCloseButton"] = true;
      } else {
        if (toggle?.closeButtonColor) {
          modal["closeButtonColor"] = getColorCSSValue(toggle.closeButtonColor);
        }
      }

      if (CSSId) {
        modal["selector"] = `b-${CSSId}-modal`;
      }

      if (toggle?.disableBackdrop) {
        modal["disableBackdrop"] = toggle.disableBackdrop;
      }

      if (toggle?.forceCloseButtons) {
        modal["forceCloseButtons"] = toggle.forceCloseButtons;
      }

      if (type === OFFCANVAS) {
        modal["placement"] = toggle?.placement ?? "start";
      }

      let modalStyle = {};
      let style = {};

      if (type === MODAL && toggle?.modalPosition) {
        const positionStyle = buildModalPositionStyle(toggle.modalPosition);
        if (!isEmpty(positionStyle)) {
          modal["modalPosition"] = true;
          modalStyle = { ...modalStyle, ...positionStyle };
        }
      }

      if (type === POPOVER && toggle?.popoverPlacement) {
        modal["popoverPlacement"] = toggle.popoverPlacement;
      }

      if (
        !(type === OFFCANVAS && ["top", "bottom"].includes(modal["placement"]))
      ) {
        if (toggle?.width) {
          style = {
            ...style,
            ...getStyleForResponsiveToggleGroupField(
              toggle?.width,
              "modal-width"
            ),
          };
        }
      }

      if (
        !(type === OFFCANVAS && ["start", "end"].includes(modal["placement"]))
      ) {
        if (toggle?.height) {
          style = {
            ...style,
            ...getStyleForResponsiveToggleGroupField(
              toggle?.height,
              "modal-height"
            ),
          };
        }
      }

      if (!isEmpty(modalStyle)) {
        const cssText = Object.keys(modalStyle).reduce((previous, prop) => {
          return `${previous}${prop}:${modalStyle[prop]};`;
        }, "");

        modal["cssTextModal"] = cssText;
      }

      if (!isEmpty(style)) {
        const cssText = Object.keys(style).reduce((previous, prop) => {
          return `${previous}${prop}:${style[prop]};`;
        }, "");

        modal["cssText"] = cssText;
      }

      if (initialState === "custom") {
        if (toggle?.uniqueId) {
          modal["uniqueId"] = toggle.uniqueId;
        }

        if (toggle?.delayTime) {
          modal["delayTime"] = toggle.delayTime;
        }

        if (toggle?.storedTime && !isNil(toggle?.storedTime?.value)) {
          modal["storedTime"] = toggle.storedTime.value;
        }
      }

      if (toggle?.autoPlayVideo) {
        modal["autoPlayVideo"] = true;
      }

      if (toggle?.delayInnerAnimations) {
        modal["delayInnerAnimations"] = true;
      }

      dataset["data-toggle-modal-settings"] = JSON.stringify(modal);
    }
  }

  return dataset;
};

/**
 * Build modal position style
 *
 * @param {Object} position
 * @returns {Object}
 */
function buildModalPositionStyle(position) {
  let style = {};
  if (isValidSettingObject(position)) {
    Object.keys(position).forEach((breakpoint) => {
      let { value, inherit } = position[breakpoint];
      if (isUndefined(value)) {
        if (inherit && isString(inherit)) {
          const { value: inheritValue } = position[inherit] ?? {};
          if (!isUnsetValue(inheritValue)) {
            style = {
              ...style,
              [`--bb--modal-h-align--${breakpoint}`]: `var(--bb--modal-h-align--${inherit})`,
              [`--bb--modal-v-align--${breakpoint}`]: `var(--bb--modal-v-align--${inherit})`,
            };
          }
        }
      } else {
        if (!isUnsetValue(value)) {
          value = refinePosition(value);
          let hAlign = "center";
          if (["center", "top", "bottom"].includes(value)) {
            hAlign = "center";
          } else if (["top-start", "left", "bottom-start"].includes(value)) {
            hAlign = "start";
          } else if (["top-end", "right", "bottom-end"].includes(value)) {
            hAlign = "end";
          }

          let vAlign = "center";
          if (["center", "left", "right"].includes(value)) {
            vAlign = "center";
          } else if (["top-start", "top", "top-end"].includes(value)) {
            vAlign = "start";
          } else if (["bottom-start", "bottom", "bottom-end"].includes(value)) {
            vAlign = "end";
          }

          style = {
            ...style,
            [`--bb--modal-h-align--${breakpoint}`]: hAlign,
            [`--bb--modal-v-align--${breakpoint}`]: vAlign,
          };
        }
      }
    });
  }

  return style;
}

export const refinePosition = (value) =>
  value
    .replace("center-", "")
    .replace("-center", "")
    .replace("-left", "-start")
    .replace("-right", "-end");
