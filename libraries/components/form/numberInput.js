// NPM
import React from 'react';
import radium from 'radium';
import { observer } from 'mobx-react';

// Input Utils
import {
  hasTextSelected,
  restrictNumeric,
} from 'libraries/components/form/utils/inputUtils';

// Form
import FormInput from 'libraries/components/form/formInput';

@radium @observer
export default class NumberInput extends React.Component {
  static defaultProps = {
    inputName: 'NumberInput',
    type: 'text',
    pattern: '\d*',
  }
  restrictCode = (event) => {
    const { key, target } = event;
    const { value } = target;
    const newValue = value + key;
    return newValue;
  }
  handleKeyPress = (event) => {
    const { target } = event;
    if (!restrictNumeric(event)) return false;
    if (hasTextSelected(target)) return false;
    return this.restrictCode(event);
  }
  transform = (value) => {
    const newValue = value.replace(/[^0-9]/g, '');
    return newValue;
  }
  validate = (value) => {
    const pattern = new RegExp(/^\d+$/);
    const patternValid = pattern.test(value);
    return patternValid;
  }
  render() {
    const newProps = {
      ...this.props,
      handleKeyPress: this.handleKeyPress,
      validate: this.validate,
      transform: this.transform,
    };

    return (
      <FormInput {...newProps} />
    );
  }
}
