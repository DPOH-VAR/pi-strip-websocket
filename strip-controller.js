var PWMStripController = require('./pwm-strip-controller');
var WS281XStripController = require('./ws281x-strip-controller');

module.exports = StripService;

function StripService(stripConfig) {
  switch (stripConfig.type.toUpperCase()) {
    case "PWM":
      return new PWMStripController(stripConfig.pins)
    case "WS281X":
      return new WS281XStripController(stripConfig.length,stripConfig.options)
  }
  throw new Error("Unknown controller type: "+stripConfig.type)
}
