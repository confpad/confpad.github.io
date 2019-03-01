const { combineReducers } = window.Redux;

import conferenceList from './conferenceListReducer.js';
import conferenceDetail from './conferenceDetailReducer.js';
import scrollPositions from './scrollPositionsReducer.js';

let reducers = combineReducers({
  conferenceList,
  conferenceDetail: conferenceDetail,
  scrollPositions,
});

export default reducers;
