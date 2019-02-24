const fs = require('fs');

const jsyaml = require('js-yaml');

const SITEMAP_FILE = './sitemap.txt';
const CONFERENCES_FILE = './data/conferences.yaml';
const BASE_URL = 'https://confpad.io/';

const buildUrl = (conf, talk) => {
  if (!talk) {
    return `${BASE_URL}${conf.id}`;
  }

  return `${BASE_URL}${conf.id}/${slugify(talks.id)}`;
};

let conferences;

// Read YAML configs
let conferencesYamlString = fs.readFileSync(CONFERENCES_FILE, 'utf8');

// Convert YAML to JS object
try {
  conferences = jsyaml.safeLoad(conferencesYamlString);
} catch (error) {
  return console.error(error.message);
}

// Build sitemap
let stream = fs.createWriteStream(SITEMAP_FILE);
stream.once('open', () => {
  conferences.forEach(conference => stream.write(`${buildUrl(conference)}\n`));
  stream.end();
});

console.log(`Sitemap generated at: ${SITEMAP_FILE}`);
