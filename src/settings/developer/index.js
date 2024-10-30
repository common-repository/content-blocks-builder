/**
 * External dependencies
 */
import styled from "@emotion/styled";
import { isUndefined } from "lodash";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
  Button,
  Flex,
  Notice,
  Spinner,
  ToggleControl,
  TextareaControl,
  SelectControl,
} from "@wordpress/components";
import { addQueryArgs } from "@wordpress/url";
import { useContext, useState, useMemo } from "@wordpress/element";
import { useDispatch } from "@wordpress/data";
import { store as coreStore, useEntityProp } from "@wordpress/core-data";

/**
 * Internal dependencies
 */
import { DataContext } from "../data";
import { SearchParams } from "../../utils/searchparams";
import { Section, Widget, Fieldset } from "sdk/components";

const WidgetStyled = styled(Widget)`
  .inside h2 {
    padding: 0;
    margin: 0 0 10px;
    font-size: 1.75em;
  }

  .dev__body {
    padding-top: 1em;
  }
`;

const DebugWidget = () => {
  const { Debug: { nonce, isPurged, setIsPurged } = {} } = useContext(
    DataContext
  );
  return (
    <WidgetStyled
      title={__("Purge the cache", "content-blocks-builder")}
      className="debug-widget debug"
    >
      <div className="dev__body debug__body">
        <Flex justify="flex-start">
          <Button
            variant="primary"
            type="button"
            href={addQueryArgs(
              `edit.php?post_type=boldblocks_block&page=cbb-settings&tab=developer&_cbb_purge=${nonce}`
            )}
            as="a"
          >
            {__("Purge cache", "content-blocks-builder")}
          </Button>
          <p>
            {__(
              "Delete the entire cache contents for CBB Blocks, Variations and Patterns.",
              "content-blocks-builder"
            )}
          </p>
        </Flex>
        {!!isPurged && (
          <Notice
            status="success"
            onRemove={() => {
              setIsPurged(false);
              const searchParams = new SearchParams();
              searchParams.delete("_cbb_purge", true);
            }}
          >
            {__("Cache cleared.", "content-blocks-builder")}
          </Notice>
        )}
      </div>
    </WidgetStyled>
  );
};

const MaintenanceWidget = () => {
  const { Messages, pages, isResolvingPages } = useContext(DataContext);
  const pageOptions = useMemo(() => {
    return pages?.length
      ? pages.map(({ id, title: { rendered: title } = {} }) => ({
          label: title,
          value: id,
        }))
      : [];
  }, [isResolvingPages]);

  const { saveEditedEntityRecord } = useDispatch(coreStore);
  const [IsMaintenance, setIsMaintenance] = useEntityProp(
    "root",
    "site",
    "IsMaintenance"
  );
  const [MaintenanceSlug, setMaintenanceSlug] = useEntityProp(
    "root",
    "site",
    "MaintenanceSlug"
  );
  const [
    MaintananceEnableCustomPage,
    setMaintananceEnableCustomPage,
  ] = useEntityProp("root", "site", "MaintananceEnableCustomPage");
  const [MaintanancePageId, setMaintanancePageId] = useEntityProp(
    "root",
    "site",
    "MaintanancePageId"
  );

  const [messageData, setMessageData] = useState({
    type: "success",
    message: "",
  });

  // Save button.
  const saveActions = () => {
    const [isLoading, setIsLoading] = useState(false);
    return (
      <>
        <Button
          variant="primary"
          onClick={(e) => {
            e.preventDefault();
            setIsLoading(true);
            saveEditedEntityRecord("root", "site")
              .then(() => {
                setMessageData({
                  type: "success",
                  message: Messages.Success,
                });
              })
              .catch((error) => {
                log(error, "error");
                setMessageData({
                  type: "error",
                  message: Messages.Error,
                });
              })
              .finally(() => {
                setIsLoading(false);
              });
          }}
        >
          {Messages.UpdateSettings}
        </Button>
        {isLoading && <Spinner />}
      </>
    );
  };

  return (
    <WidgetStyled
      title={__("Maintenance mode", "content-blocks-builder")}
      renderFooter={saveActions}
      className="maintenance-widget maintenance"
    >
      <Fieldset className="fieldset">
        <div className="fieldset__label">
          <strong>
            {__("Turn on the maintenance mode.", "content-blocks-builder")}
          </strong>
        </div>
        {isUndefined(MaintenanceSlug) ? (
          <Spinner />
        ) : (
          <>
            <ToggleControl
              label={__("Enable maintenance mode", "content-blocks-builder")}
              checked={IsMaintenance ?? false}
              disabled={isUndefined(IsMaintenance)}
              onChange={setIsMaintenance}
            />
            {IsMaintenance && (
              <>
                <TextareaControl
                  label={__("Ignore slug", "content-blocks-builder")}
                  value={MaintenanceSlug}
                  placeholder="wp-login.php"
                  onChange={setMaintenanceSlug}
                  help={__(
                    "Input the page slugs that will bypass the maintenance mode. Put each item on a new line.",
                    "content-blocks-builder"
                  )}
                  rows={4}
                />
                <ToggleControl
                  label={__(
                    "Use a custom page as the maintenance page",
                    "content-blocks-builder"
                  )}
                  checked={MaintananceEnableCustomPage ?? false}
                  onChange={setMaintananceEnableCustomPage}
                />
                {MaintananceEnableCustomPage && (
                  <>
                    {isResolvingPages || isUndefined(pages) ? (
                      <Spinner />
                    ) : (
                      <SelectControl
                        label={__(
                          "Custom maintenance page",
                          "content-blocks-builder"
                        )}
                        value={MaintanancePageId}
                        onChange={setMaintanancePageId}
                        options={pageOptions}
                      />
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </Fieldset>
      {messageData && messageData?.message && (
        <Notice status={messageData?.type} isDismissible={false}>
          {messageData.message}
        </Notice>
      )}
    </WidgetStyled>
  );
};

const DeveloperSection = () => {
  return (
    <Section
      description={__("Settings for developer", "content-blocks-builder")}
    >
      <DebugWidget />
      <MaintenanceWidget />
    </Section>
  );
};

export default DeveloperSection;
