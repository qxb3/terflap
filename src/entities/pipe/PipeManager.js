import Pipe from './Pipe.js'
import { randomNumber } from '../../utils.js'

class PipeManager {
  constructor(game) {
    this.game = game

    this.pipes = []
    this.holeSize = 4

    setInterval(() => {
      const topPipeChar = '######\n'.repeat(randomNumber(3, this.game.height - (this.holeSize / 2)))
      const topPipe = new Pipe(
        topPipeChar,
        -1,
        this.game
      )

      const bottomPipeChar = '######\n'.repeat(randomNumber(3, this.game.height - topPipeChar.split('\n').length - (this.holeSize / 2)))
      const bottomPipe = new Pipe(
        bottomPipeChar,
        this.game.height - bottomPipeChar.split('\n').length + 5,
        this.game
      )

      this.pipes.push(topPipe)
      this.pipes.push(bottomPipe)
    }, 2000)
  }

  render() {
    for (const pipe of this.pipes) {
      pipe.render()
    }
  }

  update() {
    for (const pipe of this.pipes) {
      pipe.update()
    }
  }
}

export default PipeManager
