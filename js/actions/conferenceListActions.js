export const ACTION_CONFERENCE_LIST_FETCHED = 'ACTION_CONFERENCE_LIST_FETCHED';
export const ACTION_CONFERENCE_LIST_IS_FETCHING = 'ACTION_CONFERENCE_LIST_IS_FETCHING';

const LIST_URL = '/data/conferences.json';

export function fetchList() {
  return (dispatch, getState) => {
    if (getState().conferenceList.data.length) {
      return;
    }

    dispatch({ type: ACTION_CONFERENCE_LIST_IS_FETCHING });

    fetch(LIST_URL)
      .then(response => response.json())
      .then(data => {
        dispatch({ type: ACTION_CONFERENCE_LIST_FETCHED, payload: data });
      });
  };
}
