const { h, render } = window.preact;
const { createStore, applyMiddleware } = window.Redux;
const { Provider } = window.preactRedux;
const thunk = window.ReduxThunk.default;
const Router = window.preactRouter;
const createHistory = window.History.createBrowserHistory;

import reducers from '../reducers/reducers.js';
import ConferenceListView from '../containers/ConferenceListView.js';
import ConferenceDetailView from '../containers/ConferenceDetailView.js';
import ConferenceTalkView from '../containers/ConferenceTalkView.js';
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
          h(ConferenceListView, { path: '/' }),
          h(ConferenceDetailView, { path: '/:conferenceId' }),
          h(ConferenceTalkView, { path: '/:conferenceId/:talkId' }),
          h(ErrorMessage, { default: true }),
        ],
      )
    )
  );
};

render(h(App), document.querySelector('.content'));
