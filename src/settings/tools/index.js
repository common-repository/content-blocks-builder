/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import { Section } from "sdk/components";
import ExportWidget from "./export-widget";
import ImportWidget from "./import-widget";
import { useImportExportData } from "./utils";
import { ToolsContext } from "./utils";

const Tools = () => {
  const data = useImportExportData();
  return (
    <ToolsContext.Provider value={data}>
      <Section
        description={__(
          "Import/Export blocks, patterns and variations",
          "content-blocks-builder"
        )}
      >
        <ExportWidget />
        <ImportWidget />
      </Section>
    </ToolsContext.Provider>
  );
};

export default Tools;
