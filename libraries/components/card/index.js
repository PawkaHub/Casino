// NPM
import React, { Component, PropTypes } from 'react';
import radium from 'radium';
import { observer } from 'mobx-react';

// Libraries
import { white } from 'libraries/styles/colors';

@radium @observer
export default class Card extends Component {
  static propTypes = {
    rank: PropTypes.string.isRequired,
    suit: PropTypes.string.isRequired,
  }

  static style = {
    wrapper: {
      padding: '30px',
      margin: '10px',
      borderRadius: '4px',
      display: 'inline-block',
      backgroundColor: white(),
    },
    rank: {
      color: 'red',
    },
    suit: {
      color: 'blue',
    },
  }

  render() {
    const { style } = Card;
    const { props } = this;
    const { rank, suit } = props;

    return (
      <div style={style.wrapper}>
        <div style={style.rank}>{rank}</div>
        <div style={style.suit}>{suit}</div>
      </div>
    );
  }
}
