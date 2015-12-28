"use strict";

var fs = require("fs");
const device = "/dev/pigpio";

module.exports = PWMService;

function PWMService(pins){
    this.pins = pins;
    process.on('SIGINT', function() {
        this.send(pins.map(zero));
        process.nextTick(exit());
    }.bind(this));
};

PWMService.prototype.send = function(buffer){
	function setPWMCommand(pin,i){
		return "p " + pin + " " + (buffer[i]||0);
	}
    var cmd = this.pins
        .map(setPWMCommand)
        .join(" ") + "\n";
    fs.appendFileSync(device,cmd);
}

function zero(){
    return 0;
}

function exit(){
    process.exit(0)
}
