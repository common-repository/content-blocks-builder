/**
 * External dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * WordPress dependencies
 */
import { addFilter } from "@wordpress/hooks";

/**
 * Internal dependencies
 */
import {
  DependentResources,
  CustomResources,
} from "../components/dependent-resources";

/**
 * Render settings for custom scripts
 */
addFilter(
  "boldblocks.manageBlocks.customScripts",
  "boldblocks/freeview",
  (content, { externalScripts, customScripts, disabledScriptsTitle }) => {
    let controls = <p>{disabledScriptsTitle}</p>;
    if (externalScripts?.length) {
      controls = (
        <>
          {controls}
          <DependentResources
            label={__("External scripts", "content-blocks-builder")}
            values={externalScripts ? externalScripts : []}
            resourceType="script"
          />
        </>
      );
    }

    if (customScripts?.length) {
      controls = (
        <>
          {controls}
          <CustomResources
            values={customScripts ? customScripts : []}
            resourceType="script"
          />
        </>
      );
    }
    return (
      <>
        {content}
        {controls}
      </>
    );
  },
);

/**
 * Render settings for custom styles
 */
addFilter(
  "boldblocks.manageBlocks.customStyles",
  "boldblocks/freeview",
  (content, { externalStyles, customStyles, disabledStylesTitle }) => {
    let controls = <p>{disabledStylesTitle}</p>;
    if (externalStyles?.length) {
      controls = (
        <>
          {controls}
          <DependentResources
            label={__("External stylesheets", "content-blocks-builder")}
            values={externalStyles}
            resourceType="stylesheet"
          />
        </>
      );
    }

    if (customStyles?.length) {
      controls = (
        <>
          {controls}
          <CustomResources values={customStyles} resourceType="stylesheet" />
        </>
      );
    }

    return (
      <>
        {content}
        {controls}
      </>
    );
  },
);
