const fs = require('fs');

const glob = require('glob');
const jsyaml = require('js-yaml');

const LANGS = require('./iso-639-1');
const { REGEX_URL_YOUTUBE, REGEX_URL_VIMEO } = require('../js/utils/utils-node');

const ROOT_KEYS = ['title', 'lang', 'type', 'level', 'time', 'room', 'authors', 'slides', 'videos', 'description'];
const AUTHOR_KEYS = ['name', 'twitter', 'github', 'website'];
const TALK_TYPES = ['regular', 'lightning', 'workshop'];
const TALK_LEVELS = ['beginner', 'intermediate', 'advanced'];
const REGEX_URL = /^http[s]?:\/\//;

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
  talks.forEach(talk => {
    describe(`Conference details - ${file} - "${talk.title}"`, () => {

      it('has filename in lowercase', () => {
        expect(file).toEqual(file.toLowerCase());
      });

      it('contains all fields in correct order', () => {
        expect(Object.keys(talk)).toEqual(ROOT_KEYS);
      });

      it('contains valid lang', () => {
        expect(typeof talk.lang).toBe('string');
        expect(talk.lang).toHaveLength(2);
        expect(LANGS).toContain(talk.lang);
      });

      it('contains valid type', () => {
        expect(TALK_TYPES).toContain(talk.type);
      });

      it('contains valid level if any', () => {
        talk.level && expect(TALK_LEVELS).toContain(talk.level);
      });

      it('contains valid time', () => {
        expect(talk.time).toBeInstanceOf(Date);
        expect(typeof talk.time.getFullYear()).toBe('number');
      });

      it('contains all authors fields in correct order if any', () => {
        talk.authors && talk.authors.forEach(author => {
          expect(Object.keys(author)).toEqual(AUTHOR_KEYS);
        });
      });

      it('has valid authors entries if any', () => {
        talk.authors && talk.authors.forEach(author => {
          expect(typeof author.name).toBe('string');
          author.twitter && expect(author.twitter.includes('@')).toEqual(false);
          author.twitter && expect(author.twitter.includes('http')).toEqual(false);
          author.github && expect(author.github.includes('@')).toEqual(false);
          author.github && expect(author.github.includes('http')).toEqual(false);
          author.website && expect(author.website.match(REGEX_URL)).not.toBeNull();
        });
      });

      it('contains slides URLs starting with http(s) if any', () => {
        talk.slides && talk.slides.map(url => {
          expect(url.match(REGEX_URL)).not.toBeNull();
        });
      });

      it('contains video URLs starting with http(s) if any', () => {
        talk.videos && talk.videos.map(url => {
          expect(url.match(REGEX_URL)).not.toBeNull();
        });
      });

      it(`contains YouTube video URLs in format: ${REGEX_URL_YOUTUBE}`, () => {
        talk.videos && talk.videos.map(url => {
          if (url.includes('youtu')) {
            expect(url.match(REGEX_URL_YOUTUBE)).not.toBeNull();
          }
        });
      });

      it(`contains Vimeo video URLs in format: ${REGEX_URL_VIMEO}`, () => {
        talk.videos && talk.videos.map(url => {
          if (url.includes('vimeo')) {
            expect(url.match(REGEX_URL_VIMEO)).not.toBeNull();
          }
        });
      });

      it('contains description on one line only if any', () => {
        talk.description && expect(talk.description.includes('\n')).toEqual(false);
      });

    });
  });
});
