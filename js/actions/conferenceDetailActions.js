const jsyaml = window.jsyaml;

export const ACTION_CONFERENCE_DETAIL_IS_FETCHING = 'ACTION_CONFERENCE_DETAIL_IS_FETCHING';
export const ACTION_CONFERENCE_DETAIL_FETCHED = 'ACTION_CONFERENCE_DETAIL_FETCHED';
export const ACTION_CONFERENCE_DETAIL_LOAD_FROM_CACHE = 'ACTION_CONFERENCE_DETAIL_LOAD_FROM_CACHE';
export const ACTION_CONFERENCE_DETAIL_ERROR = 'ACTION_CONFERENCE_DETAIL_ERROR';

export function fetchDetail(conferenceId) {
  return (dispatch, getState) => {
    if (getState().conferenceDetails.cache[conferenceId]) {
      dispatch({ type: ACTION_CONFERENCE_DETAIL_LOAD_FROM_CACHE, payload: conferenceId });
      return;
    }

    dispatch({ type: ACTION_CONFERENCE_DETAIL_IS_FETCHING });

    let url = `/data/conferences/${conferenceId}.yaml`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.text();
        }
        throw Error(`${response.status}: ${response.statusText} (${response.url})`);
      })
      .then(text => jsyaml.load(text))
      .then(data => dispatch({ type: ACTION_CONFERENCE_DETAIL_FETCHED, payload: { conferenceId, data } }))
      .catch(error => dispatch({ type: ACTION_CONFERENCE_DETAIL_ERROR, payload: error.message }));
  };
}
