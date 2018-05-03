import React, { Component } from 'react';
import './friendsList.css';
import { Friend, Content } from "./util";

class FriendsList extends Component {
  constructor() {
    super();
    this.updateSearchInput = this.updateSearchInput.bind(this);
  }


  updateSearchInput(e){
    if (e.key === "Enter") {
      this.props.chatwith(e.target.value);
      e.target.value = "";
    }
  }

  render() {
    var friends = [];
    for(let key in this.props.friends){
      friends.push(<li>{key}</li>);
    }

    return (
      <div className="friendsList">
        <input placeholder="Search" onKeyPress={this.updateSearchInput} />
        {friends}
      </div>
    );
  }
}

export default FriendsList;
