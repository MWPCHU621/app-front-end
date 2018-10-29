import React, { Component } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Dashboard from './Dashboard.jsx'
import Register from './user/Register.jsx'
import Login from './user/login.jsx'
import Nav from './Components/Nav.jsx'
import Sidebar from './Components/Sidebar.jsx'
import Calendar from './Components/Calendar.jsx'
import ChatRoom from './Components/ChatRoom.jsx'
import CreateEvent from './Components/CreateEvent.jsx'
import EditEvent from  './Components/EditEvent.jsx'
import Home from './Components/Home.jsx'
import Todo from './Components/todo.jsx'
import Search from './Components/Search.jsx'
import createHistory from 'history/createBrowserHistory'

const history = createHistory({
  forceRefresh: true
})
class App extends Component {
  constructor() {
    super();
    this.state = {
      first_name: (localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).first_name : ''),
      last_name: (localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).last_name : ''),
      role: (localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).role : null),
      userid: (localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).user_id : null),
      relation: (localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).relation : null),
      notification: 0,
      messages: {},
    };
  }
  componentDidmount() {

  }
  handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/');
  }
  handleLogin = (userInfo) => {
    let myStorage = window.localStorage;
    let userInfoString = JSON.stringify(userInfo)
    myStorage.setItem("token", userInfoString)
    this.setState({
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      role: userInfo.role,
      userid: userInfo.user_id,
      relation: userInfo.relation,
    });
  }
  updateRelation = (relation) => {
    this.setState({
      relation: relation
    });
    let token = JSON.parse(localStorage.getItem('token'));
    localStorage.removeItem('token');
    token.relation = relation;
    let myStorage = window.localStorage;
    myStorage.setItem("token", JSON.stringify(token))
  }
  reset_notification_helper = (notification) => {
    this.setState({notification: 0});
  }

  render() {
    let count = 0;
    if (this.state.userid) {
      if (!this.socket) {
        this.socket = new WebSocket("ws://localhost:3003");
      }

      this.socket.onopen =  (event) => {
        console.log("app render WebSocket")
        this.socket.send(this.state.userid);
        this.socket.onmessage = (event) => {
          console.log("event.data",event.data);
          const received = JSON.parse(event.data);

          if (received.sender_id === this.state.userid) { //if this is the message I sent
            if (!this.state.messages[received.recipient_id]) {
              let messages = this.state.messages
              messages[received.recipient_id] = [received]
              this.setState({messages: messages});
            } else {
              let messages = this.state.messages
              messages[received.recipient_id].push(received);
              this.setState({messages: messages});
            }
          } else { //someone send me message

            if (!this.state.messages[received.sender_id]) {
              let messages = this.state.messages
              messages[received.sender_id] = [received]
              this.setState({messages: messages});
            } else {
              let messages = this.state.messages
              messages[received.sender_id].push(received);
              this.setState({messages: messages});
            }
            this.setState({notification: ++count}); /////
          }
        }
      };
    }

    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" render={() => (
              <div>
              <Nav userid={this.state.userid} handleLogout={this.handleLogout} />
              <Home />
              </div>
              )}
            />
            <Route exact path="/dashboard" render={() => (
              <div>
              <Nav userid={this.state.userid} handleLogout={this.handleLogout} />
              <Sidebar history={history} notification={this.state.notification} />
              <Dashboard userid={this.state.userid}
              relation={this.state.relation}
              role={this.state.role} updateRelation={this.updateRelation}
               />
              </div>)}
            />
            <Route path="/register" render={() => (
              <div>
              <Nav userid={this.state.userid} handleLogout={this.handleLogout} />
              <Register history={history} /></div>)} />
            <Route path="/login" render={() => (
              <div>
              <Nav userid={this.state.userid} handleLogout={this.handleLogout} />
              <Login history={history} handleLogin={this.handleLogin} /></div>) } />
            <Route exact path="/calendar" render={(props) => (
              <div>
              <Nav userid={this.state.userid} handleLogout={this.handleLogout} />
              <Sidebar history={history} notification={this.state.notification} />
              <Calendar relation={this.state.relation} {...props} /></div>)} />
            <Route exact path = "/calendar/create_event" component = {CreateEvent} />
            <Route exact path = "/calendar/edit_event" component={EditEvent} />
            <Route path="/messages" render={(props) => (
              <div>
              <Nav userid={this.state.userid} handleLogout={this.handleLogout} />
              <Sidebar history={history} notification={this.state.notification} />
              <ChatRoom history={history}
              reset_notification_helper={this.reset_notification_helper}
              messages={this.state.messages} userInfo={this.state} />
              </div>
              )} />
            <Route path="/reminder" render={(props) => (
              <div>
              <Nav userid={this.state.userid} handleLogout={this.handleLogout} />
              <Sidebar history={history} notification={this.state.notification} />
              <Todo userInfo={this.state} /> </div>)} />


          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
