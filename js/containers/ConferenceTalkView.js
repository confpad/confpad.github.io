import ConferenceTalkVideo from "../components/ConferenceTalkVideo.js";

const { Component, h } = window.preact;
const { bindActionCreators } = window.Redux;
const { connect } = window.preactRedux;
const htm = window.htm;

import { getVideoImage } from '../utils/utils.js';
import { fetchDetail } from '../actions/conferenceDetailActions.js';
import { fetchList } from '../actions/conferenceListActions.js';
import Navigation from '../components/Navigation.js';
import ConferenceTalk from "../components/ConferenceTalk.js";
import GitHubLink from "../components/GitHubLink.js";
import LoadingSpinner from "../components/LoadingSpinner.js";
import ErrorMessage from "../components/ErrorMessage.js";
import { updateMetaUrls, updateMetaTitles, updateMetaDescriptions, updateMetaImages } from "../utils/head.js";

const html = htm.bind(h);

class ConferenceTalkView extends Component {

  componentDidMount() {
    this.props.fetchList();
    this.props.fetchDetail(this.props.conferenceId);

    window.scrollTo(0, 0);
  }

  render({ conferenceId, talkId, conferenceDetail, conferenceList }) {
    let conferenceData = conferenceList.data.find(item => item.id === conferenceId);
    let talkData = conferenceDetail.data.find(item => item.id === talkId);

    if (conferenceData && talkData) {
      updateMetaUrls(`https://confpad.io/${conferenceData.id}/${talkData.id}`);
      updateMetaTitles(`${talkData.title} | ${conferenceData.name} | ConfPad`);
      updateMetaDescriptions(talkData.description);
      updateMetaImages(talkData && talkData.videos && getVideoImage(talkData.videos[0]) || 'https://confpad.io/img/logo.png');
    }

    return html`
      <main class="mt4">
        ${conferenceList.isFetching && html`
          <${LoadingSpinner} />
        `}
        
        <${Navigation} conferenceData=${conferenceData} talkData=${talkData} />
        
        ${conferenceList.error && !conferenceData && html`
          <${ErrorMessage} message=${conferenceList.error} >
        `}
        
        ${conferenceDetail.isFetching && html`
          <${LoadingSpinner} />
        `}
        
        ${talkData && talkData.videos && talkData.videos.map(url => {
          return html`<${ConferenceTalkVideo} url=${url} />`;
        })}
        
        ${conferenceDetail.data && html`
          <${ConferenceTalk} ...${talkData} conferenceId=${conferenceId} isTalk=${true} />
        `}
        
        ${conferenceDetail.error && html`
          <${ErrorMessage} message="${conferenceDetail.error}" />
        `}
        
        <${GitHubLink} conferenceId=${conferenceId} />
      </main>
    `;
  };

}

const mapStateToProps = state => {
  return {
    conferenceList: state.conferenceList,
    conferenceDetail: state.conferenceDetail,
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchList, fetchDetail }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ConferenceTalkView);
