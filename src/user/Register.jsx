import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      password_confirmation: '',
      role: ''
    };
  }
  submit = (e) => {
  }
  //this.props.handleRegister
  render() {
    return (
      <div>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Register
          </Typography>
        </Toolbar>
      </AppBar>
      <form onSubmit={this.submit}>

        <TextField
          id="standard-full-width"
          label="First Name"
          style={{ margin: 8 }}
          placeholder="Enter your First Name"
          margin="normal"
        />
        <TextField
          id="standard-full-width"
          label="Last Name"
          style={{ margin: 8 }}
          placeholder="Enter your Last Name"
          margin="normal"
        />
        <TextField
          id="standard-full-width"
          label="Email"
          style={{ margin: 8 }}
          placeholder="Placeholder"
          margin="normal"
        />
        <TextField
          hintText="Enter your Last Name"
          floatingLabelText="Last Name"
        />
        <RadioGroup name="sex" >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
      </form>
      </div>

    );
  }
}

export default Register

