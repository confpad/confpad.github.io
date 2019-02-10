const fs = require('fs');

const glob = require('glob');
const jsyaml = require('js-yaml');

const COUNTRIES = require('./countries');

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
    test(`Has correct format - ${conference.id}`, () => {
      // Check if conference contains all fields in correct order
      expect(Object.keys(conference)).toEqual(ROOT_KEYS);

      // Check if date entry contains all fields in correct order
      expect(Object.keys(conference.date)).toEqual(DATE_KEYS);
      conference.location && expect(Object.keys(conference.location)).toEqual(LOCATION_KEYS);

      // Check if description doesn't contain newline
      if (conference.description !== null) {
        expect(conference.description).toEqual(expect.not.stringContaining('\n'));
      }

      // Check if country is valid - reversed actual-expected order, sort of anti-pattern
      conference.location && expect(COUNTRIES).toContain(conference.location.country);
    });
  });
});
