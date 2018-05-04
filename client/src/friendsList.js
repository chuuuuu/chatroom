import React, { Component } from 'react';
import './friendsList.css';
import { Friend, Content } from "./util";
import axios from 'axios';

class FriendsList extends Component {
  constructor() {
    super();
    this.updateSearchInput = this.updateSearchInput.bind(this);
  }


  updateSearchInput(e){
    e.persist()//https://reactjs.org/docs/events.html#event-pooling
    if (e.key === "Enter") {
      axios.get('/api/find/' + e.target.value)
      .then((res) => {
        if(res.data.id !== undefined){
          this.props.chatwith(e.target.value);
          e.target.value = "";
        }
        else{
          alert("the user does not exist");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  render() {
    var friends = [];
    friends = this.props.friends.map((friend) => {
      if(friend.id == this.props.chattingId){
        return(
          <p onClick={() => {
            this.props.chatwith(friend.id);
          }} className="chatting">{friend.id}</p>
        );
      }
      else if(friend.newMessageNum == 0){
        return(
          <p onClick={() => {
            this.props.chatwith(friend.id);
          }} className="notChatting">{friend.id}</p>
        );
      }
      else{
        return(
          <p onClick={() => {
            this.props.chatwith(friend.id);
          }} className="newMessage">{friend.id}({friend.newMessageNum})</p>
        );
      }
    })

    return (
      <div className="friendsList">
        <input autoFocus placeholder="Search" onKeyPress={this.updateSearchInput} />
        {friends}
      </div>
    );
  }
}

export default FriendsList;
