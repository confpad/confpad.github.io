const fs = require('fs');

const glob = require('glob');
const jsyaml = require('js-yaml');

const ROOT_KEYS = ['title', 'type', 'level', 'time', 'room', 'authors', 'slides', 'videos', 'description'];
const AUTHOR_KEYS = ['name', 'twitter', 'github', 'website'];
const TALK_TYPES = ['regular', 'lightning', 'workshop'];
const TALK_LEVELS = ['beginner', 'intermediate', 'advanced'];
const REGEX_URL = /^http[s]?:\/\//;
const REGEX_URL_YOUTUBE = /^https:\/\/youtu\.be\/[a-zA-Z0-9_-]{11}$/;
const REGEX_URL_VIMEO = /^https:\/\/vimeo\.com\/[0-9]{9}$/;

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

      // Check if talk type is one of allowed ones - reversed actual-expected order, sort of anti-pattern
      expect(TALK_TYPES).toContain(talk.type);

      // Check if talk level is one of allowed ones - reversed actual-expected order, sort of anti-pattern
      talk.level && expect(TALK_LEVELS).toContain(talk.level);

      // Check if authors entries contain all fields in correct order
      talk.authors && talk.authors.forEach(author => {
        expect(Object.keys(author)).toEqual(AUTHOR_KEYS);

        expect(typeof author.name).toBe('string');
        author.twitter && expect(author.twitter).toEqual(expect.not.stringContaining('@'));
        author.twitter && expect(author.twitter).toEqual(expect.not.stringContaining('http'));
        author.github && expect(author.github).toEqual(expect.not.stringContaining('@'));
        author.github && expect(author.github).toEqual(expect.not.stringContaining('http'));
        author.website && expect(author.website).toEqual(expect.stringMatching(REGEX_URL));
      });

      // Check if slides URLs start with http(s)
      talk.slides && talk.slides.map(slidesItem => {
        expect(slidesItem).toEqual(expect.stringMatching(REGEX_URL));
      });

      // Check if video URLs start with http(s)
      talk.videos && talk.videos.map(url => {
        expect(url).toEqual(expect.stringMatching(REGEX_URL));

        if (url.includes('youtu')) {
          expect(url).toEqual(expect.stringMatching(REGEX_URL_YOUTUBE));
        }

        if (url.includes('vimeo')) {
          expect(url).toEqual(expect.stringMatching(REGEX_URL_VIMEO));
        }
      });

      // Check if description doesn't contain newline
      if (talk.description !== null) {
        expect(talk.description).toEqual(expect.not.stringContaining('\n'));
      }

      // Check if time is a valid date
      expect(talk.time).toBeInstanceOf(Date);
      expect(typeof talk.time.getFullYear()).toBe('number');

    });
  });
});
