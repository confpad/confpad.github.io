const { Component, h } = window.preact;
const { bindActionCreators } = window.Redux;
const { connect } = window.preactRedux;
const htm = window.htm;

import { fetchDetail } from '../actions/conferenceDetailActions.js';
import { fetchList } from '../actions/conferenceListActions.js';
import ConferenceListItem from '../components/ConferenceListItem.js';
import ConferenceDetailItem from "../components/ConferenceDetailItem.js";
import LoadingSpinner from "../components/LoadingSpinner.js";

const html = htm.bind(h);

class ConferenceDetail extends Component {

  componentDidMount() {
    this.props.fetchList();
    this.props.fetchDetail(this.props.conferenceId);
  }

  render(props) {
    let { conferenceDetails, conferenceList } = props;
    let conferenceInfo = conferenceList.data.find(item => item.id === props.conferenceId);

    return html`
      <main>
        ${conferenceList.isFetching && html`
          <${LoadingSpinner}>
        `}
        
        ${conferenceInfo && html`
            <${ConferenceListItem} ...${conferenceInfo} isDetail="true"}>
         `}
        
        ${conferenceDetails.isFetching && html`
          <${LoadingSpinner}>
        `}
        
        ${conferenceDetails.data && html`
          <ul class="o-block-list o-block-list--loose">
            ${conferenceDetails.data.map(data => html`
              <${ConferenceDetailItem} ...${data}>
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
    conferenceDetails: state.conferenceDetails,
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchList, fetchDetail }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ConferenceDetail);
