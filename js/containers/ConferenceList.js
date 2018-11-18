const { Component, h } = window.preact;
const { bindActionCreators } = window.Redux;
const { connect } = window.preactRedux;

import { fetchList } from '../actions/conferenceListActions.js';
import ConferenceListItem from '../components/ConferenceListItem.js';
import LoadingSpinner from "../components/LoadingSpinner.js";

class ConferenceList extends Component {

  componentDidMount() {
    this.props.fetchList();
  }

  render(props) {
    return (
      h(
        'main',
        {},
        [
          props.conferenceList.isFetching && h(LoadingSpinner),
          props.conferenceList.data && h(
            'ul',
            {},
            props.conferenceList.data.map((data) => (
              h(
                'li',
                {},
                h(ConferenceListItem, data)
              )
            )),
          )]
      )
    )
  }

}

const mapStateToProps = state => {
  return {
    conferenceList: state.conferenceList,
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchList }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ConferenceList);
