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
  blockLibrary: {
    state: {},
    blocks: [],
    blockKeywords: [],
  },
};

export const blockLibrarySelectors = {
  getBlocks(state) {
    return state.blockLibrary.blocks;
  },
  getBlockLibraryState(state) {
    return state.blockLibrary.state;
  },
  getBlockKeywords(state) {
    return state.blockLibrary.blockKeywords;
  },
};

export const blockLibraryResolvers = {
  getBlocks() {
    return async ({ dispatch }) => {
      const blocks = await apiFetch({ path: "boldblocks/v1/getBlocks" });

      if (blocks && blocks.length) {
        dispatch({
          type: "SET_BLOCKS",
          payload: blocks,
        });
      }

      return blocks;
    };
  },
  getBlockKeywords() {
    return async ({ dispatch }) => {
      const keywords = await apiFetch({
        path: "boldblocks/v1/getBlockKeywords",
      });

      if (keywords && keywords.length) {
        dispatch({
          type: "SET_BLOCKS_KEYWORDS",
          payload: keywords,
        });
      }

      return keywords;
    };
  },
};

export const blockLibraryActions = {
  loadFullBlocks(blockIds) {
    return async ({ dispatch }) => {
      if (!blockIds.length) {
        return;
      }

      const blocks = await apiFetch({
        path: addQueryArgs(`boldblocks/v1/getFullBlockData`, {
          blockIds: blockIds.join(","),
        }),
      });

      if (blocks && blocks.length) {
        dispatch({
          type: "UPDATE_BLOCKS",
          payload: blocks,
        });
      }

      return blocks;
    };
  },
  setBlockLibraryState(state) {
    return {
      type: "UPDATE_BLOCK_LIBRARY_STATE",
      payload: state,
    };
  },
};

export const blockLibraryReducer = (
  state = initialState.blockLibrary,
  action
) => {
  switch (action.type) {
    case "SET_BLOCKS":
      return {
        ...state,
        blocks: [...action.payload],
      };

    case "UPDATE_BLOCKS":
      const blockIds = action.payload.map(({ id }) => id);
      const blocks = state.blocks.map((block) => {
        if (blockIds.includes(block.id)) {
          const blockFullData = action.payload.find(
            ({ id }) => id === block.id
          );
          if (blockFullData) {
            return blockFullData;
          }
        }

        return block;
      });

      return {
        ...state,
        blocks,
      };

    case "UPDATE_BLOCK_LIBRARY_STATE": {
      return {
        ...state,
        state: { ...action.payload },
      };
    }

    case "SET_BLOCKS_KEYWORDS":
      return {
        ...state,
        blockKeywords: [...action.payload],
      };
  }

  return state;
};
