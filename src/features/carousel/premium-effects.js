/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";

/**
 * Internal dependencies
 */
import { getProLabel } from "../../utils/labels";

/**
 * Add premium effects
 */
addFilter("cbb.carousel.effectOptions", "cbb/free", (effectOptions) =>
  effectOptions.concat([
    {
      value: "cube",
      label: getProLabel(__("Cube", "content-blocks-builder")),
      disabled: true,
    },
    {
      value: "cards",
      label: getProLabel(__("Cards", "content-blocks-builder")),
      disabled: true,
    },
    {
      value: "coverflow",
      label: getProLabel(__("Coverflow", "content-blocks-builder")),
      disabled: true,
    },
    {
      value: "creative",
      label: getProLabel(__("Creative", "content-blocks-builder")),
      disabled: true,
    },
  ]),
);
