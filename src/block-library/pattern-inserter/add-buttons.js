/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useSelect, subscribe } from "@wordpress/data";
import { registerPlugin } from "@wordpress/plugins";
import { createRoot } from "@wordpress/element";
import { store as editorStore } from "@wordpress/editor";
import { Button } from "@wordpress/components";

/**
 * Internal dependencies
 */
import { ReactComponent as CBBIcon } from "../../assets/icon.svg";
import { TemplatesModal } from "./modal";
import {
  getPatternInserterModalStatus,
  getSetPatternInserterModalStatus,
} from "./utils";
import { SearchParams } from "../../utils/searchparams";

/**
 * Styles
 */
import "./add-buttons.scss";

/**
 * Register the block templates.
 */
registerPlugin("boldblocks-block-templates", {
  render: () => {
    const postType = useSelect(
      (select) => select(editorStore).getCurrentPostType(),
      [],
    );

    const modalStatus = getPatternInserterModalStatus();
    const setPatternInserterModalStatus = getSetPatternInserterModalStatus();

    // Don't display on block, variation content type
    if (["boldblocks_block", "boldblocks_variation"].includes(postType)) {
      return null;
    }

    const searchParams = new SearchParams();
    if (searchParams.get("bb-template-modal")) {
      setPatternInserterModalStatus(true);
      searchParams.delete("bb-template-modal");
    }

    const patternInserterElement = Object.assign(
      document.createElement("div"),
      {
        id: "boldblocks-templates-inserter",
      },
    );
    createRoot(patternInserterElement).render(
      <Button
        variant="secondary"
        className="button-insert-template"
        icon={CBBIcon}
        onClick={() => {
          setPatternInserterModalStatus(true);
        }}
      >
        <span className="button-insert-template__text">
          {__("Pattern", "content-blocks-builder")}
        </span>
      </Button>,
    );

    // Create the insert pattern button
    subscribe(() => {
      setTimeout(() => {
        const postHeader = document.querySelector(".edit-post-header-toolbar");

        if (
          postHeader &&
          !postHeader.querySelector("#boldblocks-templates-inserter")
        ) {
          postHeader.append(patternInserterElement);
          postHeader.classList.add("has-cbb-pattern-button");
        }
      }, 1);
    });

    return (
      <>
        {!!modalStatus && (
          <TemplatesModal
            isModalOpen={modalStatus}
            setIsModalOpen={setPatternInserterModalStatus}
          />
        )}
      </>
    );
  },
});
