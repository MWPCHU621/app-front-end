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
class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: props.userInfo.userid,
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
      params: {ids: this.state.relation.map(person => person.id)}
    }
    axios(options)
    .then((response) => {
      const task_list = response.data.tasks;
      const tasks = {};
      task_list.forEach((task) => {
        if (!tasks[task.user_id]) {
          tasks[task.user_id] = [task]
        } else {
          tasks[task.user_id].push(task);
        }
      })
      this.setState({tasks})
    })
  }
  handleClick = (person) => {
    console.log("clicked", person.id)
    const options = {
      method: "POST",
      url: 'http://localhost:3000/api/tasks/create',
      data: {id: person.id}
    }
    axios(options)
    .then((response) => {
      console.log(response.data);
    })
  }
  task_helper = (person) => {
    return this.state.tasks[person.id] ? this.state.tasks[person.id] : [];
  }
  handleInputChange = () => {

  }
  add_helper = (person) => {
    return (
      <TableRow>
        <TableCell>

        </TableCell>
        <TableCell></TableCell>
        <TableCell>
          <Button variant="fab" color="primary" aria-label="Add" onClick={() => this.handleClick(person)}>
            <AddIcon />
          </Button>
        </TableCell>
      </TableRow>)
  }
  render() {

    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
              Task
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
              {this.add_helper(person)}
              {
                this.task_helper(person).map((task, index) => (
                  <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.content}</TableCell>
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