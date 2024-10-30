/**
 * External dependencies
 */
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */
import { ToggleControl } from "@wordpress/components";

/**
 * Internal dependencies
 */

const BlockSupportsStyled = styled.div`
  > h3 {
    margin-bottom: 8px;
  }

  > div {
    padding: 12px 12px 0;
    margin-bottom: 12px;
    border: 1px solid #ddd;
  }
`;

/**
 * Support features
 *
 * @param {*} param0
 * @returns
 */
const BlockSupports = ({
  label,
  features,
  premiumFeatures,
  name,
  value,
  onChange,
  isPremium,
}) => {
  const featureElements = Object.keys(features).map((featureName) => {
    const { [featureName]: featureValue } = value;
    return (
      <ToggleControl
        key={featureName}
        label={features[featureName]}
        checked={featureValue}
        onChange={onChange(name, value, featureName)}
        disabled={!isPremium && premiumFeatures.includes(featureName)}
      />
    );
  });
  return (
    <BlockSupportsStyled>
      <h3>{label}</h3>
      <div>{featureElements}</div>
    </BlockSupportsStyled>
  );
};

export default BlockSupports;
