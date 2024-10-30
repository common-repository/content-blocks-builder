/**
 * External dependencies
 */
import clsx from "clsx";
import styled from "@emotion/styled";
import { noop } from "lodash";

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
import { LabelControl } from "sdk/components";

const GridStyled = styled.div`
  display: grid;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  cursor: pointer;

  &.is-selected {
    .boldblocks-layout-grid__item {
      background-color: #ddd;
    }
  }

  .boldblocks-layout-grid__item {
    height: 1.5rem;
    text-align: center;
    border: 1px solid #000;
    transition: background 0.1s ease-in-out;
  }

  &:hover {
    .boldblocks-layout-grid__item {
      background-color: #ddd;
    }
  }
`;

const LayoutType = ({ layout, onChange, value }) => {
  const {
    attributes: {
      grid: { columns },
    },
    innerBlocks,
    label,
  } = layout;
  const gridStyle = {
    gridTemplateColumns: columns,
  };
  return (
    <GridStyled
      className={clsx("boldblocks-layout-grid", {
        "is-selected": columns === value,
      })}
      style={gridStyle}
      onClick={() => onChange(layout)}
      role="button"
      tabIndex="0"
      aria-label={label}
      title={label}
    >
      {innerBlocks.map(
        (
          {
            attributes: {
              gridItem: { columnSpan = {}, innerText = "" },
            },
          },
          index,
        ) => {
          let { span, start, order = 0 } = columnSpan;
          if (span !== "auto" && span > 0) {
            span = `span ${span}`;
          }
          const itemStyle = { gridColumn: `${start} / ${span}`, order };
          return (
            <div
              className="boldblocks-layout-grid__item"
              style={itemStyle}
              key={index}
            >
              {innerText}
            </div>
          );
        },
      )}
    </GridStyled>
  );
};

const LayoutPresetsControl = ({
  label,
  value,
  breakpoint,
  layouts,
  className,
  onChange = noop,
}) => {
  const layoutsByBreakpoint = layouts.filter(
    ({ breakpoints }) => breakpoints.indexOf(breakpoint) !== -1,
  );
  return (
    <div className={clsx("boldblocks-preset-layouts", className)}>
      <LabelControl label={label} isResponsive={true} />
      <div className="boldblocks-preset-layouts__layout">
        {layoutsByBreakpoint.map((layout, index) => (
          <LayoutType
            key={index}
            layout={layout}
            onChange={onChange}
            value={value}
          />
        ))}
      </div>
    </div>
  );
};

export default LayoutPresetsControl;
