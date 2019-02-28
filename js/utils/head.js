const META_URLS = [
  'head meta[property="og:url"]',
  'head meta[property="twitter:url"]',
];

const META_TITLES = [
  'head meta[name="title"]',
  'head meta[property="og:title"]',
  'head meta[property="twitter:title"]',
];

const META_DESCRIPTIONS = [
  'head meta[name="description"]',
  'head meta[property="og:description"]',
  'head meta[property="twitter:description"]',
];

const META_IMAGES = [
  'head meta[property="og:image"]',
  'head meta[property="twitter:image"]',
];

const updateMeta = (metaQueries, text) => {
  metaQueries.forEach(metaQuery => {
    let el = document.querySelector(metaQuery);
    el && el.setAttribute('content', text);
  });
};

export const updateMetaUrls = url => {
  updateMeta(META_URLS, url);
};

export const updateMetaTitles = (title, documentTitle) => {
  document.title = documentTitle || title;
  updateMeta(META_TITLES, title);
};

export const updateMetaDescriptions = description => {
  updateMeta(META_DESCRIPTIONS, description.substr(0, 300));
};

export const updateMetaImages = url => {
  updateMeta(META_IMAGES, url);
};
