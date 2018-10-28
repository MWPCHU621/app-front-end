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
class EditEvent extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.location.state.referrer.allday)
    this.state = {
      id:this.props.location.state ? this.props.location.state.referrer.id : "",
      title: this.props.location.state ? this.props.location.state.referrer.title : "",
      description: this.props.location.state ? this.props.location.state.referrer.description : "",
      start: this.props.location.state ? this.props.location.state.referrer.start : "",
      end: this.props.location.state ? this.props.location.state.referrer.end : "",
      allday: this.props.location.state ? this.props.location.state.referrer.allday : false,
      client_id: this.props.location.state ? this.props.location.state.referrer.client_id : "",
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const option = {
      method: "POST",
      url: 'http://localhost:3000/api/events/update',
      data: { event: this.state }
    }
    axios(option)
    .then((response) => {
      console.log(response.data)
      this.setState({redirect: "/calendar"})
    })
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };



  render() {
    if (this.state.redirect) {
      return (
        <Redirect to={this.state.redirect} />);
    }
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
              Edit Event
          </Toolbar>
        </AppBar>
        <form onSubmit={this.handleSubmit}>

          <TextField
            name = "title"
            label="Title"
            style={{ margin: 8 }}
            placeholder="Enter title of event"
            value= {this.state.title}
            margin="normal"
            onChange={this.handleInputChange}
          />
          <TextField
            name = "description"
            label="Description"
            style={{ margin: 8 }}
            placeholder="Enter description of event"
            value={this.state.description}
            margin="normal"
            onChange={this.handleInputChange}
          />
          <TextField
            name = "start"
            label="Start Date"
            style={{ margin: 8 }}
            placeholder="YYYY-MM-DD"
            value={this.state.start}
            margin="normal"
            onChange={this.handleInputChange}
          />
          <TextField
            name = "end"
            label="End Date"
            style={{ margin: 8 }}
            placeholder="YYYY-MM-DD"
            value={this.state.end}
            margin="normal"
            onChange={this.handleInputChange}
          />
          <InputLabel htmlFor="allday">All Day</InputLabel>
          <Select
            id="allday"
            value={this.state.allday}
            name="allday"
            onChange={this.handleInputChange}
            style={{minWidth: 120}}
          >
            <MenuItem value={true}>True</MenuItem>
            <MenuItem value={false}>False</MenuItem>
          </Select>

          <InputLabel htmlFor="client">Client</InputLabel>
          <Select
            id="client_id"
            value={this.state.client_id}
            name="client_id"
            onChange={this.handleInputChange}
            style={{minWidth:120}}
          >
            {
              JSON.parse(localStorage.getItem('token')).relation.map(person => (
                <MenuItem value={person.id}>{person.first_name} {person.last_name}</MenuItem>
              ))
            }
          </Select>

          <Button type="submit" color="primary">Submit</Button>
        </form>
        <Button color="primary">
            <a href="/calendar" style={{textDecoration:"none"}}>Cancel</a>
        </Button>
      </div>

    );
  }
}

export default EditEvent

