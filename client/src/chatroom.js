import React, { Component } from 'react';
import './chatroom.css';
import { Friend, Content } from "./util";
import axios from 'axios';
class ChatRoom extends Component {
  constructor() {
    super();

    this.state = {
    }

    this.updateChatInput = this.updateChatInput.bind(this);
  }


  updateChatInput(e) {
    if (e.key === "Enter") {
      var friendId = this.props.chattingId;
      var content = e.target.value;
      axios.post("/api/update/" + this.props.id, {friendId, content});
      this.props.updateContents(e.target.value, this.props.chattingId);
      e.target.value = "";
    }
  }

  render() {
    var contents;
    console.log(this.props.contents)
    contents = this.props.contents.map((content) => {
      if(content.isSentByMe){
        return (
        <div className="right">
          <p>{content.content}</p>
        </div>
        )
      }
      else{
        return(
          <div className="left">
            <p>{content.content}</p>
          </div>
        )
      }
    })
    console.log(this.props.contents);
    console.log(contents);
    return (
      <div className="chatroom">
        <div>
          <p>{this.props.chattingId}</p>
        </div>
        <div className="chatblock">
          {contents}
        </div>
        <div className="chatbar" >
          <input placeholder="type something" onKeyPress={this.updateChatInput} />
          <p>👍</p>
        </div>
      </div>
    );
  }
}

export default ChatRoom;
