/**
 * External dependencies
 */
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, useRef } from "@wordpress/element";

/**
 * Internal dependencies
 */
import { LabelHelpControl } from "../label-help-control";
import { labels } from "../../utils/labels";

const CodeEditorStyled = styled.div`
  width: 100%;

  .boldblocks-editor__code {
    margin-top: 8px;
    margin-right: -16px;
    margin-left: -16px;
    overflow: auto;
    border: 1px solid #ddd;

    > .CodeMirror {
      width: var(--cbb-editor-width, 600px);
    }
  }
`;

export const CodeEditor = ({ value, id, label, help, mode = "text/css" }) => {
  // The element
  let ref = useRef(null);
  let editorRef = useRef(null);

  if (!label) {
    label = mode === "text/css" ? labels.customCSS : labels.customJS;
  }

  if (!help) {
    help = mode === "text/css" ? labels.customCSSHelp : labels.customJSHelp;
  }

  useEffect(() => {
    if (!ref.current || editorRef.current) {
      return;
    }

    editorRef.current = wp.CodeMirror(ref.current, {
      mode,
      value,
      readOnly: "nocursor",
      lineNumbers: true,
      lineWrapping: true,
      matchBrackets: true,
      lint: true,
      tabSize: 2,
      styleActiveLine: true,
      styleActiveSelected: true,
      extraKeys: {
        "Shift-Ctrl-[": "fold",
        "Shift-Ctrl-]": "unfold",
      },
    });

    let longestLine = "";
    const lineCount = editorRef.current.lineCount();

    // Loop through all lines to find the longest one by character length.
    for (let i = 0; i < lineCount; i++) {
      const currentLine = editorRef.current.getLine(i);
      if (currentLine.length > longestLine.length) {
        longestLine = currentLine;
      }
    }

    const width = (longestLine ? longestLine.length : 0) * 9;
    ref.current.style.setProperty(
      "--cbb-editor-width",
      `${Math.min(Math.max(width, 270), 1800)}px`,
    );
  }, [ref.current]);

  return (
    <CodeEditorStyled className="boldblocks-editor">
      {label && (
        <LabelHelpControl label={label} helpControls={help} isAtTop={false} />
      )}
      <div ref={ref} id={id} className="boldblocks-editor__code"></div>
    </CodeEditorStyled>
  );
};
