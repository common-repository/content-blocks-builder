/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useSelect } from "@wordpress/data";
import { useEntityProp } from "@wordpress/core-data";
import { registerPlugin } from "@wordpress/plugins";
import {
  PanelBody,
  CheckboxControl,
  Spinner,
  BaseControl,
  TextareaControl,
  ToggleControl,
} from "@wordpress/components";
import {
  PluginSidebar,
  PluginSidebarMoreMenuItem,
  PluginDocumentSettingPanel,
  store as editorStore,
} from "@wordpress/editor";
import { useState, useEffect } from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";
import { addQueryArgs } from "@wordpress/url";
import { applyFilters } from "@wordpress/hooks";

/**
 * Internal dependencies
 */
import { userCanUpdateSettings } from "../utils/role-and-cap";
import { CBB_PATTERN_TYPE } from "../utils/constants";
import { HelpLink } from "../components/help-link";

/**
 * Register the custom pattern meta.
 */
registerPlugin("boldblocks-pattern-meta", {
  render: () => {
    const { getCurrentPostType } = useSelect(
      (select) => select(editorStore),
      [],
    );
    const [isLoading, setIsLoading] = useState(true);
    const [allCategories, setAllCategories] = useState([]);

    // Only display block settings for CBB_PATTERN_TYPE content type
    if (getCurrentPostType() !== CBB_PATTERN_TYPE) {
      return null;
    }

    // Get pattern categories.
    useEffect(() => {
      apiFetch({ path: "boldblocks/v1/getPatternCategories" }).then((res) => {
        setAllCategories(res);
        setIsLoading(false);
      });
    }, []);

    // Get meta, setMeta
    const [meta, setMeta] = useEntityProp("postType", CBB_PATTERN_TYPE, "meta");

    const updateMeta = (name) => (newValue) => {
      setMeta({ ...meta, [name]: newValue });
    };

    const {
      boldblocks_pattern_categories: patternCategories = [],
      boldblocks_pattern_description: patternDescription = "",
      boldblocks_pattern_disabled_inserter: disabledInserter = false,
    } = meta;

    const pluginTitle = __("Pattern settings", "content-blocks-builder");

    const PluginControls = (
      <>
        <TextareaControl
          label={__("Pattern description", "content-blocks-builder")}
          value={patternDescription}
          onChange={updateMeta("boldblocks_pattern_description")}
          rows={4}
        />
        <ToggleControl
          checked={disabledInserter}
          label={__(
            "Don't show this pattern in the inserter",
            "content-blocks-builder",
          )}
          onChange={updateMeta("boldblocks_pattern_disabled_inserter")}
        />
        <BaseControl
          label={__("Select pattern categories", "content-blocks-builder")}
        />
        {!!allCategories.length ? (
          <>
            {allCategories
              .filter(({ name }) => name !== "boldblocks")
              .map(({ name, label }) => (
                <CheckboxControl
                  key={name}
                  label={label}
                  checked={patternCategories.find(
                    ({ name: itemName }) => itemName === name,
                  )}
                  onChange={(checked) => {
                    let newCategories = [];
                    if (checked) {
                      newCategories = [...patternCategories, { name, label }];
                    } else {
                      newCategories = patternCategories.filter(
                        ({ name: itemName }) => itemName !== name,
                      );
                    }
                    updateMeta("boldblocks_pattern_categories")(newCategories);
                  }}
                />
              ))}
            {userCanUpdateSettings && (
              <p>
                <HelpLink
                  href={addQueryArgs(
                    "edit.php?post_type=boldblocks_block&page=cbb-settings&tab=general",
                  )}
                  label={__(
                    "Manage custom categories",
                    "content-blocks-builder",
                  )}
                />
              </p>
            )}
          </>
        ) : (
          <>{isLoading && <Spinner />}</>
        )}
        {applyFilters("boldblocks.patternSettings.additionalSettings", null, {
          meta,
          setMeta,
        })}
      </>
    );

    return (
      <>
        <PluginDocumentSettingPanel
          name="content-block-settings"
          title={pluginTitle}
          initialOpen={true}
        >
          {PluginControls}
        </PluginDocumentSettingPanel>
        <PluginSidebarMoreMenuItem target="pattern-settings">
          {pluginTitle}
        </PluginSidebarMoreMenuItem>
        <PluginSidebar name="pattern-settings" title={pluginTitle}>
          <PanelBody>{PluginControls}</PanelBody>
        </PluginSidebar>
      </>
    );
  },
});
