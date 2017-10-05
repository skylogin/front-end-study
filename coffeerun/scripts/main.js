(function(window){
  'use strict';
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var STRENGTH_SELECTOR = '[data-coffee-order="strength"]';
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var FormHandler = App.FormHandler;
  var CheckList = App.CheckList;
  var Validation = App.Validation;

  var myTruck = new Truck('ncc-1701', new DataStore());
  window.myTruck = myTruck;


  //폼 submit에 대한 핸들러 (하나의 익명함수에서 2개의 객체를 호출하게 변경)
  var checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  var formHandler = new FormHandler(FORM_SELECTOR);
  formHandler.addSubmitHandler(function(data){
    myTruck.createOrder.call(myTruck, data);
    checkList.addRow.call(checkList, data);
  });

  //폼 검증함수 수행
  formHandler.addInputHandler(Validation.isCompanyEmail);
  formHandler.addDecaffeineHandler(Validation.isDecaffeine, Validation.isUpper20);

  //범위에 대한 핸들러
  var strengthHandler = new FormHandler(STRENGTH_SELECTOR);
  strengthHandler.addStrengthHandler();
})(window);
