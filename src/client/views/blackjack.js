// NPM
import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { inject, observer } from 'mobx-react';
import radium from 'radium';

// Libraries
import { capitalize } from 'libraries/utils';
import { white, midnight } from 'libraries/styles/colors';
import { cover } from 'libraries/styles/cover';
import Hand from 'libraries/components/hand';

// Project
import Login from 'project/client/components/login';
import Info from 'project/client/components/info';
import Bet from 'project/client/components/bet';

@inject('store') @radium @observer
export default class Blackjack extends Component {

  static style = {
    wrapper: {
      position: 'relative',
      height: '100vh',
      overflow: 'hidden',
      color: white(),
      backgroundColor: midnight(),
    },
    holder: {
      position: 'absolute',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
      overflow: 'hidden',
    },
    board: {
      position: 'absolute',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      ...cover('https://mxg.cdnbf.net/mexchangeblackjack/turbo/assets/gameView/tableBackground.png?v1.26-245'),
      transition: 'opacity 900ms ease-in-out',
    },
    boardHidden: {
      opacity: '0.2',
    },
    cards: {
      position: 'relative',
    },
    bar: {
      height: '60px',
      width: '100%',
      marginTop: '50px',
      marginBottom: '58px',
    },
    barHidden: {
      opacity: '0',
      pointerEvents: 'none',
    },
    topBar: {
      height: '30px',
      lineHeight: '30px',
      marginBottom: '10px',
    },
    middleBar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    barItem: {
      margin: '10px',
      padding: '0 30px',
      height: '40px',
      lineHeight: '42px',
      borderRadius: '20px',
      background: white(),
      color: midnight(),
      cursor: 'pointer',
      transition: 'opacity 300ms ease-in-out',
      opacity: '0.8',
      ':hover': {
        opacity: '1',
      }
    },
    bottomBar: {
      height: '30px',
      lineHeight: '30px',
      marginTop: '10px',
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
  }

  @action stand = async () => {
    const { store } = this.props;
    await store.stand();
  }

  @action doubleDown = async () => {
    const { store } = this.props;
    await store.doubleDown();
  }

  @action surrender = async () => {
    const { store } = this.props;
    await store.surrender();
  }

  render() {
    const { style } = Blackjack;

    // Fetch store data
    const { store } = this.props;
    const { user, blackjack } = store.showData();

    let userEl = null;
    let boardEl = (<Login />);
    let restartEl = null;

    const infoItems = [];

    const boardStyle = [style.board];
    const barStyle = [style.bar];

    // If no blackjack game in progress, show bet form
    if (user && !blackjack) { boardEl = (<Bet />); }

    if (user) {
      const { playerName } = user;
      infoItems.push(`Logged in as: ${playerName}`);
    }

    if (blackjack) {
      const {
        dealerHand,
        dealerScore,
        playerHand,
        playerScore,
        actions,
        finished,
        playerBetAmount,
        payout,
        outcome,
      } = blackjack;

      infoItems.push(`Your Bet: ${playerBetAmount}`);
      if (payout) { infoItems.push(`Your Payout: ${payout}`); }
      if (outcome) { infoItems.push(outcome); }

      // Update userEl
      userEl = (<Info items={infoItems} />);

      // Generate dealer hand
      const dealerCards = (<Hand cards={dealerHand} />);

      // Generate player hand
      const playerCards = (<Hand cards={playerHand} />);

      // Generate active actions a player can take
      let activeActions = actions.map((action, index) => {
        // Generate front end friendly text
        let actionText = capitalize(action);
        if (action === 'doubleDown') { actionText = 'Double Down'; }

        return (
          <div
            key={`action-${index}`}
            style={style.barItem}
            onClick={this[action]}
          >
            {actionText}
          </div>
        );
      });

      // Handle if a game is already finished
      if (finished) {
        boardStyle.push(style.boardHidden);
        barStyle.push(style.barHidden);
        restartEl = (<Bet welcomeMessage={outcome} />);
      }

      boardEl = (
        <div style={boardStyle}>

          <div style={style.cards}>

            <div style={style.topBar}>Dealer Score: {dealerScore}</div>
            {dealerCards}

            <div style={barStyle}>
              <div style={style.middleBar}>{activeActions}</div>
            </div>

            {playerCards}
            <div style={style.bottomBar}>Player Score: {playerScore}</div>
          </div>

        </div>
      );
    }

    return (
      <div style={style.wrapper}>
        <div style={style.holder}>
          {boardEl}
        </div>
        {userEl}
        {restartEl}
      </div>
    );
  }
}
