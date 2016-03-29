var React = require('react');
var ReactDOM = require('react-dom');
var ReactDOMServer = require('react-dom/server');
var Root = require('./src/components/Root');

module.exports = function render(locals, callback) {
  var html = ReactDOMServer.renderToStaticMarkup(<Root {...locals} />);
  callback(null, '<!doctype html>' + html);
}

if (typeof window !== 'undefined') {
  require('./src/scss/index.scss');
  function popstateSetup(root) {
    window.onpopstate = root.onPopState.bind(root)
  }
  var initialProps = JSON.parse(document.getElementById('initial-props').innerHTML);
  ReactDOM.render(<Root {...initialProps} browser={true} ref={popstateSetup} />, document.getElementById('main'));
}
