import readline from 'readline'
import EventEmitter from 'events'

class Keys extends EventEmitter {
  constructor() {
    super()

    readline.emitKeypressEvents(process.stdin)
    process.stdin.setRawMode(true)

    process.stdin.on('keypress', (str, key) => {
      if (key.sequence === '\u0003') {
        process.emit('SIGINT', 0)
      }

      this.emit(key.name, key)
    })
  }
}

export default Keys
