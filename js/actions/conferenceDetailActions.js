export const ACTION_CONFERENCE_DETAIL_IS_FETCHING = 'ACTION_CONFERENCE_DETAIL_IS_FETCHING';
export const ACTION_CONFERENCE_DETAIL_FETCHED = 'ACTION_CONFERENCE_DETAIL_FETCHED';
export const ACTION_CONFERENCE_DETAIL_LOAD_FROM_CACHE = 'ACTION_CONFERENCE_DETAIL_LOAD_FROM_CACHE';

export function fetchDetail(conferenceId) {
  return (dispatch, getState) => {
    if (getState().conferenceDetails.cache[conferenceId]) {
      dispatch({ type: ACTION_CONFERENCE_DETAIL_LOAD_FROM_CACHE, payload: conferenceId });
      return;
    }

    dispatch({ type: ACTION_CONFERENCE_DETAIL_IS_FETCHING });

    let url = `/data/conferences/${conferenceId}.json`;

    fetch(url)
      .then(response => response.json())
      .then(data => dispatch({ type: ACTION_CONFERENCE_DETAIL_FETCHED, payload: { conferenceId, data } }));
  };
}
