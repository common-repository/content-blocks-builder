/**
 * External dependencies
 */
import { find } from "lodash";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
  ToolbarGroup,
  ToolbarButton,
  Dropdown,
  NavigableMenu,
  MenuItem,
} from "@wordpress/components";

/**
 * Internal dependencies
 */

const PREVIEW_MODES = [
  { value: "EDIT", title: __("Edit mode", "content-blocks-builder") },
  { value: "PREVIEW", title: __("Preview mode", "content-blocks-builder") },
];

/**
 * Preview mode toolbar
 *
 * @param {Object} props
 * @returns
 */
export function PreviewMode({
  label = __("Change preview mode", "content-blocks-builder"),
  previewModes = PREVIEW_MODES,
  previewMode,
  setPreviewMode,
}) {
  previewMode = previewMode ? previewMode : "EDIT";
  const activeMode = find(previewModes, (mode) => mode.value === previewMode);
  const dropdownModes = previewModes.filter(
    (mode) => mode.value !== previewMode
  );

  return (
    <ToolbarGroup className="cbb-toolbar-preview" label={label}>
      <Dropdown
        renderToggle={({ onToggle }) => (
          <ToolbarButton onClick={onToggle}>{activeMode.title}</ToolbarButton>
        )}
        renderContent={({ onClose }) => (
          <NavigableMenu>
            {dropdownModes.map(({ value, title }) => (
              <MenuItem
                onClick={() => {
                  setPreviewMode(value);
                  onClose(true);
                }}
                key={value}
              >
                {title}
              </MenuItem>
            ))}
          </NavigableMenu>
        )}
      />
    </ToolbarGroup>
  );
}

export default PreviewMode;
