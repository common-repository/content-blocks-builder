/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useSelect, useDispatch } from "@wordpress/data";
import { registerPlugin } from "@wordpress/plugins";
import { Button } from "@wordpress/components";
import { PluginPostStatusInfo, store as editorStore } from "@wordpress/editor";
import { store as noticesStore } from "@wordpress/notices";
import { useState } from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";

/**
 * Internal dependencies
 */
import { log } from "sdk/utils";

/**
 * Register the custom pattern meta.
 */
registerPlugin("cbb-copy-post", {
  render: () => {
    const postId = useSelect(
      (select) => select(editorStore).getCurrentPostId(),
      [],
    );
    const { createSuccessNotice, createErrorNotice } =
      useDispatch(noticesStore);
    const [isLoading, setIsLoading] = useState(false);

    // Handle coping post
    const copyPost = () => {
      setIsLoading(true);
      apiFetch({
        path: `boldblocks/v1/copyPost/${postId}`,
        method: "POST",
      })
        .then((res) => {
          if (res?.data?.notice) {
            const { message, edit_url, edit_label } = res.data.notice;
            createSuccessNotice(message, {
              actions: [{ url: edit_url, label: edit_label }],
            });
          }
        })
        .catch((error) => {
          log(error, "error");
          createErrorNotice(
            __(
              "An error has occurred. Please try refreshing the page.",
              "content-blocks-builder",
            ),
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    return (
      <>
        <PluginPostStatusInfo>
          <Button
            variant="link"
            disabled={isLoading}
            isBusy={isLoading}
            onClick={copyPost}
          >
            {__("Copy to a new item", "content-blocks-builder")}
          </Button>
        </PluginPostStatusInfo>
      </>
    );
  },
});
