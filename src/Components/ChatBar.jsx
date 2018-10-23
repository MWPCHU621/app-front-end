import React, { Component } from "react";

export default class ChatBar extends Component {
   constructor() {
    super();

    this.state = {
      name: 'gonna change later',
      text: ''
    };
  }

  render() {
    return (
      <footer className="chatbar">
        <form onSubmit={this.handleFormSubmit}>
          <input className="chatbar-message" value={this.state.text}
          onChange={this.handleInputChange}
          placeholder="Type a message and hit ENTER"
          onKeyDown={this.keydownFunction} />
        </form>
      </footer>
    );
  }
  keydownFunction = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
     this.handleFormSubmit(e);
    }
  }
  handleInputChange = (e) => {
    this.setState({ text: e.target.value });
  };

  handleFormSubmit = e => {

    this.setState({ text: '' });
  };
}
