// NPM
import radium, { StyleRoot, Style } from 'radium';
import { Provider, inject, observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import React, { Component } from 'react';

// Libraries
import Reset from 'libraries/styles/reset';

@inject('store') @radium({ isRoot: true }) @observer
export default class App extends Component {
  static style = {
    // Main app container
    app: {
      position: 'relative',
      width: '100%',
    },
    // Container for covers, banners, alerts, etc.
    features: {
      position: 'absolute',
      zIndex: 1,
      top: '0px',
      left: '0px',
    },
    // Container for the main content area
    layout: {
      position: 'relative',
      zIndex: 0,
      width: '100%',
    },
  }

  componentDidMount = () => {
    const { store } = this.props;

    // Allow for convenient debugging of player data in console
    const { NODE_ENV } = process.env;
    if (NODE_ENV === 'development') {
      window.store = store;
    }

    // Re-Initialize the current user session, if there is any.
    store.rejoin();
  }

  render() {
    const { style } = App;
    const { children } = this.props;

    let devTools;
    if (process.env.APP_ENV === 'development') {
      devTools = (<DevTools />);
    }

    return (
      <StyleRoot style={style.app}>
        {/* Base Reset Styles */}
        <Style rules={Reset} />

        {/* Render all content provided by the server */}
        {children}

        {/* Development Tools */}
        {devTools}
      </StyleRoot>
    );
  }
}
