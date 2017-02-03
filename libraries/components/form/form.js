// NPM
import React from 'react';
import radium from 'radium';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

@radium @observer
export default class Form extends React.Component {
  static style = {
    form: {
      width: '100%',
      height: '100%',
      position: 'relative',
      pointerEvents: 'auto',
      overflow: 'hidden',
    },
    formEl: {
      height: '100%',
    },
    hidden: {
      visibility: 'hidden',
      position: 'absolute',
      top: '0px',
    },
  }
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    submitMessage: React.PropTypes.string,
    onSubmit: React.PropTypes.func.isRequired,
    errorMessage: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.string,
    ]),
    onError: React.PropTypes.func.isRequired,
    onReset: React.PropTypes.func.isRequired,
    successMessage: React.PropTypes.string,
    onSuccess: React.PropTypes.func,
    successDelay: React.PropTypes.bool,
    style: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.array,
    ]),
    children: React.PropTypes.any.isRequired,
  }
  delay = 2000
  @observable formData = {}
  wrapChildren = (children) => {
    return React.Children.map(children, (child) => {
      if (!child) return;
      if (!child.props) return child;
      const { inputName, children: propsChildren } = child.props;
      if (inputName) {
        const childIsInput = inputName.match('Input');
        if (childIsInput) {
          const { name } = child.props;
          const newProps = {
            ...child.props,
            key: name,
            value: this.formData[name],
            updateFormData: this.updateFormData,
          };
          return React.cloneElement(child, newProps);
        }
      } else if (!inputName && propsChildren) {
        const inputs = this.wrapChildren(propsChildren);
        const childProps = { children: inputs };
        return React.cloneElement(child, childProps);
      }
      return child;
    });
  }
  findInputs = (children) => {
    return React.Children.map(children, (child) => {
      if (!child) return;
      if (!child.props) return;
      const { inputName, children: propsChildren } = child.props;
      if (!inputName && propsChildren) {
        return this.findInputs(propsChildren);
      } else if (!inputName) {
        return undefined;
      }
      const childIsInput = inputName.match('Input');
      if (childIsInput) return child;
      return undefined;
    });
  }
  checkFormValidity = (formData) => {
    const { children } = this.props;
    const formInputs = this.findInputs(children);
    return formInputs.every((input) => {
      const { name } = input.props;
      const value = formData[name];

      // console.log('input occassionally breaks', input, value, formData);
      if (value.isValid) return true;
      return false;
    });
  }
  serializeFormValues = (formData) => {
    return Object.keys(formData).reduce((memo, key) => {
      const formValues = memo;
      const formValue = formData[key];
      formValues[key] = formValue.value;
      return formValues;
    }, {});
  }
  updateFormData = (name, value, isValid) => {
    // console.log('update called', name, value, this.formData);
    this.formData[name] = { value, isValid };
  }
  resetForm = () => {
    console.log('resetForm');
    return this.props.onReset();
  }
  showLoading = (message) => {
    console.log('showLoading', message);
    /* Ui.showBanner({
      message,
    });*/
  }
  showError = (message) => {
    console.log('showError!', message);
    return this.props.onError(message);
  }
  showSuccess = (message) => {
    console.log('showSuccess', message);
    /* Ui.showBanner({
      message,
      type: 'success',
    });*/

    const { successDelay, onSuccess } = this.props;
    if (successDelay) {
      setTimeout(() => {
        if (onSuccess) { onSuccess(); }
        this.resetForm();
      }, this.delay);
    } else {
      if (onSuccess) { onSuccess(); }
      this.resetForm();
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    document.activeElement.blur(); // Blur input and dismiss keyboard on Mobile safari
    const { formData } = this;
    const { submitMessage } = this.props;

    // Check for any invalid fields by looping through all included inputs and comparing them against the currently set formData
    const formValid = this.checkFormValidity(formData);
    console.log('formValid', formValid);
    if (!formValid) return this.showError('Please fill in any missing fields.');

    // Transform the formData into an object of values that we can pass to the parent submit handler
    const serialized = this.serializeFormValues(formData);
    console.log('serialized', serialized);

    // Show a loading message if we have a submitMessage
    if (submitMessage) { this.showLoading(submitMessage); }

    // Send the serialized data back to the parent form
    this.props.onSubmit(serialized);
  }
  render() {
    const { style } = Form;
    const { style: overrideStyle, children, name } = this.props;
    const formStyle = [style.form, overrideStyle];
    const wrappedChildren = this.wrapChildren(children);

    return (
      <div style={formStyle}>
        <form
          name={name}
          onChange={this.resetForm}
          onSubmit={this.handleSubmit}
          style={style.formEl}
          action="#"
        >
          {wrappedChildren}
          <input style={style.hidden} type="submit" />
        </form>
      </div>
    );
  }
}
