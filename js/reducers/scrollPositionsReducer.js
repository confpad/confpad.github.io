import {
  ACTION_SCROLL_POSITION_LIST,
} from '../actions/scrollPositionActions.js';

const INITIAL_STATE = {
  list: 0,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_SCROLL_POSITION_LIST:
      return {
        ...state,
        list: action.payload,
      };
  }

  return state;
};

export default reducer;
