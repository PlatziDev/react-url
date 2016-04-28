/**
 * Parse url
 * @param   {Object} urls URLs map to use
 * @param   {String} name URL name to parse
 * @param   {Object} opts Parameters for the URL
 * @returns {String}      Parsed URL
 */
function parser(urls, name, opts = undefined) {
  const url = urls[name];

  if (!opts) return url;

  return url
    .split('/')
    .map(key => {
      if (key[0] !== ':') return key;
      return opts[key.slice(1, key.length)];
    })
    .join('/');
}

export default parser;
