var fs = require('fs');

var handle404Error = function(err, res){
  res.writeHead(404);
  fs.readFile('app/404.html', function(err, data){
    res.end(data);
  });
};

module.exports = handle404Error;
