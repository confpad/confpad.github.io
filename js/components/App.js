const { h, render } = window.preact;
const { createStore, applyMiddleware } = window.Redux;
const { Provider } = window.preactRedux;
const thunk = window.ReduxThunk.default;
const Router = window.preactRouter;
const createHistory = window.History.createBrowserHistory;

import reducers from '../reducers/reducers.js';
import ConferenceList from '../containers/ConferenceList.js';
import ConferenceDetail from '../containers/ConferenceDetail.js';
import ConferenceTalk from '../containers/ConferenceTalk.js';
import ErrorMessage from '../components/ErrorMessage.js';

let store = createStore(
  reducers,
  applyMiddleware(thunk)
);

const App = () => {
  return (
    h(Provider, { store: store },
      h(Router, { history: createHistory() },
        [
          h(ConferenceList, { path: '/' }),
          h(ConferenceDetail, { path: '/:conferenceId' }),
          h(ConferenceTalk, { path: '/:conferenceId/:talkId' }),
          h(ErrorMessage, { default: true }),
        ],
      )
    )
  );
};

render(h(App), document.querySelector('.content'));
