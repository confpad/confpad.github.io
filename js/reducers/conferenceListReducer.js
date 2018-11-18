import {
  ACTION_CONFERENCE_LIST_IS_FETCHING,
  ACTION_CONFERENCE_LIST_FETCHED,
} from '../actions/conferenceListActions.js';

const INITIAL_STATE = {
  data: [],
  isFetching: false,
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
      };
    case ACTION_CONFERENCE_LIST_FETCHED:
      return {
        ...state,
        isFetching: false,
        data: action.payload.sort(sortByDateFrom),
      };
  }

  return state;
};

export default reducer;
