import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Settings from '../components/settings/index';
import * as SettingsActions from '../actions/settings';

function mapStateToProps(state) {
  return {
    settings: state.settings
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SettingsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
