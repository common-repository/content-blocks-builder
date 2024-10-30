/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { createContext, useState } from "@wordpress/element";
import { useEntityRecords } from "@wordpress/core-data";

/**
 * Internal dependencies
 */
import { useApiFetch } from "sdk/utils";

export const useGlobalData = () => {
  const { loading, error, data: { data: docs } = {} } = useApiFetch(
    "boldblocks/v1/getDocs"
  );

  let nonce = "";
  let purged = false;
  try {
    nonce = CBBSettings?.nonce;
    purged = CBBSettings?.isPurgedCache;
  } catch (error) {
    log("The nonce is not defined!", "error");
  }
  const [isPurged, setIsPurged] = useState(purged);

  const messages = {
    UpdateSettings: __("Update Settings", "content-blocks-builder"),
    Success: __("Setting Saved!", "content-blocks-builder"),
    Error: __(
      "Something went wrong, please contact the author for support!",
      "content-blocks-builder"
    ),
  };

  const {
    records: pages,
    isResolving: isResolvingPages,
  } = useEntityRecords("postType", "page", { per_page: 100 });

  return {
    Docs: { loading, error, docs },
    Debug: { nonce, isPurged, setIsPurged },
    Messages: messages,
    pages,
    isResolvingPages,
  };
};

export const DataContext = createContext();
