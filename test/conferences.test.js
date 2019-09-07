const path = require('path');

const glob = require('glob');

const LANGS = require('./iso-639-1');
const COUNTRIES = require('./countries');
const {
  getJSON,
  INFO_STATUS_COMPLETE,
  INFO_STATUS_INCOMPLETE,
  REGEX_URL_YOUTUBE,
  REGEX_URL_YOUTUBE_CHANNEL,
  REGEX_URL_VIMEO,
} = require('../js/utils/utils-node');

// Common
const REGEX_FILENAME = /^[0-9]{4}-[0-9]{2}-[0-9]{2}-[a-z0-9-]+\.yaml$/;
const REGEX_URL = /^http[s]?:\/\/[a-z0-9-\.]+\.[a-z]{2,}/;

// Conference info
const INFO_ROOT_KEYS = ['name', 'status', 'series', 'tags', 'link', 'date', 'location', 'description'];
const INFO_STATUS_VALUES = [INFO_STATUS_COMPLETE, INFO_STATUS_INCOMPLETE];
const INFO_TAGS_VALUES = [
  'android',
  'angular',
  'css',
  'design',
  'devops',
  'ember',
  'flutter',
  'general',
  'graphql',
  'ios',
  'javascript',
  'laravel',
  'machinelearning',
  'management',
  'mobile',
  'node',
  'react',
  'reactnative',
  'performance',
  'php',
  'python',
  'reason',
  'ruby',
  'rust',
  'security',
  'swift',
  'testing',
  'typescript',
  'vue',
  'web',
];
const INFO_LINK_KEYS = ['twitter', 'playlist', 'website'];
const INFO_DATE_KEYS = ['from', 'to'];
const INFO_LOCATION_KEYS = ['country', 'city'];

// Conference talk
const TALK_ROOT_KEYS = ['title', 'lang', 'type', 'time', 'authors', 'slides', 'videos', 'description'];
const TALK_AUTHOR_KEYS = ['name', 'twitter', 'github', 'website'];
const TALK_TYPES = ['regular', 'lightning', 'workshop'];

let year;
let testGlob = './data/conferences/*/*.yaml';

// Single file test?
let testFile = process.argv.pop();
if (testFile.match(REGEX_FILENAME) !== null) {
  year = testFile.substr(0, 4);
  testGlob = `./data/conferences/${year}/${testFile}`;
}

glob.sync(testGlob).forEach(file => {
  let data = getJSON(file);
  let conference = data.conference;
  let talks = data.talks;

  // Conference file tests
  describe(`Conference file: ${file}`, () => {

    it('has filename in correct format and lowercase', () => {
      let filename = path.basename(file);
      expect(filename.match(REGEX_FILENAME)).not.toBeNull();
    });

  });

  // Conference info
  describe(`Conference info: ${file}`, () => {

    it('contains all fields in correct order', () => {
      expect(Object.keys(conference)).toEqual(INFO_ROOT_KEYS);
    });

    // Status
    it('contains valid status', () => {
      expect(INFO_STATUS_VALUES).toContain(conference.status);
    });

    // Series
    it('contains valid series', () => {
      expect(conference.series).not.toBeNull();
    });

    // Tags
    it('contains valid tags', () => {
      expect(conference.tags.length).toBe(3);

      conference.tags.forEach(tag => {
        tag && expect(INFO_TAGS_VALUES).toContain(tag);
      });
    });

    // Link
    it('contains link entry with all fields in correct order', () => {
      expect(Object.keys(conference.link)).toEqual(INFO_LINK_KEYS);
    });

    it('contains valid Twitter account ID', () => {
      conference.link.twitter && expect(conference.link.twitter.includes('@')).toEqual(false);
      conference.link.twitter && expect(conference.link.twitter.includes('http')).toEqual(false);
    });

    it('contains valid playlist URL', () => {
      conference.link.playlist && expect(conference.link.playlist.match(REGEX_URL)).not.toBeNull();
    });

    it('contains valid website URL', () => {
      conference.link.website && expect(conference.link.website.match(REGEX_URL)).not.toBeNull();
    });

    // Date
    it('contains date entry with all fields in correct order', () => {
      expect(Object.keys(conference.date)).toEqual(INFO_DATE_KEYS);
      conference.location && expect(Object.keys(conference.location)).toEqual(INFO_LOCATION_KEYS);
    });

    it('contains valid date from/to', () => {
      [conference.date.from, conference.date.to].forEach(date => {
        expect(date).toBeInstanceOf(Date);
        expect(typeof date.getFullYear()).toBe('number');
      });
    });

    // Location
    it('contains valid country and city', () => {
      conference.location && expect(COUNTRIES).toContain(conference.location.country);
      conference.location && expect(typeof conference.location.country).toBe('string');
      conference.location && expect(typeof conference.location.city).toBe('string');
    });

    // Description
    it('contains description on one line only if any', () => {
      expect(conference.description.includes('\n')).toEqual(false);
    });

  });

  // Conference talks tests
  conference.status === INFO_STATUS_COMPLETE && talks.forEach(talk => {
    describe(`Conference talk: ${file} - "${talk.title}"`, () => {

      it('contains all fields in correct order', () => {
        expect(Object.keys(talk)).toEqual(TALK_ROOT_KEYS);
      });

      it('contains valid lang', () => {
        expect(typeof talk.lang).toBe('string');
        expect(talk.lang).toHaveLength(2);
        expect(LANGS).toContain(talk.lang);
      });

      it('contains valid type', () => {
        expect(TALK_TYPES).toContain(talk.type);
      });

      it('contains valid time', () => {
        expect(talk.time).toBeInstanceOf(Date);
        expect(typeof talk.time.getFullYear()).toBe('number');
      });

      it('contains all authors fields in correct order if any', () => {
        talk.authors && talk.authors.forEach(author => {
          expect(Object.keys(author)).toEqual(TALK_AUTHOR_KEYS);
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
