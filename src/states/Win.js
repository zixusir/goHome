import Phaser from 'phaser'
import Config from '../config'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = Config.colorOrange
  }
  preload () {}
  create () {
    let winText = this.add.text(this.game.width / 2, this.game.height / 2 - 100, '回家了，好开心', {
      font: '50px',
      fill: '#ee5000',
      align: 'center'
    })
    winText.anchor.setTo(0.5)
    
    let texture = new Phaser.Graphics(this.game, 0, 0)
    texture.beginFill(0xffee00)
    texture.drawRoundedRect(0, 0, 100, 35, 5)
    texture.endFill()

    let textSprite = new Phaser.Sprite(this.game, this.game.width / 2 - 60, this.game.height / 2, texture.generateTexture())
    let textSprite2 = new Phaser.Sprite(this.game, this.game.width / 2 + 60, this.game.height / 2, texture.generateTexture())
    textSprite.anchor.setTo(0.5)
    textSprite2.anchor.setTo(0.5)
    let tx1 = new Phaser.Text(this.game, 0, 0, '再来一次', {
      font: '20px',
      fill: '#ee5000',
      align: 'center'
    })
    tx1.anchor.setTo(0.5)
    let tx2 = new Phaser.Text(this.game, 0, 0, '继续挑战', {
      font: '20px',
      fill: '#ee5000',
      align: 'center'
    })
    tx2.anchor.setTo(0.5)
    
    textSprite.addChild(tx1)
    textSprite2.addChild(tx2)
    this.add.existing(textSprite)
    this.add.existing(textSprite2)

    textSprite.inputEnabled = true
    textSprite.events.onInputDown.add(function () {
      this.state.start('Game')
    }, this)
    textSprite2.inputEnabled = true
    textSprite2.events.onInputDown.add(function () {
      Config.currentLevel = (Config.currentLevel + 1) > Config.maxLevel ? Config.currentLevel : Config.currentLevel + 1
      localStorage.setItem('currentlevel', Config.currentLevel)
      this.state.start('Game')
    }, this)

    let mytext = this.add.text(this.game.width / 2, this.game.height - 60, '感谢你体验zixu游戏\n所有素材从千库网购买使用版权\n想一起吗，欢迎致信:zixusir2@163.com', {
      font: '15px',
      fill: '#ee5000',
      align: 'center'
    })
    mytext.anchor.setTo(0.5)
  }
}
