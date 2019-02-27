const slugify = window.slugify;

// SYNC_REGEX_URL_YOUTUBE
export const REGEX_URL_YOUTUBE =
  /^https:\/\/youtu\.be\/([a-zA-Z0-9_-]{11})$/;

// SYNC_REGEX_URL_VIMEO
export const REGEX_URL_VIMEO =
  /^https:\/\/vimeo\.com\/([0-9]{9})$/;

// SYNC_SLUGIFY_TITLE
export const slugifyTitle = title => slugify(title, { lower: true })
  .replace(/[^a-z0-9]/g, '-')
  .replace(/-+/g, '-')
  .replace(/-/g, ' ')
  .trim()
  .replace(/ /g, '-');
