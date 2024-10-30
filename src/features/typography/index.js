/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
  typography as IconTypography,
  chevronLeft as iconBackToPreview,
  edit as iconEditTypography,
} from "@wordpress/icons";
import { useSelect } from "@wordpress/data";
import { useEntityProp } from "@wordpress/core-data";
import { registerPlugin } from "@wordpress/plugins";
import { PanelBody, Button, Spinner } from "@wordpress/components";
import {
  PluginSidebar,
  PluginSidebarMoreMenuItem,
  store as editorStore,
} from "@wordpress/editor";
import { useState } from "@wordpress/element";
import { addQueryArgs } from "@wordpress/url";

/**
 * Internal dependencies
 */
import { getPreviewDeviceType } from "sdk/utils";
import { canEditPostTypography } from "../../utils";
import { CBB_BLOCK_TYPE, CBB_VARIATION_TYPE } from "../../utils/constants";
import { useTypographyData, usePostApiPath } from "../../utils/typography";
import { TypographyControl } from "../../components/typography";

const pluginName = "boldblocks-typography";
const pluginTitle = __("Typography", "content-blocks-builder");

/**
 * Register the plugin
 */
registerPlugin(pluginName, {
  icon: IconTypography,
  render: () => {
    const { getCurrentPostType, getCurrentPostId } = useSelect(
      (select) => select(editorStore),
      [],
    );

    // Get current post type
    const postType = getCurrentPostType();

    // Ignore edit typography on blocks, variations.
    if ([CBB_VARIATION_TYPE, CBB_BLOCK_TYPE].indexOf(postType) !== -1) {
      return null;
    }

    const [enableTypography] = useEntityProp(
      "root",
      "site",
      "EnableTypography",
    );

    const canEditTypography = canEditPostTypography();

    if (!canEditTypography || !enableTypography) {
      return null;
    }

    // Ignore edit typography on templates, add it below here to prevent from hooks error.
    if (["wp_template", "wp_template_part"].indexOf(postType) !== -1) {
      return null;
    }

    return (
      <PostTypographyPlugin
        pluginName={pluginName}
        pluginTitle={pluginTitle}
        icon={IconTypography}
        postId={getCurrentPostId()}
        canEditTypography={canEditTypography}
      />
    );
  },
});

/**
 * Typography plugin
 * @returns
 */
const PostTypographyPlugin = ({
  pluginName,
  pluginTitle,
  icon,
  postId,
  canEditTypography,
}) => {
  const apiPath = usePostApiPath(postId);
  const data = useTypographyData(apiPath);
  const {
    globalFonts,
    isPostFonts,
    isDataLoaded,
    isFontsChanged,
    editingFonts,
    setEditingFonts,
    updateAndPersistPostFonts,
  } = data;

  const [isLoading, setIsLoading] = useState(false);
  const [messageData, setMessageData] = useState({
    type: "success",
    message: "",
  });

  const [isEditable, setIsEditable] = useState(false);

  return (
    <>
      <PluginSidebar name={pluginName} title={pluginTitle}>
        <PanelBody title={__("Post's Typography", "content-blocks-builder")}>
          {canEditTypography && (
            <Button
              onClick={() => {
                setIsEditable(!isEditable);
              }}
              variant="primary"
              icon={isEditable ? iconBackToPreview : iconEditTypography}
              style={{ padding: "6px 12px", margin: "0" }}
            >
              {isEditable
                ? __("Back to preview", "content-blocks-builder")
                : __("Edit fonts for this post only", "content-blocks-builder")}
            </Button>
          )}
          {isEditable && (
            <p
              style={{
                paddingBottom: "4px",
                margin: "8px 0px",
                fontSize: "1.1em",
                borderBottom: "1px solid #ddd",
              }}
            >
              {__(
                "Click on the 'Save fonts' button to save. Click on the 'Clear fonts' button to use the global setting fonts.",
                "content-blocks-builder",
              )}
            </p>
          )}
          {canEditTypography && !isEditable && (
            <>
              <Button
                href={addQueryArgs(
                  "edit.php?post_type=boldblocks_block&page=cbb-settings&tab=typography",
                )}
                target="_blank"
                variant="primary"
                icon={iconEditTypography}
                style={{ padding: "6px 12px", margin: "8px 0 0" }}
              >
                {__("Edit fonts for the whole site", "content-blocks-builder")}
              </Button>
            </>
          )}
          <TypographyControl
            {...data}
            isLoadingData={!isDataLoaded}
            isFontsChanged={isFontsChanged}
            editingFonts={editingFonts}
            setEditingFonts={setEditingFonts}
            messageData={messageData}
            setMessageData={setMessageData}
            isInSidebar={true}
            isEditable={isEditable}
            deviceType={getPreviewDeviceType()}
          />
          {isEditable && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginTop: "12px",
              }}
            >
              <Button
                variant="primary"
                disabled={isLoading || !isFontsChanged}
                onClick={(e) => {
                  e.preventDefault(), setIsLoading(true);

                  updateAndPersistPostFonts(
                    JSON.stringify(editingFonts),
                    apiPath,
                  )
                    .then(() => {
                      setMessageData({
                        type: "success",
                        message: __(
                          "Settings saved!",
                          "content-blocks-builder",
                        ),
                      });
                    })
                    .catch((error) => {
                      console.error(error);
                      setMessageData({
                        type: "error",
                        message: __(
                          "Something went wrong, please contact the author for support!",
                          "content-blocks-builder",
                        ),
                      });
                    })
                    .finally(() => {
                      setIsLoading(false);
                    });
                }}
              >
                {__("Save fonts", "content-blocks-builder")}
              </Button>
              {isPostFonts && (
                <Button
                  variant="secondary"
                  disabled={isLoading}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsLoading(true);

                    updateAndPersistPostFonts("", apiPath)
                      .then(() => {
                        // Update editing fonts
                        setEditingFonts(globalFonts);

                        setMessageData({
                          type: "success",
                          message: __(
                            "Clear fonts successfully!",
                            "content-blocks-builder",
                          ),
                        });
                      })
                      .catch((error) => {
                        console.error(error);
                        setMessageData({
                          type: "error",
                          message: __(
                            "Something went wrong, please contact the author for support!",
                            "content-blocks-builder",
                          ),
                        });
                      })
                      .finally(() => {
                        setIsLoading(false);
                      });
                  }}
                >
                  {__("Clear fonts", "content-blocks-builder")}
                </Button>
              )}
              {isLoading && <Spinner />}
            </div>
          )}
        </PanelBody>
      </PluginSidebar>
      <PluginSidebarMoreMenuItem target={pluginName} icon={icon}>
        {pluginTitle}
      </PluginSidebarMoreMenuItem>
    </>
  );
};
