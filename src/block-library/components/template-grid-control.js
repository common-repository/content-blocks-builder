/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import { PaginateLinks } from "sdk/components";
import { TemplateGridStyled } from "./styles";

export const TemplateGridControl = ({
  items,
  allItems,
  onChangePage,
  currentPage = 1,
  pageSize = 6,
  TemplateItemControl,
}) => {
  if (!allItems.length) {
    return (
      <div className="template-list-not-found">
        {__("There is no items found.", "content-blocks-builder")}
      </div>
    );
  }

  return (
    <>
      <TemplateGridStyled className="template-list">
        {items.map((item) => (
          <TemplateItemControl item={item} key={item.id} />
        ))}
      </TemplateGridStyled>
      <PaginateLinks
        current={currentPage}
        total={Math.ceil(allItems.length / pageSize)}
        onChange={onChangePage}
      />
    </>
  );
};
