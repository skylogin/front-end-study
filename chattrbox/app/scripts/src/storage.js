class Store{
  constructor(storageApi){
    this.api = storageApi;
  }

  get(){
    return this.api.getItem(this.key);
  }

  set(value){
    this.api.setItem(this.key, value);
  }
}

export class UserStore extends Store{
  constructor(key){
    super(sessionStorage);
    this.key = key;
  }
}

export class MessageStore extends Store{
  constructor(key){
    super(sessionStorage);
    this.key = key;
    this.flag = true;
  }

  getFlag(){
    return this.flag;
  }

  setFlag(flag){
    this.flag = flag;
  }

  clear(){
    sessionStorage.removeItem("x-chattrbox/m");
  }
}
