import React, { Component } from 'react';
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Person from '@material-ui/icons/Person'
import Email from '@material-ui/icons/Email'
import Lock from '@material-ui/icons/Lock'

import '../Style/register.css'
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
      this.props.history.push('/login')
    })
  }
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className='registerForm_divContainer'>
        <h2 className='registerForm_title'>Register here</h2>
        <form onSubmit={this.handleSubmit} className="registerForm_form">
          <TextField
            className="name"
            name = "first_name"
            label="First Name"
            style={{ margin: 8 }}
            placeholder="Enter your First Name"
            margin="normal"
            onChange={this.handleInputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" className='icon'>
                  <Person />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            className="name"
            name = "last_name"
            label="Last Name"
            style={{ margin: 8 }}
            placeholder="Enter your Last Name"
            margin="normal"
            onChange={this.handleInputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" className='icon'>
                  <Person />
                </InputAdornment>
              ),
            }}
          />
          <br/>
          <TextField
            className="registerForm_input"
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
            className="registerForm_input"
            name = "password"
            label="Password"
            style={{ margin: 8 }}
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
          <TextField
            className="registerForm_input"
            name = "password_confirmation"
            label="Password Confirmation"
            style={{ margin: 8 }}
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
          <InputLabel htmlFor="role">Role</InputLabel>
          <Select
            className='registerForm_select'
            id="role"
            value={this.state.role}
            name="role"
            onChange={this.handleInputChange}
            style={{minWidth: 120}}
          >
            <MenuItem value={'physiotherapist'}>Physiotherapist</MenuItem>
            <MenuItem value={'dietitian'}>Dietitian</MenuItem>
            <MenuItem value={'counselor'}>Counselor</MenuItem>
            <MenuItem value={'client'}>Client</MenuItem>
          </Select>
          <br/>
          <Button type="submit" color="primary" className='registerForm_Btn submit'>
            Submit
          </Button>
          <Button color='primary' className='registerForm_Btn redirect'>
              <a href='/login' className = 'registerForm_loginAnchor'>Login here!</a>
          </Button>
        </form>
      </div>

    );
  }
}



export default Register

