/**
 * External dependencies
 */
import { noop } from "lodash";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
  RangeControl,
  __experimentalVStack as VStack,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import { ColorGradientDropdown } from "../../components";
import { useColorGradient } from "../../utils";

/**
 * Overlay control
 *
 * @param {Object}
 * @returns
 */
export const OverlayControl = ({
  label = __("Overlay"),
  values = {},
  onChange = noop,
  ...otherProps
}) => {
  const { overlayColor = {}, opacity } = values;

  const [onColorChange, onGradientChange] = useColorGradient(
    overlayColor,
    (overlayColor) =>
      onChange({ ...values, overlayColor, opacity: values?.opacity ?? 60 }),
  );

  return (
    <VStack spacing={3}>
      <ColorGradientDropdown
        enableAlpha={false}
        settings={[
          {
            label: __("Color"),
            colorValue: overlayColor?.value,
            onColorChange,
            gradientValue: overlayColor?.gradientValue,
            onGradientChange,
          },
        ]}
      />
      <RangeControl
        label={__("Opacity")}
        value={opacity}
        onChange={(opacity) => onChange({ ...values, opacity })}
        min={0}
        max={100}
        step={10}
        required
      />
    </VStack>
  );
};
