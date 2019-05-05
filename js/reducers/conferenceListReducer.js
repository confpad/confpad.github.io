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

const TODAY = new Date();

const sortByDateFrom = (a, b) => {
  if (a.date.from < b.date.from) {
    return 1;
  } else if (b.date.from < a.date.from) {
    return -1;
  }
  return 0;
};

/**
 * Parse string date.{from,to} to Date object
 *  - also strips Z from "2019-01-10T00:00:00.000Z" so `new Date()` treats it as local date, not UTC
 *
 * @param {Object} conf
 * @returns {Object}
 */
const parseDates = conf => {
  conf.date.from = new Date(conf.date.from.slice(0, -1));
  conf.date.to = new Date(conf.date.to.slice(0, -1));

  return conf;
};

const isOlderThanToday = conf => conf.date.from < TODAY;

const isComplete = conf => conf.status === 'complete';

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
        data: action.payload
          .filter(isComplete)
          .map(parseDates)
          .filter(isOlderThanToday)
          .sort(sortByDateFrom),
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
