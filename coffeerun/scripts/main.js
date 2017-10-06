(function(window){
  'use strict';
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var STRENGTH_SELECTOR = '[data-coffee-order="strength"]';
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  var CheckList = App.CheckList;
  var Validation = App.Validation;

  var remoteDS = new RemoteDataStore(SERVER_URL);
  var myTruck = new Truck('ncc-1701', remoteDS);
  var myOfflineTruck = new Truck('ncc-2701', new DataStore());
  window.myTruck = myTruck;


  //폼 submit에 대한 핸들러 (하나의 익명함수에서 2개의 객체를 호출하게 변경)
  var checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  var formHandler = new FormHandler(FORM_SELECTOR);
  formHandler.addSubmitHandler(remoteDS, function(data){
    return myTruck.createOrder.call(myTruck, data)
      .then(function(){
        checkList.addRow.call(checkList, data);
      }, function(){
        alert('Server unreachable. Try again later.');
        //offline일 경우 datastore를 활용한다. 
        myOfflineTruck.createOrder.call(myOfflineTruck, data)
          .then(function(){
            checkList.addRow.call(checkList, data);
          });
      });
  });

  //폼 검증함수 수행
  formHandler.addInputHandler(Validation.isCompanyEmail);
  formHandler.addDecaffeineHandler(Validation.isDecaffeine, Validation.isUpper20);

  //서버의 전체값을 가져와 출력해줌. printOrders에 파라미터로 checkList출력 함수를 넣어줌
  myTruck.printOrders(checkList.addRow.bind(checkList))

  //서버에서 받아오는 값을 offline의 truck으로 넣어줌 (동기화)
  myTruck.printOrders(myOfflineTruck.createOrder.bind(myOfflineTruck));

  //범위에 대한 핸들러
  var strengthHandler = new FormHandler(STRENGTH_SELECTOR);
  strengthHandler.addStrengthHandler();
})(window);
