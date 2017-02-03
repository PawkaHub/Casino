// NPM
import React from 'react';
import radium from 'radium';
import { observer } from 'mobx-react';

// Form
import FormInput from 'libraries/components/form/formInput';
import FormInputIcon from 'libraries/components/form/formInputIcon';

@radium @observer
export default class TextInput extends React.Component {
  static style = {
    formInput: {
      position: 'relative',
    },
  }
  static propTypes = {
    showIcon: React.PropTypes.bool,
    iconName: React.PropTypes.string,
  }
  static defaultProps = {
    inputName: 'TextInput',
    type: 'text',
  }
  render() {
    const { style } = TextInput;
    const { showIcon, iconName } = this.props;

    let iconEl = null;
    if (showIcon) {
      iconEl = (
        <FormInputIcon>
          <div className={`icon ion-${iconName || 'edit'}`}></div>
        </FormInputIcon>
      );
    }

    return (
      <div style={style.formInput}>
        {iconEl}
        <FormInput {...this.props} />
      </div>
    );
  }
}
