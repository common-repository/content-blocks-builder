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
import { Section } from "sdk/components";
import Breakpoints from "./breakpoints";
import PatternCategories from "./pattern-categories";

const Settings = () => {
  return (
    <Section description={__("General settings", "content-blocks-builder")}>
      <Breakpoints />
      <PatternCategories />
    </Section>
  );
};

export default Settings;
