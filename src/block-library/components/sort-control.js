/**
 * External dependencies
 */
import { find } from "lodash";
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Button, Dropdown, MenuGroup, MenuItem } from "@wordpress/components";

/**
 * Internal dependencies
 */
import { ReactComponent as SortIcon } from "../../assets/sort.svg";

const SORT_TYPES = [
  { value: "featured", title: __("Featured", "content-blocks-builder") },
  { value: "latest", title: __("Latest", "content-blocks-builder") },
  {
    value: "30_days",
    title: __("Most downloads last 30 days", "content-blocks-builder"),
    shortTitle: __("Last 30 days", "content-blocks-builder"),
  },
  {
    value: "7_days",
    title: __("Most downloads last 7 days", "content-blocks-builder"),
    shortTitle: __("Last 7 days", "content-blocks-builder"),
  },
];

const MenuGroupStyled = styled(MenuGroup)`
  .is-active {
    color: #fff;
    background-color: var(--wp-admin-theme-color, #007cba);
  }
`;

const SortControlStyled = styled.div`
  width: 120px;
  background-color: #f0f0f0;

  .components-dropdown {
    width: 100%;
  }

  .components-button.has-icon {
    width: 100%;
    padding: 8px;
    height: 40px;
  }

  @media (max-width: 599px) {
    /* $break-medium: 600px */
    width: 40px;

    .text {
      display: none;
    }

    .components-button.has-icon.has-text svg {
      margin-right: 0;
    }
  }

  @media (max-width: 1279px) {
    align-self: flex-start;
  }
`;

/**
 * Sort type toolbar
 *
 * @param {Object} props
 * @returns
 */
export function SortControl({ sortTypes = SORT_TYPES, value, onChange }) {
  value = value ? value : "featured";
  const active = find(sortTypes, (item) => item.value === value);

  return (
    <SortControlStyled className="sort-box">
      <Dropdown
        renderToggle={({ onToggle }) => (
          <Button onClick={onToggle} icon={SortIcon}>
            <span className="text">{active?.shortTitle ?? active.title}</span>
          </Button>
        )}
        popoverProps={{
          placement: "bottom-end",
          __unstableSlotName: "sortType",
        }}
        renderContent={({ onClose }) => (
          <MenuGroupStyled>
            {sortTypes.map((item) => (
              <MenuItem
                className={item.value === value ? "is-active" : ""}
                key={item.value}
                onClick={() => {
                  onChange(item.value);
                  onClose(true);
                }}
              >
                {item.title}
              </MenuItem>
            ))}
          </MenuGroupStyled>
        )}
      />
    </SortControlStyled>
  );
}
