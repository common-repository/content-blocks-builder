/**
 * External dependencies
 */
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */
import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import { TextControl, Button } from "@wordpress/components";

/**
 * Internal dependencies
 */

const MediaUploadStyled = styled.div`
  .media-preview {
    margin-top: 12px;

    > * {
      max-width: 100%;
      height: auto;
    }
  }

  .media-actions {
    display: flex;
    gap: 8px;
    margin-top: 12px;
  }

  .btn-set-media {
    display: block;
    width: 100%;
    background-color: #f0f0f0;
    border-radius: 2px;
  }
`;

/**
 * Upload/Choose media file
 *
 * @param {Object} param0
 * @returns
 */
const CustomMediaUpload = ({
  mediaType,
  media,
  label,
  inputLabel,
  inputPlaceholder,
  changeMediaLabel,
  removeMediaLabel,
  onMediaChange,
  renderPreview,
}) => {
  return (
    <MediaUploadStyled>
      <TextControl
        type="url"
        className="media-url"
        value={media?.url ?? ""}
        label={inputLabel}
        placeholder={inputPlaceholder}
        onChange={(url) => onMediaChange({ url })}
        autoComplete="off"
      />
      <MediaUploadCheck>
        <MediaUpload
          title={label}
          onSelect={({ id, url, alt, sizes }) =>
            onMediaChange({ id, url, alt, sizes })
          }
          allowedTypes={[mediaType]}
          value={media?.id}
          render={({ open }) => (
            <>
              {media?.url ? (
                <>
                  <div className="media-preview">{renderPreview(media)}</div>
                  <div className="media-actions">
                    <Button
                      className="btn-change-media"
                      variant="secondary"
                      onClick={open}
                    >
                      {changeMediaLabel}
                    </Button>
                    <Button
                      className="btn-remove-media"
                      variant="secondary"
                      onClick={() => onMediaChange({})}
                    >
                      {removeMediaLabel}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="media-actions">
                  <Button className="btn-set-media" onClick={open}>
                    {label}
                  </Button>
                </div>
              )}
            </>
          )}
        />
      </MediaUploadCheck>
    </MediaUploadStyled>
  );
};

export default CustomMediaUpload;
