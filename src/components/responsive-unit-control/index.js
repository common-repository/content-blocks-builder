/**
 * External dependencies
 */
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
import { LabelControl, UnitRangeControl } from "sdk/components";

const Wrapper = styled.div`
  .control-label {
    margin-bottom: 0 !important;
  }
`;

/**
 * Responsive UnitControl
 *
 * @param {Object}
 * @returns
 */
const ResponsiveUnitControl = ({ label, value, onChange }) => {
  return (
    <Wrapper>
      <LabelControl
        isResponsive={true}
        label={label}
        className="control-label"
      />
      <UnitRangeControl value={value} onChange={onChange} />
    </Wrapper>
  );
};

export default ResponsiveUnitControl;
