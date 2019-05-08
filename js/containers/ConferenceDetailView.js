const { Component, h } = window.preact;
const { bindActionCreators } = window.Redux;
const { connect } = window.preactRedux;
const htm = window.htm;

import { fetchDetail } from '../actions/conferenceDetailActions.js';
import Navigation from '../components/Navigation.js';
import ConferenceInfo from '../components/ConferenceInfo.js';
import ConferenceTalk from "../components/ConferenceTalk.js";
import GitHubLink from "../components/GitHubLink.js";
import LoadingSpinner from "../components/LoadingSpinner.js";
import ErrorMessage from "../components/ErrorMessage.js";
import { updateMetaUrls, updateMetaTitles, updateMetaDescriptions, updateMetaImages } from "../utils/head.js";

const html = htm.bind(h);

class ConferenceDetailView extends Component {

  componentDidMount() {
    this.props.fetchDetail(this.props.conferenceId);

    window.scrollTo(0, 0);
  }

  render(props) {
    let { conferenceId, conferenceDetail } = props;
    let conferenceData = conferenceDetail.conference;

    if (conferenceData) {
      updateMetaUrls(`https://confpad.io/${conferenceId}`);
      updateMetaTitles(`${conferenceData.name} | ConfPad`);
      updateMetaDescriptions(conferenceData.description);
      updateMetaImages('https://confpad.io/img/logo.png');
    }

    return html`
      <main class="mt4">
        ${conferenceData && html`
            <div>
              <${Navigation} conferenceId=${conferenceId} conferenceData=${conferenceData} />
              <${ConferenceInfo} ...${conferenceData} isDetail=${true} />
              <${GitHubLink} conferenceId=${conferenceId} />
            </div>
         `}
        
        ${conferenceDetail.isFetching && html`
          <${LoadingSpinner} />
        `}
        
        ${conferenceDetail.talks && html`
          <ul class="list ma0 pa0">
            ${conferenceDetail.talks.map(data => html`
              <${ConferenceTalk} ...${data} conferenceId=${conferenceId} />
            `)}
          </ul>
        `}
        
        ${conferenceDetail.error && html`
          <${ErrorMessage} message="${conferenceDetail.error}" />
        `}
      </main>
    `;
  }

}

const mapStateToProps = state => {
  return {
    conferenceDetail: state.conferenceDetail,
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchDetail }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ConferenceDetailView);
