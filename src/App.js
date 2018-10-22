import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Dashboard from './Dashboard.jsx'
import Register from './user/Register.jsx'
import ButtonAppBar from './Components/Nav.jsx'
import Calendar from './Components/Calendar.jsx'
class App extends Component {
  constructor() {
    super();
    this.state = {
      currentuser: null,
      jwt: null
    };
  }
  componentDidMount() {
    const options = {
      method: "GET",
      url: 'http://localhost:3000/api/testings/index'
    }
    axios(options)
    .then((response) => {
      if (response.data) {
        // this.setState({message: response.data.message})
      }
    })
  }
  _handleRegister = () => {

  }
  render() {
    return (
      <div>
      <ButtonAppBar />
        <Router>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/register" handleRegister = {this._handleRegister} component={Register} />
            <Route path="/calendar" component={Calendar} />
          </Switch>
          </Router>
      </div>
    );
  }
}

export default App;
