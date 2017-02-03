// NPM
import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { inject, observer } from 'mobx-react';
import radium from 'radium';

// Libraries
import Form from 'libraries/components/form/form';
import TextInput from 'libraries/components/form/textInput';
import FormButton from 'libraries/components/form/formButton';

@inject('store') @observer @radium
export default class Lobby extends Component {
  static style = {
    wrapper: {
      height: '100vh',
    },
  }

  @observable message = 'Join Lobby'

  @action onReset = () => {
    this.message = 'Join Lobby';
  }

  @action onError = (error) => {
    console.log('Join Lobby error', error);
    this.message = error;
  }

  @action onResult = (result) => {
    console.log('Join Lobby result', result);
    this.message = 'Joined Lobby!';
    // setTimeout(() => { location.href = '/blackjack'; }, 2000);
  }

  @action onSubmit = ({ playerName }) => {
    const { store } = this.props;
    this.message = 'Joining Lobby...';
    store.join({ playerName }).then(this.onResult).catch(this.onError);
  }

  render() {
    const { style } = Lobby;

    return (
      <div style={style.wrapper}>
        <Form
          name='playerJoin'
          onReset={this.onReset}
          onError={this.onError}
          onSubmit={this.onSubmit}
        >
          <TextInput
            name='playerName'
            placeholder='Player Name'
          />
          <FormButton text='Play Blackjack' />
        </Form>
      </div>
    );
  }
}
