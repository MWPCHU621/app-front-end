import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Email from '@material-ui/icons/Email';
import Lock from '@material-ui/icons/Lock';
import styles from '../Style/login.css'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      show:false,
      message:'',
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const option = {
      method: "POST",
      url: 'http://localhost:3000/api/sessions/create',
      data: {
        email:this.state.email,
        password:this.state.password,
      }
    }
    if(this.state.email === '' || this.state.password === '') {

    } else {
      axios(option)
      .then((response) => {
        if (response.status === 200) {
          const userInfo = jwt_decode(response.data.token)
          this.props.handleLogin(userInfo);
          this.props.history.push('/dashboard')
        }
      })
    }
  }
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className='loginForm_divContainer'>
        <h2 className='loginForm_title'>Login</h2>
        <p className='loginForm_description'>Please enter your email and password</p>
        <form onSubmit={this.handleSubmit} className="loginForm_form">
          <TextField
            className="loginForm_input"
            name = "email"
            label="Email"
            style={{ margin: 8 }}
            placeholder="Enter your Email"
            margin="normal"
            onChange={this.handleInputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" className='icon'>
                  <Email />
                </InputAdornment>
              ),
            }}
          />
          <br/>
          <TextField
            className="loginForm_input"
            name = "password"
            label="Password"
            style={{ margin: 8 }}
            placeholder="Enter your Password"
            type="password"
            margin="normal"
            onChange={this.handleInputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" className='icon'>
                  <Lock />
                </InputAdornment>
              ),
            }}
          />
          <br/>
          <Button type="submit" color="primary" className="loginForm_submitBtn">
            Submit
          </Button>
          <Button color='primary' className='loginForm_registerBtn'>
            <a href='/register' className = 'loginForm_registerAnchor'>Register Here!</a>
          </Button>
        </form>
      </div>

    );
  }
}

export default withStyles(styles)(Login);

