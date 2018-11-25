const jsyaml = window.jsyaml;

export const ACTION_CONFERENCE_LIST_FETCHED = 'ACTION_CONFERENCE_LIST_FETCHED';
export const ACTION_CONFERENCE_LIST_IS_FETCHING = 'ACTION_CONFERENCE_LIST_IS_FETCHING';
export const ACTION_CONFERENCE_LIST_ERROR = 'ACTION_CONFERENCE_LIST_ERROR';

const LIST_URL = '/data/conferences.yaml';

export function fetchList() {
  return (dispatch, getState) => {
    if (getState().conferenceList.data.length) {
      return;
    }

    dispatch({ type: ACTION_CONFERENCE_LIST_IS_FETCHING });

    fetch(LIST_URL)
      .then(response => {
        if (response.ok) {
          return response.text();
        }
        throw Error(`${response.status}: ${response.statusText} (${response.url})`);
      })
      .then(text => jsyaml.load(text))
      .then(data => dispatch({ type: ACTION_CONFERENCE_LIST_FETCHED, payload: data }))
      .catch(error => dispatch({ type: ACTION_CONFERENCE_LIST_ERROR, payload: error.message }));
  };
}
