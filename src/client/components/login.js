// NPM
import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { inject, observer } from 'mobx-react';
import radium from 'radium';

// Libraries
import Form from 'libraries/components/form/form';
import TextInput from 'libraries/components/form/textInput';
import EmailInput from 'libraries/components/form/emailInput';
import PasswordInput from 'libraries/components/form/passwordInput';
import FormButton from 'libraries/components/form/formButton';

@inject('store') @observer @radium
export default class Login extends Component {
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
  }

  @observable message = 'Blackjack Code Sample'

  @action onReset = () => {
    this.message = 'Blackjack Code Sample';
  }

  @action onError = (error) => {
    console.log('Join Game error', error);
    this.message = error;
  }

  @action onResult = (result) => {
    console.log('Join Game result', result);
    this.message = 'Joined Game!';
  }

  @action onSubmit = ({ playerName, playerEmail, playerPassword }) => {
    const { store } = this.props;

    // Auth the user
    this.message = 'Joining Game...';
    store.auth({
      playerName,
      playerEmail,
      playerPassword,
    }).then(this.onResult).catch(this.onError);
  }

  render() {
    const { style } = Login;
    const { message } = this;

    return (
      <div style={style.wrapper}>
        <div style={style.holder}>
          <Form
            name='playerJoin'
            onReset={this.onReset}
            onError={this.onError}
            onSubmit={this.onSubmit}
          >
            <div>{message}</div>
            <TextInput
              name='playerName'
              placeholder='Player Name'
            />
            <EmailInput
              name='playerEmail'
              placeholder='Player Email'
            />
            <PasswordInput
              name='playerPassword'
              placeholder='Player Password'
            />
            <FormButton text='Play Blackjack' />
          </Form>
        </div>
      </div>
    );
  }
}
