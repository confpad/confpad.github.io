const { Component, h } = window.preact;
const { bindActionCreators } = window.Redux;
const { connect } = window.preactRedux;

import { fetchDetail } from '../actions/conferenceDetailActions.js';
import { fetchList } from '../actions/conferenceListActions.js';
import ConferenceListItem from '../components/ConferenceListItem.js';
import ConferenceDetailItem from "../components/ConferenceDetailItem.js";
import LoadingSpinner from "../components/LoadingSpinner.js";

class ConferenceDetail extends Component {

  componentDidMount() {
    this.props.fetchList();
    this.props.fetchDetail(this.props.conferenceId);
  }

  render(props) {
    let { conferenceDetails, conferenceList } = props;
    let conferenceInfo = conferenceList.data.find(item => item.id === props.conferenceId);

    return (
      h(
        'main',
        {},
        [
          conferenceList.isFetching && h(LoadingSpinner),
          conferenceInfo && h('div', { class: 'conference-detail__info' },
            [
              h(ConferenceListItem, { ...conferenceInfo, isDetail: true }),
              h('hr'),
            ]
          ),
          conferenceDetails.isFetching && h(LoadingSpinner),
          conferenceDetails.data && h('ul', {},
            conferenceDetails.data.map((data) => (
                h('li', {}, h(ConferenceDetailItem, data))
              )
            )
          )
        ]
      )
    )
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
