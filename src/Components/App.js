import React, { Component } from 'react';
import '../Style/App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Dashboard from './Dashboard.jsx'
import Register from './Register.jsx'
import Login from './Login.jsx'
import Nav from './Nav.jsx'
import Sidebar from './Sidebar.jsx'
import Calendar from './Calendar.jsx'
import ChatRoom from './ChatRoom.jsx'
import CreateEvent from './CreateEvent.jsx'
import EditEvent from  './EditEvent.jsx'
import Home from './Home.jsx'
import Todo from './todo.jsx'
import Nutrition from './nutrition/nutrition.jsx'
import Exercise from './nutrition/exercise.jsx'
// import Search from './Search.jsx'

import createHistory from 'history/createBrowserHistory'
import axios from 'axios'

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
  componentDidMount() {
    if (this.state.role === 'client') {
      const option = {
        method: "GET",
        url: 'http://localhost:3000/api/sessions/update',
        params: {id: this.state.userid}
      }
      axios(option)
      .then((response) => {
        console.log(response.data.updated_relation)
        if (response.status === 200) {
          let token = JSON.parse(localStorage.getItem('token'));
          localStorage.removeItem('token');
          token.relation = response.data.updated_relation;
          let myStorage = window.localStorage;
          myStorage.setItem("token", JSON.stringify(token))
          this.setState({relation: response.data.updated_relation})
        }
      })
    }

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
    if (this.state.userid) {
      if (!this.socket) {
        this.socket = new WebSocket("ws://localhost:3003");
      }

      this.socket.onopen =  (event) => {
        this.socket.send(this.state.userid);
        this.socket.onmessage = (event) => {
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
              let count = this.state.notification + 1
              this.setState({notification: count});
          }
        }
      };
    }

    return (
      <div className="app_container">
        <Router>
          <Switch>
            <Route exact path="/" render={() => (
              <div className='app_routeContainer'>
                <Sidebar history={history}  notification={this.state.notification}/>
                  <Nav userid={this.state.userid} handleLogout={this.handleLogout} />
                <div className="app_mainContent">
                  <Home />
                </div>
              </div>
              )}
            />
            <Route exact path="/dashboard" render={() => (
              <div className='app_routeContainer'>
                <Sidebar history={history} notification={this.state.notification} />
                  <Nav userid={this.state.userid} handleLogout={this.handleLogout} />
                <div className="app_mainContent">
                  <Dashboard userid={this.state.userid}
                  relation={this.state.relation}
                  role={this.state.role} updateRelation={this.updateRelation}/>
                </div>
              </div>)}
            />
            <Route path="/register" render={() => (
              <div className='app_routeContainer'>
                <Nav userid={this.state.userid} handleLogout={this.handleLogout} />
                <Register history={history} />
              </div>)} />
            <Route path="/login" render={() => (
              <div className='app_routeContainer'>
                <Nav userid={this.state.userid} handleLogout={this.handleLogout} />
                <Login history={history} handleLogin={this.handleLogin} />
              </div>) } />
            <Route exact path="/calendar" render={(props) => (
              <div className='app_routeContainer'>
                <Sidebar history={history} notification={this.state.notification} />
                  <Nav userid={this.state.userid} handleLogout={this.handleLogout} />
                <div className="app_mainContent">
                  <Calendar relation={this.state.relation} {...props} />
                </div>
              </div>)} />
            <Route exact path = "/calendar/create_event" component = {CreateEvent} />
            <Route exact path = "/calendar/edit_event" component={EditEvent} />
            <Route path="/messages" render={(props) => (
              <div className='app_routeContainer'>
                <Sidebar history={history} notification={this.state.notification} />
                  <Nav userid={this.state.userid} handleLogout={this.handleLogout} />
                <div className="app_mainContent" >
                  <ChatRoom history={history}
                  reset_notification_helper={this.reset_notification_helper}
                  messages={this.state.messages} userInfo={this.state} />
                </div>
              </div>)} />
            <Route path="/reminder" render={(props) => (
              <div className='app_routeContainer'>
                <Sidebar history={history} notification={this.state.notification} />
                <Nav userid={this.state.userid} handleLogout={this.handleLogout} />
                <div className="app_mainContent" >
                  <Todo userInfo={this.state} />
                </div>
              </div>)} />
            <Route path="/nutrition" render={(props) => (
              <div className='app_routeContainer'>
                <Sidebar history={history} notification={this.state.notification} />
                <Nav userid={this.state.userid} handleLogout={this.handleLogout} />
                <div className="app_mainContent">
                  <Nutrition userInfo={this.state} />
                </div>
              </div>)} />
            <Route path="/exercise" render={(props) => (
              <div className='app_routeContainer'>
                <Sidebar history={history} notification={this.state.notification} />
                <Nav userid={this.state.userid} handleLogout={this.handleLogout} />
                <div className='app_mainContent'>
                  <Exercise userInfo={this.state} />
                </div>
              </div>)} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
