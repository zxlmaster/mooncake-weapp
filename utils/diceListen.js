const Dice = require('./dice.js'),
      dice = require('../config/dice.js'),
      _ = require('../lib/lodash/lodash.js');

module.exports = class DiceListen {

  constructor(canvas, audio) {
    this.throw = false;
    this.audio = audio;
    this.canvas = canvas;
    this.dice = dice;
    this.start();
  };

  start() {
    var positions = this.dice.positions;
    this.dicesInstance = _.map(positions, (position) => {
      return new Dice(this.canvas, position.x, position.y);
    });
  };

  listen() {
    var count = 0,
        self = this,
        speed = this.dice.config.speed,
        time  = this.dice.config.time;

    if(this.throw) return;

    this.throw = !this.throw;

    this.audioPlay();

    this.timer = setInterval(function () {
      count += speed;

      // 判断时间
      if(count > time) {
        clearInterval(self.timer);
        self.throw = !self.throw;
        self.audioStop();
      }

      _.each(self.dicesInstance, (dice) => dice.action());
      self.canvas.draw();
    }, speed);
  };

  reload(values) {
    var positions = this.dice.positions;

    _.each(this.dicesInstance, (dice, key) => {
      dice.loadValue(values[key]);
    });

    this.canvas.draw();
  }

  audioPlay() {
    this.audio.play();
  };

  audioStop() {
    this.audio.pause();
  };
};
