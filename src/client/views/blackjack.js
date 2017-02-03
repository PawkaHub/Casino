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
    const { store } = this.props;
    store.deal({ hello: 'deal' });
  }

  @action hit = () => {
    const { store } = this.props;
    store.hit({ hello: 'hit' });
  }

  @action stand = () => {
    const { store } = this.props;
    store.stand({ hello: 'stand' });
  }

  @action doubleDown = () => {
    const { store } = this.props;
    store.doubleDown({ hello: 'doubleDown' });
  }

  @action split = () => {
    const { store } = this.props;
    store.split({ hello: 'split' });
  }

  @action surrender = () => {
    const { store } = this.props;
    store.surrender({ hello: 'surrender' });
  }

  render() {
    const { style } = Blackjack;
    const { message, props } = this;
    const { store } = props;
    const { id, name } = store.showData();

    return (
      <div style={style.wrapper}>
        <div style={style.title}>Start Blackjack!!!</div>
        <div>ID: {id}</div>
        <div>Name: {name}</div>
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
