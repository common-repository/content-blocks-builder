/**
 * Update live-style
 *
 * @param {String} id
 * @param {String} content
 * @param {Boolean} remove
 * @param {Boolean} isHTMLPreview
 */
export const updateDynamicStyle = (
  id,
  content,
  remove = false,
  isHTMLPreview = false
) => {
  let previewDoc = document;

  const editorCanvas = document.querySelector('iframe[name="editor-canvas"]');
  if (editorCanvas) {
    previewDoc = editorCanvas.contentWindow.document;
  }

  if (isHTMLPreview) {
    const htmlPreview = previewDoc.querySelector(
      ".block-library-html__edit iframe"
    );

    if (htmlPreview) {
      previewDoc = htmlPreview.contentWindow.document;
    }
  }

  let styleElement = previewDoc.getElementById(id);

  if (remove) {
    if (styleElement) {
      styleElement.remove();
    }
  } else {
    // Create a new one if don't have one
    if (!styleElement) {
      styleElement = previewDoc.createElement("style");
      styleElement.id = id;

      previewDoc.head.appendChild(styleElement);
    }

    styleElement.textContent = content;
  }
};
