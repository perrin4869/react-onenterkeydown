import React, { StrictMode, createRef } from 'react';
import ReactDOM from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
} from 'react-dom/test-utils';

import sinon from 'sinon';
import { expect } from 'chai';

import onEnter from '../src';

describe('react-onenterkeydown', () => {
  const EnhancedInput = onEnter('input');

  const getInput = (props) => {
    const ref = createRef();
    renderIntoDocument(
      <StrictMode>
        <EnhancedInput {...props} ref={ref} />
      </StrictMode>,
    );

    return ref.current;
  };

  it('should render single input', () => {
    const container = document.createElement('div');
    ReactDOM.render(<EnhancedInput />, container);
    expect(container.childNodes).to.have.lengthOf(1);
    expect(container.childNodes[0].tagName).to.equal('INPUT');
  });

  it('should execute callback on enter keydown event', () => {
    const cb = sinon.spy();
    const input = getInput({ onEnterKeyDown: cb });

    Simulate.keyDown(input, {
      key: 'Enter',
      keyCode: 13,
      which: 13,
    });

    expect(cb.calledOnce).to.equal(true);
    const args = cb.args[0];
    expect(args.length).to.equal(1);
    const event = args[0];
    expect(event.nativeEvent.target).to.equal(input);
  });

  it('should not execute callback on a keydown event', () => {
    const cb = sinon.spy();
    const input = getInput({ onEnterKeyDown: cb });

    Simulate.keyDown(input, {
      key: 'a',
      keyCode: 65,
      which: 65,
    });

    expect(cb.called).to.equal(false);
  });

  it('should execute onKeyDown and onEnterKeyDown', () => {
    const onEnterKeyDown = sinon.spy();
    const onKeyDown = sinon.spy();
    const input = getInput({ onKeyDown, onEnterKeyDown });

    Simulate.keyDown(input, {
      key: 'Enter',
      keyCode: 13,
      which: 13,
    });

    expect(onKeyDown.calledOnce).to.equal(true);
    expect(onEnterKeyDown.calledOnce).to.equal(true);
  });

  it('should execute onKeyDown but not onEnterKeyDown', () => {
    const onEnterKeyDown = sinon.spy();
    const onKeyDown = sinon.spy();
    const input = getInput({ onKeyDown, onEnterKeyDown });

    Simulate.keyDown(input, {
      key: 'a',
      keyCode: 65,
      which: 65,
    });

    expect(onKeyDown.calledOnce).to.equal(true);
    expect(onEnterKeyDown.called).to.equal(false);
  });
});
