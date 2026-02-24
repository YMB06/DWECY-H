import Phaser from 'phaser'

export class WarehouseScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Rectangle
  private box!: Phaser.GameObjects.Rectangle
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private speed = 200

  constructor() {
    super({ key: 'WarehouseScene' })
  }

  create() {
    this.add.rectangle(400, 300, 800, 600, 0x808080)

    this.player = this.add.rectangle(100, 300, 40, 40, 0xffff00)
    this.physics.add.existing(this.player)

    this.box = this.add.rectangle(700, 300, 30, 30, 0xff6600)
    this.physics.add.existing(this.box)

    this.cursors = this.input.keyboard!.createCursorKeys()

    this.physics.add.overlap(this.player, this.box, this.collectBox, undefined, this)
  }

  update() {
    const body = this.player.body as Phaser.Physics.Arcade.Body
    body.setVelocity(0)

    if (this.cursors.left.isDown) body.setVelocityX(-this.speed)
    else if (this.cursors.right.isDown) body.setVelocityX(this.speed)

    if (this.cursors.up.isDown) body.setVelocityY(-this.speed)
    else if (this.cursors.down.isDown) body.setVelocityY(this.speed)
  }

  private collectBox() {
    this.box.destroy()
    this.game.events.emit('box-collected')
    
    setTimeout(() => {
      const x = Phaser.Math.Between(100, 700)
      const y = Phaser.Math.Between(100, 500)
      this.box = this.add.rectangle(x, y, 30, 30, 0xff6600)
      this.physics.add.existing(this.box)
      this.physics.add.overlap(this.player, this.box, this.collectBox, undefined, this)
    }, 1000)
  }

  restart() {
    this.scene.restart()
  }
}
