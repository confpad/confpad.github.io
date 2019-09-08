const { Component, h } = window.preact;
const { bindActionCreators } = window.Redux;
const { connect } = window.preactRedux;
const htm = window.htm;

import { fetchList } from '../actions/conferenceListActions.js';
import { saveScrollPositionYList } from '../actions/scrollPositionActions.js';
import ConferenceInfo from '../components/ConferenceInfo.js';
import LoadingSpinner from "../components/LoadingSpinner.js";
import ErrorMessage from "../components/ErrorMessage.js";
import { updateMetaUrls, updateMetaTitles, updateMetaDescriptions, updateMetaImages } from "../utils/head.js";

const html = htm.bind(h);

class ConferenceListView extends Component {

  componentDidMount() {
    this.props.fetchList();

    window.scrollTo(0, this.props.scrollPositions.list);

    updateMetaUrls('https://confpad.io/');
    updateMetaTitles('⚡️ ConfPad', 'ConfPad');
    updateMetaDescriptions('🌎 Community-curated list of tech conference talks, videos, slides and the like from all around the world');
    updateMetaImages('https://confpad.io/img/logo.png');
  }

  componentWillUnmount() {
    this.props.saveScrollPositionYList(window.scrollY);
  }

  render(props) {
    let { conferenceList } = props;

    return html`
      <main>
        ${conferenceList.isFetching && html`
          <${LoadingSpinner} />
        `}

        ${conferenceList.data && html`
          <ul class="list ma0 pa0">
            ${conferenceList.data.map(conference => html`
              <li class="mv4">
                <${ConferenceInfo} conference=${conference} showWebsite=${false} showFullDescription=${false} />
              </li>
            `)}
          </ul>
        `}

        ${conferenceList.error && html`
          <${ErrorMessage} message="${conferenceList.error}" />
        `}
      </main>
    `;
  }

}

const mapStateToProps = state => {
  return {
    conferenceList: state.conferenceList,
    scrollPositions: state.scrollPositions,
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchList, saveScrollPositionYList }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ConferenceListView);
