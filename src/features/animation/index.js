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
import { isValidSettingObject, addEditProps, usePropsStyle } from "sdk/utils";
import { boldblocksHasSupport } from "../../utils";
import { animationNames } from "../premium-only/animation/animations";

/**
 * Define feature name
 */
export const featureName = "animation";

/**
 * Get styles for the feature.
 *
 * @param {Object} animationData
 */
function getAnimationStyle(animationData) {
  let style = {};
  if (isValidSettingObject(animationData)) {
    const {
      animationDuration,
      animationDelay,
      animationIterationCount,
      animationTimingFunction,
    } = animationData;

    style = {
      animationDuration,
      animationDelay,
      animationIterationCount,
    };
    if (animationTimingFunction) {
      style = { ...style, animationTimingFunction };
    }
  }

  return style;
}

/**
 * Get the data for the feature.
 *
 * @param {Object} animationValue
 */
function getFeatureData(animationValue, isDeprecatedV2 = false) {
  const { animations = [], animateMultipleTimes = false } = animationValue;

  let animationObject = {};

  // Bail if there is no valid animation
  if (animations.length) {
    if (isDeprecatedV2) {
      animationObject = getDeprecatedV2(animations, animateMultipleTimes);
    } else {
      animationObject = animations.reduce(
        (
          accumulator,
          {
            name,
            duration,
            delay = 0,
            repeat = 1,
            infinite = false,
            timingFunction,
          },
        ) => {
          const animationName = animationNames?.[name]?.name
            ? animationNames[name].name
            : name;
          if (!timingFunction && animationNames?.[name]?.timingFunction) {
            timingFunction = animationNames[name].timingFunction;
          }
          timingFunction = timingFunction ? ` ${timingFunction}` : "";
          const count = infinite ? "infinite" : repeat;

          const animation = `${animationName} ${duration}s${timingFunction} ${delay}s ${count}`;

          // Save animation
          accumulator.animation = accumulator?.animation
            ? `${accumulator.animation}, ${animation}`
            : animation;

          // Save the name
          accumulator.name = accumulator.name
            ? `${accumulator.name},${name}`
            : name;

          return accumulator;
        },
        {
          animation: "",
          name: "",
        },
      );

      animationObject.multipleTimes = animateMultipleTimes;
    }
  }

  return animationObject;
}

/**
 * The old animations
 * @param {Array} validAnimations
 * @param {Boolean} animateMultipleTimes
 */
function getDeprecatedV2(validAnimations, animateMultipleTimes) {
  // Build animation object
  let animationObject = validAnimations.reduce(
    (
      accumulator,
      {
        name,
        duration,
        delay = 0,
        repeat = 1,
        infinite = false,
        timingFunction,
      },
    ) => {
      accumulator.animationName = accumulator.animationName
        ? `${accumulator.animationName},${name}`
        : name;
      accumulator.animationDuration = accumulator.animationDuration
        ? `${accumulator.animationDuration},${duration}s`
        : `${duration}s`;
      accumulator.animationDelay = accumulator.animationDelay
        ? `${accumulator.animationDelay},${delay}s`
        : `${delay}s`;
      repeat = infinite ? "infinite" : repeat;
      accumulator.animationIterationCount = accumulator.animationIterationCount
        ? `${accumulator.animationIterationCount},${repeat}`
        : repeat;

      if (timingFunction) {
        accumulator.animationTimingFunction =
          accumulator.animationTimingFunction
            ? `${accumulator.animationTimingFunction},${timingFunction}`
            : timingFunction;
      }

      return accumulator;
    },
    {
      animationName: "",
      animationDuration: "",
      animationDelay: "",
      animationIterationCount: "",
      animationTimingFunction: "",
    },
  );

  if (
    animationObject.hasOwnProperty("animationTimingFunction") &&
    !animationObject?.animationTimingFunction
  ) {
    delete animationObject.animationTimingFunction;
  }

  animationObject["animateMultipleTimes"] = animateMultipleTimes;

  return animationObject;
}

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

  // Is deprecated v2
  const isDeprecatedV2 = hasBlockSupport(blockType, "CBBDeprecatedAnimationV2");

  const animationObject = (({
    boldblocks: { animations = [], animateMultipleTimes = false } = {},
  }) => ({
    animations: animations.filter(({ name, duration }) => name && duration),
    animateMultipleTimes,
  }))(attributes);

  let animationData;
  if (attributes?.isBlockEdit) {
    animationData = usePropsStyle({
      value: animationObject,
      getStyle: (value) => () => getFeatureData(value),
    });
  } else {
    animationData = getFeatureData(animationObject, isDeprecatedV2);
  }

  if (isValidSettingObject(animationData)) {
    if (attributes?.isBlockEdit || isDeprecatedV2) {
      props = {
        ...props,
        "data-reveal-animation": JSON.stringify(animationData),
      };
    }

    if (!attributes?.isBlockEdit) {
      let waitingClass = "animate__waiting";
      if (hasBlockSupport(blockType, "CBBDeprecatedAnimationV1")) {
        waitingClass = "";
      }
      props.className = clsx(props.className, waitingClass);

      if (isDeprecatedV2) {
        props.style = {
          ...props.style,
          ...getAnimationStyle(animationData),
        };
      }
    }
  }

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
