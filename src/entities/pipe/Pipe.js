import { randomUUID } from 'crypto'

class Pipe {
  constructor(char, y, game) {
    this.game = game

    this.id = randomUUID()
    this.char = char
    this.x = this.game.width + this.char.split('\n')[0].length * 2
    this.y = y
  }

  render() {
    this.game.draw(this.char, this.x, this.y)
  }

  update() {
    this.x -= 1
  }
}

export default Pipe
