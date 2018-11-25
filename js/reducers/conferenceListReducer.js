import {
  ACTION_CONFERENCE_LIST_IS_FETCHING,
  ACTION_CONFERENCE_LIST_FETCHED,
  ACTION_CONFERENCE_LIST_ERROR,
} from '../actions/conferenceListActions.js';

const INITIAL_STATE = {
  data: [],
  isFetching: false,
  error: null,
};

const sortByDateFrom = (a, b) => {
  if (a.date.from < b.date.from) {
    return 1;
  } else if (b.date.from < a.date.from) {
    return -1;
  }
  return 0;
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_CONFERENCE_LIST_IS_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case ACTION_CONFERENCE_LIST_FETCHED:
      return {
        ...state,
        isFetching: false,
        data: action.payload.sort(sortByDateFrom),
        error: null,
      };
    case ACTION_CONFERENCE_LIST_ERROR:
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
