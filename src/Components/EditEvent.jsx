import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom'
import axios from 'axios'

import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Title from '@material-ui/icons/Title'
import Description from '@material-ui/icons/Description'
import DateRange from '@material-ui/icons/DateRange'
import AddIcon from '@material-ui/icons/Add'
import CancelIcon from '@material-ui/icons/Close'

import '../Style/editEvent.css'


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
      <div className='editEvent_container'>
        <h2 className='createEvent_title'>Edit Event</h2>
        <form onSubmit={this.handleSubmit} className='createEvent_form'>

          <TextField
            className='createEvent_input'
            name = "title"
            label="Title"
            style={{ margin: 8 }}
            placeholder="Enter title of event"
            value= {this.state.title}
            margin="normal"
            onChange={this.handleInputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" className='icon'>
                  <Title />
                </InputAdornment>
              ),
            }}
          />
          <br/>
          <TextField
            className='createEvent_input'
            name = "description"
            label="Description"
            style={{ margin: 8 }}
            placeholder="Enter description of event"
            value={this.state.description}
            margin="normal"
            onChange={this.handleInputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" className='icon'>
                  <Description />
                </InputAdornment>
              ),
            }}
          />
          <br/>
          <TextField
            className='createEvent_time start'
            name = "start"
            label="Start Date"
            style={{ margin: 8 }}
            placeholder="YYYY-MM-DD"
            value={this.state.start}
            margin="normal"
            onChange={this.handleInputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" className='icon'>
                  <DateRange />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            className='createEvent_time end'
            name = "end"
            label="End Date"
            style={{ margin: 8 }}
            placeholder="YYYY-MM-DD"
            value={this.state.end}
            margin="normal"
            onChange={this.handleInputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" className='icon'>
                  <DateRange />
                </InputAdornment>
              ),
            }}
          />
          <br/>
          <InputLabel htmlFor="allday">All Day</InputLabel>
          <Select
            className='createEvent_select__allday'
            id="allday"
            value={this.state.allday}
            name="allday"
            onChange={this.handleInputChange}
            style={{minWidth: 120}}
          >
            <MenuItem value={true}>True</MenuItem>
            <MenuItem value={false}>False</MenuItem>
          </Select>
          <br/>
          <InputLabel htmlFor="client">Client</InputLabel>
          <Select
            className='createEvent_select client'
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
          <br/>
          <Button type="submit" color="primary" className='createEvent_btn save'>
            Save
            <AddIcon className='rightIcon'/>
          </Button>
          <Button color="primary" className='createEvent_btn'>
              <a href="/calendar" className='createEvent_anchor'>Cancel</a>
              <CancelIcon className='rightIcon'/>
          </Button>
        </form>
      </div>

    );
  }
}

export default EditEvent

