const dice = require('../config/dice.js');

module.exports = class Dice {

  constructor(canvas, x, y) {
    this.positions = {
      now: {x: x, y: y},
      old: {x: x, y: y},
    };
    this.count = 0;
    this.canvas = canvas;
    this.dice = dice;
  };

  action() {
    this.change().move();
  };

  change() {
    var num = parseInt(Math.random() * 6 + 1);
    var url = this.dice.threeDimensional[num - 1];

    this.canvas.drawImage(
      url, this.positions.now.x, this.positions.now.y, 30, 30
    );

    return this;
  };

  move() {
    this.positions.now.x = this.range(this.positions.old.x);
    this.positions.now.y = this.range(this.positions.old.y);
    return this;
  };

  range(num) {
    var min = num - this.dice.config.range;
    var max = num + this.dice.config.range;
    return parseInt(Math.random()*(max-min+1)+min);
  };

  loadValue(num) {
    var url = this.dice.threeDimensional[num - 1];
    this.canvas.drawImage(
      url, this.positions.old.x, this.positions.old.y, 30, 30
    );
  };
};
