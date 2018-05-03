const express = require("express");

const path = require("path");

const app = express();

// app.use("/", express.static(path.join(__dirname, 'client/login')))

// app.use("/SignUp", express.static(path.join(__dirname, 'client/signup')))

// app.use("/ChatRoom", express.static(path.join(__dirname, 'client/chatroom')))

app.listen(3002, () => {
  console.log("listening to port 3002")
})