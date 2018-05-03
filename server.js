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
}
class User{
  constructor(id){
    this.id = id;
    this.friends = {};
  }
}

var friendNet = new FriendNet();

app.use(bodyParser.json());

app.get("/api/user/:id", (req, res, next) => {
  console.log(req.params.id);
  friendNet.login(req.params.id);
  res.send(friendNet.users[req.params.id].friends);
})

app.put("/api/user/:id", (req, res, next) => {
  friendNet.users[req.params.id].friends = req.body;
  res.send("");
  // friendNet.users[req.params.id].friends
})

app.listen(3002, () => {
  console.log("listening to port 3002")
})