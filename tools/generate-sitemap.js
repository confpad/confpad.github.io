const fs = require('fs');

const jsyaml = require('js-yaml');

const utils = require('../js/utils/utils-node');

const SITEMAP_FILE = './sitemap.txt';
const CONFERENCES_FILE = './data/conferences.yaml';
const TALKS_DIR = './data/conferences';
const BASE_URL = 'https://confpad.io/';

const buildUrl = (conf, talkIndex, talk) => {
  if (talkIndex && talk) {
    return `${BASE_URL}${conf.id}/${talkIndex}-${utils.slugifyTitle(talk.title)}`;
  }

  return `${BASE_URL}${conf.id}`;
};

let getJSON = file => {
  // Read YAML configs
  let conferencesYamlString = fs.readFileSync(file, 'utf8');

// Convert YAML to JS object
  try {
    return jsyaml.safeLoad(conferencesYamlString);
  } catch (error) {
    console.error(error.message);
    return;
  }
};

let conferences = getJSON(CONFERENCES_FILE);

// Build sitemap
let stream = fs.createWriteStream(SITEMAP_FILE);
stream.once('open', () => {
  conferences.forEach(conference => {
    // Conference root
    stream.write(`${buildUrl(conference)}\n`);

    // Conference talks
    let talks = getJSON(`${TALKS_DIR}/${conference.id.substr(0, 4)}/${conference.id}.yaml`);
    talks.forEach((talk, index) => {
      stream.write(`${buildUrl(conference, index + 1, talk)}\n`);
    });

  });
  stream.end();
});

console.log(`Sitemap generated at: ${SITEMAP_FILE}`);
