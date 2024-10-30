/**
 * External dependencies
 */
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */
import { __, sprintf } from "@wordpress/i18n";
import {
  TextControl,
  SelectControl,
  ToggleControl,
} from "@wordpress/components";
import { useState } from "@wordpress/element";

/**
 * Internal dependencies
 */
import {
  RepeaterGroupControl,
  GroupControl,
  LabelControl,
} from "sdk/components";
import { CodeEditor } from "../code-editor";
import { GroupItemToggle } from "../group-item-toggle";
import { labels } from "../../utils/labels";

export const ExternalResourceStyled = styled(GroupControl)`
  .components-toggle-control {
    width: 100%;
  }
`;

const ResourceControl = (props) => {
  const { label, values, onChange, resourceType = "script" } = props;
  const fields = [
    {
      name: "src",
      label: "URL",
      placeholder:
        resourceType === "script"
          ? "https://cdn-or-website.com/script.js"
          : "https://cdn-or-website.com/style.css",
      type: "url",
    },
    {
      name: "handle",
      label: `${labels.handle} (*)`,
    },
    {
      name: "deps",
      label: labels.dependencies,
      placeholder:
        resourceType === "script" ? "jquery,my-script" : "my-stylesheet",
    },
    {
      name: "version",
      label: labels.version,
      placeholder: __(
        "WP, CBB, 1.0.0 or leave it blank.",
        "content-blocks-builder",
      ),
    },
  ];

  if (resourceType === "script") {
    fields.push({
      name: "loading_strategy",
      label: labels.loadingStrategy,
      options: [
        { value: "none", label: "None" },
        { value: "defer", label: "Defer" },
        { value: "async", label: "Async" },
      ],
    });
    fields.push({
      name: "in_footer",
      label: labels.inFooter,
    });
  } else {
    fields.push({
      name: "media",
      label: labels.media,
      placeholder: "all",
      autoComplete: "media",
    });
  }

  fields.push({
    name: "in_backend",
    label: labels.inBackend,
  });

  const renderControl = ({
    name,
    label,
    value,
    placeholder,
    help = "",
    options,
  }) => {
    switch (name) {
      case "src":
      case "version":
      case "deps":
      case "media":
        return (
          <TextControl
            label={label}
            value={value}
            placeholder={placeholder}
            help={help}
            readOnly={true}
          />
        );

      case "handle":
        return (
          <TextControl
            label={label}
            value={value}
            placeholder={placeholder}
            help={help}
            readOnly={true}
          />
        );

      case "in_footer":
      case "in_backend":
        return <ToggleControl label={label} checked={value} disabled={true} />;

      case "loading_strategy":
        return (
          <SelectControl label={label} options={options} disabled={true} />
        );

      default:
        break;
    }

    return null;
  };

  const [isOpen, setIsOpen] = useState(() => !values?.src && !values?.handle);

  return (
    <>
      <GroupItemToggle
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        label={
          <>
            {label} {values?.handle && <code>{values.handle}</code>}
          </>
        }
      />
      <ExternalResourceStyled
        fields={fields}
        values={values}
        renderLabel={({ label }) => {
          return <LabelControl label={label} isResponsive={false} />;
        }}
        renderControl={renderControl}
        isLinkedGroup={false}
        onChange={onChange}
        className="external-resource-group"
      />
    </>
  );
};

export const DependentResources = (props) => {
  const { label, resourceType = "script" } = props;
  const renderControl = ({ value, index }) => (
    <ResourceControl
      label={sprintf(
        resourceType === "script" ? labels.scriptD : labels.stylesheetD,
        index + 1,
      )}
      values={value}
      resourceType={resourceType}
    />
  );

  return (
    <div className="dependent-resources-control">
      {label && <LabelControl label={label} isResponsive={false} />}
      <RepeaterGroupControl
        {...props}
        renderControl={renderControl}
        isEditable={false}
      />
    </div>
  );
};

const CustomResourceControl = (props) => {
  const { label, values, index, resourceType = "script" } = props;
  const fields = [
    {
      name: "handle",
      label: labels.handle,
      placeholder: labels.default,
    },
    {
      name: "value",
      label: resourceType === "script" ? labels.customJS : labels.customCSS,
    },
  ];

  const renderControl = ({ name, label, value, placeholder }) => {
    switch (name) {
      case "handle":
        return (
          <TextControl
            label={label}
            value={value}
            placeholder={placeholder}
            readOnly={true}
          />
        );

      case "value":
        return (
          <CodeEditor
            id={`cbb-block-custom-${resourceType}-${index}`}
            value={value}
            label={label}
            mode={resourceType === "script" ? "javascript" : "text/css"}
          />
        );

      default:
        break;
    }

    return null;
  };

  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <GroupItemToggle
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        label={
          <>
            {label} {values?.handle && <code>{values.handle}</code>}
          </>
        }
      />
      <GroupControl
        fields={fields}
        values={values}
        renderLabel={({ label }) => {
          return <LabelControl label={label} isResponsive={false} />;
        }}
        renderControl={renderControl}
        isLinkedGroup={false}
      />
    </>
  );
};

export const CustomResources = (props) => {
  const { label, resourceType = "script" } = props;
  const renderControl = ({ value, index }) => (
    <CustomResourceControl
      label={sprintf(labels.snippetD, index + 1)}
      index={index}
      values={value}
      resourceType={resourceType}
    />
  );

  return (
    <div className="dependent-resources-control">
      {label && <LabelControl label={label} isResponsive={false} />}
      <RepeaterGroupControl
        {...props}
        renderControl={renderControl}
        isEditable={false}
      />
    </div>
  );
};

export const CustomStyleEditor = ({ id, label, value }) => {
  return <CodeEditor id={id} value={value} label={label} mode={"text/css"} />;
};
