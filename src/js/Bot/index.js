import {EventEmitter} from 'fbemitter'
import begin from '../../brain/begin.rive'
import hello from '../../brain/hello.rive'
import confused from '../../brain/confused.rive'
import details from '../../brain/details.rive'
import fun from '../../brain/fun.rive'
import jsonxml from 'jsontoxml'
import resume from '../../downloads/CV.pdf'
import colors from './colors.json'

export default class Bot {
  constructor() {
    this.rs = new RiveScript({
      utf8: true
    })

    this.rs.setSubroutine('link', this.link)
    this.rs.setSubroutine('isColor', this.isColor)

    this.emitter = new EventEmitter()

    let loadPromises = [begin, hello, confused, details, fun].map((file) => {
      return new Promise((resolve, reject) => {
        this.rs.loadFile(file, resolve, reject)
      })
    })

    Promise.all(loadPromises).then(() => {
      this.rs.sortReplies()
      this.emitter.emit('ready')

      if (typeof mixpanel !== 'undefined')
        mixpanel.track('Load')
    }).catch((err) => {
      console.error(err)
    })
  }

  reply(id, text) {
    let oldTopic = (this.rs.getUservars(id) || {topic:'random'}).topic
    let response = this.rs.reply(id, text)
    let newTopic = this.rs.getUservars(id).topic
    if (oldTopic != newTopic) {
      this.emitter.emit('topic', newTopic)
    }
    if (typeof mixpanel !== 'undefined')
      mixpanel.track('Message', {
        content: text,
        reply: response
      })
    return response
  }

  link(rs, [type, text]) {
    let dom = {name:'a', text: text, attrs:{}}
    if (type == 'resume') {
      dom.attrs.href = resume
      dom.attrs.title = 'Download resume'
    } else if (type == 'email') {
      dom.attrs.href = 'mailto:hello@devc.ca'
      dom.attrs.title = 'Email hello@devc.ca'
    } else if (type == 'github') {
      dom.attrs.href = 'https://github.com/devchakraborty'
      dom.attrs.title = 'Visit GitHub'
    } else if (type == 'facebook') {
      dom.attrs.href = 'https://facebook.com/debashic'
      dom.attrs.title = 'Visit Facebook'
    } else if (type == 'linkedin') {
      dom.attrs.href = 'https://linkedin.com/in/chakrabortydev'
      dom.attrs.title = 'Visit LinkedIn'
    } else if (type == 'medium') {
      dom.attrs.href = 'https://medium.com/@DevC'
      dom.attrs.title = 'Visit Medium'
    } else if (type == 'shopify') {
      dom.attrs.href = 'https://shopify.com'
      dom.attrs.title = 'Visit Shopify'
    } else if (type == 'edusight') {
      dom.attrs.href = 'https://edusight.co'
      dom.attrs.title = 'Visit Edusight'
    } else if (type == 'instagram') {
      dom.attrs.href = 'https://www.instagram.com/dev.chakraborty/'
      dom.attrs.title = 'Visit Instagram'
    } else {
      dom.attrs.href = type
    }
    dom.attrs.target = '_blank'
    return jsonxml([dom])
  }

  isColor(rs, [color]) {
    for (let testColor of colors) {
      if (color.indexOf(testColor) >= 0) return true
    }
    return false
  }
}
