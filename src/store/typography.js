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
 * Default typography
 */
export const defaultFontFamily = {
  body: {
    fontFamily: "Nunito",
    genericFamily: "sans-serif",
    fontVariants: [],
  },
  headings: {
    fontFamily: "Roboto",
    genericFamily: "sans-serif",
    fontVariants: [],
  },
  additionalFonts: [],
};

/**
 * Default font combinations
 */
export const defaultFontFamilyPresets = [
  {
    body: { fontFamily: "Nunito", genericFamily: "sans-serif" },
    headings: { fontFamily: "Roboto", genericFamily: "sans-serif" },
  },
  {
    body: { fontFamily: "Montserrat", genericFamily: "sans-serif" },
    headings: { fontFamily: "Oswald", genericFamily: "sans-serif" },
  },
  {
    body: { fontFamily: "Merriweather", genericFamily: "serif" },
    headings: { fontFamily: "Oswald", genericFamily: "sans-serif" },
  },
  {
    body: { fontFamily: "Montserrat", genericFamily: "sans-serif" },
    headings: { fontFamily: "Source Sans Pro", genericFamily: "sans-serif" },
  },
  {
    body: { fontFamily: "Source Sans Pro", genericFamily: "sans-serif" },
    headings: { fontFamily: "Libre Baskerville", genericFamily: "serif" },
  },
  {
    body: { fontFamily: "Fauna One", genericFamily: "serif" },
    headings: { fontFamily: "Playfair Display", genericFamily: "serif" },
  },
  {
    body: { fontFamily: "Josefin Slab", genericFamily: "serif" },
    headings: { fontFamily: "Six Caps", genericFamily: "sans-serif" },
  },
  {
    body: { fontFamily: "Source Sans Pro", genericFamily: "sans-serif" },
    headings: { fontFamily: "Playfair Display", genericFamily: "serif" },
  },
  {
    body: { fontFamily: "Quattrocento", genericFamily: "serif" },
    headings: { fontFamily: "Oswald", genericFamily: "sans-serif" },
  },
  {
    body: { fontFamily: "Alice", genericFamily: "serif" },
    headings: { fontFamily: "Sacramento", genericFamily: "cursive" },
  },
  {
    body: { fontFamily: "Lato", genericFamily: "sans-serif" },
    headings: { fontFamily: "Arvo", genericFamily: "serif" },
  },
  {
    body: { fontFamily: "Poppins", genericFamily: "sans-serif" },
    headings: { fontFamily: "Abril Fatface", genericFamily: "cursive" },
  },
  {
    body: { fontFamily: "Inconsolata", genericFamily: "monospace" },
    headings: { fontFamily: "Karla", genericFamily: "sans-serif" },
  },
  {
    body: { fontFamily: "Andika", genericFamily: "sans-serif" },
    headings: { fontFamily: "Amatic SC", genericFamily: "sans-serif" },
  },
  {
    body: { fontFamily: "Lato", genericFamily: "sans-serif" },
    headings: { fontFamily: "Lustria", genericFamily: "serif" },
  },
  {
    body: { fontFamily: "Proza Libre", genericFamily: "sans-serif" },
    headings: { fontFamily: "Cormorant Garamond", genericFamily: "serif" },
  },
  {
    body: { fontFamily: "EB Garamond", genericFamily: "serif" },
    headings: { fontFamily: "Oswald", genericFamily: "sans-serif" },
  },
  {
    body: { fontFamily: "Josefin Sans", genericFamily: "sans-serif" },
    headings: { fontFamily: "Yeseva One", genericFamily: "cursive" },
  },
  {
    body: { fontFamily: "Inter", genericFamily: "sans-serif" },
    headings: { fontFamily: "EB Garamond", genericFamily: "serif" },
  },
];

/**
 * Initial state
 */
const initialState = {
  typography: {
    fonts: defaultFontFamily,
    fontsPresets: defaultFontFamilyPresets,
    googleFonts: [],
  },
  postTypography: {
    fonts: null,
  },
};

export const typographySelectors = {
  getGoogleFonts(state) {
    return state.typography.googleFonts;
  },
  getTypography(state) {
    return {
      fonts: state.typography.fonts,
      fontsPresets: state.typography.fontsPresets,
    };
  },
  getPostTypography(state, apiPath) {
    return {
      fonts: state.postTypography.fonts,
      fontsPresets: state.typography.fontsPresets,
    };
  },
};

export const typographyResolvers = {
  getGoogleFonts() {
    return async ({ dispatch }) => {
      const googleFonts = await apiFetch({
        path: "boldblocks/v1/getGoogleFonts",
      });

      if (googleFonts && googleFonts.success) {
        dispatch({
          type: "SET_GOOGLE_FONTS",
          payload: googleFonts.data,
        });
      }

      return googleFonts;
    };
  },
  getTypography() {
    return async ({ dispatch }) => {
      const { BoldBlocksTypography } = await apiFetch({
        path: "wp/v2/settings",
      });

      if (BoldBlocksTypography) {
        return dispatchUpdatedFonts(BoldBlocksTypography, dispatch);
      } else {
        // Save default value for the first time
        const { BoldBlocksTypography } = await apiFetch({
          path: "wp/v2/settings",
          method: "POST",
          data: {
            BoldBlocksTypography: {
              fonts: JSON.stringify(initialState.typography.fonts),
            },
          },
        });

        return dispatchUpdatedFonts(BoldBlocksTypography, dispatch);
      }
    };
  },
  getPostTypography(apiPath) {
    return async ({ dispatch }) => {
      if (!apiPath) {
        return;
      }

      const { meta: { BoldBlocksTypography } = {} } = await apiFetch({
        path: apiPath,
      });

      return dispatchPostUpdatedFonts(BoldBlocksTypography, dispatch);
    };
  },
};

export const dispatchUpdatedFonts = (typography, dispatch) => {
  if (typography && typography?.fonts) {
    const fonts = JSON.parse(typography.fonts);
    dispatch({
      type: "UPDATE_FONTS",
      payload: fonts,
    });

    return fonts;
  }

  return typography;
};

export const dispatchPostUpdatedFonts = (typography, dispatch) => {
  let fonts;
  if (typography && typography?.fonts) {
    fonts = JSON.parse(typography.fonts);
  }

  dispatch({
    type: "UPDATE_POST_FONTS",
    payload: fonts,
  });

  return fonts;
};

export const typographyActions = {
  updateFonts(fonts) {
    return {
      type: "UPDATE_FONTS",
      payload: fonts,
    };
  },
  updatePostFonts(fonts) {
    return {
      type: "UPDATE_POST_FONTS",
      payload: fonts,
    };
  },
  updateAndPersistFonts(stringifiedFonts) {
    return async ({ dispatch }) => {
      const { BoldBlocksTypography } = await apiFetch({
        path: "wp/v2/settings",
        method: "POST",
        data: {
          BoldBlocksTypography: { fonts: stringifiedFonts },
        },
      });

      return dispatchUpdatedFonts(BoldBlocksTypography, dispatch);
    };
  },
  updateAndPersistPostFonts(stringifiedFonts, apiPath) {
    return async ({ dispatch }) => {
      const { meta: { BoldBlocksTypography } = {} } = await apiFetch({
        path: apiPath,
        method: "POST",
        data: {
          meta: {
            BoldBlocksTypography: { fonts: stringifiedFonts },
          },
        },
      });

      return dispatchPostUpdatedFonts(BoldBlocksTypography, dispatch);
    };
  },
};

export const typographyReducer = (state = initialState.typography, action) => {
  switch (action.type) {
    case "SET_GOOGLE_FONTS":
      return {
        ...state,
        googleFonts: action.payload,
      };

    case "UPDATE_FONTS":
      return {
        ...state,
        fonts: action.payload,
      };
  }

  return state;
};

export const postTypographyReducer = (
  state = initialState.postTypography,
  action
) => {
  switch (action.type) {
    case "UPDATE_POST_FONTS":
      return {
        ...state,
        fonts: action.payload,
      };
  }

  return state;
};
