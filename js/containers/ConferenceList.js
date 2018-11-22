const { Component, h } = window.preact;
const { bindActionCreators } = window.Redux;
const { connect } = window.preactRedux;
const htm = window.htm;

import { fetchList } from '../actions/conferenceListActions.js';
import ConferenceListItem from '../components/ConferenceListItem.js';
import LoadingSpinner from "../components/LoadingSpinner.js";

const html = htm.bind(h);

class ConferenceList extends Component {

  componentDidMount() {
    this.props.fetchList();
  }

  render(props) {
    let { conferenceList } = props;

    return html`
      <main>
        ${conferenceList.isFetching && html`
          <${LoadingSpinner}>
        `}
        ${conferenceList.data && html`
          <ul>
            ${conferenceList.data.map(data => html`
              <li>
                <${ConferenceListItem} ...${data}>
              </li>
            `)}
          </ul>
        `}
      </main>
    `;
  }

}

const mapStateToProps = state => {
  return {
    conferenceList: state.conferenceList,
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchList }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ConferenceList);
