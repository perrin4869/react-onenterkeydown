import sinon from 'sinon';
import jsdom from 'mocha-jsdom';
import chai, { expect } from 'chai';

import React, { SyntheticEvent } from 'react';
import ReactDOM from 'react-dom';
import { Simulate, renderIntoDocument, findRenderedDOMComponentWithTag } from 'react-addons-test-utils';

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

  it('should focus on input', () => {
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
    event.nativeEvent.target.should.equal(ReactDOM.findDOMNode(input));
  });
});
