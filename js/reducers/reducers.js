const { combineReducers } = window.Redux;

import conferenceList from './conferenceListReducer.js';
import conferenceDetails from './conferenceDetailsReducer.js';

let reducers = combineReducers({
  conferenceList,
  conferenceDetails,
});

export default reducers;
