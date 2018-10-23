import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import  { Redirect } from 'react-router-dom'
class Register extends Component {
  constructor() {
    super();
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: '',
      role: ''
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state)
    const option = {
      method: "POST",
      url: 'http://localhost:3000/api/users/create',
      data: { user: this.state }
    }
    axios(option)
    .then((response) => {
      console.log(response.data)
      return <Redirect to='/'  />
      if (response.data.status === 500) {
       return <Redirect to='/'  />
      }
    })
  }
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };


  //this.props.handleRegister
  render() {
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
              Register
          </Toolbar>
        </AppBar>
        <form onSubmit={this.handleSubmit}>

          <TextField
            name = "first_name"
            label="First Name"
            style={{ margin: 8 }}
            placeholder="Enter your First Name"
            margin="normal"
            onChange={this.handleInputChange}
          />
          <TextField
            name = "last_name"
            label="Last Name"
            style={{ margin: 8 }}
            placeholder="Enter your Last Name"
            margin="normal"
            onChange={this.handleInputChange}
          />
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
            type="password"
            margin="normal"
            onChange={this.handleInputChange}
          />
            <TextField
            name = "password_confirmation"
            label="Password Confirmation"
            style={{ margin: 8 }}
            type="password"
            margin="normal"
            onChange={this.handleInputChange}
          />
          <InputLabel htmlFor="role">Role</InputLabel>
          <Select
            id="role"
            value={this.state.role}
            name="role"
            onChange={this.handleInputChange}
            style={{minWidth: 120}}
          >
            <MenuItem value={'doctor'}>Health Professional</MenuItem>
            <MenuItem value={'client'}>Client</MenuItem>
          </Select>
          <Button type="submit" color="primary">Submit
          </Button>
        </form>
      </div>

    );
  }
}

export default Register

