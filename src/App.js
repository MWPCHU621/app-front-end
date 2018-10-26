import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
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

// const userInfo = localStorage.getItem('token');

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: (localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).first_name : ''),
      role: (localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).role : null),
      userid: (localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).user_id : null),
      relation: (localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).relation : null)
    };
  }
  // componentDidMount() {
  //   const options = {
  //     method: "GET",
  //     url: 'http://localhost:3000/api/testings/index'
  //   }
  //   axios(options)
  //   .then((response) => {
  //     if (response.data) {
  //       // this.setState({message: response.data.message})
  //     }
  //   })
  // }
  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState({
      username: null,
      role: null,
      userid: null
    });
  }
  handleLogin = (userInfo) => {
    let myStorage = window.localStorage;
    let userInfoString = JSON.stringify(userInfo)
    myStorage.setItem("token", userInfoString)
    this.setState({
      username: userInfo.first_name,
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
              <div><ButtonAppBar handleLogout={this.handleLogout} /><Home /></div>
              )}
            />
            <Route exact path="/dashboard" render={() => (
              <div><ButtonAppBar />
              <Dashboard userid={this.state.userid}
              relation={this.state.relation}
              role={this.state.role} updateRelation={this.updateRelation} />
              </div>)}
            />
            <Route path="/register" render={() => (<div><ButtonAppBar /><Register /></div>)} />
            <Route path="/login"  render={(props) => (<div><ButtonAppBar /><Login handleLogin={this.handleLogin} /></div>) } />
            <Route exact path="/calendar" render={(props) => (<div><ButtonAppBar /><Calendar relation={this.state.relation} {...props} /></div>)} />
            <Route exact path = "/calendar/create_event" component = {CreateEvent} />
            <Route exact path = "/calendar/edit_event" component={EditEvent} />
            <Route path="/messages" render={(props) => (
              <div><ButtonAppBar />
              <ChatRoom username={this.state.username}
              userid={this.state.userid} />
              </div>
              )} />
            <Route path="/todo" render={(props) => (<div><ButtonAppBar /><Todo username={this.state.username} /> </div>)} />

          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
