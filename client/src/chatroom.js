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

  componentDidUpdate(){
    var emt = document.getElementsByClassName("chatblock")[0];
    emt.scrollTo(0, emt.scrollHeight);
  }

  componentDidMount(){
    var emt = document.getElementsByClassName("chatblock")[0];
    emt.scrollTo(0, emt.scrollHeight);    
  }

  render() {
    var contents;
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
    return (
      <div className="chatroom">
        <div className="chattingInfo">
          <p>{this.props.chattingId}</p>
        </div>
        <div className="chatblock">
          {contents}
        </div>
        <div className="chatbar" >
          <input autoFocus placeholder="type something" onKeyPress={this.updateChatInput} />
          <p>👍</p>
        </div>
      </div>
    );
  }
}

export default ChatRoom;
