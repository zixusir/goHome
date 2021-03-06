import Phaser from 'phaser'
import Config from '../config'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = Config.colorGreen
  }
  preload () {}
  create () {
    let loseText = this.add.text(this.game.width / 2, this.game.height / 2 - 100, '小松鼠摔倒啦', {
      font: '40px',
      fill: '#ee5000',
      align: 'center'
    })
    loseText.anchor.setTo(0.5)
    
    let texture = new Phaser.Graphics(this.game, 0, 0)
    texture.beginFill(0xffee00)
    texture.drawRoundedRect(0, 0, 100, 35, 5)
    texture.endFill()

    let textSprite = new Phaser.Sprite(this.game, this.game.width / 2, this.game.height / 2, texture.generateTexture())
    textSprite.anchor.setTo(0.5)
    let tx1 = new Phaser.Text(this.game, 0, 0, '再来一次', {
      font: '20px',
      fill: '#ee5000',
      align: 'center'
    })
    tx1.anchor.setTo(0.5)
   
    textSprite.addChild(tx1)
    this.add.existing(textSprite)

    textSprite.inputEnabled = true
    textSprite.events.onInputDown.add(function () {
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