const { h, render } = window.preact;
const { createStore, applyMiddleware } = window.Redux;
const { Provider } = window.preactRedux;
const thunk = window.ReduxThunk.default;
const Router = window.preactRouter;
const createHashHistory = window.History.createHashHistory;

import reducers from '../reducers/reducers.js';
import ConferenceDetail from '../containers/ConferenceDetail.js';
import ConferenceList from '../containers/ConferenceList.js';
import ErrorMessage from '../components/ErrorMessage.js';

let store = createStore(
  reducers,
  applyMiddleware(thunk)
);

const App = () => {
  return (
    h(Provider, { store: store },
      h(Router, { history: createHashHistory() },
        [
          h(ConferenceList, { path: '/' }),
          h(ConferenceDetail, { path: '/:conferenceId' }),
          h(ErrorMessage, { default: true }),
        ],
      )
    )
  );
};

render(h(App), document.querySelector('.content'));
