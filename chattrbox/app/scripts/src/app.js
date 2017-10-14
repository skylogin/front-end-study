import socket from './ws-client';
import {UserStore, MessageStore} from './storage.js';
import {ChatForm, ChatList, promptForUsername} from './dom';

const FORM_SELECTOR = '[data-chat="chat-form"]';
const INPUT_SELECTOR = '[data-chat="message-input"]';
const LIST_SELECTOR = '[data-chat="message-list"]';

let messageStore = new MessageStore('x-chattrbox/m');
let userStore = new UserStore('x-chattrbox/u');
let username = userStore.get();
if(!username){
  username = promptForUsername();
  userStore.set(username);
}
let messageArray = [];


class ChatApp{
  constructor(){
    this.chatForm = new ChatForm(FORM_SELECTOR, INPUT_SELECTOR);
    this.chatList = new ChatList(LIST_SELECTOR, username);

    socket.init('ws://localhost:3001');
    socket.registerOpenHandler(()=>{

      let messageHistory = messageStore.get();
      let messageFlag = messageStore.getFlag();
      if(!messageHistory){
        messageStore.setFlag(false);
      } else if(messageHistory && messageFlag){
        let history = JSON.parse(messageHistory);
        for(let i=0; i<history.length; i++){
          let message = new ChatMessage(history[i]);
          socket.sendMessage(message.serialize());

          messageArray.push(message);
        }
        messageStore.setFlag(false);
      }


      this.chatForm.init((data)=>{
        let message = new ChatMessage({message:data});
        socket.sendMessage(message.serialize());
        messageArray.push(message);
        messageStore.clear();
        messageStore.set(JSON.stringify(messageArray));
      });
      this.chatList.init();
    });

    socket.registerCloseHandler(()=>{
      console.log('Server connecting is closed. Wait for 5 seconds.');
      setTimeout(function(){
        new ChatApp();
      },5000);
    });

    socket.registerMessageHandler((data)=>{
      let message = new ChatMessage(data);
      this.chatList.drawMessage(message.serialize());
    });
  }
}

class ChatMessage{
  constructor({ message: m, user: u=username, timestamp: t=(new Date()).getTime() }){
    this.message = m;
    this.user = u;
    this.timestamp = t;
  }

  serialize(){
    return{
      user: this.user,
      message: this.message,
      timestamp: this.timestamp
    };
  }
}

export default ChatApp;
