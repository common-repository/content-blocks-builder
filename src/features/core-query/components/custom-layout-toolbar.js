/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { list, grid } from "@wordpress/icons";
import { ToolbarGroup } from "@wordpress/components";

/**
 * Internal dependencies
 */

export default function CustomLayoutToolbar({
  displayLayout,
  setDisplayLayout,
  isLegacy,
}) {
  let displayLayoutControls = [
    {
      icon: (
        <svg
          className="bb-icon bb-icon--slides"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5 14V6h10v8H5zm-3-1V7h2v6H2zm4-6v6h8V7H6zm10 0h2v6h-2V7zm-3 2V8H7v1h6zm0 3v-2H7v2h6z"></path>
        </svg>
      ),
      title: __("Carousel view", "content-blocks-builder"),
      onClick: () => setDisplayLayout({ type: "carousel" }),
      isActive: displayLayout?.type === "carousel",
    },
    {
      icon: (
        <svg
          className="bb-icon bb-icon--grid-3x2"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v8a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 11.5v-8zM1.5 3a.5.5 0 0 0-.5.5V7h4V3H1.5zM5 8H1v3.5a.5.5 0 0 0 .5.5H5V8zm1 0v4h4V8H6zm4-1V3H6v4h4zm1 1v4h3.5a.5.5 0 0 0 .5-.5V8h-4zm0-1h4V3.5a.5.5 0 0 0-.5-.5H11v4z" />
        </svg>
      ),
      title: __("Responsive grid view", "content-blocks-builder"),
      onClick: () =>
        setDisplayLayout({ type: isLegacy ? "grid" : "responsiveGrid" }),
      isActive: isLegacy
        ? displayLayout?.type === "grid"
        : displayLayout?.type === "responsiveGrid",
    },
  ];

  if (!isLegacy) {
    displayLayoutControls = [
      {
        icon: list,
        title: __("List view"),
        onClick: () => setDisplayLayout({ type: "default" }),
        isActive:
          displayLayout?.type === "default" ||
          displayLayout?.type === "constrained",
      },
      {
        icon: grid,
        title: __("Grid view"),
        onClick: () => setDisplayLayout({ type: "grid" }),
        isActive: displayLayout?.type === "grid",
      },
      ...displayLayoutControls,
    ];
  }
  return (
    <ToolbarGroup
      className="cbb-toolbar-query-layout"
      controls={displayLayoutControls}
    />
  );
}
