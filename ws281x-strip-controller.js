"use strict";

var ws281x = require('rpi-ws281x-native');

module.exports = WS281XService;

function WS281XService (length,options){
    this.length = length;
    this.options = options;
    ws281x.init(length,options);
    process.on('SIGINT', function() {
        ws281x.reset();
        process.nextTick(exit);
    });
}

WS281XService.prototype.send = function(buffer){
    var colorData = new Uint32Array(this.length);
    for (var i=0; i<buffer.length; i+=3) {
        var r = buffer[i]||0, g = buffer[i+1]||0, b = buffer[i+2]||0;
        colorData[i/3] = ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
        
    }
    ws281x.render(colorData);
}

function exit(){
    process.exit(0)
}
