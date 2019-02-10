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
  test(`Has correct format - ${file}`, () => {
    talks.forEach(talk => {
      // Check if talk contains all fields in correct order
      expect(Object.keys(talk)).toEqual(ROOT_KEYS);

      // Check if authors entries contain all fields in correct order
      talk.authors && talk.authors.forEach(author => {
        expect(Object.keys(author)).toEqual(AUTHOR_KEYS);
      });

      // Check if slides URLs start with http(s)
      talk.slides && talk.slides.map(slidesItem => {
        expect(slidesItem).toEqual(expect.stringMatching(/^http[s]?:\/\//));
      });

      // Check if video URLs start with http(s)
      talk.videos && talk.videos.map(videosItem => {
        expect(videosItem).toEqual(expect.stringMatching(/^http[s]?:\/\//));
      });

      // Check if description doesn't contain newline
      if (talk.description !== null) {
        expect(talk.description).toEqual(expect.not.stringContaining('\n'));
      }
    });
  });
});
