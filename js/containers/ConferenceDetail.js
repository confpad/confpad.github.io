const { Component, h } = window.preact;
const { bindActionCreators } = window.Redux;
const { connect } = window.preactRedux;
const htm = window.htm;

import { fetchDetail } from '../actions/conferenceDetailActions.js';
import { fetchList } from '../actions/conferenceListActions.js';
import Navigation from '../components/Navigation.js';
import ConferenceListItem from '../components/ConferenceListItem.js';
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

  render(props) {
    let { conferenceId, conferenceDetails, conferenceList } = props;
    let conferenceInfo = conferenceList.data.find(item => item.id === props.conferenceId);

    if (conferenceInfo) {
      document.title = `ConfPad | ${conferenceInfo.name}`;
    }

    return html`
      <main class="mt4">
        ${conferenceList.isFetching && html`
          <${LoadingSpinner} />
        `}
        
        ${conferenceInfo && html`
            <div>
              <${Navigation} conferenceData=${conferenceInfo} />
              <${ConferenceListItem} ...${conferenceInfo} />
              <${GitHubLink} conferenceId=${conferenceId} />
            </div>
         `}
        
        ${conferenceList.error && !conferenceInfo && html`
          <${ErrorMessage} message="${conferenceList.error}">
        `}
        
        ${conferenceDetails.isFetching && html`
          <${LoadingSpinner} />
        `}
        
        ${conferenceDetails.data && html`
          <ul class="list ma0 pa0">
            ${conferenceDetails.data.map(data => html`
              <${ConferenceDetailItem} ...${data} conferenceId=${props.conferenceId} />
            `)}
          </ul>
        `}
        
        ${conferenceDetails.error && html`
          <${ErrorMessage} message="${conferenceDetails.error}" />
        `}
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
