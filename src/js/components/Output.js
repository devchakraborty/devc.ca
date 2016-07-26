import React from 'react'

export default class Output extends React.Component {
  constructor() {
    super()
    this.state = {
      output: "<b>Hi!</b> I'm Dev.<br>I build Internet products."
    }
  }

  render() {
    return <div className="output" dangerouslySetInnerHTML={{__html:this.state.output}} />
  }
}
