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
  patternLibrary: {
    status: false,
    state: {},
    patterns: [],
    patternKeywords: [],
    plugins: [],
  },
};

export const patternLibrarySelectors = {
  getPatternInserterModalStatus(state) {
    return state.patternLibrary.status;
  },
  getPatterns(state) {
    return state.patternLibrary.patterns;
  },
  getPatternLibraryState(state) {
    return state.patternLibrary.state;
  },
  getPatternKeywords(state) {
    return state.patternLibrary.patternKeywords;
  },
  getPlugins(state) {
    return state.patternLibrary.plugins;
  },
};

export const patternLibraryResolvers = {
  getPatterns() {
    return async ({ dispatch }) => {
      const patterns = await apiFetch({ path: "boldblocks/v1/getPatterns" });

      if (patterns && patterns.length) {
        dispatch({
          type: "SET_PATTERNS",
          payload: patterns,
        });
      }

      return patterns;
    };
  },
  getPatternKeywords() {
    return async ({ dispatch }) => {
      const keywords = await apiFetch({
        path: "boldblocks/v1/getPatternKeywords",
      });

      if (keywords && keywords.length) {
        dispatch({
          type: "SET_PATTERN_KEYWORDS",
          payload: keywords,
        });
      }

      return keywords;
    };
  },
  getPlugins() {
    return async ({ dispatch }) => {
      let plugins = await apiFetch({
        path: `wp/v2/plugins`,
      });

      plugins = plugins.map((item) => {
        const { plugin } = item;
        const slug = plugin.split("/")[0];

        return { ...item, slug };
      });

      dispatch({
        type: "SET_PLUGINS",
        payload: plugins,
      });
    };
  },
};

export const patternLibraryActions = {
  setPatternInserterModalStatus(status) {
    return {
      type: "SET_PATTERN_INSERTER_MODAL_STATUS",
      payload: status,
    };
  },
  loadFullPatterns(patternIds) {
    return async ({ dispatch }) => {
      if (!patternIds.length) {
        return;
      }

      const patterns = await apiFetch({
        path: addQueryArgs(`boldblocks/v1/getFullPatternData`, {
          patternIds: patternIds.join(","),
        }),
      });

      if (patterns && patterns.length) {
        dispatch({
          type: "UPDATE_PATTERNS",
          payload: patterns,
        });
      }

      return patterns;
    };
  },
  setPatternLibraryState(state) {
    return {
      type: "UPDATE_PATTERN_INSERTER_MODAL_STATE",
      payload: state,
    };
  },
};

export const patternLibraryReducer = (
  state = initialState.patternLibrary,
  action,
) => {
  switch (action.type) {
    case "SET_PATTERN_INSERTER_MODAL_STATUS":
      return {
        ...state,
        status: action.payload,
      };

    case "SET_PATTERNS":
      return {
        ...state,
        patterns: [...action.payload],
      };

    case "UPDATE_PATTERNS":
      const patternIds = action.payload.map(({ id }) => id);
      const patterns = state.patterns.map((pattern) => {
        if (patternIds.includes(pattern.id)) {
          const patternFullData = action.payload.find(
            ({ id }) => id === pattern.id,
          );
          if (patternFullData) {
            return patternFullData;
          }
        }

        return pattern;
      });

      return {
        ...state,
        patterns,
      };

    case "UPDATE_PATTERN_INSERTER_MODAL_STATE": {
      return {
        ...state,
        state: { ...action.payload },
      };
    }

    case "SET_PATTERN_KEYWORDS":
      return {
        ...state,
        patternKeywords: [...action.payload],
      };

    case "SET_PLUGINS":
      return {
        ...state,
        plugins: [...action.payload],
      };
  }

  return state;
};
