/**
 * WordPress dependencies
 */
import { applyFilters } from "@wordpress/hooks";

/**
 * Premium customers?
 */
export const isPremium = applyFilters("boldblocks.CBB.isPremium", false);
