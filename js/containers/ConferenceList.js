const { Component, h } = window.preact;
const { bindActionCreators } = window.Redux;
const { connect } = window.preactRedux;
const htm = window.htm;

import { fetchList } from '../actions/conferenceListActions.js';
import { saveScrollPositionYList } from '../actions/scrollPositionActions.js';
import ConferenceListItem from '../components/ConferenceListItem.js';
import LoadingSpinner from "../components/LoadingSpinner.js";
import ErrorMessage from "../components/ErrorMessage.js";

const html = htm.bind(h);

class ConferenceList extends Component {

  componentDidMount() {
    this.props.fetchList();

    window.scrollTo(0, this.props.scrollPositions.list);

    document.title = 'ConfPad';
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
            ${conferenceList.data.map(data => html`
              <div class="mv4">
                <${ConferenceListItem} ...${data} showTitle=${true} />
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ConferenceList);
