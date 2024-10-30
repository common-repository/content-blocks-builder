/**
 * External dependencies
 */
import styled from "@emotion/styled";
import { isUndefined } from "lodash";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { store as coreStore, useEntityProp } from "@wordpress/core-data";
import { useState } from "@wordpress/element";
import { useDispatch } from "@wordpress/data";
import { store as noticesStore } from "@wordpress/notices";
import { Button, ToggleControl, Spinner } from "@wordpress/components";

/**
 * Internal dependencies
 */
import { Section, Widget } from "sdk/components";
import { useTypographyData } from "../../utils/typography";
import { TypographyControl } from "../../components/typography";
import { HelpLink } from "../../components/help-link";

const ToggleControlStyled = styled(ToggleControl)`
  margin-top: 12px;
`;

const TypographyWidget = () => {
  const data = useTypographyData();
  const {
    isDataLoaded,
    isFontsChanged,
    editingFonts,
    setEditingFonts,
    updateAndPersistFonts,
  } = data;

  const [isLoading, setIsLoading] = useState(false);
  const [messageData, setMessageData] = useState({
    type: "success",
    message: "",
  });

  // Update button.
  const updateActions = () => (
    <>
      <Button
        variant="primary"
        disabled={!isFontsChanged}
        onClick={(e) => {
          e.preventDefault();
          setIsLoading(true);
          updateAndPersistFonts(JSON.stringify(editingFonts))
            .then(() => {
              setMessageData({
                type: "success",
                message: __("Setttings saved!", "content-blocks-builder"),
              });
            })
            .catch((error) => {
              console.error(error);
              setMessageData({
                type: "error",
                message: __(
                  __(
                    "Something went wrong, please contact the author for support!",
                    "content-blocks-builder",
                  ),
                ),
              });
            })
            .finally(() => {
              setIsLoading(false);
            });
        }}
      >
        {__("Update typography", "content-blocks-builder")}
      </Button>
      {isLoading && <Spinner />}
    </>
  );

  return (
    <Widget
      title={__("Google fonts settings", "content-blocks-builder")}
      renderFooter={updateActions}
      isFullRow={true}
    >
      <TypographyControl
        {...data}
        isLoadingData={!isDataLoaded}
        editingFonts={editingFonts}
        setEditingFonts={setEditingFonts}
        isFontsChanged={isFontsChanged}
        messageData={messageData}
        setMessageData={setMessageData}
      />
    </Widget>
  );
};

const Typography = () => {
  const { createSuccessNotice, createErrorNotice } = useDispatch(noticesStore);
  const { saveEditedEntityRecord } = useDispatch(coreStore);
  const [enable, setEnable] = useEntityProp("root", "site", "EnableTypography");
  const [useBunnyFonts, setUseBunnyFonts] = useEntityProp(
    "root",
    "site",
    "UseBunnyFonts",
  );

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Section description={__("Typography settings", "content-blocks-builder")}>
      <Widget isHeaderHidden={true} isFullRow={true}>
        <ToggleControl
          checked={enable ?? false}
          disabled={isUndefined(enable)}
          label={
            <>
              <span>
                {__("Enable google fonts ", "content-blocks-builder")}
              </span>
              {isUndefined(enable) ||
                (isLoading && <Spinner style={{ margin: "0 10px 0 0" }} />)}
            </>
          }
          onChange={(value) => {
            setEnable(value);

            setIsLoading(true);
            saveEditedEntityRecord("root", "site")
              .then(() => {
                createSuccessNotice(
                  __("Setttings saved!", "content-blocks-builder"),
                  {
                    type: "snackbar",
                  },
                );
              })
              .catch((error) => {
                console.error(error);
                createErrorNotice(
                  __(
                    "Something went wrong, please contact the author for support!",
                    "content-blocks-builder",
                  ),
                  { type: "snackbar" },
                );
              })
              .finally(() => {
                setIsLoading(false);
              });
          }}
        />
        <p style={{ margin: 0 }}>
          <strong>
            {__(
              "Enable this setting will override font families from the theme.",
              "content-blocks-builder",
            )}
          </strong>{" "}
          <strong>
            {__(
              "It also generates two CSS classes named: 'headings-font-family', 'body-font-family' and two CSS variables named '--cbb--headings--font-family', '--cbb--body--font-family'. You can use those to set the font family for your blocks.",
              "content-blocks-builder",
            )}
          </strong>
        </p>
        {enable && (
          <>
            <ToggleControlStyled
              checked={useBunnyFonts ?? false}
              disabled={isUndefined(useBunnyFonts)}
              label={
                <>
                  <span>
                    {__(
                      "Load Bunny Fonts instead of Google Fonts for GDPR compliance",
                      "content-blocks-builder",
                    )}
                  </span>
                  {isUndefined(useBunnyFonts) ||
                    (isLoading && <Spinner style={{ margin: "0 10px 0 0" }} />)}
                </>
              }
              onChange={(value) => {
                setUseBunnyFonts(value);

                setIsLoading(true);
                saveEditedEntityRecord("root", "site")
                  .then(() => {
                    createSuccessNotice(
                      __("Setttings saved!", "content-blocks-builder"),
                      {
                        type: "snackbar",
                      },
                    );
                  })
                  .catch((error) => {
                    console.error(error);
                    createErrorNotice(
                      __(
                        "Something went wrong, please contact the author for support!",
                        "content-blocks-builder",
                      ),
                      { type: "snackbar" },
                    );
                  })
                  .finally(() => {
                    setIsLoading(false);
                  });
              }}
              className="use-bunny-fonts"
            />
            <p>
              <strong>
                <HelpLink
                  href="https://fonts.google.com/"
                  label="Google Fonts"
                />
                ,{" "}
                <HelpLink href="https://fonts.bunny.net/" label="Bunny Fonts" />
              </strong>
            </p>
          </>
        )}
      </Widget>
      {enable && <TypographyWidget />}
    </Section>
  );
};

export default Typography;
