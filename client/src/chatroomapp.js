import React, { Component } from 'react';
import Header from "./header"
import FriendsList from './friendsList';
import ChatRoom from './chatroom';
import './chatroomapp.css';
import {Friend, Content} from "./util";
import axios from 'axios';

class ChatRoomApp extends Component {
  constructor() {
    super();
    this.state = {
      id: undefined,
      friends: [],
      chattingId: undefined,//the id who is chatting with us.
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.chatwith = this.chatwith.bind(this);
    this.updateContents = this.updateContents.bind(this);
    this.notice = this.notice.bind(this);
    this.setIntervalCall = undefined;
  }

  login(id) {
    console.log("login!")
    //need to load data from server!
    axios.get('/api/login/'+id)
    .then((res) => {
      console.log(res.data);
      this.setState({
        id: id,
        friends: res.data.friends,
      });
      this.setIntervalCall = setInterval(() => {
        axios.get("/api/check/"+id)
        .then((res) => {
          this.notice(res.data) })}, 1000);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  logout() {
    console.log("logout!")
    console.log(this.state.friends);
    clearInterval(this.setIntervalCall)
    this.setState({
      id: undefined,
      friends: [],
      chattingId: undefined,
    });
  }

  chatwith(id) {
    console.log("chat with " + id + "!");
    this.setState({
      chattingId: id,
    });
  }

  updateContents(content, id, isSentByMe = true) {
    var index = this.state.friends.findIndex((friend) => {
      return (friend.id == id);
    })
    if (index == -1) {
      this.state.friends.unshift(new Friend(id))
    }
    else{
      var friend = this.state.friends.splice(index, 1);
      this.state.friends.splice(0, 0, friend[0]);
    }
    this.state.friends[0].contents.push(new Content(isSentByMe, content));
    this.setState({
      friends: this.state.friends,
    });
  }

  notice(buffer){
    for(let i=0; i !== buffer.length; i++){
      console.log("buffer[",i,"]",buffer[i]);
      this.updateContents(buffer[i].content, buffer[i].friendId, false);
    }
  }

  render() {

    var chatroom;

    var contents;

    var index = this.state.friends.findIndex((friend) => {
      return (friend.id == this.state.chattingId);
    })

    if (index == -1) contents = [];
    else contents = this.state.friends[index].contents


    if(this.state.chattingId !== undefined)
    {
      chatroom = (
      <ChatRoom updateContents={this.updateContents}
        id={this.state.id}
        chattingId={this.state.chattingId}
        contents={contents}/>)
    }

    var main;

    if(this.state.id !== undefined)
    {
      main = (
      <div>
        <FriendsList chatwith={this.chatwith} id={this.state.id} friends={this.state.friends} />
        {chatroom}
      </div>
      );
    }

    return (
      <div className="frame">
        <Header login={this.login} logout={this.logout} id={this.state.id}/>
        {main}
      </div>
    );
  }
}

export default ChatRoomApp;
