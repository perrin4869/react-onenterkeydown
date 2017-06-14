import sinon from 'sinon';
import { expect } from 'chai';

import React from 'react';
import ReactDOM from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
} from 'react-dom/test-utils';

import onEnter from '../src';

describe('react-onenterkeydown', () => {
  const EnhancedInput = onEnter('input');

  it('should render single input', () => {
    const container = document.createElement('div');
    ReactDOM.render(<EnhancedInput />, container);
    expect(container.childNodes).to.have.lengthOf(1);
    expect(container.childNodes[0].tagName).to.equal('INPUT');
  });

  it('should execute callback on enter keydown event', () => {
    const cb = sinon.spy();

    const rendered = renderIntoDocument(<EnhancedInput onEnterKeyDown={cb} />);
    const input = findRenderedDOMComponentWithTag(rendered, 'input');

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

    const rendered = renderIntoDocument(<EnhancedInput onEnterKeyDown={cb} />);
    const input = findRenderedDOMComponentWithTag(rendered, 'input');

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

    const rendered = renderIntoDocument(
      <EnhancedInput onKeyDown={onKeyDown} onEnterKeyDown={onEnterKeyDown} />
    );
    const input = findRenderedDOMComponentWithTag(rendered, 'input');

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

    const rendered = renderIntoDocument(
      <EnhancedInput onKeyDown={onKeyDown} onEnterKeyDown={onEnterKeyDown} />
    );
    const input = findRenderedDOMComponentWithTag(rendered, 'input');

    Simulate.keyDown(input, {
      key: 'a',
      keyCode: 65,
      which: 65,
    });

    expect(onKeyDown.calledOnce).to.equal(true);
    expect(onEnterKeyDown.called).to.equal(false);
  });
});
