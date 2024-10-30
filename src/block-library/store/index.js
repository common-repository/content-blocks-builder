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
  blockLibraryActions,
  blockLibrarySelectors,
  blockLibraryResolvers,
  blockLibraryReducer,
} from "./blocks";

import {
  variationLibraryActions,
  variationLibrarySelectors,
  variationLibraryResolvers,
  variationLibraryReducer,
} from "./variations";

import {
  patternLibraryActions,
  patternLibrarySelectors,
  patternLibraryResolvers,
  patternLibraryReducer,
} from "./patterns";

/**
 * Constants
 */
const storeName = "boldblocks/block-library";

/**
 * Register store
 */
const store = createReduxStore(storeName, {
  selectors: {
    ...blockLibrarySelectors,
    ...variationLibrarySelectors,
    ...patternLibrarySelectors,
  },
  actions: {
    ...blockLibraryActions,
    ...variationLibraryActions,
    ...patternLibraryActions,
  },
  controls,
  reducer: combineReducers({
    blockLibrary: blockLibraryReducer,
    variationLibrary: variationLibraryReducer,
    patternLibrary: patternLibraryReducer,
  }),
  resolvers: {
    ...blockLibraryResolvers,
    ...variationLibraryResolvers,
    ...patternLibraryResolvers,
  },
});
register(store);

export { storeName as store };
