import { PropTypes, Component, createElement } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import getDisplayName from 'react-display-name';

export default Input => {
  class OnEnter extends Component {
    static propTypes = {
      onEnterKeyDown: PropTypes.func,
    }

    static displayName = `OnEnter(${getDisplayName(Input)})`

    messageKeyDown = (e) => {
      // When the client hits ENTER on their keyboard
      const { onEnterKeyDown } = this.props;
      if (e.which === 13 && onEnterKeyDown) {
        onEnterKeyDown(e);
      }
    }

    render() {
      return createElement(Input, { ...this.props, onKeyDown: this.messageKeyDown });
    }
  }

  return hoistStatics(OnEnter, Input);
};
