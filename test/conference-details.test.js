const fs = require('fs');

const glob = require('glob');
const jsyaml = require('js-yaml');

const ROOT_KEYS = ['title', 'type', 'level', 'time', 'room', 'authors', 'slides', 'videos', 'description'];
const AUTHOR_KEYS = ['name', 'twitter', 'github', 'website'];

glob.sync('{./data/conferences/*/*.yaml,./examples/2018-01-01-some-cool-conference.yaml}').forEach(file => {
  let talks;

  // Read YAML config
  let yamlString = fs.readFileSync(file, 'utf8');

  // Convert YAML to JS object
  try {
    talks = jsyaml.safeLoad(yamlString);
  }
  catch (error) {
    console.error(`${file}: ${error.message}`);
  }

  // Run tests
  test(`Should contain all keys - ${file}`, () => {
    talks.forEach(talk => {
      expect(Object.keys(talk)).toEqual(ROOT_KEYS);

      talk.authors && talk.authors.forEach(author => {
        expect(Object.keys(author)).toEqual(AUTHOR_KEYS);
      })
    });
  });
});
