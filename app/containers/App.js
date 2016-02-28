import React, { Component, PropTypes } from 'react';
import Navigation from './Navigation';
import { load } from '../actions/settings';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  componentWillMount() {
    load();
  }

  render() {
    return (
      <div>
        <Navigation />
        {this.props.children}
        {
          (() => {
            if (process.env.NODE_ENV !== 'production') {
              const DevTools = require('./DevTools');
              return <DevTools />;
            }
          })()
        }
      </div>
    );
  }
}
