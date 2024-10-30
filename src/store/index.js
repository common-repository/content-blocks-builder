/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { createReduxStore, register, combineReducers } from "@wordpress/data";
import { controls } from "@wordpress/data-controls";

/**
 * Internal dependencies
 */
import {
  previewModesActions,
  previewModesSelectors,
  previewModesReducer,
} from "./preview-modes";

import {
  typographyActions,
  typographySelectors,
  typographyResolvers,
  typographyReducer,
  postTypographyReducer,
} from "./typography";

import {
  missingBlocksActions,
  missingBlocksSelectors,
  missingBlocksReducer,
} from "./missing-blocks";

/**
 * Icon library store
 */
import "./icon-library";

/**
 * Constants
 */
const storeName = "boldblocks/data";

/**
 * Register store
 */
export const store = createReduxStore(storeName, {
  selectors: {
    ...typographySelectors,
    ...previewModesSelectors,
    ...missingBlocksSelectors,
  },
  actions: {
    ...typographyActions,
    ...previewModesActions,
    ...missingBlocksActions,
  },
  controls,
  reducer: combineReducers({
    previewModes: previewModesReducer,
    typography: typographyReducer,
    postTypography: postTypographyReducer,
    missingBlocks: missingBlocksReducer,
  }),
  resolvers: {
    ...typographyResolvers,
  },
});

register(store);
