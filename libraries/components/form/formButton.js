// NPM
import React from 'react';
import radium from 'radium';
import { observer } from 'mobx-react';

// Colors
import { brand, white, midnight, red } from 'libraries/styles/colors';

@radium @observer
export default class FormButton extends React.Component {
  static style = {
    button: {
      display: 'block',
      border: 'none',
      outline: 'none',
      width: '100%',
      maxWidth: 'calc(100% - 20px)',
      height: '50px',
      lineHeight: '50px',
      color: white(),
      backgroundColor: brand(),
      fontSize: '20px',
      marginTop: '0px',
      marginRight: '10px',
      marginBottom: '10px',
      marginLeft: '10px',
      borderRadius: '40px',
      position: 'relative',
      zIndex: '99',
      clear: 'left',
      cursor: 'pointer',
    },
    input: {
      position: 'absolute',
      top: '0px',
      left: '0px',
      width: '100%',
      height: '100%',
      border: 'none',
      outline: 'none',
      display: 'block',
      opacity: '0',
      cursor: 'pointer',
    },
    tag: {
      borderRadius: '40px',
      backgroundColor: white(),
      color: brand(),
      height: '30px',
      lineHeight: '34px',
      padding: '0px 20px',
      position: 'absolute',
      top: '50%',
      right: '10px',
      marginTop: '-15px',
      fontSize: '16px',
    },
    assertive: {
      backgroundColor: red(),
    },
    disabled: {
      backgroundColor: midnight(),
      pointerEvents: 'none',
    },
    hideOnMobile: {
      '@media screen and (max-width: 400px)': {
        display: 'none',
      },
    },
  }
  static propTypes = {
    text: React.PropTypes.string,
    tag: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
    disabled: React.PropTypes.bool,
    disabledText: React.PropTypes.string,
    hideOnMobile: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    color: React.PropTypes.string,
    style: React.PropTypes.object,
  }
  render() {
    const { style } = FormButton;
    const {
      text,
      tag,
      color,
      disabled,
      disabledText,
      onClick,
      hideOnMobile,
      style: overrideStyle,
    } = this.props;

    const buttonStyle = [style.button, overrideStyle];
    if (hideOnMobile) { buttonStyle.push(style.hideOnMobile); }

    let tagEl = null;
    if (tag) {
      tagEl = (<div style={style.tag}>{tag}</div>);
    }

    if (color) {
      buttonStyle.push(style[color]);
    }

    let buttonText = text;
    if (disabled) {
      buttonStyle.push(style.disabled);
      tagEl = null;
      buttonText = disabledText;
    }

    return (
      <div style={buttonStyle} onClick={onClick}>
        {buttonText}
        {tagEl}
        <button type='submit' style={style.input}></button>
      </div>
    );
  }
}
