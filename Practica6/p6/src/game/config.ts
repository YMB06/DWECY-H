import Phaser from 'phaser'
import { WarehouseScene } from './WarehouseScene'

export const createGame = (parent: string): Phaser.Game => {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { x: 0, y: 0 },
        debug: false
      }
    },
    scene: [WarehouseScene],
    backgroundColor: '#2d2d2d'
  }

  return new Phaser.Game(config)
}
