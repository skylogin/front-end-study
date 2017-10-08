var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
  port: port
});

var messages = [];
// var password = 'Wsordfish';
// var users = [];
// var id = 0;

console.log('websockets server started');

ws.on('connection', function(socket){
  console.log('client connection established');
  // var user = {};
  // user.id = ++id;
  // user.auth = false;
  // user.greeting = false;
  // users.push(user);
  // socket.userId = id;
  // socket.send('enter your password: ');

  socket.on('message', function(data){
    console.log('message received: ' + data);

    // if(data === password){
    //   users[socket.userId-1].auth = true;
    //   messages.forEach(function(msg){
    //     socket.send(msg);
    //   });
    // } else{
    //   if(!users[socket.userId-1].auth){
    //     // socket.send('wrong password');
    //   }
    // }

    ws.clients.forEach(function(clientSocket){
      clientSocket.send(data);
      messages.push(data);

      // if(socket.userId === users[socket.userId-1].id && users[socket.userId-1].auth){
        // console.log(data);
        // data = JSON.parse(data);
        // var message = {};
        // message.id = socket.userId;
        // message.msg = data;

        // if(!users[socket.userId-1].greeting){
          //원래는 챗봇에서 이걸 보내주어야 하는데....
        //   var botMessage = {};
        //   botMessage.id = 0;
        //   botMessage.msg = "Hello";
        //   clientSocket.send(JSON.stringify(botMessage));
        //   users[socket.userId-1].greeting = true;
        // }
        // clientSocket.send(JSON.stringify(message));
        // messages.push(JSON.stringify(message));
      // }
    });
  });
});
