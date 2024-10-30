/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import apiFetch from "@wordpress/api-fetch";

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
  missingBlocks: {
    blocks: {},
    statuses: {},
  },
};

export const missingBlocksSelectors = {
  getMissingBlock(state, filterValue) {
    return state.missingBlocks.blocks[filterValue] ?? false;
  },
  getMissingBlockStatus(state, id) {
    return state.missingBlocks.statuses[id] ?? false;
  },
};

export const missingBlocksActions = {
  setMissingBlockStatus(id) {
    return {
      type: "SET_MISSING_BLOCK_STATUS",
      payload: id,
    };
  },
  loadMissingBlock(filterValue) {
    return async ({ select, dispatch }) => {
      let missingBlock = select.getMissingBlock(filterValue);
      if (missingBlock === false) {
        const blocks = await apiFetch({
          path: `wp/v2/block-directory/search?term=${filterValue}`,
        });

        missingBlock = blocks[0] ?? {};

        dispatch({
          type: "SET_MISSING_BLOCK",
          payload: {
            [filterValue]: missingBlock,
          },
        });
      }

      return missingBlock;
    };
  },
};

export const missingBlocksReducer = (
  state = initialState.missingBlocks,
  action,
) => {
  switch (action.type) {
    case "SET_MISSING_BLOCK":
      return {
        ...state,
        blocks: {
          ...state.missingBlocks,
          ...action.payload,
        },
      };

    case "SET_MISSING_BLOCK_STATUS":
      return {
        ...state,
        statuses: {
          ...state.statuses,
          [action.payload]: true,
        },
      };
  }

  return state;
};
