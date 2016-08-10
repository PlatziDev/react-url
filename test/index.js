import test from 'tape';
import cheerio from 'cheerio';

import {
  Component,
  createElement,
  createFactory,
  PropTypes,
} from 'react';
import { renderToString } from 'react-dom/server';

import parser from '../build/parser.js';
import URLProvider from '../build/URLProvider';
import connectURL from '../build/connectURL';


const urls = {
  home: '/',
  discussion: '/discussion/:slug/',
  random: '/random/:param1/rand/:param2/',
};


class App extends Component {
  render() {
    return createElement('a', { href: this.props.randomURL }, 'click me!');
  }
}
App.propTypes = {
  randomURL: PropTypes.string,
};


test('url parser', t => {
  t.plan(3);

  const homeUrl = parser(urls, 'home');
  const discussionUrl = parser(urls, 'discussion', { slug: 'mi-discusion' });
  const randomUrl = parser(urls, 'random', {
    param1: '123',
    param2: 456,
  });

  t.equals(
    homeUrl,
    '/',
    'it should return the url without parameters'
  );

  t.equals(
    discussionUrl,
    '/discussion/mi-discusion/',
    'it should return url with only one parameter'
  );

  t.equals(
    randomUrl,
    '/random/123/rand/456/',
    'it should return the url with multiple parameters and a number as value'
  );
});


test('connected component', t => {
  t.plan(1);

  function mapURLToProps(getURL) {
    return {
      randomURL: getURL('random', {
        param1: 123,
        param2: '456',
      }),
    };
  }

  const ConnectedApp = connectURL(mapURLToProps)(App);

  function ContainerApp() {
    return createElement(
      URLProvider,
      {
        urls,
      },
      createFactory(ConnectedApp)({ key: 1 })
    );
  }

  const html = renderToString(createFactory(ContainerApp)());

  const $ = cheerio.load(html);

  t.equals(
    $('a').attr('href'),
    '/random/123/rand/456/',
    'it should return an anchor with the parsed url as href attribute'
  );
});
