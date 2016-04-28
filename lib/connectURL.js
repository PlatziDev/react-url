import { createFactory, PropTypes } from 'react';

import parser from './parser';

const contextTypes = {
  urls: PropTypes.object,
};

/**
 * Create decorator to connect a React component to the URLs
 * @param   {Function} mapURLToProps Map function for URLs
 * @returns {Function}               Decorator function
 */
function connectURL(mapURLToProps = null) {
  /**
   * URL decorator function
   * @param   {Class} Target Component to decorate
   * @returns {Class}        Decorated component
   */
  function decorator(Target) {
    /**
     * Wrapper component
     * @param   {Object} props   Component properties
     * @param   {Object} context Application context
     * @returns {VDOM}           Rendered component
     */
    function Connected(props, context) {
      /**
       * Get specified URL given the received options
       * @param   {String} name URL name
       * @param   {Object} opts URL parameters
       * @returns {String}      Parsed URL
       */
      function getURL(name, opts = undefined) {
        return parser(context.urls, name, opts);
      }

      /**
       * Get mapped (or not) properties
       * @returns {Object} Child properties
       */
      function getProps() {
        if (mapURLToProps) {
          return Object.assign(mapURLToProps(getURL, props), props);
        }
        return Object.assign({}, props, { getURL });
      }

      return createFactory(Target)(getProps());
    }

    Connected.contextTypes = contextTypes;

    return Connected;
  }

  return decorator;
}

export default connectURL;
