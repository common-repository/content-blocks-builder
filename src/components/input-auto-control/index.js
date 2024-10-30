/**
 * External dependencies
 */
import { noop } from "lodash";
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { TextControl, ToggleControl } from "@wordpress/components";

/**
 * Internal dependencies
 */
import { LabelControl, GroupControl } from "sdk/components";
import { toType } from "../../utils/dom";
import { labels } from "../../utils/labels";

const InputWithAutoStyled = styled(GroupControl)`
  .input-control > .components-base-control__field {
    margin-bottom: 0;
  }
`;

const InputWithAutoControl = ({
  label,
  autoLabel = labels.auto,
  value,
  fields,
  Input = TextControl,
  onChange = noop,
  ...otherProps
}) => {
  fields = fields
    ? fields
    : [
        { name: "value", label: "", type: "number", step: "any", min: 0.5 },
        { name: "auto", label: autoLabel },
      ];

  const values =
    toType(value) === "object"
      ? value
      : "auto" === value
      ? { auto: true, value: 1 }
      : { auto: false, value };
  return (
    <InputWithAutoStyled
      label={label}
      fields={fields}
      values={values}
      renderLabel={({ label }) => (
        <LabelControl label={label} isResponsive={false} />
      )}
      renderControl={({
        name,
        label,
        value,
        onChange,
        values,
        fields,
        ...inputProps
      }) => {
        const { auto } = values;
        if (name === "auto") {
          return (
            <ToggleControl label={label} checked={value} onChange={onChange} />
          );
        } else if (name === "value") {
          return (
            <TextControl
              label={label}
              value={value}
              onChange={onChange}
              disabled={auto}
              className="input-control"
              {...inputProps}
            />
          );
        }

        return null;
      }}
      isLinkedGroup={false}
      onChange={onChange}
      columns={2}
      className="input-with-auto"
      {...otherProps}
    />
  );
};
export default InputWithAutoControl;
