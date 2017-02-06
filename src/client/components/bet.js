// NPM
import React, { Component, PropTypes } from 'react';
import { observable, action } from 'mobx';
import { inject, observer } from 'mobx-react';
import radium from 'radium';

// Libraries
import { midnight } from 'libraries/styles/colors';
import Form from 'libraries/components/form/form';
import NumberInput from 'libraries/components/form/textInput';
import FormButton from 'libraries/components/form/formButton';

@inject('store') @observer @radium
export default class Bet extends Component {

  static propTypes = {
    welcomeMessage: PropTypes.string.isRequired,
  };

  static defaultProps = {
    welcomeMessage: `Welcome to Pieter's Blackjack code sample, where the money is made up and the points don't matter!`,
  };

  static style = {
    wrapper: {
      position: 'relative',
      height: '100vh',
      width: '100%',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    holder: {
      width: '100%',
      maxWidth: '400px',
    },
    welcome: {
      marginBottom: '20px',
    },
  };

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
    const { style } = Bet;
    const { message, props } = this;
    const { welcomeMessage } = props;

    return (
      <div style={style.wrapper}>
        <div style={style.holder}>
          <Form
            name='playerBet'
            onReset={this.onReset}
            onError={this.onError}
            onSubmit={this.onSubmit}
          >
            <div style={style.welcome}>{welcomeMessage}</div>
            <NumberInput
              name='playerBetAmount'
              placeholder='Bet Amount'
            />
            <FormButton text='Start New Game' />
          </Form>
        </div>
      </div>
    );
  }
}
