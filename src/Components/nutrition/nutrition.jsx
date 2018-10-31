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
// import DeleteIcon from '@material-ui/icons/Delete';
class Nutrition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: props.userInfo.userid,
      role: props.userInfo.role,
      relation: props.userInfo.relation,
      tab: 0,
      foods: [],
      list_client_foods: {},
      new_food: '',
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
      console.log(response.data.foods)
      if (this.state.role === 'client') {
        this.setState({foods: response.data.foods})
      } else {
        response.data.foods.forEach((food) => {
          if (!this.list_client_foods[food.user_id]) {
            this.list_client_foods[food.user_id] = [food]
          } else {
            this.list_client_foods[food.user_id].push(food);
          }
        })
      }
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
      url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
      headers: {
        'x-app-id': '6f20e60a',
        'x-app-key': '8c1c3fc675791ad02e8e5718aa3847cc',
        'x-remote-user-id': 0,
        'Content-Type': 'application/json',
      },
      data: {
        query: this.state.new_food,
        timezone: "US/Eastern"
      }
    }

    this.setState({new_food: ''})
    axios(options)
    .then((response) => {
      console.log(response.data.foods)
      if (response.data) {
        let newfood = response.data.foods.map(food => {
          let modified = {};
          modified.user_id = this.state.userid
          modified.name = food.name
          modified.quantity = food.serving_qty
          modified.serving_size = food.serving_weight_grams
          modified.calories = food.nf_calories
          modified.carbohydrates = food.nf_total_carbohydrate
          modified.protein = food.nf_protein
          modified.fat = food.nf_total_fat;
          return modified;
        })
        const option = {
          method: "POST",
          url: 'http://localhost:3000/api/nutritions/create',
          data: {
            newfood: newfood,
          }
        }
        axios(option)
        .then((response) => {
          const foods = this.state.foods;
          foods = foods.concat(response.data.foods)
          this.setState({foods: foods})
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

  list_client_foods_helper = (person) => {
    return this.list_client_foods[person.id]? this.list_client_foods[person.id] : [];
  }
  render() {
    let table
    if (this.state.role === 'client') {
      table = <TableBody>
      <TableRow><TableCell>
                <TextField
                  name = "new_food"
                  label="New Food"
                  style={{ margin: 8 }}
                  placeholder="Enter Food Query, ex. for breakfast I ate 2 eggs, bacon, and french toast"
                  margin="normal"
                  value={this.state.new_food}
                  onChange={this.handleInputChange}
                />
              </TableCell>
              <TableCell>
                <Button variant="fab" color="primary" aria-label="Add" onClick={this.handleClick}>
                  <AddIcon />
                </Button></TableCell>
                </TableRow>
                {this.state.foods.map((food, index) => (
                    <TableRow key={index}>
                    <TableCell>{food.name}</TableCell>
                    <TableCell>{food.quantity}</TableCell>
                    <TableCell>{food.serving_size}</TableCell>
                    <TableCell>{food.calories}</TableCell>
                    <TableCell>{food.carbohydrates}</TableCell>
                    <TableCell>{food.protein}</TableCell>
                    <TableCell>{food.fat}</TableCell>
                    </TableRow>
                  ))
              }
                </TableBody>

    } else {
      table = this.state.relation.map((person, index) => (
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
              { this.state.list_client_foods_helper(person).map((food, index) => (
                    <TableRow key={index}>
                    <TableCell>{food.name}</TableCell>
                    <TableCell>{food.quantity}</TableCell>
                    <TableCell>{food.serving_size}</TableCell>
                    <TableCell>{food.calories}</TableCell>
                    <TableCell>{food.carbohydrates}</TableCell>
                    <TableCell>{food.protein}</TableCell>
                    <TableCell>{food.fat}</TableCell>
                    </TableRow>
                  ))
            }
              </TableBody>

            </Table>
            )
          )

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
        {table}
      </div>
    );
  }

}

export default Nutrition
