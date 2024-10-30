export const getAccordionDataSet = (accordion) => {
  const { multipleOpens = false } = accordion;
  return { "data-multiple-opens": multipleOpens };
};

export const getAccordionItemDataSet = (
  accordionItem,
  isDeprecated = false
) => {
  const {
    id,
    toggleIcon = "default",
    toggleIconPosition = "right",
    transitionProperty = "height",
    initialState = "hidden",
  } = accordionItem;

  let dataset = {};
  if (isDeprecated) {
    dataset = {
      "data-toggle-target": `#c-${id}`,
      "data-toggle-icon": toggleIcon,
      "data-toggle-icon-position": toggleIconPosition,
      "data-toggle-state": initialState,
      "data-toggle-state-hidden": "hidden",
      "data-toggle-state-shown": "shown",
      "data-toggle-collapse-transition-property": transitionProperty,
      "aria-controls": `c-${id}`,
    };
  } else {
    dataset = {
      "data-toggle-target": `#c-${id}`,
      "data-toggle-state": initialState,
      "data-toggle-state-hidden": "hidden",
      "data-toggle-state-shown": "shown",
      "data-toggle-collapse-transition-property": transitionProperty,
      "aria-controls": `c-${id}`,
    };
  }

  return dataset;
};
