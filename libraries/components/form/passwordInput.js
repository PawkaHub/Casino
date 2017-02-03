// NPM
import React from 'react';
import radium from 'radium';
import { observer } from 'mobx-react';

// Form
import FormInput from 'libraries/components/form/formInput';

@radium @observer
export default class PasswordInput extends React.Component {
  static style = {
    formInput: {
      position: 'relative',
    },
  }
  static defaultProps = {
    inputName: 'PasswordInput',
    type: 'password',
  }
  render() {
    const { style } = PasswordInput;

    return (
      <div style={style.formInput}>
        <FormInput {...this.props} />
      </div>
    );
  }
}
