/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Generate the options for the SelectControl
 *
 * @param {Integer} min
 * @param {Integer} max
 */
export function getSelectOptions(min, max) {
  let options = [];
  for (let i = min; i <= max; i++) {
    options.push({ value: i, label: i });
  }

  return options;
}

/**
 * Handle input change for custom pattern validation
 *
 * @param {String} pattern
 * @param {Function} onChange
 * @returns
 */
export const handlePatternInput = (pattern, onChange) => (newValue) => {
  if (newValue) {
    if (pattern) {
      const regex = new RegExp(pattern);
      const found = newValue.match(regex);
      if (found) {
        onChange(found[0]);
      }
    } else {
      onChange(newValue);
    }
  } else {
    onChange("");
  }
};

export function isJSONString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export function getBreakpoints() {
  let breakpoints;
  if (window?.CBBBreakpoints) {
    breakpoints = window.CBBBreakpoints;
  } else {
    breakpoints = {
      sm: { breakpoint: 576, breakpointMax: 575 },
      md: { breakpoint: 768, breakpointMax: 767 },
      lg: { breakpoint: 1024, breakpointMax: 1023 },
    };
  }

  return breakpoints;
}

export function refineCustomCSS(value, tokens = {}) {
  const breakpoints = getBreakpoints();
  tokens = {
    ...tokens,
    TABLET_UP: `${breakpoints.md.breakpoint}px`,
    TABLET_DOWN: `${breakpoints.md.breakpointMax}px`,
    DESKTOP_UP: `${breakpoints.lg.breakpoint}px`,
    DESKTOP_DOWN: `${breakpoints.lg.breakpointMax}px`,
  };

  const pattern = new RegExp(Object.keys(tokens).join("|"), "g");

  return value.replace(pattern, function (matched) {
    return tokens[matched];
  });
}
