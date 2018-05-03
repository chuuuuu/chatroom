import React, { Component } from 'react';
import Header from "./header"
import FriendsList from './friendsList';
import ChatRoom from './chatroom';
import './chatroomapp.css';
import {Friend, Content} from "./util";
//changing friends into dictionary!!!
class ChatRoomApp extends Component {
  constructor() {
    super();
    this.state = {
      id: undefined,
      friends: {},
      chattingId: undefined,//the id who is chatting with us.
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.chatwith = this.chatwith.bind(this);
    this.updateContents = this.updateContents.bind(this);
  }

  login(id) {
    console.log("login!")
    //need to load data from server!
    this.setState({
      id: id,
      friends: {},
    });
  }

  logout() {
    console.log("logout!")
    //need to send data to server!
    this.setState({
      id: undefined,
      friends: {},
    });
  }

  chatwith(id) {
    console.log("chat with " + id + "!");
    // var index = this.state.friends.find((friend) => {
    //   return (friend.id == id);
    // });
    // if(index === undefined){
    //   this.state.friends.push(new Friend(id));
    //   console.log(this.state.friends)
    // }
    // else{
    //   console.log("you are already friends")
    // }
    this.setState({
      chattingId: id,
    });
  }

  updateContents(content) {
    if(this.state.friends[this.state.chattingId] === undefined)
    {
      this.state.friends[this.state.chattingId] = new Friend(this.state.chattingId);
    }
    this.state.friends[this.state.chattingId].contents.push(new Content(true, content));
    this.setState({
      friends: this.state.friends,
    });
  }

  render() {
    return (
      <div className="frame">
        <Header login={this.login} logout={this.logout} id={this.state.id}/>
        <div>
          <FriendsList chatwith={this.chatwith} id={this.state.id} friends={this.state.friends}/>
          <ChatRoom updateContents={this.updateContents} 
                    id={this.state.id} 
                    chattingId={this.state.chattingId} 
                    contents={
                      (this.state.chattingId == undefined)? []: 
                      ((this.state.friends[this.state.chattingId] == undefined)? [] : this.state.friends[this.state.chattingId].contents)}/>
        </div>
      </div>
    );
  }
}

export default ChatRoomApp;
