import React, { Component } from "react";
import ChatBar from './ChatBar.jsx'
import Messages from './Messages.jsx'
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import axios from 'axios'

export default class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: props.userInfo.userid,
      first_name: props.userInfo.first_name,
      relation: props.userInfo.relation,
      messages: {},
      tab: 0,
      // count: 0,
    }
  }
   componentDidMount() {
    let count = 0;
    console.log("chat room did mount ")
    console.log(this.props.history.location.pathname) // === '/messages'
    this.props.reset_notification_helper();
    // this.socket = new WebSocket("ws://localhost:3003");
    // this.socket.onopen =  (event) => {
    //   this.socket.send(this.state.userid);
    //   this.socket.onmessage = (event) => {
    //     console.log("event.data",event.data);
    //     const received = JSON.parse(event.data);

    //     if (received.sender_id === this.state.userid) { //if this is the message I sent
    //       if (!this.state.messages[received.recipient_id]) {
    //         let messages = this.state.messages
    //         messages[received.recipient_id] = [received]
    //         this.setState({messages: messages});
    //       } else {
    //         let messages = this.state.messages
    //         messages[received.recipient_id].push(received);
    //         this.setState({messages: messages});
    //       }
    //     } else { //someone send me message
    //       this.props.notification_helper(++count); /////
    //       if (!this.state.messages[received.sender_id]) {
    //         let messages = this.state.messages
    //         messages[received.sender_id] = [received]
    //         this.setState({messages: messages});
    //       } else {
    //         let messages = this.state.messages
    //         messages[received.sender_id].push(received);
    //         this.setState({messages: messages});
    //       }
    //     }
    //   }
    // };
   }

  sendMsg = (text) => {
    const newMessage = {
      sender_id: this.state.userid,
      sender_name: this.state.first_name,
      recipient_id: this.state.relation[this.state.tab].id,
      content: text
    };
    this.socket = new WebSocket("ws://localhost:3003");
    this.socket.onopen =  (event) => {
    this.socket.send(JSON.stringify(newMessage));
  }

    const option = {
      method: "POST",
      url: 'http://localhost:3000/api/messages/create',
      data: {message: newMessage}
    }
    axios(option)
    .then((response) => {
      if (response.status === 200) {
        console.log('saved')
      }
    })
  }

  handleChange = (event, value) => {
    this.setState({tab: value});
  }

  render() {
    let message_display_helper =
      this.state.relation.map((person, index) => (
            this.state.tab === index &&  <Messages messages={this.props.messages[person.id] ? this.props.messages[person.id] : []} id={person.id}/>
            )
          )

    const chat = <div>
        <AppBar position="static" color="default">
          <Toolbar>
              Chat
          </Toolbar>
        </AppBar>
        <AppBar position="static">
          <Tabs value={this.state.tab} onChange={this.handleChange}>
          {
            this.state.relation.map((person, index) => (
              <Tab label={person.first_name} />
            )
            )
          }
          </Tabs>
        </AppBar>
        {message_display_helper}
        <ChatBar sendMsg={this.sendMsg} />
      </div>
    return (<React.Fragment>{chat}</React.Fragment>);
  }
}
