// NPM
import React, { Component, PropTypes } from 'react';
import { observable, action } from 'mobx';
import { inject, observer } from 'mobx-react';
import radium from 'radium';

// Libraries
import Form from 'libraries/components/form/form';
import NumberInput from 'libraries/components/form/textInput';
import FormButton from 'libraries/components/form/formButton';

@observer @radium
export default class Info extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
  };

  static defaultProps = {
    items: []
  };

  static style = {
    wrapper: {
      position: 'absolute',
      top: '20px',
      right: '0px',
      left: '0px',
      width: '100%',
      maxWidth: '400px',
      margin: '0 auto',
    },
  };

  render() {
    const { style } = Info;
    const { items } = this.props;

    const itemEls = items.map((item, index) => {
      return (<div key={`item-${index}`}>{item}</div>);
    });

    return (<div style={style.wrapper}>{itemEls}</div>);
  }
}
