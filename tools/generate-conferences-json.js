const fs = require('fs');
const path = require('path');

const glob = require('glob');

const utils = require('../js/utils/utils-node');

const CONFERENCES_JSON_FILE = './data/conferences.json';
const CONFERENCES_GLOB_PATTERN = './data/conferences/*/*.yaml';

let conferenceFiles = glob.sync(CONFERENCES_GLOB_PATTERN);

// Build conferences object
let conferences = [];

conferenceFiles.forEach(conferenceFile => {
  let conferenceId = path.parse(conferenceFile).name;
  let conferenceData = utils.getJSON(conferenceFile).conference;
  conferenceData = {id: conferenceId, ...conferenceData};

  conferences.push(conferenceData);
});

// TODO: save
fs.writeFileSync(CONFERENCES_JSON_FILE, JSON.stringify(conferences, null, 2));

console.log(`Conferences JSON file generated at: ${CONFERENCES_JSON_FILE}`);
