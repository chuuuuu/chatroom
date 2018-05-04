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
        console.log(res.data);
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
    console.log(this.props.friends);
    var friends = this.props.friends.map((friend) => {
      return(<li>{friend.id}</li>);
    })


    return (
      <div className="friendsList">
        <input placeholder="Search" onKeyPress={this.updateSearchInput} />
        {friends}
      </div>
    );
  }
}

export default FriendsList;
