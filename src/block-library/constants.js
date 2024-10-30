/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */

export const MESSAGES = {
  installPlugin: __("Install %s", "content-blocks-builder"),
  activatePlugin: __("Activate %s", "content-blocks-builder"),
  blockName: __("Block name: %s", "content-blocks-builder"),
  parentBlockName: __("Parent block: %s", "content-blocks-builder"),
  variationName: __("Variation name: %s", "content-blocks-builder"),
  warningRequiresOtherCBBItems: __(
    "This item requires additional blocks or variations from the library.",
    "content-blocks-builder",
  ),
  warningRequiresExternalBlocks: __(
    "This item requires the following external block(s): %s. You must install and/or activate the required plugin(s) to use it.",
    "content-blocks-builder",
  ),
  warningRequiresPro: __(
    "This item requires the Pro version of the plugin.",
    "content-blocks-builder",
  ),
  warningInstallActivatePlugins: __(
    "You must install and/or activate the required plugin(s) to use this item.",
    "content-blocks-builder",
  ),
  warningManagePluginsPermission: __(
    "You don't have permission to manage plugins, please contact the administrator for help.",
    "content-blocks-builder",
  ),
  successInstalledActivatedPlugin: __(
    "The plugin %s has been installed and activated.",
    "content-blocks-builder",
  ),
  successActivatedPlugin: __(
    "The plugin %s has been activated.",
    "content-blocks-builder",
  ),
  successReloadPage: __("Reloading the page.", "content-blocks-builder"),
  actionImportAllCBBItems: __(
    "Import all required item(s)",
    "content-blocks-builder",
  ),
  labelTutorials: __("Tutorials:", "content-blocks-builder"),
  labelResources: __("Resources:", "content-blocks-builder"),
  labelDependencies: __("Dependencies:", "content-blocks-builder"),
};
