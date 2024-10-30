/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

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
  previewModes: {},
};

export const previewModesSelectors = {
  getPreviewMode(state, clientId) {
    return state.previewModes[clientId] ?? "";
  },
};

export const previewModesActions = {
  setPreviewMode(payload) {
    return {
      type: "SET_PREVIEW_MODE",
      payload,
    };
  },
};

export const previewModesReducer = (
  state = initialState.previewModes,
  action,
) => {
  switch (action.type) {
    case "SET_PREVIEW_MODE":
      return {
        ...state,
        [action.payload.clientId]: action.payload.previewMode,
      };
  }

  return state;
};
