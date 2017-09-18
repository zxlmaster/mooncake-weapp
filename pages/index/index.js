const base = require('../../config/base.js'),
      dice = require('../../config/dice.js'),
      _ = require('../../lib/lodash/lodash.js'),
      DiceListen = require('../../utils/diceListen.js');

const app = getApp()

Page({
  data: {
    buttonText: '搏一把',
    audio: { src: base.audio },
    canvas: { src: base.bowl },
    dice: {
      listener: false,
      config: dice.config,
      throw: false,
      positions: dice.positions,
      threeD: dice.threeDimensional,
      twoD: dice.twoDimensional,
      data: [],
    },
  },
  onReady(e) {
    this.data.dice.data = this.getDices();
    this.data.canvasCtx = wx.createCanvasContext('dice-canvas');
    this.data.audioCtx = wx.createAudioContext('dice-audio');
    this.data.dice.listener = new DiceListen(
      this.data.canvasCtx,
      this.data.audioCtx,
    );
    this.loadDices();
  },
  getDices() {
    return _.times(6, () => parseInt(Math.random() * 6 + 1));
  },
  loadDices() {
    this.data.dice.listener.reload(this.data.dice.data);
  },
  throwDice() {
    this.data.dice.listener.listen();
  },
})
