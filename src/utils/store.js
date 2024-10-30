/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from "@wordpress/data";

/**
 * Internal dependencies
 */
import { store as boldblocksDataStore } from "../store";

/**
 * Get preview mode
 *
 * @param {String} clientId
 * @returns {String}
 */
export function getPreviewMode(clientId) {
  return useSelect(
    (select) => select(boldblocksDataStore).getPreviewMode(clientId),
    [],
  );
}

/**
 * The hook to get the setter for the previewMode
 *
 * @returns {Function}
 */
export const useSetPreviewMode = () => {
  const { setPreviewMode } = useDispatch(boldblocksDataStore);

  return setPreviewMode;
};
