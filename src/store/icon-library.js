/**
 * Internal dependencies
 */
import { buildIconLibraryStore } from "sdk/utils";

const STORE_NAME = "boldblocks/cbb-icon-library";
buildIconLibraryStore(STORE_NAME);

export { STORE_NAME as iconLibraryStore };
