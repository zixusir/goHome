/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Config from '../config'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = Config.colorGreen
  }
  preload () {
    this.map = Config['level' + Config.currentLevel]
    this.tx1 = null
    this.an = null
    this.mapArr = null
    this.anx = 0
    this.any = 0
    this.dex = 0
    this.dey = 0
  }

  create () {
    this.mushroom = new Mushroom({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'mushroom'
    })

    this.game.add.existing(this.mushroom)

    // my code
    this.createMap(this.map)

    this.tx1 = this.add.text(this.game.width / 2, 40, '帮助松鼠找到回家路', {
      font: '30px',
      fill: Config.colorGreen,
      align: 'center'
    })
    this.tx1.anchor.set(0.5)

    let stime = 3
    let tx2 = this.add.text(this.game.width / 2, this.game.height / 2, stime, {
      font: '70px',
      fill: Config.colorYellow,
      align: 'center'
    })
    tx2.anchor.set(0.5)
    this.time.events.repeat(1000, stime, () => {
      stime--
      tx2.text = stime
      if (stime === 0) {
        this.createShade(this.map)
        tx2.text = ''
      }
    }, this)
  }

  render () {
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }

  createMap (arr) {
    let col = arr.length
    let row = arr[0].length
    let sx = (this.game.width / 2) - ((this.game.width - 20) / 2)
    let sy = (this.game.height / 2) - ((this.game.width - 20) / 2)
    let dx = (this.game.width - 20) / col
    let dy = dx
    this.dex = dx
    this.dey = dy
    for (let i = 0; i < col; i++) {
      for (let j = 0; j < row; j++) {
        switch (arr[i][j]) {
          case 0:
            let gr = this.add.sprite(sx + dx * j, sy + dy * i, 'gr1')
            gr.width = dx
            gr.height = dy
            this.an = this.add.sprite(sx + dx * j, sy + dy * i, 'an2')
            this.an.width = dx
            this.an.height = dy
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

  createShade (arr) {
    this.stage.backgroundColor = '#000000'
    let col = arr.length
    let row = arr[0].length
    let sx = (this.game.width / 2) - ((this.game.width - 20) / 2)
    let sy = (this.game.height / 2) - ((this.game.width - 20) / 2)
    let dx = (this.game.width - 20) / col
    let dy = dx
    this.mapArr = new Array(row)
    for (let i = 0; i < row; i++) {
      this.mapArr[i] = new Array(col)
    }

    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        let gr = this.add.graphics(0, 0)
        gr.beginFill(0x000000)
        gr.drawRect(0, 0, dx + 1, dy + 1)
        gr.lineStyle(5, 0xffffff, 1)
        gr.endFill()
        let bl = this.add.sprite(sx + dx * j, sy + dy * i, gr.generateTexture())
        gr.destroy()
        this.mapArr[i][j] = bl
      }
    }
    this.game.inputEnabled = true
    let stx, sty, enx, eny
    this.game.input.onDown.add((target) => {
      //console.log(`sx: ${target.x}, sy: ${target.y}`)
      stx = target.x
      sty = target.y
    }, this)
    this.game.input.onUp.add((target) => {
      //console.log(`ex: ${target.x}, ey: ${target.y}`)
      enx = target.x
      eny = target.y

      if (Math.abs(eny - sty) > Math.abs(enx - stx)) {
        if (eny - sty > 0) {
          this.moveTo('down')
        } else {
          this.moveTo('up')
        }
      } else {
        if (enx - stx > 0) {
          this.moveTo('right')
        } else {
          this.moveTo('left')
        }
      }
    }, this)

    this.an.bringToTop()
    this.tx1.text = '天黑了'
    this.tx1.fontSize = '60px'
    this.tx1.bringToTop()
    this.add.tween(this.tx1).to({ y: this.game.world.centerY, alpha: 0 }, 4000, Phaser.Easing.Bounce.Out, true)
    this.add.tween(this.mapArr[0][0]).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true)
  }

  moveTo (target) {
    console.log(target)
    switch (target) {
      case 'up':
        if (this.any > 0) {
          this.an.loadTexture('an5')
          let tw1 = this.add.tween(this.an).to({x: this.an.x, y: this.an.y - this.dey}, 200, Phaser.Easing.Linear.None, true)
          this.game.input.enabled = false
          tw1.onComplete.addOnce(() => {
            this.game.input.enabled = true
            this.checkState(this.anx, this.any)
          })
          this.any = this.any - 1
          this.add.tween(this.mapArr[this.any][this.anx]).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true)
        }
        break
      case 'down':
        if (this.any < this.map.length - 1) {
          this.an.loadTexture('an5')
          let tw2 = this.add.tween(this.an).to({x: this.an.x, y: this.an.y + this.dey}, 200, 'Linear', true)
          this.game.input.enabled = false
          tw2.onComplete.addOnce(() => {
            this.game.input.enabled = true
            this.checkState(this.anx, this.any)
          })
          this.any = this.any + 1
          console.log(this.any)
          this.add.tween(this.mapArr[this.any][this.anx]).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true)

        // console.log(this.an.y)
        }
        break
      case 'right':
        if (this.anx < this.map[0].length - 1) {
          this.an.loadTexture('an2')
          let tw3 = this.add.tween(this.an).to({x: this.an.x + this.dex, y: this.an.y}, 200, 'Linear', true)
          this.game.input.enabled = false
          tw3.onComplete.addOnce(() => {
            this.game.input.enabled = true
            this.checkState(this.anx, this.any)
          })
          this.anx = this.anx + 1
          this.add.tween(this.mapArr[this.any][this.anx]).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true)
        }
        break
      case 'left':
        if (this.anx > 0) {
          this.an.loadTexture('an2_1')
          let tw4 = this.add.tween(this.an).to({x: this.an.x - this.dex, y: this.an.y}, 200, Phaser.Easing.Linear.None, true)
          this.game.input.enabled = false
          tw4.onComplete.addOnce(() => {
            this.game.input.enabled = true
            this.checkState(this.anx, this.any)
          })
          this.anx = this.anx - 1
          this.add.tween(this.mapArr[this.any][this.anx]).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true)
        }
        break
    }
  }
  checkState (x, y) {
    // console.log(`x:${x}, y:${y}`)
    if (this.map[y][x] === 2 || this.map[y][x] === 3 || this.map[y][x] === 4) {
      console.log('you lose')
      this.state.start('Lose')
    } else if (this.map[y][x] === 5) {
      console.log('you win')
      this.state.start('Win')
    }
  }
}
