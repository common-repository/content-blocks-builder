/**
 * External dependencies
 */
import { isObject, isString } from "lodash";

/**
 * WordPress dependencies
 */
import { __, sprintf } from "@wordpress/i18n";
import { getBlockSupport } from "@wordpress/blocks";
import { applyFilters } from "@wordpress/hooks";
import { addQueryArgs } from "@wordpress/url";
import {
  store as blockEditorStore,
  useSettings,
} from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";

/**
 * Internal dependencies
 */

export const CoreBoldBlocks = [
  "boldblocks/group",
  "boldblocks/grid-item",
  "boldblocks/grid-item-repeater",
  "boldblocks/carousel-item",
  "boldblocks/carousel-item-repeater",
  "boldblocks/stack-item",
  "boldblocks/stack-item-repeater",
  "boldblocks/accordion-item",
  "boldblocks/accordion-item-repeater",
];

export const ExternalBoldBlocks = [
  "boldblocks/svg-block",
  "boldblocks/icon-separator",
  "boldblocks/youtube-block",
  "boldblocks/breadcrumb-block",
  "boldblocks/counting-number",
];

/**
 * Build inner template from blocks
 *
 * @param {Array} blocks
 */
export function buildTemplateFromBlocks(blocks) {
  let templateList = [];
  blocks.forEach(({ name, attributes, innerBlocks }) => {
    templateList.push([name, attributes, buildTemplateFromBlocks(innerBlocks)]);
  });

  return templateList;
}

/**
 * Build innerBlocks from blocks
 *
 * @param {Array} blocks
 */
export function buildInnerBlocksFromBlocks(blocks) {
  let templateList = [];
  blocks.forEach(({ name, innerBlocks, attributes }) => {
    templateList.push({
      name,
      attributes,
      innerBlocks: buildInnerBlocksFromBlocks(innerBlocks),
    });
  });

  return templateList;
}

/**
 * Check whether the block support a boldblock feature
 *
 * @param {String|Object} blockType
 * @param {String} featureName
 */
export function boldblocksHasSupport(blockType, featureName) {
  let boldblocks;
  if (isObject(blockType)) {
    ({ supports: { boldblocks } = {} } = blockType);
  } else if (isString(blockType)) {
    boldblocks = getBlockSupport(blockType, "boldblocks");
  }

  return boldblocks ? boldblocks[featureName] ?? false : false;
}

export const getLayoutType = (blockType) =>
  boldblocksHasSupport(blockType, "layoutType");

export const hasSupportLayout = (
  blockType,
  featureName,
  layoutType,
  contextProps = { context: "BlockEdit" },
) => {
  return applyFilters(
    "boldblocks.hasSupportLayout",
    boldblocksHasSupport(blockType, layoutType) === featureName,
    { blockType, featureName, layoutType, contextProps },
  );
};

export const getDependentBlockTypes = (blocks, blockTypes = []) => {
  if (!blocks.length) {
    return blockTypes;
  }

  for (let i = 0; i < blocks.length; i++) {
    const {
      name,
      innerBlocks = [],
      attributes: { originalName = "" } = {},
    } = blocks[i];

    let blockName = name === "core/missing" ? originalName : name;
    if (blockTypes.indexOf(blockName) === -1) {
      blockTypes.push(blockName);
    }

    blockTypes = getDependentBlockTypes(innerBlocks, blockTypes);
  }

  return blockTypes;
};

export const getVariationDependentBlockTypes = (
  innerBlocks,
  blockTypes = [],
) => {
  if (!innerBlocks.length) {
    return blockTypes;
  }

  for (let i = 0; i < innerBlocks.length; i++) {
    const [blockName, , nestedInnerBlocks = []] = innerBlocks[i];
    if (blockTypes.indexOf(blockName) === -1) {
      blockTypes.push(blockName);
    }

    blockTypes = getVariationDependentBlockTypes(nestedInnerBlocks, blockTypes);
  }

  return blockTypes;
};

export function getPluginUrl(block) {
  if (!block || !block?._links) {
    return false;
  }
  const link = block?._links["wp:plugin"] || block._links.self;
  if (link && link.length) {
    return link[0].href;
  }
  return false;
}

export const hasMissingBlocks = (dependentBlocks, availableBlockNames) => {
  // Only look into none core blocks
  availableBlockNames = availableBlockNames.filter(
    (blockName) => blockName.indexOf("core/") !== 0,
  );

  // Ignore core blocks
  dependentBlocks = dependentBlocks.filter(
    (blockName) => blockName.indexOf("core/") !== 0,
  );

  let hasMissingBlocks = false;
  for (let i = 0; i < dependentBlocks.length; i++) {
    if (availableBlockNames.indexOf(dependentBlocks[i]) !== -1) {
      continue;
    } else {
      hasMissingBlocks = dependentBlocks[i];
      break;
    }
  }

  return hasMissingBlocks;
};

export const getMissingBlocks = (dependentBlocks, availableBlockNames) => {
  let missingBlocks = [];

  // Only look into none core blocks
  availableBlockNames = availableBlockNames.filter(
    (blockName) => blockName.indexOf("core/") !== 0,
  );

  // Ignore core blocks
  dependentBlocks = dependentBlocks.filter(
    (blockName) => blockName.indexOf("core/") !== 0,
  );

  // Ignore CBB blocks
  dependentBlocks = dependentBlocks.filter(
    (blockName) =>
      blockName.indexOf("boldblocks/") !== 0 ||
      ExternalBoldBlocks.indexOf(blockName) !== -1,
  );

  for (let i = 0; i < dependentBlocks.length; i++) {
    if (availableBlockNames.indexOf(dependentBlocks[i]) === -1) {
      missingBlocks.push(dependentBlocks[i]);
    }
  }

  return missingBlocks;
};

export const getNoticeActions = (plugin) => {
  let actions = [];
  const { id: pluginId, title } = plugin ?? {};
  if (getPluginUrl(plugin)) {
    actions.push({
      label: sprintf(
        __("Search and activate the plugin: %s", "content-blocks-builder"),
        title,
      ),
      url: addQueryArgs(`plugins.php?s=${pluginId}&plugin-status=all`),
    });
  } else {
    actions.push(
      ...[
        {
          label: sprintf(
            __("Search and install the plugin: %s", "content-blocks-builder"),
            title,
          ),
          url: addQueryArgs(`plugin-install.php?s=${pluginId}&tab=search`),
        },
        {
          label: sprintf(
            __("View the plugin on wp.org", "content-blocks-builder"),
            title,
          ),
          url: `https://wordpress.org/plugins/${pluginId}`,
        },
      ],
    );
  }

  return actions;
};

/**
 * Get core block supports for CBB blocks.
 */
export const CBBCoreBlockSupports = {
  cbb: true, // This block is generated by CBB
  anchor: true,
  html: true,
  class: true,
  color: {
    gradients: true,
    heading: true,
    button: true,
    link: true,
    __experimentalDefaultControls: {
      background: true,
      text: true,
    },
  },
  typography: {
    fontSize: true,
    lineHeight: true,
    __experimentalFontFamily: true,
    __experimentalFontWeight: true,
    __experimentalFontStyle: true,
    __experimentalTextTransform: true,
    __experimentalTextDecoration: true,
    __experimentalLetterSpacing: true,
    __experimentalDefaultControls: false,
  },
  __experimentalBorder: {
    color: true,
    radius: true,
    style: true,
    width: true,
    __experimentalDefaultControls: false,
  },
  interactivity: {
    clientNavigation: true,
  },
};

export const getCoreFeatures = (layoutType) => {
  let supports = {};

  if (
    !layoutType ||
    ["vstack", "vstackItem", "standalone"].includes(layoutType)
  ) {
    supports = {
      spacing: {
        padding: true,
        margin: true,
        blockGap: true,
        __experimentalDefaultControls: {
          padding: false,
          margin: false,
          blockGap: false,
        },
      },
      dimensions: {
        minHeight: true,
        __experimentalDefaultControls: {
          minHeight: false,
        },
      },
    };
  } else if (["grid", "carousel"].includes(layoutType)) {
    supports = {
      spacing: {
        margin: true,
        __experimentalDefaultControls: {
          margin: false,
        },
      },
      dimensions: {
        minHeight: true,
        __experimentalDefaultControls: {
          minHeight: false,
        },
      },
    };
  } else if (["gridItem", "carouselItem"].includes(layoutType)) {
    supports = {
      spacing: {
        padding: true,
        blockGap: true,
        __experimentalDefaultControls: {
          padding: false,
          blockGap: false,
        },
      },
      dimensions: {
        minHeight: true,
        __experimentalDefaultControls: {
          minHeight: false,
        },
      },
    };
  }

  return supports;
};

/**
 * Get the layout of the current block
 *
 * @param {String} layoutType
 * @param {Object} props
 * @param {Boolean} isParent
 */
export const getLayout = (layoutType, props, isParent = false) => {
  // Only vstack support layout
  if (isParent && !["vstack"].includes(layoutType)) {
    return undefined;
  }

  const { themeSupportsLayout } = useSelect((select) => {
    const { getSettings } = select(blockEditorStore);
    return {
      themeSupportsLayout: getSettings()?.supportsLayout,
    };
  }, []);

  const [defaultLayout = {}] = useSettings("layout");
  const { layout = {} } = props.attributes;
  const usedLayout = !layout?.type
    ? { ...defaultLayout, ...layout, type: "default" }
    : { ...defaultLayout, ...layout };

  const { type = "default" } = usedLayout;
  const layoutSupportEnabled = themeSupportsLayout || type === "flex";

  return layoutSupportEnabled ? usedLayout : undefined;
};
