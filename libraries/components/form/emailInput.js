// NPM
import React from 'react';
import radium from 'radium';
import { observer } from 'mobx-react';

// Form
import FormInput from 'libraries/components/form/formInput';
import FormInputIcon from 'libraries/components/form/formInputIcon';

@radium @observer
export default class EmailInput extends React.Component {
  static style = {
    formInput: {
      position: 'relative',
    },
  }
  static defaultProps = {
    inputName: 'EmailInput',
    type: 'text',
  }
  validate = (value) => {
    const pattern = /.+\@.+\..+/;
    const patternValid = pattern.test(value);
    return patternValid;
  }
  render() {
    const { style } = EmailInput;
    const newProps = {
      ...this.props,
      validate: this.validate,
    };

    return (
      <div style={style.formInput}>
        <FormInput {...newProps} />
      </div>
    );
  }
}
