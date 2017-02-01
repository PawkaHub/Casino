// NPM
import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { inject, observer } from 'mobx-react';
import radium from 'radium';

// Libraries
import { cover } from 'libraries/styles/cover';

@inject('store') @radium @observer
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

  @action deal = () => {
    console.log('deal');
    const { store } = this.props;
    store.send({
      url: '/api/deal',
      payload: {
        hello: 'deal',
      },
    });
  }

  @action hit = () => {
    console.log('hit');
    const { store } = this.props;
    store.send({
      url: '/api/hit',
      payload: {
        hello: 'hit',
      },
    });
  }

  @action stand = () => {
    console.log('stand');
    const { store } = this.props;
    store.send({
      url: '/api/stand',
      payload: {
        hello: 'stand',
      },
    });
  }

  @action doubleDown = () => {
    console.log('doubleDown');
    const { store } = this.props;
    store.send({
      url: '/api/doubledown',
      payload: {
        hello: 'doubleDown',
      },
    });
  }

  @action split = () => {
    console.log('split');
    const { store } = this.props;
    store.send({
      url: '/api/split',
      payload: {
        hello: 'split',
      },
    });
  }

  @action surrender = () => {
    console.log('surrender');
    const { store } = this.props;
    store.send({
      url: '/api/surrender',
      payload: {
        hello: 'surrender',
      },
    });
  }

  render() {
    const { style } = Blackjack;
    const { message } = this;

    return (
      <div style={style.wrapper}>
        <div style={style.title}>Start Blackjack!!!</div>
        <div onClick={this.deal}>Deal</div>
        <div onClick={this.hit}>Hit</div>
        <div onClick={this.stand}>Stand</div>
        <div onClick={this.doubleDown}>Double Down</div>
        <div onClick={this.split}>Split</div>
        <div onClick={this.surrender}>Surrender</div>
      </div>
    );
  }
}
