class Friend{
  constructor(id){
    this.id = id;
    this.contents = [];
  }
}

class Content{
  constructor(flag, content){
    this.isSentByMe = flag;
    this.content = content;
  }
}

export { Friend, Content};