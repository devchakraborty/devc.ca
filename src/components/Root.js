import React from 'react'
const data = require('../../data')

function prefix(p, s) {
  return s.indexOf(p) == 0
}

function matchPath(addr) {
  var path = "/"
  for (var route of data.routes) {
    if (prefix(route, addr)) {
      path = route
    }
  }
  return path
}

function getTitle(path) {
  return data.attributes[matchPath(path)].title
}

class Link extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <a href={this.props.href} onClick={this.props.onClick}>{this.props.children}</a>
    )
  }
}

function pathChanger(root, path) {
  return function(e) {
    e.preventDefault()
    if (path[0] != '/') {
      window.open(path, '_blank')
    } else {
      root.setState({path:path})
      history.pushState({}, "", path)
      document.title = getTitle(path)
    }
  }
}

function safeStringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}

class Root extends React.Component {
  constructor(props) {
    super(props)
    this.state = {path: props.path}
  }
  render() {
    var initialProps = {
      __html: safeStringify({path: this.props.path})
    }

    var path = matchPath(this.state.path)

    let attributes = data.attributes[path]

    var docTitle = attributes.title

    var prevPath = attributes.prev
    while (prevPath != null) {
      var prevNode = data.attributes[prevPath]
      docTitle = prevNode.title + " :: " + docTitle
      prevPath = prevNode.prev
    }

    prevPath = attributes.prev || path

    let list = attributes.links
    var root = this
    let links = list.map(function(item) {
      return <li><Link href={item.link} onClick={pathChanger(root, item.link)} key={item.text}>{item.text.toLowerCase()}</Link></li>
    })

    var firstSplit = docTitle.indexOf(" :: ")
    var docTitlePrefix = firstSplit < 0 ? docTitle : docTitle.substring(0, firstSplit)
    var docTitleSuffix = firstSplit < 0 ? "" : docTitle.substring(firstSplit)

    let body = (
        <div id="root">
          <h1 id="title"><Link href={prevPath} onClick={pathChanger(root, prevPath)}>{docTitlePrefix.toLowerCase()}</Link>{docTitleSuffix.toLowerCase() + " \{"}</h1>
          <nav>
            <ul>{links}</ul>
          </nav>
        </div>
    )

    if (this.props.browser) return body

    var typekit = {
      __html: "try{Typekit.load({ async: true });}catch(e){}"
    }

    return (
      <html>
        <head>
          <base href="/" />
          <title>{docTitlePrefix + docTitleSuffix}</title>
          <script src="https://use.typekit.net/six8ynu.js"></script>
          <script dangerouslySetInnerHTML={typekit}></script>
        </head>
        <body>
          <div id="main">
            {body}
          </div>
          <script
            id='initial-props'
            type='application/json'
            dangerouslySetInnerHTML={initialProps} />
          <script src="bundle.js"></script>
        </body>
      </html>
    )
  }
  onPopState(event) {
    this.setState({path:document.location.pathname})
    document.title = getTitle(document.location.pathname)
  }
}

module.exports = Root
