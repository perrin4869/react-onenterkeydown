import sinon from 'sinon';
import jsdom from 'mocha-jsdom';
import chai from 'chai';

import React from 'react';
import ReactDOM from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
} from 'react-addons-test-utils';

import onEnter from '../src';

chai.should();

describe('react-onenterkeydown', () => {
  jsdom();

  const EnhancedInput = onEnter('input');

  it('should render single input', () => {
    const container = document.createElement('div');
    ReactDOM.render(<EnhancedInput />, container);
    container.childNodes.length.should.equal(1);
    container.childNodes[0].tagName.should.equal('INPUT');
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

    cb.calledOnce.should.equal(true);
    const args = cb.args[0];
    args.length.should.equal(1);
    const event = args[0];
    event.nativeEvent.target.should.equal(input);
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

    cb.called.should.equal(false);
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

    onKeyDown.calledOnce.should.equal(true);
    onEnterKeyDown.calledOnce.should.equal(true);
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

    onKeyDown.calledOnce.should.equal(true);
    onEnterKeyDown.called.should.equal(false);
  });
});
