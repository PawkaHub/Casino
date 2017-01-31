// NPM
import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { inject, observer } from 'mobx-react';
import radium from 'radium';

@inject('gameStore') @radium @observer
export default class Blackjack extends Component {

  static style = {
    wrapper: {
      position: 'relative',
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
        Blackjack Game!
      </div>
    );
  }
}
