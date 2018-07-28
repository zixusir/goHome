import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import GameState from './states/Game'
import WinState from './states/Win'
import LoseState from './states/Lose'

import config from './config'
import eruda from 'eruda'
eruda.init()

let game

const docElement = document.documentElement
const width = docElement.clientWidth
const height = docElement.clientHeight

window.onload = function () {
  game = new Phaser.Game(width, height, Phaser.CANVAS, 'content', null)
  game.state.add('Boot', BootState, false)
  game.state.add('Game', GameState, false)
  game.state.add('Win', WinState, false)
  game.state.add('Lose', LoseState, false)
  
  game.state.start('Boot')
}

if (window.cordova) {
  var app = {
    initialize: function () {
      document.addEventListener(
        'deviceready',
        this.onDeviceReady.bind(this),
        false
      )
    },

    // deviceready Event Handler
    //
    onDeviceReady: function () {
      this.receivedEvent('deviceready')

      // When the device is ready, start Phaser Boot state.
      window.game.state.start('Boot')
    },

    receivedEvent: function (id) {
      console.log('Received Event: ' + id)
    }
  }

  app.initialize()
}