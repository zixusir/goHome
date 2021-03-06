import Phaser from 'phaser'
import config from '../config'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = config.colorOrange
    config.currentLevel = parseInt(localStorage.getItem('currentlevel'))
  }

  preload () {
    this.load.image('logo', './assets/images/an1.png')
    this.load.image('loadbar', 'assets/images/loader-bar.png')
  }
  
  create () {
    let an1 = this.add.sprite(this.game.width / 2, this.game.height / 2, 'logo')
    an1.width = this.game.width
    an1.height = this.game.height
    an1.anchor.set(0.5)
    
    let tx1 = this.add.text(20, 20, 'Go Home', {
      font: '50px',
      fill: config.colorYellow,
      align: 'center'
    })
    let tx2 = this.add.text(50, 70, 'Powered by Phaser Game Engine', {
      font: '10px',
      fill: config.colorYellow,
      align: 'center'
    })
    
    this.asset = this.add.sprite(0, this.game.height, 'loadbar')
    this.asset.width = this.game.width
    this.asset.anchor.setTo(0, 0.5)
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this)
    this.load.setPreloadSprite(this.asset)
    
    this.load.image('mushroom', 'assets/images/mushroom2.png')
    this.load.image('an2', 'assets/images/an2.png')
    this.load.image('an2_1', 'assets/images/an2_1.png')
    this.load.image('an5', 'assets/images/an5.png')
    this.load.image('an4', 'assets/images/an4.png')
    this.load.image('st1', 'assets/images/st1.png')
    this.load.image('st2', 'assets/images/st2.png')
    this.load.image('tr1', 'assets/images/tr1.png')
    this.load.image('tr2', 'assets/images/tr2.png')
    this.load.image('ho1', 'assets/images/ho1.png')
    this.load.image('ho2', 'assets/images/ho2.png')
    this.load.image('gr1', 'assets/images/gr1.jpg')
    // start load
    this.load.start()
  }
  
  onLoadComplete () {
    console.log('加载完成 ')
    this.state.start('Game')
  }
}