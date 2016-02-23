import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Browser from '../components/browser/index';
import * as BrowserActions from '../actions/browser';

function mapStateToProps(state) {
  return {
    browser: state.browser
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(BrowserActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Browser);
