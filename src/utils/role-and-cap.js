/**
 * WordPress dependencies
 */
import { useSelect } from "@wordpress/data";
import { store as coreStore } from "@wordpress/core-data";

/**
 * Check whether current user can create custom blocks
 *
 * @returns {Boolean}
 */
export const userCanCreateBlock = () => {
  return useSelect(
    (select) => select(coreStore).canUser("create", "posts"),
    []
  );
};

/**
 * Check whether current user can create custom blocks
 *
 * @returns {Boolean}
 */
export const userCanCreatePattern = () => {
  return useSelect(
    (select) => select(coreStore).canUser("create", "posts"),
    []
  );
};

/**
 * Check whether current user can create custom blocks
 *
 * @returns {Boolean}
 */
export const userCanCreateVariation = () => {
  return useSelect(
    (select) => select(coreStore).canUser("create", "posts"),
    []
  );
};

/**
 * Check whether current user can edit post typogaphy
 *
 * @returns {Boolean}
 */
export const canEditPostTypography = () => {
  return useSelect(
    (select) => select(coreStore).canUser("update", "settings"),
    []
  );
};

/**
 * Check whether current user can update settings
 *
 * @returns {Boolean}
 */
export const userCanUpdateSettings = () => {
  return useSelect(
    (select) => select(coreStore).canUser("update", "settings"),
    []
  );
};

/**
 * Check whether current user can update settings
 *
 * @returns {Boolean}
 */
export const userCanManagePlugins = () => {
  return useSelect(
    (select) => select(coreStore).canUser("create", "users"),
    []
  );
};
