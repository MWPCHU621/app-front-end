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
      if (this.state.role === 'client') {
        this.setState({foods: response.data.foods})
      } else {
        const list_client_foods = {};
        response.data.foods.map((food) => {
          if (!list_client_foods[food.user_id]) {
            list_client_foods[food.user_id] = [food]
          } else {
            list_client_foods[food.user_id].push(food);
          }
        })
        this.setState({list_client_foods})
      }
    })
  }

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
        // let newfood = response.data.foods.map(food => {
          let food = response.data.foods[0]
          let modified = {};
          modified.user_id = this.state.userid
          modified.name = food.food_name
          modified.quantity = food.serving_qty
          modified.serving_size = food.serving_weight_grams
          modified.calories = food.nf_calories
          modified.carbohydrates = food.nf_total_carbohydrate
          modified.protein = food.nf_protein
          modified.fat = food.nf_total_fat;
        //   return modified;
        // })
        const option = {
          method: "POST",
          url: 'http://localhost:3000/api/nutritions/create',
          data: {
            nutritions: modified
          }
        }
        axios(option)
        .then((response) => {
          console.log(response.data.foods)
          this.setState({foods: response.data.foods})
        })
      }
    })
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };


  list_client_foods_helper = (person) => {
    console.log(person.id)
    console.log(this.state.list_client_foods[person.id])

    return this.state.list_client_foods[person.id] ? this.state.list_client_foods[person.id] : [];
  }
  render() {
    let table
    if (this.state.role === 'client') {
      table = <Table>
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
              </TableHead><TableBody>
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
                </TableBody></Table>

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
        {this.state.role !== 'client' &&
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
              { this.list_client_foods_helper(person).map((food, index) => (
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
      </div>
    );
  }

}

export default Nutrition
