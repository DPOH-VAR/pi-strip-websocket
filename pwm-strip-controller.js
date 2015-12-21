"use strict";

var fs = require("fs");
const device = "/dev/pigpio";

module.exports = PWMService;

function PWMService(){
    this.pins = pins;
    process.on('SIGINT', function() {
        this.send(pins.map(zero));
        process.nextTick(exit());
    });
};

PWMService.prototype.send = function(buffer){
    var cmd = this.pins
        .map(setPWMCommand)
        .join(" ") + "\n";
    fs.appendFileSync(device,cmd);
}

function setPWMCommand(pin,i){
    return "p " + pin + " " + (buffer[i]||0);
}

function zero(){
    return 0;
}

function exit(){
    process.exit(0)
}
