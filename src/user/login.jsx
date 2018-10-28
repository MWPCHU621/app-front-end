import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import jwt_decode from 'jwt-decode'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const option = {
      method: "POST",
      url: 'http://localhost:3000/api/sessions/create',
      data: this.state
    }
    axios(option)
    .then((response) => {
      if (response.status === 200) {
        const userInfo = jwt_decode(response.data.token)
        this.props.handleLogin(userInfo);
        this.props.history.push('/dashboard')
      }
    })
  }
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
              Log In
          </Toolbar>
        </AppBar>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name = "email"
            label="Email"
            style={{ margin: 8 }}
            placeholder="Enter your Email"
            margin="normal"
            onChange={this.handleInputChange}
          />
          <TextField
            name = "password"
            label="Password"
            style={{ margin: 8 }}
            placeholder="Enter your Password"
            type="password"
            margin="normal"
            onChange={this.handleInputChange}
          />

          <Button type="submit" color="primary">Submit
          </Button>
        </form>
      </div>

    );
  }
}

export default Login

