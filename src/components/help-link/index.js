/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { ExternalLink } from "@wordpress/components";

export const HelpLink = ({
  href,
  label = __("Learn more", "content-blocks-builder"),
}) => <ExternalLink href={href}>{label}</ExternalLink>;
