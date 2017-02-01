// NPM
import React, { Component, PropTypes } from 'react';
import radium from 'radium';
import { observer } from 'mobx-react';

// Libraries
import { white } from 'libraries/styles/colors';

@radium @observer
export default class Button extends Component {
  static propTypes = {
    href: PropTypes.string.isRequired,
  }

  static style = {
    item: {
      display: 'inline-block',
      padding: '0 32px',
      color: white(0.6),
      letterSpacing: '1px',
      textDecoration: 'none',
      fontSize: '90%',
      fontWeight: 'bolder',
    },
  }

  render() {
    const { style } = Button;
    const { props } = this;
    const { children } = props;

    return (<a href={props.href} style={style.item}>{children}</a>);
  }
}
