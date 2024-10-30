/**
 * External dependencies
 */
import clsx from "clsx";
import { isArray, find, isUndefined, map } from "lodash";

/**
 * WordPress dependencies
 */
import { __, sprintf } from "@wordpress/i18n";
import { Spinner } from "@wordpress/components";
import { BlockPreview } from "@wordpress/block-editor";
import { useState, useMemo, useContext, useCallback } from "@wordpress/element";
import { createBlocksFromInnerBlocksTemplate } from "@wordpress/blocks";
import { addQueryArgs } from "@wordpress/url";

/**
 * Internal dependencies
 */
import { useLocalStorage } from "sdk/utils";
import { getDependentBlockTypes, getMissingBlocks } from "../../utils/blocks";
import { isPremium } from "../../utils/premium";
import { SearchParams } from "../../utils/searchparams";
import { TemplateItemStyled } from "../components/styles/template-item";
import {
  LibraryContext,
  refinePreviewData,
  getLibraryURL,
  decodeHtml,
} from "../utils";
import { MESSAGES } from "../constants";

import { importBlock, importVariation } from "../utils";
import {
  ItemProBadges,
  ItemLinks,
  ItemNotices,
  DependentItems,
  ItemDependentPlugins,
  ImportActions,
} from "../components";
import { HelpLink } from "../../components/help-link";
import { shareLabels } from "../../utils/shared-labels";

const reloadPage = (
  libraryState,
  setSavedLibraryState,
  updateLibraryState,
  delay = 500,
) => {
  updateLibraryState({ isReloading: true });
  setTimeout(() => {
    // Save current state
    setSavedLibraryState(libraryState);

    const searchParams = new SearchParams();
    searchParams.set("bb-template-modal", 1);
    searchParams.reload();
  }, delay);
};

const useItemData = ({
  item,
  canManagePlugins,
  plugins,
  availableBlockNames,
  localBlocks,
  localVariations,
  isPremium,
  setItemNotices,
  isItemLoadingData,
  reload,
}) => {
  return useMemo(() => {
    // The data has not fully loaded
    if (!item?.slug || isItemLoadingData || isUndefined(canManagePlugins)) {
      return {};
    }

    let missingCustomVariations = [];
    const customVariations = item?.variations ?? [];
    if (customVariations?.length && localVariations?.length) {
      const localVariationSlugs = map(localVariations, "slug");
      missingCustomVariations = customVariations.filter(
        ({ slug }) => localVariationSlugs.indexOf(slug) === -1,
      );
    }

    const customBlocks = item?.libraryBlocks ?? [];
    let missingCBBBlocks = [];
    if (customBlocks?.length) {
      const localBlockSlugs = map(localBlocks, "slug");
      missingCBBBlocks = customBlocks.filter(
        ({ slug }) => localBlockSlugs.indexOf(slug) === -1,
      );
    }

    let missingBlocks;
    let blocks = refinePreviewData(item.meta?.blocks);
    let dependentBlocks = item.meta?.dependent_blocks;

    if (!item?.thumbnail) {
      if ((!isArray(dependentBlocks) || !dependentBlocks.length) && blocks) {
        dependentBlocks = getDependentBlockTypes(blocks, []);
      }
    }

    if (isArray(dependentBlocks) && !!dependentBlocks.length) {
      missingBlocks = getMissingBlocks(dependentBlocks, availableBlockNames);
    }

    // Is missing blocks
    const isMissingBlocks = missingBlocks?.length || missingCBBBlocks?.length;

    if (!isMissingBlocks && blocks) {
      blocks = createBlocksFromInnerBlocksTemplate(blocks);
    }

    const tutorials = item?.meta?.tutorials;
    const externalResources = item?.meta?.external_resources;

    const dependentPlugins = item.meta?.dependencies;

    const missingPlugins =
      canManagePlugins && !!plugins.length && dependentPlugins
        ? dependentPlugins.filter(({ slug }) => {
            return !find(plugins, ["slug", slug]);
          })
        : [];

    const inactivePlugins =
      canManagePlugins && !!plugins.length && dependentPlugins
        ? dependentPlugins
            .map(({ slug }) => {
              const plugin = find(plugins, ["slug", slug]);
              if (plugin && plugin?.status === "inactive") {
                return plugin;
              } else {
                return false;
              }
            })
            .filter((i) => i)
        : [];

    const isPro = item?.meta?.is_pro;

    const hasProFeatures = item?.meta?.has_pro_features;

    let notices = [];

    if (isMissingBlocks) {
      if (missingCBBBlocks?.length || missingCustomVariations?.length) {
        notices.push({
          type: "warning",
          message: (
            <>
              {MESSAGES.warningRequiresOtherCBBItems}
              {canManagePlugins && (
                <>
                  &nbsp;
                  <HelpLink
                    href={addQueryArgs(
                      "edit.php?post_type=boldblocks_block&page=cbb-block-library",
                    )}
                    label={__("Browse block library", "content-blocks-builder")}
                  />
                  &nbsp;
                  <HelpLink
                    href={addQueryArgs(
                      "edit.php?post_type=boldblocks_block&page=cbb-variation-library",
                    )}
                    label={__(
                      "Browse variation library",
                      "content-blocks-builder",
                    )}
                  />
                </>
              )}
            </>
          ),
          customActions: (
            <>
              {canManagePlugins && (
                <ImportActions
                  label={MESSAGES.actionImportAllCBBItems}
                  handleClick={({ setIsImported, setIsImporting }) => {
                    Promise.all([
                      Promise.all(
                        missingCBBBlocks.map(async (item) =>
                          importBlock({ item }),
                        ),
                      ).then((blocksRes) => {
                        const importedNotices = [];

                        blocksRes.forEach((messages) =>
                          messages.forEach((message) =>
                            importedNotices.push(message),
                          ),
                        );

                        return importedNotices;
                      }),
                      Promise.all(
                        missingCustomVariations.map(async (item) =>
                          importVariation({ item }),
                        ),
                      ).then((variationsRes) => {
                        const importedNotices = [];

                        variationsRes.forEach((messages) =>
                          messages.forEach((message) =>
                            importedNotices.push(message),
                          ),
                        );

                        return importedNotices;
                      }),
                    ]).then((combineRes) => {
                      setIsImporting(false);
                      setIsImported(true);

                      let importedNotices = [];
                      combineRes.forEach((messagess) => {
                        importedNotices = [...importedNotices, ...messagess];
                      });

                      importedNotices = [
                        ...importedNotices,
                        {
                          type: "success",
                          message: MESSAGES.successReloadPage,
                        },
                      ];

                      // Update notices
                      setItemNotices([...notices, ...importedNotices]);

                      // Reload the page
                      reload();
                    });
                  }}
                />
              )}
            </>
          ),
        });
      }

      if (missingBlocks?.length) {
        notices.push({
          type: "warning",
          message: sprintf(
            MESSAGES.warningRequiresExternalBlocks,
            missingBlocks.join(", "),
          ),
        });
      }

      if (
        missingBlocks?.length &&
        !isUndefined(canManagePlugins) &&
        !canManagePlugins
      ) {
        notices.push({
          type: "warning",
          message: MESSAGES.warningManagePluginsPermission,
        });
      }
    } else {
      if (!!missingPlugins.length || !!inactivePlugins.length) {
        notices.push({
          type: "warning",
          message: MESSAGES.warningInstallActivatePlugins,
        });
      }
    }

    if (!isPremium && isPro) {
      notices.push({
        type: "warning",
        message: MESSAGES.warningRequiresPro,
      });
    }

    setItemNotices([...notices]);

    return {
      blocks,
      isMissingBlocks,
      tutorials,
      externalResources,
      dependentPlugins,
      customVariations,
      customBlocks,
      missingPlugins,
      inactivePlugins,
      isPro,
      hasProFeatures,
    };
  }, [
    item?.slug,
    canManagePlugins,
    plugins,
    isPremium,
    isItemLoadingData,
    localVariations,
  ]);
};

export const TemplateItemControl = ({ item }) => {
  const {
    libraryState,
    stateCacheKey,
    updateLibraryState,
    onInsertPattern,
    availableBlockNames,
    plugins,
    canManagePlugins,
    localBlocks,
    localVariations,
    isResolvingLocalData,
    contentType,
  } = useContext(LibraryContext);

  const [, setSavedLibraryState] = useLocalStorage(stateCacheKey);

  const reload = () =>
    reloadPage(libraryState, setSavedLibraryState, updateLibraryState);

  const title = decodeHtml(item.title);

  const isItemLoadingData = item?.loadingFullData || isResolvingLocalData;

  const [itemNotices, setItemNotices] = useState([]);
  const {
    blocks,
    isMissingBlocks,
    tutorials,
    externalResources,
    dependentPlugins = [],
    customVariations,
    customBlocks,
    missingPlugins,
    inactivePlugins,
    isPro,
    hasProFeatures,
  } = useItemData({
    item,
    canManagePlugins,
    plugins,
    availableBlockNames,
    localBlocks,
    localVariations,
    setItemNotices,
    isItemLoadingData,
    reload,
  });

  const canInsert =
    !isItemLoadingData &&
    !isMissingBlocks &&
    !missingPlugins?.length &&
    !inactivePlugins?.length &&
    (!isPro || isPremium);

  const onInsertHandler = useCallback(() => {
    if (canInsert && !libraryState?.insertingItem) {
      updateLibraryState({ insertingItem: item.id });
      setTimeout(() => {
        onInsertPattern({ id: item.id, title }, blocks);
      }, 0);
    }
  }, [canInsert, libraryState?.insertingItem, item.id, title, blocks]);

  const itemPreview = useMemo(() => {
    if (!item?.slug) {
      return <div className="template-item__preview"></div>;
    }

    return (
      <div
        className="template-item__preview"
        onClick={onInsertHandler}
        onKeyDown={(e) => {
          e.key === "Enter" ? onInsertHandler() : "";
        }}
        tabIndex={0}
      >
        {!!item?.thumbnail ? (
          <div
            className="template-item__thumbnail scrollbar"
            dangerouslySetInnerHTML={{ __html: item?.thumbnail }}
          />
        ) : (
          !isMissingBlocks && (
            <BlockPreview blocks={blocks} viewportWidth={1400} />
          )
        )}

        <ItemProBadges isPro={isPro} hasProFeatures={hasProFeatures} />
        <ItemNotices notices={itemNotices} />
      </div>
    );
  }, [item?.slug, onInsertHandler, isPro, hasProFeatures, itemNotices]);

  const onPluginInstalled = (name) => {
    setItemNotices([
      ...itemNotices,
      {
        type: "success",
        message: sprintf(MESSAGES.successInstalledActivatedPlugin, name),
      },
      {
        type: "success",
        message: MESSAGES.successReloadPage,
      },
    ]);

    // Reload the page
    reload();
  };

  const onPluginActivated = (name) => {
    setItemNotices([
      ...itemNotices,
      {
        type: "success",
        message: sprintf(MESSAGES.successActivatedPlugin, name),
      },
      {
        type: "success",
        message: MESSAGES.successReloadPage,
      },
    ]);

    // Reload the page
    reload();
  };

  return (
    <>
      <TemplateItemStyled
        className={clsx("template-item", {
          "is-ready": canInsert,
          "is-pro": isPro,
          "has-pro-features": hasProFeatures,
          "has-missing-blocks": isMissingBlocks,
          "require-pro": !isPremium && isPro,
          "is-loading-data": isItemLoadingData,
          "is-inserting": libraryState?.insertingItem === item.id,
        })}
      >
        {(isItemLoadingData || libraryState?.insertingItem === item.id) && (
          <Spinner />
        )}
        {itemPreview}
        <div className="template-item__footer">
          <div className="template-item__title-wrapper is-pattern-title">
            <h3 className="template-item__title">{title}</h3>
            {item?.slug && (
              <a
                href={`${getLibraryURL(contentType)}/pattern/${
                  item?.slug
                }?utm_source=CBB&utm_campaign=pattern-inserter&utm_medium=link&utm_content=view-pattern`}
                className="template-item__details"
                target="_blank"
              >
                {__("View details", "content-blocks-builder")}
              </a>
            )}
          </div>

          <div className="template-item__actions">
            <DependentItems
              items={customBlocks}
              label={`${shareLabels.blocks}:`}
              type="block"
            />

            <DependentItems
              items={customVariations}
              label={`${shareLabels.variations}:`}
              type="variation"
            />

            <ItemLinks links={tutorials} label={MESSAGES.labelTutorials} />

            <ItemLinks
              links={externalResources}
              label={MESSAGES.labelResources}
            />

            <ItemLinks
              links={dependentPlugins.map(({ slug, name: title }) => ({
                url: `https://wordpress.org/plugins/${slug}`,
                title,
              }))}
              label={MESSAGES.labelDependencies}
            />
          </div>

          <ItemDependentPlugins
            {...{
              missingPlugins,
              inactivePlugins,
              libraryState,
              updateLibraryState,
              onPluginInstalled,
              onPluginActivated,
            }}
          />
        </div>
      </TemplateItemStyled>
    </>
  );
};
