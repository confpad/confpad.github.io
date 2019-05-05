const fs = require('fs');
const path = require('path');

const glob = require('glob');

const utils = require('../js/utils/utils-node');

const SITEMAP_FILE = './sitemap.txt';
const CONFERENCES_GLOB_PATTERN = './data/conferences/*/*.yaml';
const BASE_URL = 'https://confpad.io/';

const buildUrl = (conferenceId, talkIndex, talk) => {
  if (talkIndex && talk) {
    return `${BASE_URL}${conferenceId}/${talkIndex}-${utils.slugifyTitle(talk.title)}`;
  }

  return `${BASE_URL}${conferenceId}`;
};

let conferenceFiles = glob.sync(CONFERENCES_GLOB_PATTERN);

// Build sitemap
let stream = fs.createWriteStream(SITEMAP_FILE);
stream.once('open', () => {
  conferenceFiles.forEach(conferenceFile => {
    let conferenceId = path.parse(conferenceFile).name;

    // Conference root
    stream.write(`${buildUrl(conferenceId)}\n`);

    // Conference talks
    let conference = utils.getJSON(conferenceFile);
    conference.talks.forEach((talk, index) => {
      stream.write(`${buildUrl(conferenceId, index + 1, talk)}\n`);
    });

  });
  stream.end();
});

console.log(`Sitemap generated at: ${SITEMAP_FILE}`);
