import { Component, Children, PropTypes } from 'react';

const propTypes = {
  urls: PropTypes.object,
  children: PropTypes.element.isRequired,
};
const defaultProps = {
  urls: {},
};
const childContextTypes = {
  urls: PropTypes.object,
};

/**
 * Set URLs object to React application context
 * @param   {Object} urls     URL to set
 * @param   {Class}  children Application component
 */
class UrlProvider extends Component {
  getChildContext() {
    return {
      urls: this.props.urls,
    };
  }

  render() {
    return Children.only(this.props.children);
  }
}

UrlProvider.propTypes = propTypes;
UrlProvider.defaultProps = defaultProps;
UrlProvider.childContextTypes = childContextTypes;

export default UrlProvider;
