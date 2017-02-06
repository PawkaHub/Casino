// NPM
import React, { Component, PropTypes } from 'react';
import radium from 'radium';
import { observer } from 'mobx-react';

// Libraries
import Card from 'libraries/components/card';

@radium @observer
export default class Hand extends Component {
  static propTypes = {
    cards: PropTypes.array.isRequired,
  }

  static style = {
    wrapper: {
      position: 'relative',
    },
  }

  render() {
    const { style } = Hand;
    const { props } = this;
    const { cards } = props;

    const cardEls = cards.map((card, index) => {
      return (<Card key={`card-${index}`} {...card} />);
    });

    return (
      <div style={style.wrapper}>
        {cardEls}
      </div>
    );
  }
}
