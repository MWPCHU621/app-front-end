import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'
// import List from '@material-ui/core/List';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import '../Style/dashboard.css'

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: props.userid,
      add_client_email: "",
      role: props.role,
      relation: props.relation,
      tab: 0
    }
  }
  handleInputChange = e => {
    this.setState({ add_client_email: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ add_client_email: "" });
    const option = {
      method: "POST",
      url: 'http://localhost:3000/api/users/update',
      data: this.state
    }
    axios(option)
    .then((response) => {
      if (response.status === 200) {
        console.log(response.data.updated_relation)
        this.props.updateRelation(response.data.updated_relation);
        this.setState({relation: response.data.updated_relation})
      }
    })
  }
  handleChange = (event, value) => {
    this.setState({tab: value});
  }
  render() {
    let tabs;
    let addClient;
    if (JSON.parse(localStorage.getItem('token')).role !== "client") {
      tabs = <Tabs value={this.state.tab} onChange={this.handleChange}>
      <Tab label="New Client" />
      {
        this.state.relation.map((person, index) => (
          <Tab label={person.first_name} />
        ))
      }
      </Tabs>

      addClient = <div>
        {
          this.state.tab === 0 &&
          <form className='dashboard_form__addClient' onSubmit={this.handleSubmit}>
            <TextField
              className='dashboard_input__newClient'
              label="Add Client"
              style={{ margin: 8 }}
              placeholder="Enter Client Email"
              margin="normal"
              onChange={this.handleInputChange}
              value={this.state.add_client_email}

            />
          <Button color="inherit" type="submit" className='dashboard_form__submitBtn'>Add</Button>
          </form>
        }
        {this.state.relation.map((person, index) => (
            (this.state.tab - 1) === index &&
            <div className='dashboard_description'>
              <label className='dashboard_description__label'>Client: </label>
              <label className='dashboard_description__name'>{person.first_name} {person.last_name}</label>
              <label className='dashboard_description__lname'></label>
              <br></br>
              <label className='dashboard_description__label'>Email: </label>
              <label className='dashboard_description__email'>{person.email}</label>
            </div>))
        }
      </div>
    }

    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar style={{textAlign:"center"}}>
              Dashboard
          </Toolbar>
        </AppBar>

        <AppBar position="static">
          {tabs}
        </AppBar>
        <h1 className='dashboard_greeting'>Welcome Back! {JSON.parse(localStorage.getItem('token')).first_name}</h1>
        {addClient}
      </div>
    );
  }
}

