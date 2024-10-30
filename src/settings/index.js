/**
 * External dependencies
 */
import { findKey } from "lodash";

/**
 * WordPress dependencies
 */
import domReady from "@wordpress/dom-ready";
import { createRoot } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { TabPanel } from "@wordpress/components";

/**
 * Internal dependencies
 */
import { useGlobalData, DataContext } from "./data";
import { SearchParams } from "../utils/searchparams";
import GettingStarted from "./getting-started";
import Typography from "./typography";
import GeneralSettings from "./general";
import Tools from "./tools";
import DeveloperSection from "./developer";

// Styles
import "./index.scss";

const TabContent = ({ children }) => (
  <div className="metabox-holder">{children}</div>
);

const SettingsBody = () => {
  const tabs = [
    {
      name: "getting-started",
      title: __("Getting Started", "content-blocks-builder"),
      className: "setting-tabs__getting-started",
    },
    {
      name: "general",
      title: __("General", "content-blocks-builder"),
      className: "setting-tabs__general",
    },
    {
      name: "typography",
      title: __("Typography", "content-blocks-builder"),
      className: "setting-tabs__typography",
    },
    {
      name: "tools",
      title: __("Tools", "content-blocks-builder"),
      className: "setting-tabs__tools",
    },

    {
      name: "developer",
      title: __("Developer", "content-blocks-builder"),
      className: "setting-tabs__developer",
    },
  ];

  const searchParams = new SearchParams();
  const tabParam = searchParams.get("tab");
  const initialTabName = findKey(tabs, ["name", tabParam])
    ? tabParam
    : "getting-started";

  const globalData = useGlobalData();

  return (
    <DataContext.Provider value={globalData}>
      <TabPanel
        tabs={tabs}
        className="settings-tabs"
        activeClass="is-active"
        initialTabName={initialTabName}
        onSelect={(tabName) => {
          searchParams.set("tab", tabName);
        }}
      >
        {(tab) => {
          switch (tab.name) {
            case "getting-started":
              return (
                <TabContent>
                  <GettingStarted />
                </TabContent>
              );

            case "general":
              return (
                <TabContent>
                  <GeneralSettings />
                </TabContent>
              );

            case "typography":
              return (
                <TabContent>
                  <Typography />
                </TabContent>
              );

            case "tools":
              return (
                <TabContent>
                  <Tools />
                </TabContent>
              );

            case "developer":
              return (
                <TabContent>
                  <DeveloperSection />
                </TabContent>
              );

            default:
              break;
          }
        }}
      </TabPanel>
    </DataContext.Provider>
  );
};

/**
 * Kick start
 */
domReady(() => {
  createRoot(document.querySelector(".js-boldblocks-settings-root")).render(
    <SettingsBody />,
  );
});
