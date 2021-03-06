# react-onenterkeydown

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coverage Status][coveralls-badge]][coveralls]
[![Dependency Status][dependency-status-badge]][dependency-status]
[![devDependency Status][dev-dependency-status-badge]][dev-dependency-status]

> React to enter key down events higher order component

## DEPRECATED

This was originally used in a personal project along with other HoCs. However, with the realease of hooks, HoCs have become much less useful and this one in particular is very redundant and pointless to maintain. Please replace by a higher order function as follows:

```javascript
const ifEnter = func => e => {
  if (e.which === 13) func(e);
}

import { ifElse, propEq, always } from 'ramda';

// or even more concise, with something like ramda
const ifEnter = func => ifElse(propEq('which', 13), func, always(null));
```

## Live demo

You can see the simplest demo here: [Live demo](https://codesandbox.io/s/x32wv59x2z)

## Install

```
$ npm install --save react-onenterkeydown
```

## Examples

Run examples:

```javascript
cd examples
npm install
npm start
```

## Usage

`react-onenterkeydown` adds an `onEnterKeyDown` prop to a component with supports `onKeyDown` property, such as the html `input` component:

```javascript
import React, { propTypes } from 'react';
import onEnter from 'react-onenterkeydown';

const logEnter = () => {
  console.log('The enter key has been pressed');
}

const EnhancedInput = onEnter("input");
const () => (
  <EnhancedInput onEnterKeyDown={logEnter} />
)
```

If `onKeyDown` is passed in addition to `onEnterKeyDown`, it will execute as well after the enter event.

## Props

### onEnterKeyDown

Type: `function`, default: `undefined`

Defines an event handler for when the enter key is pressed on the wrapped component

## TODO

* Beter design on example

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).

[build-badge]: https://img.shields.io/travis/perrin4869/react-onenterkeydown/master.svg?style=flat-square
[build]: https://travis-ci.org/perrin4869/react-onenterkeydown

[npm-badge]: https://img.shields.io/npm/v/react-onenterkeydown.svg?style=flat-square
[npm]: https://www.npmjs.org/package/react-onenterkeydown

[coveralls-badge]: https://img.shields.io/coveralls/perrin4869/react-onenterkeydown/master.svg?style=flat-square
[coveralls]: https://coveralls.io/r/perrin4869/react-onenterkeydown

[dependency-status-badge]: https://david-dm.org/perrin4869/react-onenterkeydown.svg?style=flat-square
[dependency-status]: https://david-dm.org/perrin4869/react-onenterkeydown

[dev-dependency-status-badge]: https://david-dm.org/perrin4869/react-onenterkeydown/dev-status.svg?style=flat-square
[dev-dependency-status]: https://david-dm.org/perrin4869/react-onenterkeydown#info=devDependencies
