const slugify = window.slugify;

import {
  ACTION_CONFERENCE_DETAIL_IS_FETCHING,
  ACTION_CONFERENCE_DETAIL_FETCHED,
  ACTION_CONFERENCE_DETAIL_LOAD_FROM_CACHE,
  ACTION_CONFERENCE_DETAIL_ERROR,
} from '../actions/conferenceDetailActions.js';

const addSlugifiedId = data => data.map(
  (talk, index) => {
    let slug = slugify(talk.title, { lower: true })
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/-/g, ' ')
      .trim()
      .replace(/ /g, '-');

    return {
      ...talk,
      id: `${index + 1}-${slug}`,
    }
  }
);

const INITIAL_STATE = {
  data: [],
  cache: {},
  isFetching: false,
  error: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_CONFERENCE_DETAIL_IS_FETCHING:
      return {
        ...state,
        data: [],
        isFetching: true,
        error: null,
      };
    case ACTION_CONFERENCE_DETAIL_FETCHED:
      let data = addSlugifiedId(action.payload.data);

      return {
        ...state,
        isFetching: false,
        cache: { ...state.cache, [action.payload.conferenceId]: data },
        data: data,
        error: null,
      };
    case ACTION_CONFERENCE_DETAIL_LOAD_FROM_CACHE:
      return {
        ...state,
        data: state.cache[action.payload],
        error: null,
      };
    case ACTION_CONFERENCE_DETAIL_ERROR:
      return {
        ...state,
        isFetching: false,
        data: [],
        error: action.payload,
      };
  }

  return state;
};

export default reducer;
