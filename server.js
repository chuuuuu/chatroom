class Friend {
  constructor(id) {
    this.id = id;
    this.contents = [];
  }
}

class Content {
  constructor(flag, content) {
    this.isSentByMe = flag;
    this.content = content;
  }
}
//how to import?

const express = require("express");

const path = require("path");

const app = express();

const bodyParser = require("body-parser");

// app.use("/", express.static(path.join(__dirname, 'client/login')))

// app.use("/SignUp", express.static(path.join(__dirname, 'client/signup')))

// app.use("/ChatRoom", express.static(path.join(__dirname, 'client/chatroom')))

//data storage
class FriendNet{
  constructor(){
    this.users = {};
  }
  login(id){
    if(this.users[id] == undefined){
      this.users[id] = new User(id);
    }
  }
  updateContent(sender, reciever, content){
    if(sender != reciever)
    {
      var friendId = sender;
      this.users[reciever].buffer.push({ friendId, content });
    }

    var index = this.users[sender].friends.findIndex((friend) => {
      return (friend.id == reciever);
    })
    if(index == -1){
      this.users[sender].friends.unshift(new Friend(reciever));
      if(sender != reciever){
        this.users[reciever].friends.unshift(new Friend(sender));
      };
    }
    else{
      var friend = this.users[sender].friends.splice(index, 1);
      this.users[sender].friends.splice(0, 0, friend[0]);

      if(sender != reciever){
        index = this.users[reciever].friends.findIndex((friend) => {
          return (friend.id == sender);
        })
        friend = this.users[reciever].friends.splice(index, 1);
        this.users[reciever].friends.splice(0, 0, friend[0]);
      }
    }

    this.users[sender].friends[0].contents.push(new Content(true, content));
    if(sender != reciever){
      this.users[reciever].friends[0].contents.push(new Content(false, content));
    }
  }
}
class User{
  constructor(id){
    this.id = id;
    this.friends = [];
    this.buffer = [];//key: id, value: message
  }
}

var friendNet = new FriendNet();

app.use(bodyParser.json());

app.get("/api/login/:id", (req, res, next) => {
  console.log(req.params.id);
  friendNet.login(req.params.id);
  var friends = friendNet.users[req.params.id].friends
  res.send({friends});
})

app.get("/api/find/:id", (req, res, next) => {
  var id = friendNet.users[req.params.id]
  res.send({id});
})

app.get("/api/check/:id", (req, res, next) => {
  console.log(req.params.id, "check message, send ", friendNet.users[req.params.id].buffer);
  res.send(friendNet.users[req.params.id].buffer);
  friendNet.users[req.params.id].buffer = [];
})

app.post("/api/update/:id", (req, res, next) => {
  //store the message sent by id to buffer.
  friendNet.updateContent(req.params.id, req.body.friendId, req.body.content)
  console.log(req.body);
  friendNet.send("");
})

app.listen(3002, () => {
  console.log("listening to port 3002")
})