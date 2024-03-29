import Game from './engine/Game.js'
import Player from './entities/Player.js'
import PipeManager from './entities/pipe/PipeManager.js'
import { checkCollision } from './utils.js'
import figlet from 'figlet'

const game = new Game({ ms: 30 })
const player = new Player(game)
const pipeManager = new PipeManager(game)

game.update(() => {
  game.draw(figlet.textSync(`Score: ${3}`), 0, 0)
  player.render()
  pipeManager.render()

  player.update()
  if (!player.isDead) pipeManager.update()

  for (const pipe of pipeManager.pipes) {
    const collided = checkCollision(player.char, player.x, player.y, pipe.char, pipe.x, pipe.y)

    if (collided) {
      player.isDead = true
    }
  }
})
