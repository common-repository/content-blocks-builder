/**
 * External dependencies
 */
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useMemo } from "@wordpress/element";
import { Notice, Spinner } from "@wordpress/components";
import { usePrevious } from "@wordpress/compose";

/**
 * Internal dependencies
 */
import {
  getFontByLabel,
  useFontVariants,
  refineFontsPresets,
  refineFontVariants,
  useLoadFontsPresets,
  useLoadEdittingFonts,
  useLoadCSSVariables,
} from "../../utils/typography";
import { FontsControl, FontsPresetsControl } from ".";

const TypographyStyled = styled.div`
  .components-notice {
    padding-right: 0;
    margin-right: 0;
    margin-left: 0;
  }
`;

export const TypographyControl = (props) => {
  const {
    googleFonts = [],
    fonts,
    editingFonts,
    setEditingFonts,
    fontsPresets,
    isFontsChanged,
    messageData,
    setMessageData,
    isInSidebar = false,
    isEditable = true,
    isLoadingData,
    deviceType = "Desktop",
  } = props;

  const googleFontOptions = useMemo(() => {
    return googleFonts.map(({ label }) => ({ label, value: label }));
  }, [googleFonts]);

  const {
    headings: { fontFamily: headingsFontFamily },
    body: { fontFamily: bodyFontFamily },
  } = editingFonts;

  const previousDevice = usePrevious(deviceType);
  const waitForIframe =
    deviceType !== "Desktop" && previousDevice === "Desktop";

  // Load font presets
  useLoadFontsPresets(fontsPresets, googleFonts);

  // Load editing fonts
  useLoadEdittingFonts(editingFonts, googleFonts, deviceType, waitForIframe);

  // Load CSS variables
  useLoadCSSVariables(editingFonts, isLoadingData, deviceType, waitForIframe);

  const headingsFontVariants = useFontVariants(
    headingsFontFamily,
    googleFonts,
    getFontByLabel,
    refineFontVariants
  );

  const bodyFontVariants = useFontVariants(
    bodyFontFamily,
    googleFonts,
    getFontByLabel,
    refineFontVariants
  );

  const fontsValue = {
    ...editingFonts,
    headings: {
      ...editingFonts.headings,
      allFontVariants: headingsFontVariants,
    },
    body: { ...editingFonts.body, allFontVariants: bodyFontVariants },
  };

  if (isLoadingData) {
    return <Spinner />;
  }

  return (
    <TypographyStyled>
      <FontsControl
        value={fontsValue}
        allFontFamilies={googleFontOptions}
        isFontsChanged={isFontsChanged}
        onChange={(value) => {
          setEditingFonts(value);
        }}
        onReset={() => {
          setEditingFonts(fonts);
        }}
        isEditable={isEditable}
        isInSidebar={isInSidebar}
      />
      {isEditable && (
        <FontsPresetsControl
          presets={refineFontsPresets(fontsPresets, editingFonts)}
          onChange={(pairFont) => {
            setEditingFonts(pairFont);
          }}
          isGrid={!isInSidebar}
        />
      )}
      {messageData && messageData?.message && (
        <Notice
          status={messageData?.type}
          isDismissible={true}
          onDismiss={() => {
            setMessageData({
              type: "success",
              message: "",
            });
          }}
        >
          {messageData.message}
        </Notice>
      )}
    </TypographyStyled>
  );
};
