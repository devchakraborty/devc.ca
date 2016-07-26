import React from 'react'
import key from 'key'
import {EventEmitter} from 'fbemitter'
import mixins from 'es6-mixins'
import $ from 'jquery'

export default class Input extends React.Component {
  constructor() {
    super()
    this.state = {
      input: '',
      prompt: 'Ask me anything'
    }
    this.emitter = new EventEmitter()
    this.emitter.addListener('topic', (topic) => {
      if (topic == 'random') this.setState({prompt: 'Ask me anything'})
      else this.setState({prompt: 'Respond'})
    })
  }

  render() {
    return (
      <div className="input">
        <input type="text" ref={(c) => this._input = c} placeholder={this.state.prompt} value={this.state.input} onChange={this.onChange.bind(this)} onKeyPress={this.onKeyPress.bind(this)} />
      </div>
    )
  }

  componentDidMount() {
    $(document).ready(() => {
      let $input = $('.input')
      let $field = $(this._input)
      $(document.body).on('keydown', function(e) {
        if(document.activeElement.tagName.toLowerCase() != 'input') {
          $field.focus()
        }
      })
      $input.toggleClass('bright')
      $input.on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', (e) => {
        if ($input.hasClass('bright') && document.activeElement == this._input) return
        $input.toggleClass('bright')
      })

      $field.blur((e) => {
        $input.toggleClass('bright')
      })
    })
  }

  onChange(e) {
    this.setState({
      input: e.target.value
    })
  }

  onKeyPress(e) {
    if (key.is(key.code.special.enter, e.which)) {
      this.emitter.emit('message', this.state.input)
      this.setState({
        input: ''
      })
    }
  }
}
