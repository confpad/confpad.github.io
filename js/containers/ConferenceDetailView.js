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
    this.props.fetchDetail(this.props.matches.conferenceId);

    window.scrollTo(0, 0);
  }

  render(props) {
    let { conferenceDetail } = props;
    let conference = conferenceDetail.conference;

    if (conference) {
      updateMetaUrls(`https://confpad.io/${conference.id}`);
      updateMetaTitles(`${conference.name} | ConfPad`);
      updateMetaDescriptions(conference.description);
      return html`
      <main class="mt4">
        ${conference && html`
            <div>
              <${Navigation} conference=${conference} />
              <${ConferenceInfo} conference=${conference} showTitle=${false} />
              <${GitHubLink} conferenceId=${conference.id} />
            </div>
         `}
        
        ${conferenceDetail.isFetching && html`
          <${LoadingSpinner} />
        `}
        
        ${conferenceDetail.talks && html`
          <ul class="list ma0 pa0">
            ${conferenceDetail.talks.map(talk => html`
              <li class="mv4">
                <${ConferenceTalk} conference=${conference} talk=${talk} showFullDescription=${false} />
              </li>
            `)}
          </ul>
        `}
        
        ${conferenceDetail.error && html`
          <${ErrorMessage} message="${conferenceDetail.error}" />
        `}
      </main>
    `;
      updateMetaImages('https://confpad.io/img/logo.png');

    }
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
