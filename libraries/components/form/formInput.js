// NPM
import React from 'react';
import radium from 'radium';
import { observable, autorun, computed, action } from 'mobx';
import { observer } from 'mobx-react';

// Colors
import { red, white, offWhite } from 'libraries/styles/colors';

@radium @observer
export default class FormInput extends React.Component {
  static style = {
    formInputHolder: {
      height: '40px',
      // margin: '0px 10px 10px 10px',
      // margin: '10px 0px 10px 0px',
      margin: '10px',
      position: 'relative',
      clear: 'left',
      transition: 'all 300ms ease-in-out',
    },
    formInput: {
      width: '100%',
      height: '100%',
      outline: 'none',
      border: 'none',
      position: 'relative',
      lineHeight: '30px',
      fontSize: '16px',
      transition: 'all 100ms ease-in-out',
      borderRadius: '20px',
      padding: '20px',
      backgroundColor: offWhite(),
      ':focus': {
        outline: 'none',
      },
    },
    hasIcon: {
      padding: '10px 10px 10px 50px',
    },
    invalid: {
      backgroundColor: red(),
      color: white(),
    },
  }
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    initialValue: React.PropTypes.string,
    showIcon: React.PropTypes.bool,
    updateFormData: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func,
    handleKeyDown: React.PropTypes.func,
    handleKeyPress: React.PropTypes.func,
    validate: React.PropTypes.func,
    transform: React.PropTypes.func,
    spellCheck: React.PropTypes.bool,
    style: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.array,
    ]),
    inputStyle: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.array,
    ]),
    children: React.PropTypes.any,
  }
  static defaultProps = {
    type: 'text',
    inputName: 'FormInput',
  }
  @observable initialValue = this.props.initialValue
  @observable value = this.props.initialValue || ''

  @computed get valid() {
    // Validate from props if it's been passed in, otherwise validate internally. Also validates based on the transformed prop if we've passed a transform property to the input
    const { validate } = this.props;
    let valid = this.validate(this.value);
    if (validate) { valid = validate(this.value); }
    // console.log('valid', valid, this.value);
    return valid;
  }

  @action updateValue(value) {
    // console.log('updateValue', value);
    this.value = value;
  }

  componentDidMount() {
    // Create an autorun and keep values in sync with the parent form data
    this.valueSync = autorun(() => {
      const { name } = this.props;
      // console.log('autosync', name, this.value, this.valid);
      this.props.updateFormData(name, this.value, this.valid);
    });
  }
  componentWillUnmount() {
    // Clear the autorun
    this.valueSync();
  }
  validate = (value) => {
    // console.log('validate called', value);
    // Require a character to be written
    const patternValid = value.length;
    if (patternValid) return true;
    return false;
  }
  processValue = (value) => {
    const { transform } = this.props;

    // If the input has a transform function, call it to transform the data appropriately
    let newValue = value;
    if (transform) { newValue = transform(value); }

    return newValue;
  }
  handleKeyDown = (event) => {
    // Only fire a callback if the parent component has handleKeyDown props defined
    const { handleKeyDown } = this.props;
    if (handleKeyDown) { handleKeyDown(event); }
  }
  handleKeyPress = (event) => {
    // Only fire a callback if the parent component has handleKeyPress props defined
    const { handleKeyPress } = this.props;
    if (handleKeyPress) { handleKeyPress(event); }
  }
  handleChange = (event) => {
    const { value } = event.target;
    this.setValue(value);
  }
  setValue(value) {
    const newValue = this.processValue(value);
    this.updateValue(newValue);

    const { onChange } = this.props;
    if (onChange) { onChange(newValue); }
  }
  template(props) {
    return (<input {...props} />);
  }
  render() {
    const { style } = FormInput;
    const { valid, value } = this;
    const {
      name,
      type,
      placeholder,
      showIcon,
      style: overrideStyle,
      inputStyle: inputOverrideStyle,
      children,
    } = this.props;

    const formInputHolderStyle = [style.formInputHolder, overrideStyle];
    const formInputStyle = [style.formInput, inputOverrideStyle];

    if (value && !valid) { formInputStyle.push(style.invalid); }
    if (showIcon) { formInputStyle.push(style.hasIcon); }

    // console.log('FormInput', value);

    const newProps = {
      name,
      type,
      onChange: this.handleChange,
      onKeyDown: this.handleKeyDown,
      onKeyPress: this.handleKeyPress,
      style: formInputStyle,
      placeholder,
      autoComplete: 'off',
      autoCorrect: 'off',
      autoCapitalize: 'off',
      spellCheck: 'false',
      value,
      children,
    };

    return (
      <div style={formInputHolderStyle}>
        {this.template(newProps)}
      </div>
    );
  }
}
