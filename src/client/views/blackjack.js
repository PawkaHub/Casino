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
      overflow: 'hidden',
      color: white(),
      ...cover('https://mxg.cdnbf.net/mexchangeblackjack/turbo/assets/gameView/tableBackground.png?v1.26-245'),
    },
    betForm: {
      height: 'auto',
    },
    title: {
      backgroundColor: '#2c3e50',
      color: 'rgba(255,255,255,0.7)',
      height: '30px',
      lineHeight: '32px',
      textAlign: 'center',
    },
    bump: {
      marginTop: '100px',
    },
    dealer: {
      marginTop: '100px',
    },
    player: {
      marginTop: '100px',
    },
    footer: {
      position: 'absolute',
      right: '0',
      bottom: '0',
      left: '0',
    },
  }

  @action hit = async () => {
    const { store } = this.props;
    await store.hit().catch(this.onError);
    this.message = 'Hit!';
  }

  @action stand = async () => {
    const { store } = this.props;
    store.stand();
  }

  @action doubleDown = async () => {
    const { store } = this.props;
    store.doubleDown();
  }

  @action surrender = async () => {
    const { store } = this.props;
    store.surrender();
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

  @action onSubmit = async ({ playerBetAmount }) => {
    const { store } = this.props;
    this.message = 'Placing Bet...';
    const result = await store.bet({ playerBetAmount }).catch(this.onError);
    return this.onResult(result);
  }

  render() {
    const { style } = Blackjack;
    const { message, props } = this;

    // Fetch store data
    const { store } = props;
    const { user, blackjack } = store.showData();

    let userEl = null;
    let boardEl = (<Lobby />);
    let betEl = (
      <Form
        name='playerBet'
        onReset={this.onReset}
        onError={this.onError}
        onSubmit={this.onSubmit}
        style={style.betForm}
      >
        <div>Welcome to fake blackjack where the money is made up and the points don't matter!</div>
        <NumberInput
          name='playerBetAmount'
          placeholder='Bet Amount'
        />
        <FormButton text='Start New Game' />
      </Form>
    );

    if (!user) { betEl = null; }

    if (user) {
      const { playerId, playerName } = user;
      boardEl = null;
      userEl = (
        <div>
          <div>Message: {message}</div>
          <div>ID: {playerId}</div>
          <div>Name: {playerName}</div>
        </div>
      );
    }

    if (blackjack) {
      const { finished, actions, outcome, outcomeType, payout, playerBetAmount, playerScore, dealerScore, dealerHand, playerHand } = blackjack;

      // If the game isn't finished, add a dummy card to the beginning of the dealer's deck so that we can simulate a face down card
      if (!finished) {
        const dummyCard = { rank: 'dummy', suit: 'fake' };
        dealerHand.unshift(dummyCard);
      }

      const dealerCards = dealerHand.map((card, index) => {
        const { rank, suit } = card;
        return (
          <div key={`dealer-card-${index}`}>Dealer Card: {rank}{suit}</div>
        );
      });

      const activeActions = actions.map((action, index) => {
        return (<div key={`action-${index}`} onClick={this[action]}>{action}</div>);
      });

      const playerCards = playerHand.map((card, index) => {
        const { rank, suit } = card;
        return (
          <div key={`player-card-${index}`}>Card: {rank}{suit}</div>
        );
      });

      let restartEl = null;
      if (!finished) { betEl = null; }
      if (finished) {
        restartEl = (
          <div>
            <div>Game over. New game?</div>
          </div>
        );
      }

      boardEl = (
        <div style={style.bump}>
          <div>Outcome: {outcome}</div>
          <div>Outcome Type: {outcomeType}</div>
          <div>Bet Amount: {playerBetAmount}</div>
          <div>Finished: {finished ? 'Yes' : 'No'}</div>
          <div>Payout: {payout}</div>

          {restartEl}

          <div style={style.dealer}>Dealer Hand:</div>
          <div>{dealerCards}</div>
          <div>Dealer Score {dealerScore}</div>

          <div style={style.player}>Player Hand:</div>
          <div>{playerCards}</div>
          <div>Player Score {playerScore}</div>

          <div style={style.footer}>
            <div>Active Actions Test:</div>
            {activeActions}
          </div>
        </div>
      );
    }

    return (
      <div style={style.wrapper}>
        {userEl}
        {betEl}
        {boardEl}
      </div>
    );
  }
}
