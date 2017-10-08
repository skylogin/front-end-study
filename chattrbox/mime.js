var mime = require('mime');

var getMimeType = function(filePath){
  return mime.getType(filePath);
}

module.exports = getMimeType;
