/**
 * External dependencies
 */
import clsx from "clsx";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";

/**
 * Internal dependencies
 */
import { boldblocksHasSupport, refineCustomCSS } from "../../utils";

/**
 * Define feature name
 */
const featureName = "customCSS";

/**
 * If the current block support custom CSS
 *
 * @param {String} name
 * @returns {Boolean}
 */
export const hasSupportCSS = (name) =>
  boldblocksHasSupport(name, featureName) ||
  ["core/template-part"].includes(name);

/**
 * Override the default block list element to add custom styles.
 *
 * @param  {Function} BlockListBlock Original component
 * @return {Function}                Wrapped component
 */
export const withCustomStyles = createHigherOrderComponent(
  (BlockListBlock) => (props) => {
    if (!hasSupportCSS(props.name)) {
      return <BlockListBlock {...props} />;
    }

    const {
      attributes: { boldblocks: { customCSS: { value = "" } = {} } = {} },
      clientId,
    } = props;

    const selector = `b-${clientId}`;
    let style;
    if (value) {
      style = refineCustomCSS(value, { selector: `.${selector}` });
    }

    return (
      <>
        <BlockListBlock
          {...props}
          className={clsx(props?.className, {
            [selector]: style,
          })}
        />
        {style && <style>{style}</style>}
      </>
    );
  },
);
addFilter(
  "editor.BlockListBlock",
  `boldblocks/${featureName}/withCustomStyles`,
  withCustomStyles,
);
