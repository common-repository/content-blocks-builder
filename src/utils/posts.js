/**
 * WordPress dependencies
 */
import { addQueryArgs } from "@wordpress/url";

/**
 * Get edit post URL
 */
export const getEditPostURL = (postId) =>
  addQueryArgs(`post.php?post=${postId}&action=edit`);
