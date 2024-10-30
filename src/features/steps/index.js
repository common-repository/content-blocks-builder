/**
 * External dependencies
 */
import clsx from "clsx";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { hasBlockSupport } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import {
  isValidSettingObject,
  getColorCSSValue,
  getColorCSSValueDeprecatedV1,
  addEditProps,
} from "sdk/utils";

import { boldblocksHasSupport } from "../../utils";

/**
 * Import styles
 */
import "./index.style.scss";

/**
 * Define feature name
 */
const featureName = "steps";

/**
 * Get styles for the feature.
 *
 * @param {Object} attributes
 * @param {Object}
 */
function getFeatureStyle(attributes, { isCSSColorDeprecatedV1 }) {
  const { boldblocks: { steps = {} } = {} } = attributes;

  let style = {};
  if (isValidSettingObject(steps)) {
    const {
      startAt = 0,
      increment = 1,
      width: { value: width = ".5em" } = {},
      fontSize: { value: fontSize = "2em" } = {},
      textColor,
      backgroundColor,
    } = steps;
    style = {
      ...style,
      "--bb--step-start": startAt + "",
      "--bb--step-increment": increment + "",
      "--bb--step-width": width,
      "--bb--step-font-size": fontSize,
    };

    let colorCSS;
    if (isCSSColorDeprecatedV1) {
      colorCSS = getColorCSSValueDeprecatedV1(textColor);
    } else {
      colorCSS = getColorCSSValue(textColor);
    }
    if (colorCSS) {
      style = { ...style, "--bb--step-color": colorCSS };
    }

    let bgCSS;
    if (isCSSColorDeprecatedV1) {
      bgCSS = getColorCSSValueDeprecatedV1(backgroundColor);
    } else {
      bgCSS = getColorCSSValue(backgroundColor);
    }
    if (bgCSS) {
      style = { ...style, "--bb--step-bg": bgCSS };
    }
  }

  return style;
}

/*
{
  steps: {
    enableSteps: false,
    startAt: 0,
    fontSize: { fontSize: "4em", value: "4em" },
    width: { width: ".5em", value: ".5em" },
    increment: 1,
    position: "left-middle",
    relativePosition: "outside",
    stepsType: "",
  },
}
*/

/**
 * Override props assigned to save component to inject the CSS variables definition.
 *
 * @param {Object} props      Additional props applied to save element.
 * @param {Object} blockType  Block type.
 * @param {Object} attributes Block attributes.
 *
 * @return {Object} Filtered props applied to save element.
 */
export function addSaveProps(props, blockType, attributes) {
  if (!boldblocksHasSupport(blockType, featureName)) {
    return props;
  }

  const { boldblocks: { steps = {} } = {} } = attributes;

  if (!isValidSettingObject(steps)) {
    return props;
  }

  // Bail if the steps is not enabled.
  if (!steps?.enableSteps) {
    return props;
  }

  const {
    relativePosition = "outside",
    position = "top-center",
    inheritStyle = false,
    stepsType = "",
  } = steps;

  props.className = clsx(props.className, "list-steps", {
    [`list-steps-${position}`]: position,
    [`list-steps-${relativePosition}`]: relativePosition,
    ["steps-inherit-style"]: inheritStyle,
    [`list-steps--${stepsType}`]: stepsType,
  });

  props.style = {
    ...props.style,
    ...getFeatureStyle(attributes, {
      isCSSColorDeprecatedV1: hasBlockSupport(
        blockType,
        "BoldBlocksDeprecatedCSSColorV1",
      ),
    }),
  };

  return props;
}
addFilter(
  "blocks.getSaveContent.extraProps",
  `boldblocks/${featureName}/addSaveProps`,
  addSaveProps,
);

/**
 * Filters registered block settings to extend the block edit wrapper
 * to apply the desired styles and className properly.
 *
 * @param {Object} settings Original block settings.
 *
 * @return {Object}.Filtered block settings.
 */
addFilter(
  "blocks.registerBlockType",
  `boldblocks/${featureName}/addEditProps`,
  addEditProps(
    addSaveProps,
    (settings, { featureName }) => boldblocksHasSupport(settings, featureName),
    { featureName },
  ),
);
