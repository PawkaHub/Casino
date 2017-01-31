// NPM
import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { inject, observer } from 'mobx-react';
import radium from 'radium';

// Libraries
import { cover } from 'libraries/styles/cover';

@inject('gameStore') @radium @observer
export default class Blackjack extends Component {

  static style = {
    wrapper: {
      position: 'relative',
      height: '100vh',
      ...cover('https://mxg.cdnbf.net/mexchangeblackjack/turbo/assets/gameView/tableBackground.png?v1.26-245'),
    },
    title: {
      backgroundColor: '#2c3e50',
      color: 'rgba(255,255,255,0.7)',
      height: '30px',
      lineHeight: '32px',
      textAlign: 'center',
    },
  }

  @action onSubmit = (formData) => {
    console.log('onSubmit', formData);
  }

  render() {
    const { style } = Blackjack;
    const { message } = this;

    return (
      <div style={style.wrapper}>
        <div style={style.title}>Start Blackjack</div>
        <div>Hit</div>
        <div>Stay</div>
        <div>Double Down</div>
        <div>Split</div>
        <div>Surrender</div>
      </div>
    );
  }
}
