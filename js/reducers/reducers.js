const { combineReducers } = window.Redux;

import conferenceList from './conferenceListReducer.js';
import conferenceDetails from './conferenceDetailsReducer.js';
import scrollPositions from './scrollPositionsReducer.js';

let reducers = combineReducers({
  conferenceList,
  conferenceDetails,
  scrollPositions,
});

export default reducers;
