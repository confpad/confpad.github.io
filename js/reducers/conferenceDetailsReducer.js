import {
  ACTION_CONFERENCE_DETAIL_IS_FETCHING,
  ACTION_CONFERENCE_DETAIL_FETCHED,
  ACTION_CONFERENCE_DETAIL_LOAD_FROM_CACHE,
} from '../actions/conferenceDetailActions.js';

const INITIAL_STATE = {
  data: [],
  cache: {},
  isFetching: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_CONFERENCE_DETAIL_IS_FETCHING:
      return {
        ...state,
        data: [],
        isFetching: true
      };
    case ACTION_CONFERENCE_DETAIL_FETCHED:
      return {
        ...state,
        isFetching: false,
        cache: { ...state.cache, [action.payload.conferenceId]: action.payload.data },
        data: action.payload.data
      };
    case ACTION_CONFERENCE_DETAIL_LOAD_FROM_CACHE:
      return {
        ...state,
        data: state.cache[action.payload],
      };
  }

  return state;
};

export default reducer;
