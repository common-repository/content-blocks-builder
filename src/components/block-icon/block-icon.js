/**
 * External dependencies
 */
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import { Button } from "@wordpress/components";
import { help as helpIcon } from "@wordpress/icons";

/**
 * Internal dependencies
 */
import { BrowseIconsModal, InlineSVG, SVGInputControl } from "sdk/components";
import { useInlineSVG, useIconLibraryData } from "sdk/utils";
import { iconLibraryStore } from "../../store/icon-library";
import IconHelp from "./icon-help";

const BlockIconStyled = styled.div`
  .boldblocks-block-icon__input,
  .boldblocks-block-icon__preview {
    margin-bottom: 12px;
  }

  .boldblocks-block-icon__preview {
    h3 {
      margin-bottom: 8px;
    }

    svg {
      width: 100%;
      height: auto;
      outline: 1px solid #ddd;
    }
  }
`;

const defaultKeywords = [
  "layout",
  "grid",
  "column",
  "group",
  "block",
  "slide",
  "shape",
  "align",
  "admin",
  "person",
  "people",
  "man",
  "editor",
  "brand",
  "logo",
  "social",
  "settings",
  "cart",
  "card",
  "circle",
  "square",
  "media",
  "file",
  "book",
  "database",
  "star",
  "map",
];

const Actions = ({ onClick }) => (
  <Button
    text={__("Help", "content-blocks-builder")}
    icon={helpIcon}
    iconSize={16}
    variant="secondary"
    size="small"
    onClick={onClick}
  />
);

/**
 * Block icon
 *
 * @param {Object}
 */
const BlockIcon = ({
  label,
  value,
  onChange,
  icons,
  keywords = defaultKeywords,
  ...props
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  icons = useIconLibraryData({
    isloadData: isModalOpen,
    storeName: iconLibraryStore,
    apiPath: "cbb/v1/getIconLibrary",
  });
  const [rawIcon, setRawIcon] = useInlineSVG(value, onChange);

  const [showHelp, setShowHelp] = useState(false);
  const onClick = () => setShowHelp(!showHelp);

  return (
    <BlockIconStyled className="boldblocks-block-icon">
      {isModalOpen && (
        <BrowseIconsModal
          title={__("Icon library", "content-blocks-builder")}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          icons={icons}
          onSubmit={setRawIcon}
          value={rawIcon}
          keywords={keywords}
        />
      )}
      <SVGInputControl
        value={rawIcon}
        onChange={setRawIcon}
        toggleLibraryModal={setIsModalOpen}
        label={label}
        uploadLabel={__("Upload SVG icon", "content-blocks-builder")}
        inputLabel={__("Or input SVG icon markup", "content-blocks-builder")}
        rows={5}
        placeholder={__("Input SVG markup…", "content-blocks-builder")}
        help={showHelp ? <IconHelp /> : null}
        Actions={<Actions onClick={onClick} />}
        className="boldblocks-block-icon__input"
        {...props}
      />
      {value && (
        <div className="boldblocks-block-icon__preview">
          <h3>{__("Icon Preview:", "content-blocks-builder")}</h3>
          <InlineSVG markup={value} />
        </div>
      )}
    </BlockIconStyled>
  );
};

export default BlockIcon;
