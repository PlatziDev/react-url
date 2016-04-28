# react-url
A React.js High-Order Component and decorator for parsing and resolving URLs inside your application.

## Installation
```bash
npm i -S react react-url
```

## API
### URLProvider
```javascript
import { render } from 'react-dom';
import { URLProvider } from 'react-url';

import App from './containers/App';

const urls = {
  profile: '/profile/:username/',
};

render(
  <URLProvider urls={urls}>
    <App />
  </URLProvider>,
  document.body,
);
```
* `URLProvider` is a High-Order Components
* `URLProvider` expect only one property named `urls`.
* `urls` should be an object where the keys are the URLs names and the values are the unparsed url using the sintax of Express.js.

### connectURL
```javascript
import React, { Component } from 'react';
import { connectURL } from 'react-url';

function mapURLToProps(getURL, props) {
  return {
    profileURL: getURL('profile', { username: props.username }),
  };
}

@connectURL(mapURLToProps)
class UserData extends Component { ... }

export default UserData;
```
* The `connectURL` it's optional.
* If you don't supply it then it will add the `getURL` function as a property.
* The `mapURLToProps` function will receive the `getURL` function and `props` object as parameter and should return an object.
* You can use it as a decorator (like the example above) or just as a function and send them the component to connect.

### parser
```javascript
import { parser } from 'react-url';

const urls = {
  profile: '/profile/:username/',
};

const profileURL = parser(urls, 'profile', {
  username: 'sergiodxa',
});
```
* This is a Low-Level API and this used internally for the `connectURL` decorator, it's not expected that you should use it.
* `parser` receive as arguments the `urls` map, the url name and the options/parameters object.
* It will return the final parsed url string.
