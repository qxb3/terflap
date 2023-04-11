class Player {
  constructor(game) {
    this.game = game

    this.animationChars = [
      '\\@/',
      '/@\\'
    ]
    this.char = this.animationChars[0]

    this.x = this.game.width / 2 - 16
    this.y = this.game.height / 2
    this.yVel = 0
    this.isDead = false

    this.game.keys.on('up', () => {
      if (!this.isDead) {
        this.yVel -= 1.2
        this.char = this.animationChars[0]
      }
    })
  }

  render() {
    this.game.draw(this.char, this.x, this.y)
  }

  update() {
    this.yVel += 0.1

    if (this.yVel <= -0.8) this.yVel = -0.8
    if (this.yVel >= 0.6) {
      this.yVel = 0.6
      this.char = this.animationChars[1]
    }

    if (this.y > this.game.height) {
      this.y = this.game.height
      this.isDead = true
    }

    this.y += this.yVel
  }
}

export default Player
