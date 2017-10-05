(function(window){
  'use strict';
  var App = window.App || {};

  var Validation = {
    isCompanyEmail: function(email){
      return /.+@gmail\.com$/.test(email);
    },
    isDecaffeine: function(order){
      return !(/(decaf.*)$/.test(order));
    },
    isUpper20: function(strength){
      return (strength>=20)? true: false;
    }
  };

  App.Validation = Validation;
  window.App = App;
})(window);
