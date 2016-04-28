import React, { Component } from 'react';
import onEnter from 'react-onenterkeydown';

const EnhancedInput = onEnter('input');

export default class extends Component {
  state = {
    messages: [],
  }

  onEnterKeyDown = e => {
    this.setState({
      messages: this.state.messages.concat([e.target.value]),
    });
  }

  render() {
    return (
      <div>
        <p>Input a message and press enter</p>
        <EnhancedInput onEnterKeyDown={this.onEnterKeyDown} />
        <ul>
        {
          this.state.messages.map((message, i) => <li key={i}>{message}</li>)
        }
        </ul>
      </div>
    );
  }
}
