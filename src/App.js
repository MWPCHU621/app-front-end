import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Dashboard from './Dashboard.jsx'
import Register from './user/Register.jsx'
import Login from './user/login.jsx'
import ButtonAppBar from './Components/Nav.jsx'
import Calendar from './Components/Calendar.jsx'
import ChatRoom from './Components/ChatRoom.jsx'
import CreateEvent from './Components/CreateEvent.jsx'
import EditEvent from  './Components/EditEvent.jsx'
import Home from './Components/Home.jsx'
import Todo from './Components/todo.jsx'
import Search from './Components/Search.jsx'


class App extends Component {
  constructor() {
    super();
    this.state = {
      first_name: (localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).first_name : ''),
      last_name: (localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).last_name : ''),
      role: (localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).role : null),
      userid: (localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).user_id : null),
      relation: (localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).relation : null)
    };
  }

  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState({
      first_name: null,
      last_name: null,
      role: null,
      userid: null
    });
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
      relation: userInfo.relation
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
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" render={() => (
              <div><ButtonAppBar userid={this.state.userid} handleLogout={this.handleLogout} /><Home /></div>
              )}
            />
            <Route exact path="/dashboard" render={() => (
              <div><ButtonAppBar />
              <Dashboard userid={this.state.userid}
              relation={this.state.relation}
              role={this.state.role} updateRelation={this.updateRelation} />
              </div>)}
            />
            <Route path="/register" render={() => (<div><ButtonAppBar userid={this.state.userid} /><Register /></div>)} />
            <Route path="/login"  render={(props) => (<div><ButtonAppBar userid={this.state.userid} /><Login handleLogin={this.handleLogin} /></div>) } />
            <Route exact path="/calendar" render={(props) => (<div><ButtonAppBar userid={this.state.userid} /><Calendar relation={this.state.relation} {...props} /></div>)} />
            <Route exact path = "/calendar/create_event" component = {CreateEvent} />
            <Route exact path = "/calendar/edit_event" component={EditEvent} />
            <Route path="/messages" render={(props) => (
              <div><ButtonAppBar userid={this.state.userid} />
              <ChatRoom userInfo={this.state} />
              </div>
              )} />
            <Route path="/task" render={(props) => (<div><ButtonAppBar userid={this.state.userid} /><Todo userInfo={this.state} /> </div>)} />
            <Route exact path="/search"  render={(props) => (<div><ButtonAppBar /><Search /> </div> )} />


          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
