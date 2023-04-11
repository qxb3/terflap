import Keys from './Keys.js'

class Game {
  constructor(options) {
    this.ms = options.ms ?? 100
    this.quitKey = options.quitKey ?? 'q'

    this.width = process.stdout.columns
    this.height = process.stdout.rows

    this.keys = new Keys()

    this.last = performance.now()

    process.stdout.write('\x1B[?25l')
    process.stdout.write('\u001b[?7l')

    process.on('exit', () => {
      console.clear()
      process.stdout.write('\x1B[?25h')
    })

    process.on('SIGINT', () => {
      process.exit()
    })

    this.keys.on(this.quitKey, () => {
      process.exit(0)
    })
  }

  setup(callbackFn) {
    callbackFn()
  }

  update(callbackFn) {
    setInterval(() => {
      this.width = process.stdout.columns
      this.height = process.stdout.rows

      process.stdout.write('\x1B[2J\x1B[0;0f')

      const now = performance.now()
      const deltaTime = (now - this.last) / 1000
      this.last = now

      callbackFn(deltaTime)
    }, this.ms)
  }

  draw(char, x, y) {
    const chars = char.split('\n')

    for (let i = 0; i < chars.length; i++) {
      const xCoord = parseInt(x)
      const yCoord = parseInt(y + i - 1)

      if (xCoord  < 0 || xCoord + chars[i].length > this.width) continue
      if (yCoord < 0 || yCoord > this.height) continue

      process.stdout.cursorTo(xCoord, yCoord)
      process.stdout.write(chars[i])
    }
  }

  exit() {
    process.exit(0)
  }
}

export default Game
