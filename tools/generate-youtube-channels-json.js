const fs = require('fs');
const path = require('path');

const glob = require('glob');

const utils = require('../js/utils/utils-node');

const YOUTUBE_CHANNELS_JSON_FILE = './data/youtube-channels.json';
const CONFERENCES_GLOB_PATTERN = './data/conferences/*/*.yaml';

let conferenceFiles = glob.sync(CONFERENCES_GLOB_PATTERN);

// Build channel IDs object
let channelIds = new Set();

conferenceFiles.forEach(conferenceFile => {
  let channelId = utils.getJSON(conferenceFile).conference.links.youtube;

  if (channelId) {
    channelIds.add(channelId);
  }
});

// TODO: save
fs.writeFileSync(YOUTUBE_CHANNELS_JSON_FILE, JSON.stringify([...channelIds], null, 2));

console.log(`YouTube channels JSON file generated at: ${YOUTUBE_CHANNELS_JSON_FILE}`);
