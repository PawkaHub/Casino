// NPM
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import radium from 'radium';

// Libraries
import { cover } from 'libraries/styles/cover';
import Button from 'libraries/components/button';

@observer @radium
export default class Lobby extends Component {
  static style = {
    wrapper: {
      height: '100vh',
      ...cover('http://media.cleveland.com/metro/photo/rivers-casino-lobby-by-gunterjpg-00c2341c36877379.jpg'),
    },
  }

  render() {
    const { style } = Lobby;

    return (
      <div style={style.wrapper}>
        <Button href='/blackjack'>Blackjack</Button>
      </div>
    );
  }
}
