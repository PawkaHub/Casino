// NPM
import React from 'react';
import radium from 'radium';
import Perf from 'react-addons-perf';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

// Colors
import { red } from 'libraries/styles/colors';

@radium @observer
export default class Record extends React.Component {
  static style = {
    record: {
      position: 'fixed',
      top: '10px',
      left: '10px',
      zIndex: '999999',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      background: red(),
      opacity: '1',
      pointerEvents: 'none',
      transition: 'opacity 300ms ease-in-out',
    },
    recordInactive: {
      opacity: '0',
    },
  }
  @observable recording = false

  componentDidMount = () => {
    // We require keymaster dynamically  here so that we don't get ssr errors due to keymaster requiring access to the client document
    this.key = require('keymaster');
    this.key('`', this.toggleRecording);
  }

  componentWillUnmount = () => {
    this.key.unbind('`');
  }

  toggleRecording = () => {
    const { recording } = this;
    if (recording) {
      Perf.stop();
      // Perf.printInclusive();
      // Perf.printExclusive();
      Perf.printWasted();
      this.recording = false;
    } else {
      Perf.start();
      this.recording = true;
    }
  }

  render() {
    const { style } = Record;
    const { recording } = this;

    const recordStyle = [style.record, style.recordInactive];
    if (recording) {
      recordStyle.pop();
    } else {
      recordStyle.push(style.recordInactive);
    }

    return (<div style={recordStyle}></div>);
  }
}
