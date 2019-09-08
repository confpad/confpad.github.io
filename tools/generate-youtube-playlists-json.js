const fs = require('fs');
const path = require('path');

const glob = require('glob');

const utils = require('../js/utils/utils-node');

const YOUTUBE_PLAYLISTS_JSON_FILE = './data/youtube-playlists.json';
const CONFERENCES_GLOB_PATTERN = './data/conferences/*/*.yaml';

let conferenceFiles = glob.sync(CONFERENCES_GLOB_PATTERN);

// Build playlist IDs object
let playlistIds = new Set();

conferenceFiles.forEach(conferenceFile => {
  let playlistUrl = utils.getJSON(conferenceFile).conference.links.playlist;
  let playlistMatch = playlistUrl && playlistUrl.match(utils.REGEX_URL_YOUTUBE_PLAYLIST);
  if (playlistMatch) {
    playlistIds.add(playlistMatch[1]);
  }
});

// TODO: save
fs.writeFileSync(YOUTUBE_PLAYLISTS_JSON_FILE, JSON.stringify([...playlistIds], null, 2));

console.log(`YouTube playlists JSON file generated at: ${YOUTUBE_PLAYLISTS_JSON_FILE}`);
