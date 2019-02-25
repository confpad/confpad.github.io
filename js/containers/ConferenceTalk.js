const { Component, h } = window.preact;
const { bindActionCreators } = window.Redux;
const { connect } = window.preactRedux;
const htm = window.htm;

import { REGEX_URL_YOUTUBE, REGEX_URL_VIMEO } from '../utils/utils.js';
import { fetchDetail } from '../actions/conferenceDetailActions.js';
import { fetchList } from '../actions/conferenceListActions.js';
import Navigation from '../components/Navigation.js';
import ConferenceDetailItem from "../components/ConferenceDetailItem.js";
import GitHubLink from "../components/GitHubLink.js";
import LoadingSpinner from "../components/LoadingSpinner.js";
import ErrorMessage from "../components/ErrorMessage.js";

const html = htm.bind(h);

class ConferenceDetail extends Component {

  componentDidMount() {
    this.props.fetchList();
    this.props.fetchDetail(this.props.conferenceId);

    window.scrollTo(0, 0);
  }

  render({ conferenceId, talkId, conferenceDetails, conferenceList }) {
    let conferenceData = conferenceList.data.find(item => item.id === conferenceId);
    let talkData = conferenceDetails.data.find(item => item.id === talkId);

    if (conferenceData && talkData) {
      document.title = `ConfPad | ${conferenceData.name} | ${talkData.title}`;
    }

    return html`
      <main class="mt4">
        ${conferenceList.isFetching && html`
          <${LoadingSpinner} />
        `}
        
        <${Navigation} conferenceData=${conferenceData} talkData=${talkData} />
        
        ${conferenceList.error && !conferenceData && html`
          <${ErrorMessage} message="${conferenceList.error}">
        `}
        
        ${conferenceDetails.isFetching && html`
          <${LoadingSpinner} />
        `}
        
        ${talkData && talkData.videos && talkData.videos.map(video => {
          let match;
          
          // YouTube
          match = video.match(REGEX_URL_YOUTUBE);
          if (match) {
            let videoId = match[1];

            return html`
              <div class="mv3 w-100 aspect-ratio aspect-ratio--16x9 bg-light-gray">
                <iframe class="aspect-ratio--object" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>
            `
          }
          
          // Vimeo
          match = video.match(REGEX_URL_VIMEO);
          if (match) {
            let videoId = match[1];

            return html`
              <div class="mv3 w-100 aspect-ratio aspect-ratio--16x9 bg-light-gray">
                <iframe class="aspect-ratio--object" src="https://player.vimeo.com/video/${videoId}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
              </div>
            `
          }
        })}
        
        ${conferenceDetails.data && html`
          <${ConferenceDetailItem} ...${talkData} conferenceId=${conferenceId} isTalk=${true} />
        `}
        
        ${conferenceDetails.error && html`
          <${ErrorMessage} message="${conferenceDetails.error}" />
        `}
        
        <${GitHubLink} conferenceId=${conferenceId} />
      </main>
    `;
  }

}

const mapStateToProps = state => {
  return {
    conferenceList: state.conferenceList,
    conferenceDetails: state.conferenceDetails,
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchList, fetchDetail }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ConferenceDetail);
