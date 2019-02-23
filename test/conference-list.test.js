const fs = require('fs');

const glob = require('glob');
const jsyaml = require('js-yaml');

const COUNTRIES = require('./countries');

const ROOT_KEYS = ['id', 'name', 'url', 'status', 'date', 'location', 'description'];
const STATUS_VALUES = ['complete', 'incomplete'];
const DATE_KEYS = ['from', 'to'];
const LOCATION_KEYS = ['country', 'city'];
const REGEX_URL = /^http[s]?:\/\//;

glob.sync('{./data/conferences.yaml,./examples/conferences.yaml}').forEach(file => {
  let conferences;

  // Read YAML config
  let yamlString = fs.readFileSync(file, 'utf8');

  // Convert YAML to JS object
  try {
    conferences = jsyaml.safeLoad(yamlString);
  } catch (error) {
    console.error(`${file}: ${error.message}`);
  }

  // Run tests
  conferences.forEach(conference => {
    describe(`Conference info - ${conference.id}`, () => {

      it('contains all fields in correct order', () => {
        expect(Object.keys(conference)).toEqual(ROOT_KEYS);
      });

      it('contains lowercase ID', () => {
        expect(conference.id).toEqual(conference.id.toLowerCase());
      });

      it('contains valid status', () => {
        expect(STATUS_VALUES).toContain(conference.status);
      });

      it('contains date entry with all fields in correct order', () => {
        expect(Object.keys(conference.date)).toEqual(DATE_KEYS);
        conference.location && expect(Object.keys(conference.location)).toEqual(LOCATION_KEYS);
      });

      it('contains description on one line only if any', () => {
        expect(conference.description.includes('\n')).toEqual(false);
      });

      it('contains valid country and city', () => {
        conference.location && expect(COUNTRIES).toContain(conference.location.country);
        conference.location && expect(typeof conference.location.country).toBe('string');
        conference.location && expect(typeof conference.location.city).toBe('string');
      });

      it('contains URL starting with http(s) if any', () => {
        conference.url && expect(conference.url.match(REGEX_URL)).not.toBeNull();
      });

      it('contains valid date from/to', () => {
        [conference.date.from, conference.date.to].forEach(date => {
          expect(date).toBeInstanceOf(Date);
          expect(typeof date.getFullYear()).toBe('number');
        });
      });

    });
  });
});
