import {
  ACTION_CONFERENCE_DETAIL_IS_FETCHING,
  ACTION_CONFERENCE_DETAIL_FETCHED,
  ACTION_CONFERENCE_DETAIL_LOAD_FROM_CACHE,
  ACTION_CONFERENCE_DETAIL_ERROR,
} from '../actions/conferenceDetailActions.js';

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
      return {
        ...state,
        isFetching: false,
        cache: { ...state.cache, [action.payload.conferenceId]: action.payload.data },
        data: action.payload.data,
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
