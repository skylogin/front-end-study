(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wsClient = require('./ws-client');

var _wsClient2 = _interopRequireDefault(_wsClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChatApp = function ChatApp() {
  _classCallCheck(this, ChatApp);

  _wsClient2.default.init('ws://localhost:3001');
  _wsClient2.default.registerOpenHandler(function () {
    var message = new ChatMessage({ message: 'pow!' });
    _wsClient2.default.sendMessage(message.serialize());
  });
  _wsClient2.default.registerCloseHandler(function () {
    console.log('Server connecting is closed. Wait for 5 seconds.');
    setTimeout(function () {
      new ChatApp();
    }, 5000);
  });

  _wsClient2.default.registerMessageHandler(function (data) {
    console.log(data);
  });
};

var ChatMessage = function () {
  function ChatMessage(_ref) {
    var m = _ref.message,
        _ref$user = _ref.user,
        u = _ref$user === undefined ? 'batman' : _ref$user,
        _ref$timestamp = _ref.timestamp,
        t = _ref$timestamp === undefined ? new Date().getTime() : _ref$timestamp;

    _classCallCheck(this, ChatMessage);

    this.message = m;
    this.user = u;
    this.timestamp = t;
  }

  _createClass(ChatMessage, [{
    key: 'serialize',
    value: function serialize() {
      return {
        user: this.user,
        message: this.message,
        timestamp: this.timestamp
      };
    }
  }]);

  return ChatMessage;
}();

exports.default = ChatApp;

},{"./ws-client":3}],2:[function(require,module,exports){
'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _app2.default();

},{"./app":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var socket = void 0;

function init(url) {
  socket = new WebSocket(url);
  console.log('connecting...');
}

function registerOpenHandler(handlerFunction) {
  socket.onopen = function () {
    console.log('open');
    handlerFunction();
  };
}

function registerCloseHandler(handlerFunction) {
  socket.onclose = function () {
    console.log('close');
    handlerFunction();
  };
}

function registerMessageHandler(handlerFunction) {
  socket.onmessage = function (e) {
    console.log('message', e.data);
    var data = JSON.parse(e.data);
    handlerFunction(data);
  };
}

function sendMessage(payload) {
  socket.send(JSON.stringify(payload));
}

exports.default = {
  init: init,
  registerOpenHandler: registerOpenHandler,
  registerCloseHandler: registerCloseHandler,
  registerMessageHandler: registerMessageHandler,
  sendMessage: sendMessage
};

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvYXBwLmpzIiwiYXBwL3NjcmlwdHMvc3JjL21haW4uanMiLCJhcHAvc2NyaXB0cy9zcmMvd3MtY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7SUFHTSxPLEdBQ0osbUJBQWE7QUFBQTs7QUFDWCxxQkFBTyxJQUFQLENBQVkscUJBQVo7QUFDQSxxQkFBTyxtQkFBUCxDQUEyQixZQUFJO0FBQzdCLFFBQUksVUFBVSxJQUFJLFdBQUosQ0FBZ0IsRUFBRSxTQUFTLE1BQVgsRUFBaEIsQ0FBZDtBQUNBLHVCQUFPLFdBQVAsQ0FBbUIsUUFBUSxTQUFSLEVBQW5CO0FBQ0QsR0FIRDtBQUlBLHFCQUFPLG9CQUFQLENBQTRCLFlBQUk7QUFDOUIsWUFBUSxHQUFSLENBQVksa0RBQVo7QUFDQSxlQUFXLFlBQVU7QUFDbkIsVUFBSSxPQUFKO0FBQ0QsS0FGRCxFQUVFLElBRkY7QUFHRCxHQUxEOztBQU9BLHFCQUFPLHNCQUFQLENBQThCLFVBQUMsSUFBRCxFQUFRO0FBQ3BDLFlBQVEsR0FBUixDQUFZLElBQVo7QUFDRCxHQUZEO0FBR0QsQzs7SUFHRyxXO0FBQ0osNkJBQWtGO0FBQUEsUUFBM0QsQ0FBMkQsUUFBcEUsT0FBb0U7QUFBQSx5QkFBeEQsSUFBd0Q7QUFBQSxRQUFsRCxDQUFrRCw2QkFBaEQsUUFBZ0Q7QUFBQSw4QkFBdEMsU0FBc0M7QUFBQSxRQUEzQixDQUEyQixrQ0FBeEIsSUFBSSxJQUFKLEVBQUQsQ0FBYSxPQUFiLEVBQXlCOztBQUFBOztBQUNoRixTQUFLLE9BQUwsR0FBZSxDQUFmO0FBQ0EsU0FBSyxJQUFMLEdBQVksQ0FBWjtBQUNBLFNBQUssU0FBTCxHQUFpQixDQUFqQjtBQUNEOzs7O2dDQUVVO0FBQ1QsYUFBTTtBQUNKLGNBQU0sS0FBSyxJQURQO0FBRUosaUJBQVMsS0FBSyxPQUZWO0FBR0osbUJBQVcsS0FBSztBQUhaLE9BQU47QUFLRDs7Ozs7O2tCQUdZLE87Ozs7O0FDdkNmOzs7Ozs7QUFDQTs7Ozs7Ozs7QUNEQSxJQUFJLGVBQUo7O0FBRUEsU0FBUyxJQUFULENBQWMsR0FBZCxFQUFrQjtBQUNoQixXQUFTLElBQUksU0FBSixDQUFjLEdBQWQsQ0FBVDtBQUNBLFVBQVEsR0FBUixDQUFZLGVBQVo7QUFDRDs7QUFFRCxTQUFTLG1CQUFULENBQTZCLGVBQTdCLEVBQTZDO0FBQzNDLFNBQU8sTUFBUCxHQUFpQixZQUFJO0FBQ25CLFlBQVEsR0FBUixDQUFZLE1BQVo7QUFDQTtBQUNELEdBSEQ7QUFJRDs7QUFFRCxTQUFTLG9CQUFULENBQThCLGVBQTlCLEVBQThDO0FBQzVDLFNBQU8sT0FBUCxHQUFrQixZQUFJO0FBQ3BCLFlBQVEsR0FBUixDQUFZLE9BQVo7QUFDQTtBQUNELEdBSEQ7QUFJRDs7QUFFRCxTQUFTLHNCQUFULENBQWdDLGVBQWhDLEVBQWdEO0FBQzlDLFNBQU8sU0FBUCxHQUFvQixVQUFDLENBQUQsRUFBSztBQUN2QixZQUFRLEdBQVIsQ0FBWSxTQUFaLEVBQXVCLEVBQUUsSUFBekI7QUFDQSxRQUFJLE9BQU8sS0FBSyxLQUFMLENBQVcsRUFBRSxJQUFiLENBQVg7QUFDQSxvQkFBZ0IsSUFBaEI7QUFDRCxHQUpEO0FBS0Q7O0FBRUQsU0FBUyxXQUFULENBQXFCLE9BQXJCLEVBQTZCO0FBQzNCLFNBQU8sSUFBUCxDQUFZLEtBQUssU0FBTCxDQUFlLE9BQWYsQ0FBWjtBQUNEOztrQkFFYTtBQUNaLFlBRFk7QUFFWiwwQ0FGWTtBQUdaLDRDQUhZO0FBSVosZ0RBSlk7QUFLWjtBQUxZLEMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHNvY2tldCBmcm9tICcuL3dzLWNsaWVudCc7XG5cblxuY2xhc3MgQ2hhdEFwcHtcbiAgY29uc3RydWN0b3IoKXtcbiAgICBzb2NrZXQuaW5pdCgnd3M6Ly9sb2NhbGhvc3Q6MzAwMScpO1xuICAgIHNvY2tldC5yZWdpc3Rlck9wZW5IYW5kbGVyKCgpPT57XG4gICAgICBsZXQgbWVzc2FnZSA9IG5ldyBDaGF0TWVzc2FnZSh7IG1lc3NhZ2U6ICdwb3chJyB9KTtcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZShtZXNzYWdlLnNlcmlhbGl6ZSgpKTtcbiAgICB9KTtcbiAgICBzb2NrZXQucmVnaXN0ZXJDbG9zZUhhbmRsZXIoKCk9PntcbiAgICAgIGNvbnNvbGUubG9nKCdTZXJ2ZXIgY29ubmVjdGluZyBpcyBjbG9zZWQuIFdhaXQgZm9yIDUgc2Vjb25kcy4nKTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgbmV3IENoYXRBcHAoKTtcbiAgICAgIH0sNTAwMCk7XG4gICAgfSk7XG5cbiAgICBzb2NrZXQucmVnaXN0ZXJNZXNzYWdlSGFuZGxlcigoZGF0YSk9PntcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIH0pXG4gIH1cbn1cblxuY2xhc3MgQ2hhdE1lc3NhZ2V7XG4gIGNvbnN0cnVjdG9yKHsgbWVzc2FnZTogbSwgdXNlcjogdT0nYmF0bWFuJywgdGltZXN0YW1wOiB0PShuZXcgRGF0ZSgpKS5nZXRUaW1lKCkgfSl7XG4gICAgdGhpcy5tZXNzYWdlID0gbTtcbiAgICB0aGlzLnVzZXIgPSB1O1xuICAgIHRoaXMudGltZXN0YW1wID0gdDtcbiAgfVxuXG4gIHNlcmlhbGl6ZSgpe1xuICAgIHJldHVybntcbiAgICAgIHVzZXI6IHRoaXMudXNlcixcbiAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcbiAgICAgIHRpbWVzdGFtcDogdGhpcy50aW1lc3RhbXBcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENoYXRBcHA7XG4iLCJpbXBvcnQgQXBwbGljYXRpb25Gb3JDaGF0dGluZyBmcm9tICcuL2FwcCc7XG5uZXcgQXBwbGljYXRpb25Gb3JDaGF0dGluZygpO1xuIiwibGV0IHNvY2tldDtcblxuZnVuY3Rpb24gaW5pdCh1cmwpe1xuICBzb2NrZXQgPSBuZXcgV2ViU29ja2V0KHVybCk7XG4gIGNvbnNvbGUubG9nKCdjb25uZWN0aW5nLi4uJyk7XG59XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyT3BlbkhhbmRsZXIoaGFuZGxlckZ1bmN0aW9uKXtcbiAgc29ja2V0Lm9ub3BlbiA9ICgoKT0+e1xuICAgIGNvbnNvbGUubG9nKCdvcGVuJyk7XG4gICAgaGFuZGxlckZ1bmN0aW9uKCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZWdpc3RlckNsb3NlSGFuZGxlcihoYW5kbGVyRnVuY3Rpb24pe1xuICBzb2NrZXQub25jbG9zZSA9ICgoKT0+e1xuICAgIGNvbnNvbGUubG9nKCdjbG9zZScpO1xuICAgIGhhbmRsZXJGdW5jdGlvbigpO1xuICB9KVxufVxuXG5mdW5jdGlvbiByZWdpc3Rlck1lc3NhZ2VIYW5kbGVyKGhhbmRsZXJGdW5jdGlvbil7XG4gIHNvY2tldC5vbm1lc3NhZ2UgPSAoKGUpPT57XG4gICAgY29uc29sZS5sb2coJ21lc3NhZ2UnLCBlLmRhdGEpO1xuICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShlLmRhdGEpO1xuICAgIGhhbmRsZXJGdW5jdGlvbihkYXRhKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNlbmRNZXNzYWdlKHBheWxvYWQpe1xuICBzb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeShwYXlsb2FkKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0e1xuICBpbml0LFxuICByZWdpc3Rlck9wZW5IYW5kbGVyLFxuICByZWdpc3RlckNsb3NlSGFuZGxlcixcbiAgcmVnaXN0ZXJNZXNzYWdlSGFuZGxlcixcbiAgc2VuZE1lc3NhZ2Vcbn1cbiJdfQ==
