/**
 * External dependencies
 */
import { isEqual } from "lodash";

/**
 * WordPress dependencies
 */
import { useMemo, useState, useEffect } from "@wordpress/element";
import { useSelect, useDispatch } from "@wordpress/data";
import { store as editorStore } from "@wordpress/editor";
import { store as coreStore } from "@wordpress/core-data";

/**
 * Internal dependencies
 */
import { log } from "sdk/utils";
import { store as boldblocksDataStore } from "../store";

/**
 * Get font data by label
 *
 * @param {String} label
 * @param {String} googleFonts
 *
 * @returns {Object}
 */
export const getFontByLabel = (label, googleFonts = []) => {
  return googleFonts.find((item) => item.label === label);
};

/**
 * Load google font
 *
 * @param {String} label
 * @param {String} text
 * @param {String} googleFonts
 * @param {DocumentNode} the owner document
 */
const loadGoogleFont = (label, text = "", googleFonts = [], document) => {
  const fontSlug = label.replace(/\s/g, "-").toLowerCase();
  let linkFontId = `boldblocks-font-${fontSlug}`;
  if (text) {
    linkFontId = `${linkFontId}-text`;
  }
  let linkElement = document.querySelector(`#${linkFontId}`);

  // Create a new one if don't have one
  if (!linkElement) {
    // Get font object.
    const font = getFontByLabel(label, googleFonts);

    if (font) {
      let { label, variants } = font;

      let fontUrl = `https://fonts.googleapis.com/css2?family=${label.replace(
        /\s/g,
        "+"
      )}`;

      let variantArray = [];
      variants = variants.map((variant) => {
        if (variant === "regular") {
          variant = "400";
        } else if (variant === "italic") {
          variant = "400italic";
        }
        return variant;
      });

      variants.sort().forEach((variant) => {
        if (variant.indexOf("italic") !== -1) {
          variantArray.push(`1,${variant.replace("italic", "")}`);
        } else {
          variantArray.push(`0,${variant}`);
        }
      });

      fontUrl = `${fontUrl}:ital,wght@${variantArray
        .sort()
        .join(";")}&display=swap`;

      if (text) {
        fontUrl = `${fontUrl}&text=${encodeURIComponent(text)}`;
      }

      linkElement = document.createElement("link");
      linkElement.id = linkFontId;
      linkElement.rel = "stylesheet";
      linkElement.href = fontUrl;

      document.head.appendChild(linkElement);
    }

    return font;
  }
};

const loadFontsPresets = (fontsPresets, googleFonts, document) => {
  // Preset fonts
  fontsPresets.forEach((fontPair) => {
    loadGoogleFont(
      fontPair?.body?.fontFamily,
      fontPair?.body?.fontFamily,
      googleFonts,
      document
    );
    loadGoogleFont(
      fontPair?.headings?.fontFamily,
      fontPair?.headings?.fontFamily,
      googleFonts,
      document
    );
  });
};

export const useLoadFontsPresets = (fontsPresets, googleFonts) => {
  useEffect(() => {
    if (fontsPresets.length && googleFonts.length) {
      loadFontsPresets(fontsPresets, googleFonts, document);
    }
  }, [fontsPresets.length, googleFonts.length, loadGoogleFont]);
};

const loadFonts = (fonts, googleFonts, document) => {
  loadGoogleFont(fonts?.headings?.fontFamily, "", googleFonts, document);
  loadGoogleFont(fonts?.body?.fontFamily, "", googleFonts, document);
};

export const useLoadEdittingFonts = (
  fonts,
  googleFonts,
  deviceType,
  waitForIframe = false
) => {
  useEffect(() => {
    if (
      fonts?.headings?.fontFamily &&
      fonts?.body?.fontFamily &&
      googleFonts.length
    ) {
      const editorCanvas = document.querySelector(
        'iframe[name="editor-canvas"]'
      );
      if (editorCanvas) {
        const iframeDocument = editorCanvas.contentWindow.document;
        if (waitForIframe) {
          waitForIframeLoaded(
            "#boldblocks-custom-fonts-css",
            iframeDocument,
            document
          )
            .then((iframeDocument) => {
              loadFonts(fonts, googleFonts, iframeDocument);
            })
            .catch((e) => log(e, "error"));
        } else {
          loadFonts(fonts, googleFonts, iframeDocument);
        }
      } else {
        loadFonts(fonts, googleFonts, document);
      }
    }
  }, [
    fonts?.headings.fontFamily,
    fonts?.body?.fontFamily,
    googleFonts.length,
    loadGoogleFont,
    deviceType,
    waitForIframe,
  ]);
};

export const useLoadCSSVariables = (
  fonts,
  isLoadingData,
  deviceType,
  waitForIframe = false
) => {
  useEffect(() => {
    const editorCanvas = document.querySelector('iframe[name="editor-canvas"]');
    const cssVariablesString = `.editor-styles-wrapper {${buildCSSVariables(
      fonts
    )}}`;

    if (editorCanvas) {
      const iframeDocument = editorCanvas.contentWindow.document;
      if (waitForIframe) {
        editorCanvas.addEventListener("load", () => {
          createCSSVariablesElement(cssVariablesString, iframeDocument);
        });
      } else {
        createCSSVariablesElement(cssVariablesString, iframeDocument);
      }
    } else {
      createCSSVariablesElement(cssVariablesString, document);
    }
  }, [fonts, isLoadingData, deviceType, waitForIframe]);
};

function waitForIframeLoaded(selector, iframeDocument, parentDocument) {
  return new Promise((resolve) => {
    if (iframeDocument.querySelector(selector)) {
      return resolve(iframeDocument);
    }

    const observer = new MutationObserver(() => {
      // Have to re-query the iframe
      iframeDocument = parentDocument.querySelector(
        'iframe[name="editor-canvas"]'
      ).contentWindow.document;

      if (iframeDocument.querySelector(selector)) {
        resolve(iframeDocument);
        observer.disconnect();
      }
    });

    observer.observe(iframeDocument, {
      subtree: true,
      childList: true,
    });
  });
}

/**
 * Refine fonts presets
 *
 * @param {Array} presets
 * @param {Object} fonts
 * @returns
 */
export const refineFontsPresets = (presets, fonts) => {
  if (presets && fonts && fonts?.headings) {
    presets = presets.map((preset) => {
      if (
        preset.headings.fontFamily === fonts?.headings?.fontFamily &&
        preset.body.fontFamily === fonts?.body?.fontFamily
      ) {
        return { ...preset, isActive: true };
      } else {
        if (preset?.isActive) {
          return { ...preset, isActive: false };
        }

        return preset;
      }
    });
  }

  return presets;
};

/**
 * Refine font variants
 *
 * @param {Array} variants
 */
export const refineFontVariants = (variants) => {
  return variants
    .map((variant) => {
      if (variant === "regular") {
        variant = "400";
      } else if (variant === "italic") {
        variant = "400italic";
      }

      return variant + ""; // Convert to string
    })
    .sort();
};

/**
 * Get font variants by family name
 *
 * @param {String} fontFamily
 * @param {Array} googleFonts
 * @param {Function} getFontByLabel
 * @param {Function} refineFontVariants
 * @returns
 */
export const useFontVariants = (
  fontFamily,
  googleFonts,
  getFontByLabel,
  refineFontVariants
) => {
  return useMemo(() => {
    const font = getFontByLabel(fontFamily, googleFonts);

    if (font) {
      return refineFontVariants(font.variants);
    }

    return [];
  }, [fontFamily, googleFonts, getFontByLabel, refineFontVariants]);
};

/**
 * Get api path for a request by post id
 */
export const usePostApiPath = (postId) => {
  if (!postId) {
    return "";
  }

  const postType = useSelect(
    (select) => select(editorStore).getCurrentPostType(),
    []
  );

  const { baseURL } = useSelect(
    (select) => select(coreStore).getEntityConfig("postType", postType),
    [postType]
  );

  return `${baseURL}/${postId}`;
};

/**
 * Build typography data
 *
 * @param {String} apiPath
 * @returns {Object}
 */
export const useTypographyData = (apiPath = "") => {
  const {
    updateFonts,
    updateAndPersistFonts,
    updatePostFonts,
    updateAndPersistPostFonts,
  } = useDispatch(boldblocksDataStore);

  const typographyData = useSelect(
    (select) => {
      const googleFonts = select(boldblocksDataStore).getGoogleFonts();
      const { fonts, fontsPresets } = select(
        boldblocksDataStore
      ).getTypography();

      const isGlobalTypographyLoaded = select(
        boldblocksDataStore
      ).hasFinishedResolution("getTypography");

      let postTypography;
      let isPostTypogrpahyLoaded;
      if (apiPath) {
        postTypography = select(boldblocksDataStore).getPostTypography(apiPath);
        isPostTypogrpahyLoaded = select(
          boldblocksDataStore
        ).hasFinishedResolution("getPostTypography", [apiPath]);
      }

      let data = {
        fonts,
        globalFonts: fonts,
        fontsPresets,
        googleFonts,
        isGlobalTypographyLoaded,
        isPostTypogrpahyLoaded,
      };

      if (postTypography && postTypography?.fonts) {
        data = {
          ...data,
          fonts: postTypography.fonts,
          isPostFonts: true,
        };
      }

      return data;
    },
    [apiPath]
  );

  const {
    fonts,
    isGlobalTypographyLoaded,
    isPostTypogrpahyLoaded,
  } = typographyData;

  const isDataLoaded = !apiPath
    ? isGlobalTypographyLoaded
    : isGlobalTypographyLoaded && isPostTypogrpahyLoaded;

  const [editingFonts, setEditingFonts] = useState(fonts);
  useEffect(() => {
    if (isDataLoaded) {
      setEditingFonts(fonts);
    }
  }, [isDataLoaded]);

  return {
    ...typographyData,
    editingFonts,
    setEditingFonts,
    isDataLoaded,
    isFontsChanged: useMemo(() => {
      return !isEqual(
        {
          headingsFontFamily: fonts?.headings?.fontFamily,
          headingsFontVariants: fonts?.headings?.fontVariants ?? [],
          bodyFontFamily: fonts?.body?.fontFamily,
          bodyFontVariants: fonts?.body?.fontVariants ?? [],
        },
        {
          headingsFontFamily: editingFonts?.headings?.fontFamily,
          headingsFontVariants: editingFonts?.headings?.fontVariants ?? [],
          bodyFontFamily: editingFonts?.body?.fontFamily,
          bodyFontVariants: editingFonts?.body?.fontVariants ?? [],
        }
      );
    }, [fonts, editingFonts]),
    updateFonts,
    updateAndPersistFonts,
    updatePostFonts,
    updateAndPersistPostFonts,
  };
};

/**
 * Build CSS variables
 */
export const buildCSSVariables = (fonts) => {
  const { body, headings } = fonts;
  const bodyCSSVariables = buildCSSVariablesByType("body", body);
  const headingsCSSVariables = buildCSSVariablesByType("headings", headings);
  let cssVariables = {
    ...bodyCSSVariables,
    ...headingsCSSVariables,
  };

  return Object.keys(cssVariables).reduce(
    (accumulator, propKey) =>
      `${accumulator}${propKey}: ${cssVariables[propKey]};`,
    ""
  );
};

/**
 * Build css variables by type
 *
 * @param {String} type
 * @param {Object} typeValue
 * @returns {Object}
 */
const buildCSSVariablesByType = (type, typeValue) => {
  let cssVariables = {};
  if (typeValue) {
    const { fontFamily, genericFamily } = typeValue;

    if (fontFamily) {
      cssVariables[
        `--cbb--${type}--font-family`
      ] = `"${fontFamily}", ${genericFamily}`;
    }
  }
  return cssVariables;
};

const createCSSVariablesElement = (cssVariablesString, document) => {
  let CSSVariablesElement = document.head.querySelector(
    "#boldblocks-css-variables"
  );

  // Create a new one if don't have one
  if (!CSSVariablesElement) {
    CSSVariablesElement = document.createElement("style");
    CSSVariablesElement.id = "boldblocks-css-variables";
    CSSVariablesElement.innerHTML = cssVariablesString;
    document.head.appendChild(CSSVariablesElement);
  } else {
    CSSVariablesElement.innerHTML = cssVariablesString;
  }
};
