// NPM
import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { inject, observer } from 'mobx-react';
import radium from 'radium';

// Libraries
import { white } from 'libraries/styles/colors';
import { cover } from 'libraries/styles/cover';
import Form from 'libraries/components/form/form';
import NumberInput from 'libraries/components/form/numberInput';
import FormButton from 'libraries/components/form/formButton';

// Project
import Lobby from 'project/client/views/lobby';

@inject('store') @radium @observer
export default class Blackjack extends Component {

  static style = {
    wrapper: {
      position: 'relative',
      height: '100vh',
      color: white(),
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

  @observable message = 'Place Bet'

  // Form Submission
  @action onReset = () => {
    this.message = 'Place Bet';
  }

  @action onError = (error) => {
    console.log('Place Bet error', error);
    this.message = error;
  }

  @action onResult = (result) => {
    console.log('Place Bet result', result);
    this.message = 'Bet Placed!';
  }

  @action onSubmit = ({ playerBetAmount }) => {
    const { store } = this.props;
    this.message = 'Placing Bet...';
    store.bet({ playerBetAmount }).then(this.onResult).catch(this.onError);
  }

  render() {
    const { style } = Blackjack;
    const { message, props } = this;

    // Fetch store data
    const { store } = props;
    const { user, blackjack } = store.showData();

    let userEl = null;
    let boardEl = (<Lobby />);

    if (user) {
      const { id, name } = user;
      boardEl = null;
      userEl = (
        <div>
          <div>ID: {id}</div>
          <div>Name: {name}</div>
        </div>
      );
    }

    let betEl = (
      <Form
        name='playerBet'
        onReset={this.onReset}
        onError={this.onError}
        onSubmit={this.onSubmit}
      >
        <NumberInput
          name='playerBetAmount'
          placeholder='Bet Amount'
        />
        <FormButton text='Place Bet' />
      </Form>
    );

    if (blackjack) {
      betEl = null;

      const { finished, playerBetAmount, playerHand } = blackjack;

      const cards = playerHand.map((card, index) => {
        console.log('check', card);
        const { rank, suit } = card;
        return (<div key={`card-${index}`}>Card: {rank}{suit}</div>)
      });

      boardEl = (
        <div>
          <div>BIG BAD DEALER HAND UP HERE</div>
          <div>Bet Amount: {playerBetAmount}</div>
          <div>Finished: {finished}</div>
          <div>Player Hand: {cards}</div>
          <div onClick={this.hit}>Hit</div>
          <div onClick={this.stand}>Stand</div>
          <div onClick={this.doubleDown}>Double Down</div>
          <div onClick={this.split}>Split</div>
          <div onClick={this.surrender}>Surrender</div>
        </div>
      );
    }

    return (
      <div style={style.wrapper}>
        {userEl}
        {boardEl}
        {betEl}
      </div>
    );
  }
}
