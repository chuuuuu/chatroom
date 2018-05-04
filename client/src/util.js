class Friend{
  constructor(id){
    this.id = id;
    this.contents = [];
    this.newMessageNum = 0;
  }
}

class Content{
  constructor(flag, content){
    this.isSentByMe = flag;
    this.content = content;
  }
}

export { Friend, Content};