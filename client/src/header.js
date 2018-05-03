import React, { Component } from 'react';
import './header.css';

class Header extends Component {
  constructor(){
    super();
    this.state = {
      logInput: "",
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.updateLogInput = this.updateLogInput.bind(this);
  }

  updateLogInput(e) {
    if(e.key === "Enter"){
      this.login();
    }
    else{
      this.state.logInput += e.key
      this.setState({
        logInput: this.state.logInput,
      });
    }
  }

  login() {
    this.props.login(this.state.logInput);
    this.state.logInput = "";
    this.setState({
      logInput: this.state.logInput,
    });
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
          <input value={this.state.logInput} onKeyPress={this.updateLogInput}/>
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
