/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Config from '../config'

export default class extends Phaser.State {
  init() { }
  preload() {
    this.map = Config.level1
  }

  create() {
    this.mushroom = new Mushroom({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'mushroom'
    })

    this.game.add.existing(this.mushroom)
    
    // my code
    this.createMap(this.map)
    
    let tx1 = this.add.text(this.game.width / 2, 40, '帮助松鼠找到回家路', {
      font: '30px',
      fill: Config.colorGreen,
      align: 'center'
    })
    tx1.anchor.set(0.5)
    
    let stime = 10
    let tx2 = this.add.text(this.game.width / 2, this.game.height / 2, stime, {
      font: '70px',
      fill: Config.colorYellow,
      align: 'center'
    })
    tx2.anchor.set(0.5)
    this.time.events.repeat(1000, 10, () => {
      stime--
      tx2.text = stime
    }, this)
  }

  render() {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
  
  createMap (arr) {
    let col = arr.length
    let row = arr[0].length
    let sx = (this.game.width / 2) - ((this.game.width - 20) / 2)
    let sy = (this.game.height / 2) - ((this.game.width - 20) / 2)
    let dx = (this.game.width - 20) / col
    let dy = dx
    for (let i = 0; i < col; i++) {
      for (let j = 0; j < row; j++) {
        switch (arr[i][j]) {
          case 0:
          let gr = this.add.sprite(sx + dx * j, sy + dy * i, 'gr1')
          gr.width = dx
          gr.height = dy
          let an = this.add.sprite(sx + dx * j, sy + dy * i, 'an2')
          an.width = dx
          an.height = dy
          break
          case 1:
          let gr1 = this.add.sprite(sx + dx * j, sy + dy * i, 'gr1')
          gr1.width = dx
          gr1.height = dy
          break
          case 2:
          let gr2 = this.add.sprite(sx + dx * j, sy + dy * i, 'gr1')
          gr2.width = dx
          gr2.height = dy
          let st = this.add.sprite(sx + dx * j, sy + dy * i, 'st1')
          st.width = dx
          st.height = dy
          break
          case 3:
          let gr3 = this.add.sprite(sx + dx * j, sy + dy * i, 'gr1')
          gr3.width = dx
          gr3.height = dy
          let tr = this.add.sprite(sx + dx * j, sy + dy * i, 'tr1')
          tr.width = dx
          tr.height = dy
          break
          case 4:
          let gr4 = this.add.sprite(sx + dx * j, sy + dy * i, 'gr1')
          gr4.width = dx
          gr4.height = dy
          let st2 = this.add.sprite(sx + dx * j, sy + dy * i, 'st2')
          st2.width = dx
          st2.height = dy
          break
          case 5:
          let gr5 = this.add.sprite(sx + dx * j, sy + dy * i, 'gr1')
          gr5.width = dx
          gr5.height = dy
          let ho = this.add.sprite(sx + dx * j, sy + dy * i, 'ho1')
          ho.width = dx
          ho.height = dy
        }
      }
    }
  }
}