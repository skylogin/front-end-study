var WebSocket = require('ws');

var connection = new WebSocket('ws://localhost:3001');
console.log('websockets chatbot started');

connection.onopen = function () {
  connection.send('Chatbot Start.');
};

// Log errors
connection.onerror = function (error) {
  console.error('WebSocket Error ' + error);
};

// Log messages from the server
connection.onmessage = function (e) {
  console.log('message from server' + e.data);
  console.log(e.data);

  if(e.data !== ''){
    sayHello();
  }
};

function sayHello(){
  var message = {};
  message.id = 0;
  message.msg = "Hello";
  connection.send(JSON.stringify(message));
}

//
// ws.on('message', function(data) {
//  console.log('chatbot:' + data);
//
//  if(data === 'Wsordfish'){
//    console.log('Welcome');
//  }
// });

//
// ws.onmessage = function(e){
//   console.log('message from server' + msg);
// };
//
// connection.send('hello');
