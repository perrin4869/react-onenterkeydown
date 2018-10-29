import React, { PureComponent } from 'react';
import onEnter from 'react-onenterkeydown';

const EnhancedInput = onEnter('input');

export default class extends PureComponent {
  state = {
    value: '',
    messages: [],
  }

  onInputChange = e => this.setState({ value: e.target.value })

  onEnterKeyDown = () => {
    this.setState(({ messages, value }) => ({
      messages: [...messages, value],
      value: '',
    }));
  }

  render() {
    const { messages, value } = this.state;

    return (
      <div>
        <p>Input a message and press enter</p>
        <EnhancedInput
          value={value}
          onChange={this.onInputChange}
          onEnterKeyDown={this.onEnterKeyDown}
        />
        <ul>
          {
            // eslint-disable-next-line react/no-array-index-key
            messages.map((message, i) => <li key={i}>{message}</li>)
          }
        </ul>
      </div>
    );
  }
}
