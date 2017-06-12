import { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';
import getDisplayName from 'react-display-name';

export default (Input) => {
  class OnEnter extends Component {
    static propTypes = {
      onKeyDown: PropTypes.func,
      onEnterKeyDown: PropTypes.func,
    }

    static defaultProps = {
      onKeyDown: null,
      onEnterKeyDown: null,
    }

    static displayName = `OnEnter(${getDisplayName(Input)})`

    inputKeyDown = (e) => {
      // When the client hits ENTER on their keyboard
      const { onEnterKeyDown, onKeyDown } = this.props;
      if (e.which === 13 && onEnterKeyDown) {
        onEnterKeyDown(e);
      }

      if (onKeyDown) {
        onKeyDown(e);
      }
    }

    render() {
      const { onEnterKeyDown, ...props } = this.props; // eslint-disable-line no-unused-vars
      return createElement(Input, { ...props, onKeyDown: this.inputKeyDown });
    }
  }

  return hoistStatics(OnEnter, Input);
};
