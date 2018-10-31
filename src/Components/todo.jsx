import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios'
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: props.userInfo.userid,
      role: props.userInfo.role,
      relation: props.userInfo.relation,
      tab: 0,
      tasks: {},
      new_title: '',
      new_content: ''
    }
  }
  handleChange = (event, value) => {
    this.setState({tab: value});
  }
  componentDidMount() {
    const options = {
      method: "GET",
      url: 'http://localhost:3000/api/tasks/index',
      params: {id: this.state.userid,
        role: this.state.role}
    }
    axios(options)
    .then((response) => {
      const reminders = response.data.reminders;
      console.log(response.data.reminders)
      const tasks = {};
      if (this.state.role != 'client') {
        reminders.forEach((task) => {
          if (!tasks[task.client_id]) {
            tasks[task.client_id] = [task]
          } else {
            tasks[task.client_id].push(task);
          }
        })
      } else {
        reminders.forEach((task) => {
          if (!tasks[task.doctor_id]) {
            tasks[task.doctor_id] = [task]
          } else {
            tasks[task.doctor_id].push(task);
          }
        })
      }
      this.setState({tasks})
    })
  }
  delete_helper = (id, userid) => {
    const options = {
      method: "POST",
      url: 'http://localhost:3000/api/tasks/destroy',
      data: {id: id,
        doctor_id: this.state.userid,
        client_id: userid
      }
    }
    axios(options)
    .then((response) => {
      const tasks = this.state.tasks;
      tasks[userid] = response.data.reminders;
      this.setState({tasks})
    })
  }
  handleClick = (userid) => {
    const options = {
      method: "POST",
      url: 'http://localhost:3000/api/tasks/create',
      data: {
        doctor_id: this.state.userid,
        client_id: userid,
        title: this.state.new_title,
        content: this.state.new_content
      }
    }
    this.setState({new_title: '',
      new_content: ''})
    axios(options)
    .then((response) => {
      const tasks = this.state.tasks;
      tasks[userid] = response.data.reminders;
      this.setState({tasks})
    })
  }
  task_helper = (person) => {
    return this.state.tasks[person.id] ? this.state.tasks[person.id] : [];
  }
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  add_task = (person) => {
    if (JSON.parse(localStorage.getItem('token')).role !== "client") {
    return (
      <TableRow>
        <TableCell>
          <TextField
            name = "new_title"
            label="New Title"
            style={{ margin: 8 }}
            placeholder="Enter Title"
            margin="normal"
            value={this.state.new_title}
            onChange={this.handleInputChange}
          />
        </TableCell>
        <TableCell>
          <TextField
            name = "new_content"
            label="New Description"
            style={{ margin: 8 }}
            placeholder="Enter Description"
            margin="normal"
            value={this.state.new_content}
            onChange={this.handleInputChange}
            multiline={true}
            rowsMax={5}
          />
        </TableCell>
        <TableCell>
          <Button variant="fab" color="primary" aria-label="Add" onClick={() => this.handleClick(person.id)}>
            <AddIcon />
          </Button>
        </TableCell>
      </TableRow>)
    }
  }

  delete_icon = (task, person) => {
    if (JSON.parse(localStorage.getItem('token')).role !== "client") {
    return (<TableCell>
                    <Button variant="fab" aria-label="Delete" onClick={() => this.delete_helper(task.id, person.id)}>
                      <DeleteIcon />
                    </Button>
                  </TableCell>
      )
  }

  }
  render() {

    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
              Reminder
          </Toolbar>
        </AppBar>

        <AppBar position="static">
          <Tabs value={this.state.tab} onChange={this.handleChange}>
          {
            this.state.relation.map((person, index) => (
              <Tab label={person.first_name} />
            ))
          }
          </Tabs>
        </AppBar>
        {
          this.state.relation.map((person, index) => (
            this.state.tab === index &&
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {this.add_task(person)}
              {
                this.task_helper(person).map((task, index) => (
                  <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.content}</TableCell>
                  {this.delete_icon(task, person)}
                  </TableRow>
                ))
              }
              </TableBody>
            </Table>
            )
          )
        }
      </div>
    );
  }

}

export default Todo
