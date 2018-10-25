import React, { Component, forwardRef } from 'react';
import PropTypes from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';
import getDisplayName from 'react-display-name';

export default (Input) => {
  class OnEnter extends Component {
    static propTypes = {
      forwardedRef: PropTypes.object, // eslint-disable-line react/forbid-prop-types
      onKeyDown: PropTypes.func,
      onEnterKeyDown: PropTypes.func,
    }

    static defaultProps = {
      forwardedRef: null,
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
      const {
        forwardedRef,
        onEnterKeyDown,
        ...props
      } = this.props;

      return (
        <Input
          {...props}
          ref={forwardedRef}
          onKeyDown={this.inputKeyDown}
        />
      );
    }
  }

  const HoistedOnEnter = hoistStatics(OnEnter, Input);

  function forwardToOnEnter(props, ref) {
    return <HoistedOnEnter {...props} forwardedRef={ref} />;
  }
  forwardToOnEnter.displayName = HoistedOnEnter.displayName;

  return forwardRef(forwardToOnEnter);
};
