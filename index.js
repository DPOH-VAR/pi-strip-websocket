"use strict";

var websocket = require("nodejs-websocket");
var config = require(process.argv[2]||"./config.json");
var StripController = require("./strip-controller");

var stripServices = Object.create(null);

for (let stripName in config.strips) {
  if (!config.strips.hasOwnProperty(stripName)) continue;
  stripServices[stripName] = new StripController(config.strips[stripName]);
}

console.log(stripServices);

var server = websocket.createServer(function(connection){
    
  let stripName = connection.path.substring(1);
  if (!(stripName in stripServices)) {
    return connection.close(404,"No led service " +stripName);
  };
  var stripService = stripServices[stripName];
  
  connection.on("binary", function(inStream){
    var data = new Buffer(0)
    inStream.on("readable", function () {
        var newData = inStream.read()
        if (newData)
            data = Buffer.concat([data, newData], data.length+newData.length)
    });
    inStream.on("end", function () {
        stripService.send(data)
    });
  });
  
}).listen(config.port);
