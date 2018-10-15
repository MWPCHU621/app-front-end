import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor() {
    super();
    this.state = {
      message: ""
    };
  }
  componentDidMount() {
    const options = {
      method: "GET",
      url: 'http://localhost:3000/api/testings/index'
    }
    axios(options)
    .then((response) => {
      if (response.data) {
        this.setState({message: response.data.message})
      }
    })
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <p>{this.state.message}</p>
        </header>
      </div>
    );
  }
}

export default App;
