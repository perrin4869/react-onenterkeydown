# react-onenterkeydown

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coverage Status][coveralls-badge]][coveralls]
[![Dependency Status][dependency-status-badge]][dependency-status]
[![devDependency Status][dev-dependency-status-badge]][dev-dependency-status]

> React to enter key down events higher order component

## Live demo

You can see the simplest demo here: [Live demo](https://perrin4869.github.io/react-onenterkeydown)

## Install

```
$ npm install --save react-onenterkeydown
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

## Props

### onEnterKeyDown

Type: `function`, default: `undefined`

Defines an event handler for when the enter key is pressed on the wrapped component

## TODO

* Multiple onKeyDown
* Improve examples
* Improve documentation with tables, etc

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
