/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import { HelpLink } from "../help-link";

/**
 * Input a block icon
 *
 * @param {Object}
 */
const IconHelp = () => {
  return (
    <>
      {__(
        "We recommend using SVGO to optimize custom SVG files before uploading them. Here is",
        "content-blocks-builder",
      )}
      &nbsp;
      <HelpLink
        href="https://jakearchibald.github.io/svgomg/"
        label="Web GUI for SVGO"
      />
      <br />
      {__(
        "Work best with the icon that has the same width and height. Support almost all SVG icons from popular libraries such as: ",
        "content-blocks-builder",
      )}
      <HelpLink href="https://fonts.google.com/icons" label="Material" />,{" "}
      <HelpLink href="https://fontawesome.com" label="Fontawesome" />,{" "}
      <HelpLink href="https://ionic.io/ionicons" label="Ionicons" />,{" "}
      <HelpLink href="https://icons.getbootstrap.com" label="Bootstrap" />,{" "}
      <HelpLink href="https://fluenticons.co/" label="Fluent Icons" />
    </>
  );
};

export default IconHelp;
