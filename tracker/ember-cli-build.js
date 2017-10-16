/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {

  var bootstrapPath = 'bower_components/bootstrap-sass/assets/';

  var app = new EmberApp(defaults, {

  });

  app.import(bootstrapPath + 'javascripts/bootstrap.js');
  app.import('bower_components/moment/moment.js');
  
  return app.toTree();
};
