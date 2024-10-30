/**
 * External dependencies
 */
import { noop } from "lodash";
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { __experimentalUnitControl as UnitControl } from "@wordpress/components";

/**
 * Internal dependencies
 */
import { LabelControl, GroupControl, UnitRangeControl } from "sdk/components";

const GroupStyled = styled(GroupControl)`
  .components-input-control__input {
    height: 36px !important;
  }
`;

const GapControl = ({
  label,
  fields = [
    { name: "column", label: __("Column", "content-blocks-builder") },
    { name: "row", label: __("Row", "content-blocks-builder") },
  ],
  values,
  onChange = noop,
  getInitialLinkedState = ({ column, row }) => column === row,
  ...otherProps
}) => {
  return (
    <GroupStyled
      label={label}
      fields={fields}
      values={values}
      renderLabel={({ label }) => (
        <LabelControl label={label} isResponsive={true} />
      )}
      renderControl={({ label, value, onChange }) => (
        <UnitControl label={label} value={value} onChange={onChange} />
      )}
      renderAllControl={({ label, value, onChange }) => (
        <UnitRangeControl label={label} value={value} onChange={onChange} />
      )}
      getInitialLinkedState={getInitialLinkedState}
      onChange={onChange}
      columns={2}
      {...otherProps}
    />
  );
};
export default GapControl;
