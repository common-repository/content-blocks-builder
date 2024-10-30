/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useState, useMemo, useContext } from "@wordpress/element";
import { Spinner, RangeControl, Button, Notice } from "@wordpress/components";
import { useEntityProp, store as coreStore } from "@wordpress/core-data";
import { useDispatch } from "@wordpress/data";

/**
 * Internal dependencies
 */
import { Widget, Fieldset } from "sdk/components";
import { log } from "sdk/utils";
import { DataContext } from "../../data";

const getBreakpointValue = (prefix, breakpoints, fallback) => {
  if (!breakpoints) {
    return fallback;
  }

  const item = breakpoints.find((item) => prefix === item?.prefix);
  return item && item?.breakpoint ? item.breakpoint : fallback;
};

const Breakpoints = () => {
  const { Messages } = useContext(DataContext);
  const { saveEditedEntityRecord } = useDispatch(coreStore);

  const [messageData, setMessageData] = useState({
    type: "success",
    message: "",
  });

  const [breakpoints, setBreakpoints] = useEntityProp(
    "root",
    "site",
    "CBBBreakpoints"
  );

  const onBreakpointChange = (prefix, breakpoints) => (value) => {
    const newBreakpoints = breakpoints.map((item) => {
      if (item.prefix === prefix) {
        return { ...item, breakpoint: value };
      }

      return item;
    });

    setBreakpoints(newBreakpoints);
  };

  const tablet = useMemo(() => getBreakpointValue("md", breakpoints, 768), [
    breakpoints,
  ]);
  const desktop = useMemo(() => getBreakpointValue("lg", breakpoints, 1024), [
    breakpoints,
  ]);

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
    <Widget
      title={__("Manage reponsive breakpoints", "content-blocks-builder")}
      renderFooter={saveActions}
    >
      <Fieldset className="fieldset">
        <div className="fieldset__label">
          <strong>
            {__(
              "Change the breakpoint values for phone, tablet and desktop. All values are in pixels (px).",
              "content-blocks-builder"
            )}
          </strong>
        </div>
        {!breakpoints ? (
          <Spinner />
        ) : (
          <>
            <RangeControl
              label={__("Tablet", "content-blocks-builder")}
              value={tablet}
              onChange={onBreakpointChange("md", breakpoints)}
              min={600}
              max={1200}
            />
            <RangeControl
              label={__("Desktop", "content-blocks-builder")}
              value={desktop}
              onChange={onBreakpointChange("lg", breakpoints)}
              min={960}
              max={1920}
            />
          </>
        )}
      </Fieldset>
      {messageData && messageData?.message && (
        <Notice status={messageData?.type} isDismissible={false}>
          {messageData.message}
        </Notice>
      )}
    </Widget>
  );
};

export default Breakpoints;
