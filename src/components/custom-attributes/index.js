/**
 * External dependencies
 */
import dompurify from "dompurify";
import { isBoolean, isNil, isObject, isString, isUndefined } from "lodash";

/**
 * WordPress dependencies
 */
import { sprintf, __ } from "@wordpress/i18n";
import {
  TextControl,
  TextareaControl,
  SelectControl,
  ToggleControl,
  BaseControl,
  __experimentalUnitControl as UnitControl,
} from "@wordpress/components";
import { useState } from "@wordpress/element";

/**
 * Internal dependencies
 */
import {
  RepeaterGroupControl,
  LabelControl,
  ColorGradientDropdown,
} from "sdk/components";
import { useColorGradient, getColorCSSValue } from "sdk/utils";
import CustomMediaUpload from "../custom-media-upload";
import { GroupItemToggle } from "../group-item-toggle";
import { HelpLink } from "../help-link";
import { handlePatternInput } from "../../utils";
import { labels } from "../../utils/labels";
import { shareLabels } from "../../utils/shared-labels";

import { AttributesControlStyled, BlockAttributesStyled } from "./styles";

const AttributesControl = (props) => {
  const {
    label,
    values,
    onChange,
    isDefinitionMode = false,
    isEditable = true,
    openStates = {},
    setOpenStates,
    index,
    disableLabel,
  } = props;

  const attrTypeLabel = __("Attribute type", "content-blocks-builder");
  const dataTypeLabel = __("Data type", "content-blocks-builder");

  const dataAttrLabel = __("Data Attribute", "content-blocks-builder");
  const cssAttrLabel = __("CSS Variable", "content-blocks-builder");
  const ariaAttrLabel = __("Aria Attribute", "content-blocks-builder");
  const customAttrLabel = __("Custom Attribute", "content-blocks-builder");
  const valueLabel = __("Value", "content-blocks-builder");

  const htmlAttrNameLabel = __(
    "HTML attribute name:",
    "content-blocks-builder",
  );

  const fields = [
    {
      name: "attributeType",
      label: attrTypeLabel,
      placeholder: "",
      required: true,
      options: [
        { value: "data", label: dataAttrLabel },
        { value: "var", label: cssAttrLabel },
        { value: "aria", label: ariaAttrLabel },
        { value: "custom", label: customAttrLabel },
      ],
    },
    {
      name: "name",
      label: shareLabels.name,
      placeholder: "my-attribute-name",
      required: true,
      autoComplete: "off",
      pattern: "^[a-zA-Z]([a-zA-Z0-9])*([-]([a-zA-Z][a-zA-Z0-9]*)*)*",
      help: __(
        "Input an attribute name. It should be alphanumeric characters or dash(-)",
        "content-blocks-builder",
      ),
    },
    {
      name: "type",
      label: dataTypeLabel,
      placeholder: "",
      required: true,
      options: [
        { value: "text", label: __("Text", "content-blocks-builder") },
        { value: "number", label: __("Number", "content-blocks-builder") },
        { value: "boolean", label: __("Boolean", "content-blocks-builder") },
        { value: "unit", label: __("Unit", "content-blocks-builder") },
        { value: "color", label: __("Color", "content-blocks-builder") },
        {
          value: "background",
          label: __("Background", "content-blocks-builder"),
        },
        { value: "image", label: __("Image", "content-blocks-builder") },
        { value: "video", label: __("Video", "content-blocks-builder") },
        { value: "json", label: __("JSON", "content-blocks-builder") },
        { value: "label", label: shareLabels.label },
      ],
    },
    {
      name: "label",
      label: shareLabels.label,
      placeholder: __("Field label ", "content-blocks-builder"),
      required: true,
      autoComplete: "off",
    },
    {
      name: "help",
      label: __("Help text", "content-blocks-builder"),
      placeholder: __(
        "Input the help text for the field",
        "content-blocks-builder",
      ),
      autoComplete: "off",
      rows: 6,
    },
    {
      name: "value",
      label: isDefinitionMode ? labels.default : valueLabel,
      placeholder: "",
      required: true,
      autoComplete: "off",
      rows: 4,
    },
  ];

  if (isDefinitionMode) {
    fields.push({
      name: "isReadonly",
      label: __("Is ready-only", "content-blocks-builder"),
    });
  }

  const renderControl = ({
    name,
    label,
    value,
    onChange,
    help = "",
    options,
    values,
    fields,
    pattern,
    ...otherProps
  }) => {
    const {
      type: controlType = "text",
      attributeType,
      name: attrName,
      label: fieldLabel,
      isReadonly,
    } = values ?? {};

    let attributeTypeValue = "";
    let helpLabel = htmlAttrNameLabel;
    let helpCode = `${attributeType}-${attrName}`;

    switch (attributeType) {
      case "var":
        helpLabel = __("CSS variable name: ", "content-blocks-builder");
        helpCode = `--bb-attr--${attrName}`;
        attributeTypeValue = cssAttrLabel;
        break;

      case "aria":
        attributeTypeValue = ariaAttrLabel;
        break;
      case "data":
        attributeTypeValue = ariaAttrLabel;
        break;
      case "custom":
        attributeTypeValue = customAttrLabel;
        helpCode = attrName;
        break;
    }

    const attributeHelp = (
      <span>
        {helpLabel}
        <code>{helpCode}</code>
      </span>
    );

    switch (name) {
      case "name":
        help = isEditable ? (
          <>
            {help}
            <br />
            {attributeHelp}
          </>
        ) : (
          help
        );
        if (isEditable) {
          return (
            <TextControl
              label={label}
              value={value}
              onChange={handlePatternInput(pattern, onChange)}
              help={help}
              {...otherProps}
            />
          );
        } else {
          return null;
        }

      case "label":
        if (disableLabel) {
          return null;
        }

        if (isEditable) {
          return (
            <TextControl
              label={label}
              value={value}
              onChange={onChange}
              help={help}
              {...otherProps}
            />
          );
        } else {
          return null;
        }

      case "type":
      case "attributeType":
        if (isEditable) {
          return (
            <SelectControl
              label={label}
              value={value}
              onChange={onChange}
              options={options}
              help={help}
              {...otherProps}
            />
          );
        } else {
          return null;
        }

      case "help":
        if (disableLabel) {
          return null;
        }

        return (
          <>
            {isEditable ? (
              <div className="attribute-help-control">
                <TextareaControl
                  label={label}
                  value={isString(value) ? value : ""}
                  onChange={onChange}
                  rows={6}
                  {...otherProps}
                />
              </div>
            ) : (
              <>
                {value && (
                  <div
                    className="attribute-help"
                    dangerouslySetInnerHTML={{
                      __html: isString(value) ? dompurify.sanitize(value) : "",
                    }}
                  />
                )}
              </>
            )}
          </>
        );

      case "value":
        help = isEditable ? (
          help
        ) : (
          <>
            {help}
            <span className="field-details">
              <span className="control-label">
                <span>{attrTypeLabel}</span>: <code>{attributeTypeValue}</code>
              </span>
              <span className="control-label">
                <span>{dataTypeLabel}</span>: <code>{controlType}</code>
              </span>
              {attributeHelp}
            </span>
          </>
        );
        label = !isEditable && fieldLabel ? fieldLabel : label;

        if (isReadonly && !isDefinitionMode) {
          let valueString = "";
          switch (controlType) {
            case "color":
            case "background":
              valueString = value ? getColorCSSValue(value) : "";
              break;
            case "image":
            case "video":
              valueString = JSON.stringify(value);
              break;
            default:
              valueString = value + "";
          }

          return (
            <div className="attribute-value-control">
              <BaseControl label={valueLabel} />
              <code className="readonly-value">{valueString}</code>
              <BaseControl help={help} />
            </div>
          );
        }

        switch (controlType) {
          case "boolean":
            return (
              <div className="attribute-value-control">
                <ToggleControl
                  label={label}
                  checked={isBoolean(value) ? value : false}
                  onChange={onChange}
                  {...otherProps}
                />
                <BaseControl help={help} />
              </div>
            );

          case "color":
            const color =
              isObject(value) && (!isNil(value?.value) || !isNil(value?.slug))
                ? value
                : {};

            const [onColorChange] = useColorGradient(color, onChange);
            return (
              <div className="attribute-value-control">
                <BaseControl label={label} />
                <ColorGradientDropdown
                  enableAlpha={true}
                  settings={[
                    {
                      label: __("Color", "content-blocks-builder"),
                      onColorChange: onColorChange,
                      colorValue: color?.value,
                      gradients: null,
                    },
                  ]}
                />
                <BaseControl help={help} />
              </div>
            );

          case "background":
            const background =
              (isObject(value) && !isNil(value?.value)) ||
              !isNil(value?.slug) ||
              !isNil(value?.gradientSlug) ||
              !isNil(value?.gradientValue)
                ? value
                : {};

            const [onBackgroundColorChange, onGradientChange] =
              useColorGradient(background, onChange);
            return (
              <div className="attribute-value-control">
                <BaseControl label={label} />
                <ColorGradientDropdown
                  enableAlpha={true}
                  settings={[
                    {
                      label: __(
                        "Color with gradient",
                        "content-blocks-builder",
                      ),
                      onColorChange: onBackgroundColorChange,
                      colorValue: background?.value,
                      onGradientChange: onGradientChange,
                      gradientValue: background?.gradientValue,
                    },
                  ]}
                />
                <BaseControl help={help} />
              </div>
            );

          case "image":
            const media = isObject(value) && value?.url ? value : { url: "" };
            return (
              <div className="attribute-value-control">
                <BaseControl label={label} />
                <CustomMediaUpload
                  mediaType="image"
                  media={media}
                  label={__("Set image", "content-blocks-builder")}
                  inputLabel={__("Image URL", "content-blocks-builder")}
                  inputPlaceholder="https://example.com/image-file-name.jpg"
                  changeMediaLabel={__(
                    "Change image",
                    "content-blocks-builder",
                  )}
                  removeMediaLabel={__(
                    "Remove image",
                    "content-blocks-builder",
                  )}
                  onMediaChange={(newMedia) =>
                    onChange({
                      ...newMedia,
                      customAlt: media?.customAlt
                        ? media.customAlt
                        : newMedia?.alt,
                    })
                  }
                  renderPreview={(media) => (
                    <img
                      src={media?.url}
                      alt={__("Media preview", "content-blocks-builder")}
                    />
                  )}
                />
                <BaseControl help={help} />
              </div>
            );

          case "video":
            const video = isObject(value) && value?.url ? value : { url: "" };
            return (
              <div className="attribute-value-control">
                <BaseControl label={label} />
                <CustomMediaUpload
                  mediaType="video"
                  media={video}
                  label={__("Set video", "content-blocks-builder")}
                  inputLabel={__("Video URL", "content-blocks-builder")}
                  inputPlaceholder="https://example.com/video-file-name.mp4"
                  changeMediaLabel={__(
                    "Change video",
                    "content-blocks-builder",
                  )}
                  removeMediaLabel={__(
                    "Remove video",
                    "content-blocks-builder",
                  )}
                  onMediaChange={(newVideo) =>
                    onChange({
                      ...newVideo,
                      customAlt: video?.customAlt
                        ? video.customAlt
                        : newVideo?.alt,
                    })
                  }
                  renderPreview={(video) => (
                    <video src={video?.url} autoPlay={true} loop muted={true} />
                  )}
                />
                <BaseControl help={help} />
              </div>
            );

          case "number":
            return (
              <div className="attribute-value-control">
                <TextControl
                  label={label}
                  value={value}
                  onChange={onChange}
                  type={controlType}
                  {...otherProps}
                />
                <BaseControl help={help} />
              </div>
            );

          case "json":
            return (
              <div className="attribute-value-control">
                <TextareaControl
                  label={label}
                  value={isString(value) ? value : ""}
                  onChange={onChange}
                  rows={6}
                />
                <BaseControl
                  help={
                    <>
                      {__(
                        "Please make sure the value is a valid JSON string.",
                        "content-blocks-builder",
                      )}{" "}
                      <HelpLink
                        href="https://jsonlint.com"
                        label={__(
                          "Validate JSON data",
                          "content-blocks-builder",
                        )}
                      />
                      {help}
                    </>
                  }
                />
              </div>
            );

          case "unit":
            return (
              <div className="attribute-value-control">
                <UnitControl
                  label={label}
                  value={isString(value) ? value : ""}
                  onChange={onChange}
                  {...otherProps}
                />
                <BaseControl help={help} />
              </div>
            );

          case "label":
            return (
              <>
                {isEditable ? (
                  <div className="attribute-value-control">
                    <TextareaControl
                      label={label}
                      value={isString(value) ? value : ""}
                      onChange={onChange}
                      rows={10}
                    />
                    <BaseControl help={help} />
                  </div>
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: isString(value) ? dompurify.sanitize(value) : "",
                    }}
                  />
                )}
              </>
            );

          default:
            return (
              <div className="attribute-value-control">
                <TextareaControl
                  label={label}
                  value={isString(value) ? value : ""}
                  onChange={onChange}
                  {...otherProps}
                />
                <BaseControl help={help} />
              </div>
            );
        }

      case "isReadonly":
        return (
          <ToggleControl
            label={label}
            checked={value}
            onChange={onChange}
            help={help}
            className="attribute-readonly-control"
          />
        );
      default:
        break;
    }

    return null;
  };

  const initialOpenState = !isUndefined(openStates[`item${index}`])
    ? openStates[`item${index}`]
    : !values?.name || (!isEditable && values?.type === "label");

  return (
    <>
      <GroupItemToggle
        isOpen={initialOpenState}
        setIsOpen={(newState) => {
          setOpenStates({ ...openStates, [`item${index}`]: newState });
        }}
        label={
          <>
            {label} {values?.name && <code>{values.name}</code>}
          </>
        }
      />
      <AttributesControlStyled
        fields={fields}
        values={values}
        renderLabel={({ label }) => {
          return <LabelControl label={label} isResponsive={false} />;
        }}
        renderControl={renderControl}
        isLinkedGroup={false}
        onChange={onChange}
        className="custom-attributes-group"
      />
    </>
  );
};

export const CustomAttributes = (props) => {
  const { label, startIndex = 0, isDefinitionMode } = props;
  const renderControl = ({
    value,
    onChange,
    index,
    isEditable,
    openStates = {},
    setOpenStates,
    disableLabel = false,
  }) => (
    <AttributesControl
      label={sprintf(
        __("Attribute %d", "content-blocks-builder"),
        index + startIndex + 1,
      )}
      values={value}
      onChange={onChange}
      isEditable={isEditable}
      openStates={openStates}
      setOpenStates={setOpenStates}
      index={index}
      disableLabel={disableLabel}
      isDefinitionMode={isDefinitionMode}
    />
  );

  const defaultItemValue = {
    attributeType: "data",
    name: "",
    type: "text",
    value: "",
  };

  const [openStates, setOpenStates] = useState({});

  return (
    <div className="custom-attributes-control">
      {label && (
        <LabelControl label={label} isResponsive={false} isBold={true} />
      )}
      <RepeaterGroupControl
        {...props}
        addItemLabel={__("Add new attribute", "content-blocks-builder")}
        removeItemLabel={__("Remove attribute", "content-blocks-builder")}
        renderControl={renderControl}
        defaultItemValue={defaultItemValue}
        onMove={(index, oldIndex) => {
          let newStates = { [`item${index}`]: true };
          if (openStates[`item${index}`] ?? false) {
            newStates = { ...newStates, [`item${oldIndex}`]: true };
          } else {
            newStates = { ...newStates, [`item${oldIndex}`]: false };
          }

          setOpenStates({ ...openStates, ...newStates });
        }}
        onCreate={(index) => {
          setOpenStates({ ...openStates, [`item${index}`]: true });
        }}
        onRemove={(index) => {
          if (!(openStates[`item${index + 1}`] ?? false)) {
            setOpenStates({ ...openStates, [`item${index}`]: null });
          }
        }}
        openStates={openStates}
        setOpenStates={setOpenStates}
      />
    </div>
  );
};

export const BlockAttributes = ({
  attributes,
  enableCustomAttributes,
  onChangeAttributes,
  onChangeEnableCustomAttributes,
  label,
}) => {
  return (
    <BlockAttributesStyled>
      <LabelControl label={label} isResponsive={false} isBold={true} />
      <div className="block-custom-attributes">
        <CustomAttributes
          values={attributes}
          onChange={onChangeAttributes}
          isDefinitionMode={true}
        />
        <ToggleControl
          checked={enableCustomAttributes}
          label={__("Enable creating new attributes", "content-blocks-builder")}
          onChange={onChangeEnableCustomAttributes}
        />
      </div>
    </BlockAttributesStyled>
  );
};
