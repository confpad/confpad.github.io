import { slugifyTitle } from '../utils/utils.js';

import {
  ACTION_CONFERENCE_DETAIL_IS_FETCHING,
  ACTION_CONFERENCE_DETAIL_FETCHED,
  ACTION_CONFERENCE_DETAIL_LOAD_FROM_CACHE,
  ACTION_CONFERENCE_DETAIL_ERROR,
} from '../actions/conferenceDetailActions.js';

const addConferenceId = (conference, conferenceId) => ({ id: conferenceId, ...conference });

const addSlugifiedTalkId = talks => talks.map(
  (talk, index) => {
    let slug = slugifyTitle(talk.title);

    return {
      id: `${index + 1}-${slug}`,
      ...talk,
    }
  }
);

const INITIAL_STATE = {
  conference: null,
  talks: [],
  cache: {},
  isFetching: false,
  error: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_CONFERENCE_DETAIL_IS_FETCHING:
      return {
        ...state,
        conference: null,
        talks: [],
        isFetching: true,
        error: null,
      };
    case ACTION_CONFERENCE_DETAIL_FETCHED:
      let conferenceId = action.payload.conferenceId;
      let conference = addConferenceId(action.payload.data.conference, conferenceId);
      let talks = addSlugifiedTalkId(action.payload.data.talks);

      return {
        ...state,
        isFetching: false,
        cache: { ...state.cache, [conferenceId]: { conference, talks } },
        conference: conference,
        talks: talks,
        error: null,
      };
    case ACTION_CONFERENCE_DETAIL_LOAD_FROM_CACHE:
      return {
        ...state,
        conference: state.cache[action.payload].conference,
        talks: state.cache[action.payload].talks,
        error: null,
      };
    case ACTION_CONFERENCE_DETAIL_ERROR:
      return {
        ...state,
        isFetching: false,
        conference: null,
        talks: [],
        error: action.payload,
      };
  }

  return state;
};

export default reducer;
