/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { sprintf, __ } from "@wordpress/i18n";
import {
  TextControl,
  TextareaControl,
  SelectControl,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import { RepeaterGroupControl, LabelControl } from "sdk/components";

import { LabelHelpControl } from "../label-help-control";
import { HelpLink } from "../help-link";

import { MetaQueryControlStyled } from "./styles";

const MetaQueryControl = (props) => {
  const { label, values, onChange, index } = props;

  const typeOptions = [
    {
      value: "char",
      label: __("Default (char)", "content-blocks-builder"),
    },
    { value: "numeric", label: __("Numeric", "content-blocks-builder") },
    {
      value: "date",
      label: __("Date", "content-blocks-builder"),
    },
  ];

  const compareOptions = [
    "=",
    "!=",
    ">",
    ">=",
    "<",
    "<=",
    "LIKE",
    "NOT LIKE",
    "IN",
    "NOT IN",
    "BETWEEN",
    "NOT BETWEEN",
    "EXISTS",
    "NOT EXISTS",
  ];

  const fields = [
    {
      name: "type",
      label: __("Data type", "content-blocks-builder"),
      options: typeOptions,
    },
    {
      name: "compare",
      label: __("Compare operator", "content-blocks-builder"),
      options: compareOptions.map((operator) => ({
        value: operator,
        label: operator,
      })),
    },
    {
      name: "date_format",
      label: __("Date format", "content-blocks-builder"),
      autoComplete: "off",
      placeholder: "Y-m-d",
    },
    {
      name: "key",
      label: __("Field key", "content-blocks-builder"),
      required: true,
      autoComplete: "off",
      placeholder: __("Input a custom field name.", "content-blocks-builder"),
    },
    {
      name: "value",
      label: __("Field value", "content-blocks-builder"),
      required: true,
      autoComplete: "off",
      rows: 4,
    },
    {
      name: "query_string",
      label: __("Query string parameter", "content-blocks-builder"),
      autoComplete: "off",
      help: __(
        "Get value from the query string if available. Leave it blank to disable this feature.",
        "content-blocks-builder",
      ),
    },
  ];

  const renderControl = ({
    name,
    label,
    value,
    onChange,
    options,
    values,
    fields,
    pattern,
    ...otherProps
  }) => {
    const { type = "char", compare = "=" } = values;

    switch (name) {
      case "type":
        return (
          <SelectControl
            label={label}
            value={value}
            onChange={onChange}
            options={options}
            {...otherProps}
          />
        );

      case "compare":
        if (type === "char") {
          options = options.filter(
            ({ value }) => !["BETWEEN", "NOT BETWEEN"].includes(value),
          );
        } else if (["numeric", "date"].includes(type)) {
          options = options.filter(
            ({ value }) => !["LIKE", "NOT LIKE"].includes(value),
          );
        }

        return (
          <SelectControl
            label={label}
            value={value}
            onChange={onChange}
            options={options}
            {...otherProps}
          />
        );

      case "date_format":
        if ("date" !== type) {
          return null;
        }

        return (
          <TextControl
            label={label}
            value={value}
            onChange={onChange}
            {...otherProps}
          />
        );

      case "key":
        return (
          <TextControl
            label={label}
            value={value}
            onChange={onChange}
            {...otherProps}
          />
        );

      case "value":
        if (["EXISTS", "NOT EXISTS"].includes(compare)) {
          return null;
        }

        let placeholder = "";
        if (
          ["=", "!=", ">", ">=", "<", "<=", "LIKE", "NOT LIKE"].includes(
            compare,
          )
        ) {
          switch (type) {
            case "char":
              placeholder = __("Input a string", "content-blocks-buider");
              break;

            case "numeric":
              placeholder = __("Input a number", "content-blocks-buider");
              break;

            case "date":
              placeholder = __("Input a date string", "content-blocks-buider");

              break;

            default:
              break;
          }

          return (
            <TextControl
              label={label}
              value={value}
              placeholder={placeholder}
              onChange={onChange}
              {...otherProps}
            />
          );
        }

        if (["IN", "NOT IN"].includes(compare)) {
          switch (type) {
            case "char":
              placeholder = __(
                "Enter an array of strings separated by commas. Eg. red,green,blue",
                "content-blocks-buider",
              );
              break;

            case "numeric":
              placeholder = __(
                "Enter an array of numbers separated by commas. Eg. 1,10,100",
                "content-blocks-buider",
              );
              break;

            case "date":
              placeholder = __(
                "Enter an array of date strings separated by commas. Eg. 2023-05-20,2 weeks ago,today",
                "content-blocks-buider",
              );
              break;

            default:
              break;
          }
        }

        if (["BETWEEN", "NOT BETWEEN"].includes(compare)) {
          switch (type) {
            case "numeric":
              placeholder = __(
                "Enter 2 numbers separated by commas. Eg. 10,100",
                "content-blocks-buider",
              );
              break;

            case "date":
              placeholder = __(
                "Enter 2 date strings separated by commas. Eg. 2023-06-22,today",
                "content-blocks-buider",
              );
              break;

            default:
              break;
          }
        }

        return (
          <TextareaControl
            label={label}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            {...otherProps}
          />
        );

      case "query_string":
        if (["EXISTS", "NOT EXISTS"].includes(compare)) {
          return null;
        }

        return (
          <TextControl
            label={label}
            value={value}
            onChange={onChange}
            {...otherProps}
          />
        );

      default:
        break;
    }
    return null;
  };

  return (
    <>
      <MetaQueryControlStyled
        label={label}
        fields={fields}
        values={values}
        renderLabel={({ label }) => {
          return <LabelControl label={label} isResponsive={false} />;
        }}
        renderControl={renderControl}
        isLinkedGroup={false}
        onChange={onChange}
        className="meta-queries-group"
      />
    </>
  );
};

export const MetaQueries = (props) => {
  const { label, values } = props;
  const renderControl = ({ value, onChange, index }) => (
    <MetaQueryControl
      label={sprintf(__("Field %d", "content-blocks-builder"), index + 1)}
      values={value}
      onChange={onChange}
      index={index}
    />
  );

  const defaultItemValue = {
    type: "char",
    compare: "=",
    key: "",
    value: "",
  };

  const metaQueriesHelp = (
    <ul>
      <li>
        {__(
          "This feature does not support nested queries.",
          "content-blocks-builder",
        )}{" "}
        <HelpLink href="https://developer.wordpress.org/reference/classes/wp_query/#custom-field-post-meta-parameters" />
      </li>
      <li>
        <strong>{__("Date format: ", "content-blocks-builder")}</strong>
        {__(
          "The date format that is used to store the date field. Eg. Y-m-d, Ymd, timestamp ... Leave it blank to use the default value Y-m-d.",
          "content-blocks-builder",
        )}
      </li>
      <li>
        <strong>{__("Single date value: ", "content-blocks-builder")}</strong>
        {__(
          "The value must be parsed by the PHP strtotime function. For example: today, 30 days ago, 2023-06-22 ...",
          "content-blocks-buider",
        )}{" "}
        <HelpLink href="https://www.php.net/strtotime" label="strtotime" />
        {", "}
        <HelpLink
          href="https://www.php.net/manual/en/datetime.formats.relative.php"
          label={__("English textual datetime value", "content-blocks-builder")}
        />
      </li>
      <li>
        <strong>{__("Multiple value: ", "content-blocks-builder")} </strong>
        {__(
          'The multiple value must be separated by commas. To use comma in your value, you have to wrap the value in double quote. For example: "this, that",without comma',
          "content-blocks-buider",
        )}
      </li>
    </ul>
  );

  return (
    <div className="meta-queries-control">
      {label && (
        <LabelHelpControl
          label={label}
          helpControls={metaQueriesHelp}
          isAtTop={false}
        />
      )}
      <RepeaterGroupControl
        {...props}
        addItemLabel={__("Add new field", "content-blocks-builder")}
        removeItemLabel={__("Remove field", "content-blocks-builder")}
        renderControl={renderControl}
        defaultItemValue={defaultItemValue}
      />
    </div>
  );
};
