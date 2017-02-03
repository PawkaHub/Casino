// NPM
import React from 'react';
import radium from 'radium';
import { observer } from 'mobx-react';

// Colors
import { brand, white } from 'libraries/styles/colors';

@radium @observer
export default class FormInputIcon extends React.Component {
  style = {
    formIconHit: {
      height: '50px',
      width: '50px',
      position: 'absolute',
      top: '0px',
      left: '10px',
      zIndex: '1',
    },
    formIconHolder: {
      height: '30px',
      lineHeight: '34px',
      width: '30px',
      borderRadius: '50%',
      backgroundColor: brand(),
      color: white(),
      cursor: 'pointer',
      position: 'absolute',
      top: '10px',
      left: '10px',
    },
  }
  static propTypes = {
    children: React.PropTypes.any,
    onClick: React.PropTypes.func,
  }
  render() {
    const { style } = this;
    const { children, onClick } = this.props;

    return (
      <div style={style.formIconHit} onClick={onClick}>
        <div style={style.formIconHolder}>
          {children}
        </div>
      </div>
    );
  }
}
