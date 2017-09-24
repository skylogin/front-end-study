(function(window){
  'use strict';
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var STRENGTH_SELECTOR = '[data-coffee-order="strength"]';
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var FormHandler = App.FormHandler;

  var myTruck = new Truck('ncc-1701', new DataStore());
  window.myTruck = myTruck;


  //폼 submit에 대한 핸들러
  var formHandler = new FormHandler(FORM_SELECTOR);
  formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));

  //범위에 대한 핸들러
  var strengthHandler = new FormHandler(STRENGTH_SELECTOR);
  strengthHandler.addStrengthHandler();
})(window);
