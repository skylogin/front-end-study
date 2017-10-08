var http = require('http');
var fs = require('fs');

var extract = require('./extract');
var handle404Error = require('./handle404Error');
var getMimeType = require('./mime');
var wss = require('./websockets-server');
var chatbot = require('./websockets-chatbot');


var server = http.createServer(function(req, res){
  console.log('Responding to a request.');

  var filePath = extract(req.url);
  fs.readFile(filePath, function(err, data){
    if(err){
      handle404Error(err, res);
      return;
    } else{
      var mimeType = getMimeType(filePath);
      res.setHeader('Content-Type', mimeType);
      res.end(data);
    }
  });
});

server.listen(3000);
