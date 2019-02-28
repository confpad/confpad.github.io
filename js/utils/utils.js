const slugify = window.slugify;

// SYNC_REGEX_URL_YOUTUBE
export const REGEX_URL_YOUTUBE =
  /^https:\/\/youtu\.be\/([a-zA-Z0-9_-]{11})$/;

// SYNC_REGEX_URL_VIMEO
export const REGEX_URL_VIMEO =
  /^https:\/\/vimeo\.com\/([0-9]{9})$/;

export const getVideoImage = url => {
  let match;

  match = url.match(REGEX_URL_YOUTUBE);
  if (match) {
    return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
  }
};

// SYNC_SLUGIFY_TITLE
export const slugifyTitle = title => slugify(title, { lower: true })
  .replace(/[^a-z0-9]/g, '-')
  .replace(/-+/g, '-')
  .replace(/-/g, ' ')
  .trim()
  .replace(/ /g, '-');
