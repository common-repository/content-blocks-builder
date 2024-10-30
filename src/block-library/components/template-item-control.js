/**
 * External dependencies
 */
import clsx from "clsx";
import { isArray, find, isUndefined, map, isNil } from "lodash";

/**
 * WordPress dependencies
 */
import { __, sprintf } from "@wordpress/i18n";
import {
  Spinner,
  Button,
  Notice,
  __experimentalConfirmDialog as ConfirmDialog,
} from "@wordpress/components";
import { BlockPreview } from "@wordpress/block-editor";
import { useState, useMemo, useContext, useCallback } from "@wordpress/element";
import { createBlocksFromInnerBlocksTemplate } from "@wordpress/blocks";
import apiFetch from "@wordpress/api-fetch";

/**
 * Internal dependencies
 */
import { log, useLocalStorage } from "sdk/utils";
import { getDependentBlockTypes, getMissingBlocks } from "../../utils/blocks";
import { isPremium } from "../../utils/premium";
import { SearchParams } from "../../utils/searchparams";
import { TemplateItemStyled } from "./styles";
import {
  LibraryContext,
  findExistVariation,
  getBlocksFromVariationData,
  importBlock,
  decodeHtml,
} from "../utils";
import { MESSAGES } from "../constants";
import { shareLabels } from "../../utils/shared-labels";

export const ItemProBadges = ({ isPro, hasProFeatures }) => {
  return (
    <>
      {(isPro || hasProFeatures) && (
        <div className="template-item__badges">
          {isPro && (
            <span className="pro-item">
              {__("Pro", "content-blocks-builder")}
            </span>
          )}
          {hasProFeatures && (
            <span className="pro-features-item">
              {__("Has pro features", "content-blocks-builder")}
            </span>
          )}
        </div>
      )}
    </>
  );
};

export const ItemLinks = ({ links, label }) => {
  return (
    <>
      {!!links?.length && (
        <ul className="template-item__links">
          <li className="template-item__label">
            <strong>{label}</strong>
          </li>
          {links.map(({ url, title }, index) => (
            <li className="template-item__link" key={index}>
              <a href={url} target="_blank">
                {title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export const ItemNotices = ({ notices }) => {
  return (
    <>
      {!!notices?.length && (
        <div className="item-notices">
          {notices.map(
            ({ type, message, actions = [], customActions = null }, index) => (
              <Notice
                className="item-notice"
                status={type}
                isDismissible={false}
                key={`notice-${index}`}
                actions={actions}
              >
                {message}
                {customActions}
              </Notice>
            ),
          )}
        </div>
      )}
    </>
  );
};

export const DependentItems = ({ items, label, type }) => {
  return (
    <>
      {!!items?.length && (
        <ul className="template-item__links">
          {!!label && (
            <li className="template-item__label">
              <strong>{label}</strong>
            </li>
          )}
          {items.map(({ title }, index) => (
            <li className="template-item__link" key={`${type}-${index}`}>
              <code>{title}</code>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export const ItemDependentPlugins = ({
  missingPlugins,
  inactivePlugins,
  libraryState,
  updateLibraryState,
  onPluginInstalled,
  onPluginActivated,
}) => {
  const { activatingPlugins = [], installingPlugins = [] } = libraryState;

  const setActivatingPlugins = (plugins) =>
    updateLibraryState({ activatingPlugins: plugins });
  const setInstallingPlugins = (plugins) =>
    updateLibraryState({ installingPlugins: plugins });

  return (
    <>
      {(!!missingPlugins?.length || !!inactivePlugins?.length) && (
        <div className="template-item__actions">
          {!!missingPlugins.length &&
            missingPlugins.map(
              ({ name, slug }) =>
                !libraryState?.isReloading && (
                  <Button
                    key={slug}
                    variant="primary"
                    size="small"
                    disabled={!!installingPlugins.length}
                    isBusy={
                      !!installingPlugins.length &&
                      installingPlugins.indexOf(slug) !== -1
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setInstallingPlugins([...installingPlugins, slug]);
                      apiFetch({
                        path: `wp/v2/plugins`,
                        method: "POST",
                        data: { slug, status: "active" },
                      })
                        .then(() => {
                          onPluginInstalled(name);
                        })
                        .catch((error) => log(error, "error"))
                        .finally(() =>
                          setInstallingPlugins(
                            installingPlugins.filter((i) => i !== slug),
                          ),
                        );
                    }}
                  >
                    {sprintf(MESSAGES.installPlugin, name)}
                  </Button>
                ),
            )}
          {!!inactivePlugins.length &&
            inactivePlugins.map(
              ({ name, plugin, slug }) =>
                !libraryState?.isReloading && (
                  <Button
                    key={slug}
                    variant="primary"
                    size="small"
                    disabled={!!activatingPlugins.length}
                    isBusy={
                      !!activatingPlugins.length &&
                      activatingPlugins.indexOf(slug) !== -1
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setActivatingPlugins([...activatingPlugins, slug]);
                      apiFetch({
                        path: `wp/v2/plugins/${plugin}`,
                        method: "POST",
                        data: { status: "active" },
                      })
                        .then(() => {
                          onPluginActivated(name);
                        })
                        .catch((error) => log(error, "error"))
                        .finally(() => {
                          setActivatingPlugins(
                            activatingPlugins.filter((i) => i !== slug),
                          );
                        });
                    }}
                  >
                    {sprintf(MESSAGES.activatePlugin, name)}
                  </Button>
                ),
            )}
        </div>
      )}
    </>
  );
};

export const ImportActions = ({ label, handleClick }) => {
  const [isImporting, setIsImporting] = useState(false);
  const [isImported, setIsImported] = useState(false);

  return (
    <div className="components-notice__actions">
      <Button
        variant="primary"
        size="small"
        className="components-notice__action"
        disabled={isImporting || isImported}
        isBusy={isImporting}
        onClick={(e) => {
          e.preventDefault();

          setIsImporting(true);
          handleClick({ setIsImported, setIsImporting });
        }}
      >
        {label}
      </Button>
    </div>
  );
};

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
    searchParams.reload();
  }, delay);
};

const ConfirmModal = ({ isOpen, setIsOpen, handleConfirm, content = null }) => {
  return (
    <ConfirmDialog
      isOpen={isOpen}
      onConfirm={handleConfirm}
      onCancel={() => {
        setIsOpen(false);
      }}
    >
      {content}
    </ConfirmDialog>
  );
};

const BlockTitle = ({ title, item }) => {
  const parentTitle = item?.meta?.boldblocks_enable_repeater
    ? item?.meta?.boldblocks_parent_block_title ?? `${title} repeater`
    : "";
  return (
    <>
      <h3 className="template-item__title">
        {sprintf(MESSAGES.blockName, title)}
      </h3>
      {parentTitle && (
        <h3 className="template-item__title">
          {sprintf(MESSAGES.parentBlockName, parentTitle)}
        </h3>
      )}
    </>
  );
};

const VariationTitle = ({ title, item }) => {
  const blockName = item?.meta?.boldblocks_variation_block_name;
  return (
    <>
      <h3 className="template-item__title">
        {sprintf(MESSAGES.variationName, title)}
      </h3>
      {blockName && (
        <h3 className="template-item__title">
          {sprintf(MESSAGES.blockName, blockName)}
        </h3>
      )}
    </>
  );
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
  contentType = "block",
  reload,
}) => {
  return useMemo(() => {
    // The data has not fully loaded
    if (!item?.slug || isItemLoadingData || isUndefined(canManagePlugins)) {
      return {};
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
    let blocks;
    if (contentType === "block") {
      blocks = JSON.parse(item?.meta?.boldblocks_block_blocks ?? "[]");
    } else {
      blocks = getBlocksFromVariationData(
        item?.meta?.boldblocks_variation_data,
      );
    }

    let dependentBlocks =
      item.meta[`boldblocks_${contentType}_dependent_blocks`] ?? [];

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

    const dependentPlugins = !isNil(item?.meta?.boldblocks_dependencies)
      ? item.meta.boldblocks_dependencies
      : item?.meta?.boldblocks_block_dependencies;

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
      if (missingCBBBlocks?.length) {
        notices.push({
          type: "warning",
          message: MESSAGES.warningRequiresOtherCBBItems,
          customActions: (
            <>
              {canManagePlugins && (
                <ImportActions
                  label={MESSAGES.actionImportAllCBBItems}
                  handleClick={({ setIsImported, setIsImporting }) => {
                    Promise.all(
                      missingCBBBlocks.map(async (item) =>
                        importBlock({ item }),
                      ),
                    ).then((blocksRes) => {
                      setIsImporting(false);
                      setIsImported(true);

                      let importedNotices = [];

                      blocksRes.forEach((messages) =>
                        messages.forEach((message) =>
                          importedNotices.push(message),
                        ),
                      );

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

    const isExisting =
      contentType === "block"
        ? availableBlockNames.indexOf(`boldblocks/${item?.slug}`) > -1
        : item?.slug && localVariations
        ? findExistVariation(item?.slug, localVariations)
        : false;

    if (isExisting) {
      notices.push({
        type: "warning",
        message: __(
          "This item already exists. The import will override the existing item.",
          "content-blocks-builder",
        ),
      });
    }

    setItemNotices([...notices]);

    return {
      blocks,
      isMissingBlocks,
      tutorials,
      externalResources,
      dependentPlugins,
      customBlocks,
      missingPlugins,
      inactivePlugins,
      isPro,
      hasProFeatures,
      isExisting,
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
    onImportItem,
    availableBlockNames,
    plugins,
    canManagePlugins,
    localBlocks,
    localVariations,
    isResolvingLocalData,
    importingMessages,
    setImportingMessages,
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
    customBlocks,
    missingPlugins,
    inactivePlugins,
    isPro,
    hasProFeatures,
    isExisting,
  } = useItemData({
    contentType,
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

  const [isOpenConfirm, setIsOpenConfirm] = useState(false);

  const handleImporting = () => {
    updateLibraryState({ insertingItem: item.id });
    setTimeout(() => {
      onImportItem({
        contentType,
        item,
        isExisting,
        localBlocks,
        localVariations,
        importingMessages,
        setImportingMessages,
        setIsOpenConfirm,
      });
    }, 0);
  };

  const isImported =
    libraryState?.importedItems?.length &&
    libraryState.importedItems.indexOf(item?.slug) > -1;

  const onInsertHandler = useCallback(() => {
    if (canInsert && !libraryState?.insertingItem && !isImported) {
      if (isExisting) {
        setIsOpenConfirm(true);
      } else {
        handleImporting();
      }
    }
  }, [
    canInsert,
    libraryState?.insertingItem,
    isImported,
    isExisting,
    setIsOpenConfirm,
    handleImporting,
  ]);

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

  const description =
    contentType === "block"
      ? item?.meta?.boldblocks_enable_repeater
        ? item?.meta?.boldblocks_parent_block_description
        : item?.meta?.boldblocks_block_description
      : item?.meta?.boldblocks_variation_description;

  return (
    <>
      <TemplateItemStyled
        className={clsx("template-item", {
          "is-ready": canInsert && !isImported,
          "is-pro": isPro,
          "has-pro-features": hasProFeatures,
          "has-missing-blocks": isMissingBlocks,
          "require-pro": !isPremium && isPro,
          "is-loading-data": isItemLoadingData,
          "is-inserting": libraryState?.insertingItem === item.id,
          "is-existing": isExisting,
        })}
      >
        {(isItemLoadingData || libraryState?.insertingItem === item.id) && (
          <Spinner />
        )}
        {itemPreview}
        <div className="template-item__footer">
          <div className="template-item__title-wrapper">
            {contentType === "block" ? (
              <BlockTitle title={title} item={item} />
            ) : (
              <VariationTitle title={title} item={item} />
            )}
          </div>

          {description && (
            <div className="template-item__description scrollbar">
              {description}
            </div>
          )}

          <div className="template-item__actions">
            {contentType === "block" && (
              <>
                <DependentItems
                  items={customBlocks}
                  label={`${shareLabels.blocks}:`}
                  type="block"
                />
                <DependentItems
                  items={item?.variations ?? []}
                  label={`${shareLabels.variations}:`}
                  type="variation"
                />
                <DependentItems
                  items={item?.parentVariations ?? []}
                  label={__("Parent variations:", "content-blocks-builder")}
                  type="variation"
                />
              </>
            )}

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
      {isExisting && (
        <ConfirmModal
          isOpen={isOpenConfirm}
          setIsOpen={setIsOpenConfirm}
          handleConfirm={() => {
            handleImporting();
            setIsOpenConfirm(false);
          }}
          content={
            <>
              {sprintf(
                __("Are you sure to import this %s?", "content-blocks-builder"),
                contentType,
              )}
              <br />
              <strong>
                {sprintf(
                  __(
                    "This will override the existing %s!",
                    "content-blocks-builder",
                  ),
                  contentType,
                )}
              </strong>
            </>
          }
        />
      )}
    </>
  );
};
