import React from 'react'
import Output from './components/Output'
import Input from './components/Input'
import Bot from './Bot'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {}
    this.bot = new Bot()
  }

  componentDidMount() {
    this.input.emitter.addListener('message', (message) => {
      let reply = this.bot.reply(1, message)
      this.output.setState({
        output: reply
      })
    })
    this.bot.emitter.addListener('topic', (topic) => {
      this.input.emitter.emit('topic', topic)
    })
  }

  render() {
    return (
      <div>
        <Output ref={(o) => this.output = o} />
        <Input ref={(i) => this.input = i} />
      </div>
    )
  }
}
