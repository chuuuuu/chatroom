import React, { Component } from 'react';
import './header.css';

class Header extends Component {
  constructor(){
    super();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.updateLogInput = this.updateLogInput.bind(this);
  }

  updateLogInput(e) {
    if(e.key === "Enter"){
      this.login();
    }
  }

  login() {
    this.props.login(document.getElementById("logInput").value);
    document.getElementById("logInput").value = "";
  }

  logout() {
    this.props.logout();
  }

  render() {
    var userLogBlock;

    if (this.props.id === undefined) {
      userLogBlock = (
        <div className="logBlock">
          <p>id</p>
          <input autoFocus id="logInput" onKeyPress={this.updateLogInput}/>
          <button onClick={this.login}>login</button>
        </div>
      )
    }
    else{
      userLogBlock = (
        <div className="logBlock">
          <p>Welcome {this.props.id}</p>
          <button onClick={this.logout}>logout</button>
        </div>
      )
    }

    return (
      <div className="header">
        <div className="logo">
          <p>ChatRoom</p>
        </div>
        {userLogBlock }
      </div>
    );
  }
}

export default Header;
