import React, { Component } from "react";
import ChatBar from './ChatBar.jsx'
import Messages from './Messages.jsx'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
export default class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: props.userid,
      user: props.username,
      messages: []
    }
  }
   componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3003");
    this.socket.onopen =  (event) => {
      this.socket.onmessage = (event) => {
        console.log(event.data);;
        const received = JSON.parse(event.data);
        const messages = [ ... this.state.messages, JSON.parse(event.data) ]
        this.setState({messages: messages});
      }
    };

   }

  sendMsg = (text) => {
    const newMessage = {username: this.state.user, content: text};

    this.socket.send(JSON.stringify(newMessage));


  }
  render() {
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
              Chat
          </Toolbar>
        </AppBar>
        <Messages messages={this.state.messages}/>
        <ChatBar sendMsg={this.sendMsg} user={this.state.user}/>
      </div>
    );
  }
}