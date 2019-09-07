const fs = require('fs');

const slugify = require('slugify');
const jsyaml = require('js-yaml');

module.exports.INFO_STATUS_COMPLETE = 'complete';
module.exports.INFO_STATUS_INCOMPLETE = 'incomplete';

module.exports.REGEX_ID_YOUTUBE_CHANNEL =
  /^[a-zA-Z0-9]{24}$/;

// SYNC_REGEX_URL_YOUTUBE
module.exports.REGEX_URL_YOUTUBE =
  /^https:\/\/youtu\.be\/([a-zA-Z0-9_-]{11})$/;

// SYNC_REGEX_URL_VIMEO
module.exports.REGEX_URL_VIMEO =
  /^https:\/\/vimeo\.com\/([0-9]{9})$/;

// SYNC_SLUGIFY_TITLE
module.exports.slugifyTitle = title => slugify(title, { lower: true })
  .replace(/[^a-z0-9]/g, '-')
  .replace(/-+/g, '-')
  .replace(/-/g, ' ')
  .trim()
  .replace(/ /g, '-');

/**
 * Parse YAML to JS object
 *
 * @param {string} file
 * @returns {Object}
 */
module.exports.getJSON = file => {
  // Read YAML configs
  let conferencesYamlString = fs.readFileSync(file, 'utf8');

  // Convert YAML to JS object
  try {
    return jsyaml.safeLoad(conferencesYamlString);
  } catch (error) {
    console.error(error.message);
  }
};
