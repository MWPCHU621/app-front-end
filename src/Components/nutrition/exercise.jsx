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
class Nutrition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: props.userInfo.userid,
      role: props.userInfo.role,
      relation: props.userInfo.relation,
      tab: 0,
      exercises: [],
      new_exercise: '',
    }
  }
  handleChange = (event, value) => {
    this.setState({tab: value});
  }
  componentDidMount() {
    let id;
    if (this.state.role === 'client') {
      id = this.state.userid
    } else {
      id = this.state.relation.map(person => person.id)
    }
    const options = {
      method: "GET",
      url: 'http://localhost:3000/api/nutritions/index',
      params: {id: id}
    }
    axios(options)
    .then((response) => {
      console.log(response.data)
    })
  }

  // delete_helper = (id) => {
  //   const options = {
  //     method: "POST",
  //     url: 'http://localhost:3000/api/tasks/destroy',
  //     data: {id: id,
  //       client_id: this.state.userid,
  //     }
  //   }
  //   axios(options)
  //   .then((response) => {
  //     const tasks = this.state.tasks;
  //     tasks[userid] = response.data.reminders;
  //     this.setState({tasks})
  //   })
  // }
  handleClick = () => {
    const options = {
      method: "POST",
      url: 'https://trackapi.nutritionix.com/v2/natural/exercise',
      headers: {
        'x-app-id': '6f20e60a',
        'x-app-key': '8c1c3fc675791ad02e8e5718aa3847cc',
        'x-remote-user-id': 0,
        'Content-Type': 'application/json',
      },
      data: {
        query: 'running',//this.state.new_exercise,
        "gender":"female",
         "weight_kg":72.5,
         "height_cm":167.64,
         "age": 24
      }
    }

    this.setState({new_food: ''})
    axios(options)
    .then((response) => {
      console.log(response.data.exercises)
      if (response.data) {
        let newexercise = response.data.exercises.map(exercise => {
          let modified = {};
          modified.user_id = this.state.userid
          modified.name = exercise.name
          modified.calories = exercise.nf_calories
          modified.duration = exercise.duration_min
          return modified;
        })
        const option = {
          method: "POST",
          url: 'http://localhost:3000/api/exercises/create',
          data: {
            exercise: newexercise,
          }
        }
        axios(option)
        .then((response) => {
          const exercises = this.state.exercises;
          exercises = exercises.concat(response.data.exercises)
          this.setState({exercises: exercises})
        })
      }
    })
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // delete_icon = (food) => {
  //   if (JSON.parse(localStorage.getItem('token')).role === "client") {
  //   return (<TableCell>
  //                   <Button variant="fab" aria-label="Delete" onClick={() => this.delete_helper(food.id)}>
  //                     <DeleteIcon />
  //                   </Button>
  //                 </TableCell>
  //     )
  // }


  render() {
    let add_food
    if (this.state.role === 'client') {
      add_food = <TableRow><TableCell>
                <TextField
                  name = "new_exercise"
                  label="New Exercise"
                  style={{ margin: 8 }}
                  placeholder="Enter Exercise Query, ex. ran 3 miles"
                  margin="normal"
                  value={this.state.new_exercise}
                  onChange={this.handleInputChange}
                />
              </TableCell>
              <TableCell>
                <Button variant="fab" color="primary" aria-label="Add" onClick={this.handleClick}>
                  <AddIcon />
                </Button></TableCell>
                </TableRow>
            }
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
              Nutrition
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
                  <TableCell>Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Serving Size (g)</TableCell>
                  <TableCell>Calories</TableCell>
                  <TableCell>Carbohydrates (g)</TableCell>
                  <TableCell>Protein (g)</TableCell>
                  <TableCell>Fat (g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {add_food}
                {
                  this.state.exercises.map((food, index) => (
                    <TableRow key={index}>
                    <TableCell>{food.food_name}</TableCell>
                    <TableCell>{food.serving_qty}</TableCell>
                    <TableCell>{food.serving_weight_grams}</TableCell>
                    <TableCell>{food.nf_calories}</TableCell>
                    <TableCell>{food.nf_total_carbohydrate}</TableCell>
                    <TableCell>{food.nf_protein}</TableCell>
                    <TableCell>{food.nf_total_fat}</TableCell>
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

export default Nutrition
