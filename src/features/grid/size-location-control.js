/**
 * External dependencies
 */
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { TextControl } from "@wordpress/components";

/**
 * Internal dependencies
 */
import { LabelControl, GroupControl } from "sdk/components";
import { labels } from "../../utils/labels";

/**
 * Add style to GroupControl
 */
const GroupControlStyle = styled(GroupControl)`
  .boldblocks-group-control__body {
    > * {
      flex-basis: 50%;
    }
  }

  &.boldblocks-group-control--grid-column {
    .boldblocks-group-control__body {
      > :last-child {
        flex-basis: 100%; // Make the order control full width
      }
    }
  }
`;

/**
 * Grid item size and location
 *
 * @param {Object}
 * @returns
 */
const SizeLocationControl = ({
  columnSpanValue,
  onColumnSpanChange,
  rowSpanValue,
  onRowSpanChange,
}) => {
  return (
    <>
      <GroupControlStyle
        label={__("Column's size and location", "content-blocks-builder")}
        renderLabel={({ label }) => {
          return <LabelControl label={label} isResponsive={true} />;
        }}
        className="boldblocks-group-control--grid-column"
        renderControl={({ label, value, onChange, ...otherProps }) => (
          <TextControl
            label={label}
            value={value}
            onChange={onChange}
            {...otherProps}
          />
        )}
        isLinkedGroup={false}
        fields={[
          {
            name: "start",
            label: __("Start", "content-blocks-builder"),
            type: "number",
            min: -1,
            step: 1,
            placeholder: labels.auto,
          },
          {
            name: "span",
            label: __("Span", "content-blocks-builder"),
            type: "number",
            min: -1,
            step: 1,
            placeholder: labels.auto,
          },
          {
            name: "order",
            label: __("Order", "content-blocks-builder"),
            type: "number",
            min: -1,
            step: 1,
            placeholder: labels.auto,
          },
        ]}
        values={columnSpanValue}
        onChange={onColumnSpanChange}
        columns={3}
      />
      <GroupControlStyle
        label={__("Row's size and location", "content-blocks-builder")}
        renderLabel={({ label }) => {
          return <LabelControl label={label} isResponsive={true} />;
        }}
        renderControl={({ label, value, onChange, ...otherProps }) => (
          <TextControl
            label={label}
            value={value}
            onChange={onChange}
            {...otherProps}
          />
        )}
        isLinkedGroup={false}
        fields={[
          {
            name: "start",
            label: __("Start", "content-blocks-builder"),
            type: "number",
            min: -1,
            step: 1,
            placeholder: labels.auto,
          },
          {
            name: "span",
            label: __("Span", "content-blocks-builder"),
            type: "number",
            min: -1,
            step: 1,
            placeholder: labels.auto,
          },
        ]}
        values={rowSpanValue}
        onChange={onRowSpanChange}
        columns={2}
      />
    </>
  );
};

export default SizeLocationControl;
