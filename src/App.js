import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios'
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
class App extends Component {
  constructor() {
    super();
    this.state = {
      role: null,
      jwt: null
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
  handleLogin = (jwt) => {
    this.setState({jwt: jwt});
  }
  render() {
    return (
      <div>
      <ButtonAppBar />
        <Router>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/register" component={Register} />
            <Route path="/login"  component={() => <Login handleLogin={this.handleLogin} />} />
            <Route path="/calendar" component={Calendar} />
            <Route path="/messages" component={ChatRoom} />
          </Switch>
          </Router>
      </div>
    );
  }
}

export default App;
