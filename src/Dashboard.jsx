import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: props.userid,
      add_client_email: "",
      role: props.role,
      relation: props.relation
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
  render() {
    return (
      <div>
        <p>Im Dashboard page</p>
        <form onSubmit={this.handleSubmit}>
          <TextField
              label="Add Client"
              style={{ margin: 8 }}
              placeholder="Enter Client Email"
              margin="normal"
              onChange={this.handleInputChange}
              value={this.state.add_client_email}
            />
          <Button color="inherit" type="submit">Add</Button>
        </form>

        <List>


        </List>

      </div>
    );
  }
}

