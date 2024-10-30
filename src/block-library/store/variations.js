/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import apiFetch from "@wordpress/api-fetch";
import { addQueryArgs } from "@wordpress/url";

/**
 * Internal dependencies
 */

/**
 * Constants
 */

/**
 * Initial state
 */
const initialState = {
  variationLibrary: {
    state: {},
    variations: [],
    variationKeywords: [],
  },
};

export const variationLibrarySelectors = {
  getVariations(state) {
    return state.variationLibrary.variations;
  },
  getVariationLibraryState(state) {
    return state.variationLibrary.state;
  },
  getVariationKeywords(state) {
    return state.variationLibrary.variationKeywords;
  },
};

export const variationLibraryResolvers = {
  getVariations() {
    return async ({ dispatch }) => {
      const variations = await apiFetch({
        path: "boldblocks/v1/getVariations",
      });

      if (variations && variations.length) {
        dispatch({
          type: "SET_VARIATIONS",
          payload: variations,
        });
      }

      return variations;
    };
  },
  getVariationKeywords() {
    return async ({ dispatch }) => {
      const keywords = await apiFetch({
        path: "boldblocks/v1/getVariationKeywords",
      });

      if (keywords && keywords.length) {
        dispatch({
          type: "SET_VARIATIONS_KEYWORDS",
          payload: keywords,
        });
      }

      return keywords;
    };
  },
};

export const variationLibraryActions = {
  loadFullVariations(variationIds) {
    return async ({ dispatch }) => {
      if (!variationIds.length) {
        return;
      }

      const variations = await apiFetch({
        path: addQueryArgs(`boldblocks/v1/getFullVariationData`, {
          variationIds: variationIds.join(","),
        }),
      });

      if (variations && variations.length) {
        dispatch({
          type: "UPDATE_VARIATIONS",
          payload: variations,
        });
      }

      return variations;
    };
  },
  setVariationLibraryState(state) {
    return {
      type: "UPDATE_VARIATION_LIBRARY_STATE",
      payload: state,
    };
  },
};

export const variationLibraryReducer = (
  state = initialState.variationLibrary,
  action
) => {
  switch (action.type) {
    case "SET_VARIATIONS":
      return {
        ...state,
        variations: [...action.payload],
      };

    case "UPDATE_VARIATIONS":
      const variationIds = action.payload.map(({ id }) => id);
      const variations = state.variations.map((variation) => {
        if (variationIds.includes(variation.id)) {
          const variationFullData = action.payload.find(
            ({ id }) => id === variation.id
          );
          if (variationFullData) {
            return variationFullData;
          }
        }

        return variation;
      });

      return {
        ...state,
        variations,
      };

    case "UPDATE_VARIATION_LIBRARY_STATE": {
      return {
        ...state,
        state: { ...action.payload },
      };
    }

    case "SET_VARIATIONS_KEYWORDS":
      return {
        ...state,
        variationKeywords: [...action.payload],
      };
  }

  return state;
};
