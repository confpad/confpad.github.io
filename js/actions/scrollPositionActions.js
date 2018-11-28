export const ACTION_SCROLL_POSITION_LIST = 'ACTION_SCROLL_POSITION_LIST';

export function saveScrollPositionYList(scrollY) {
  return dispatch => dispatch({ type: ACTION_SCROLL_POSITION_LIST, payload: scrollY });
}
