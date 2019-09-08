import ConferenceTalkVideo from "../components/ConferenceTalkVideo.js";

const { Component, h } = window.preact;
const { bindActionCreators } = window.Redux;
const { connect } = window.preactRedux;
const htm = window.htm;

import { getVideoImage } from '../utils/utils.js';
import { fetchDetail } from '../actions/conferenceDetailActions.js';
import Navigation from '../components/Navigation.js';
import ConferenceTalk from "../components/ConferenceTalk.js";
import GitHubLink from "../components/GitHubLink.js";
import LoadingSpinner from "../components/LoadingSpinner.js";
import ErrorMessage from "../components/ErrorMessage.js";
import { updateMetaUrls, updateMetaTitles, updateMetaDescriptions, updateMetaImages } from "../utils/head.js";

const html = htm.bind(h);

class ConferenceTalkView extends Component {

  componentDidMount() {
    this.props.fetchDetail(this.props.matches.conferenceId);

    window.scrollTo(0, 0);
  }

  render({ conferenceId, talkId, conferenceDetail }) {
    let conference = conferenceDetail.conference;
    let talk = conferenceDetail.talks.find(item => item.id === talkId);



    if (conference && talk) {
      updateMetaUrls(`https://confpad.io/${conference.id}/${talk.id}`);
      updateMetaTitles(`${talk.title} | ${conference.name} | ConfPad`);
      updateMetaDescriptions(talk.description);
      updateMetaImages(talk && talk.videos && getVideoImage(talk.videos[0]) || 'https://confpad.io/img/logo.png');
    }

    return html`
      <main class="mt4">
        <${Navigation} conference=${conference} talk=${talk} />

        ${conferenceDetail.isFetching && html`
          <${LoadingSpinner} />
        `}

        ${talk && talk.videos && talk.videos.map(url => {
          return html`<${ConferenceTalkVideo} url=${url} />`;
        })}

        ${talk && html`
          <${ConferenceTalk} conference=${conference} talk=${talk} showTitle=${false} />
        `}

        ${conferenceDetail.error && html`
          <${ErrorMessage} message="${conferenceDetail.error}" />
        `}

        ${talk && html`
          <${GitHubLink} conferenceId=${conference.id} />
        `}
      </main>
    `;
  };

}

const mapStateToProps = state => {
  return {
    conferenceDetail: state.conferenceDetail,
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchDetail }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ConferenceTalkView);
