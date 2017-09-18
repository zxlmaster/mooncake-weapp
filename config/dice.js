const _ = require('../lib/lodash/lodash.js');

// 默认配置
const basePath3d = '../../images/3d-dice/';
const basePath2d = '../../images/2d-dice/';
const suffix = '.png';
var threeDimensional, twoDimensional;

// 生成图片路径数组
threeDimensional = _.times(6, (key) =>  basePath3d + (key + 1) + suffix);
twoDimensional = _.times(6, (key) =>  basePath2d + (key + 1) + suffix);

module.exports = {
  threeDimensional,
  twoDimensional,
  config: {
    time: 1000,
    speed: 99,
    range: 7,
  },
  positions: [
    {x: 90,  y: 60},
    {x: 50,  y: 84},
    {x: 80,  y: 125},
    {x: 130, y: 70},
    {x: 42,  y: 128},
    {x: 136, y: 120},
  ],
};
