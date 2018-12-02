const fs = require('fs');

const glob = require('glob');
const jsyaml = require('js-yaml');

const ROOT_KEYS = ['id', 'name', 'url', 'date', 'location', 'description'];
const DATE_KEYS = ['from', 'to'];
const LOCATION_KEYS = ['country', 'city'];

glob.sync('{./data/conferences.yaml,./examples/conferences.yaml}').forEach(file => {
  let conferences;

  // Read YAML config
  let yamlString = fs.readFileSync(file, 'utf8');

  // Convert YAML to JS object
  try {
    conferences = jsyaml.safeLoad(yamlString);
  }
  catch (error) {
    console.error(`${file}: ${error.message}`);
  }

  // Run tests
  conferences.forEach(conference => {
    test(`Should contain all keys - ${conference.id}`, () => {
      expect(Object.keys(conference)).toEqual(ROOT_KEYS);
      expect(Object.keys(conference.date)).toEqual(DATE_KEYS);
      conference.location && expect(Object.keys(conference.location)).toEqual(LOCATION_KEYS);
    });
  });
});
