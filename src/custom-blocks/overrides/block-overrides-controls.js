/**
 * UI and logic behind this feature is borrowed from the core pattern overrides feature.
 */

/**
 * WordPress dependencies
 */
import { useState, useId } from "@wordpress/element";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, BaseControl, Button } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import { CBB_OVERRIDES_BINDING_SOURCE, getSupportedAttributes } from "./utils";
import {
  AllowOverridesModal,
  DisallowOverridesModal,
} from "./allow-overrides-modal";
import { labels } from "../../utils/labels";

function removeBindings(bindings, syncedAttributes) {
  let updatedBindings = {};
  for (const attributeName of syncedAttributes) {
    // Omit any bindings that's not the same source from the `updatedBindings` object.
    if (
      bindings?.[attributeName]?.source !== CBB_OVERRIDES_BINDING_SOURCE &&
      bindings?.[attributeName]?.source !== undefined
    ) {
      updatedBindings[attributeName] = bindings[attributeName];
    }
  }
  if (!Object.keys(updatedBindings).length) {
    updatedBindings = undefined;
  }
  return updatedBindings;
}

function addBindings(bindings, syncedAttributes) {
  const updatedBindings = { ...bindings };
  for (const attributeName of syncedAttributes) {
    if (!bindings?.[attributeName]) {
      updatedBindings[attributeName] = {
        source: CBB_OVERRIDES_BINDING_SOURCE,
      };
    }
  }
  return updatedBindings;
}

function BlockOverridesControls({ attributes, name, setAttributes }) {
  const controlId = useId();
  const [showAllowOverridesModal, setShowAllowOverridesModal] = useState(false);
  const [showDisallowOverridesModal, setShowDisallowOverridesModal] =
    useState(false);

  const syncedAttributes = getSupportedAttributes(name);

  // Core binding sources
  const coreBindingSources = syncedAttributes.map(
    (attributeName) => attributes.metadata?.bindings?.[attributeName]?.source,
  );

  const isConnectedToOtherSources = coreBindingSources.every(
    (source) => source && source !== CBB_OVERRIDES_BINDING_SOURCE,
  );

  // Avoid overwriting other (e.g. meta) bindings.
  if (isConnectedToOtherSources) {
    return null;
  }

  const attributeSources = syncedAttributes.map(
    (attributeName) =>
      attributes.metadata?.cbbBindings?.[attributeName]?.source,
  );

  function updateBindings(isChecked, customName) {
    const prevBindings = attributes?.metadata?.cbbBindings;
    const updatedBindings = isChecked
      ? addBindings(prevBindings, syncedAttributes)
      : removeBindings(prevBindings, syncedAttributes);

    const updatedMetadata = {
      ...attributes.metadata,
      cbbBindings: updatedBindings,
    };

    if (customName) {
      updatedMetadata.name = customName;
    }

    setAttributes({
      metadata: updatedMetadata,
    });
  }

  const hasName = !!attributes.metadata?.name;
  const allowOverrides =
    hasName &&
    attributeSources.some((source) => source === CBB_OVERRIDES_BINDING_SOURCE);

  return (
    <>
      <InspectorControls>
        <PanelBody title={labels.overrides}>
          <BaseControl
            id={controlId}
            label={labels.overrides}
            help={__(
              "Allow changes to this block throughout instances of this block.",
              "content-blocks-buider",
            )}
          >
            <Button
              __next40pxDefaultSize
              className="widefat"
              variant="secondary"
              aria-haspopup="dialog"
              onClick={() => {
                if (allowOverrides) {
                  setShowDisallowOverridesModal(true);
                } else {
                  setShowAllowOverridesModal(true);
                }
              }}
            >
              {allowOverrides
                ? labels.disableOverrides
                : labels.enableOverrides}
            </Button>
          </BaseControl>
        </PanelBody>
      </InspectorControls>

      {showAllowOverridesModal && (
        <AllowOverridesModal
          initialName={attributes.metadata?.name}
          onClose={() => setShowAllowOverridesModal(false)}
          onSave={(newName) => {
            updateBindings(true, newName);
          }}
        />
      )}
      {showDisallowOverridesModal && (
        <DisallowOverridesModal
          onClose={() => setShowDisallowOverridesModal(false)}
          onSave={() => updateBindings(false)}
        />
      )}
    </>
  );
}

export default BlockOverridesControls;
