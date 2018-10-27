import React, {Fragment} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      search:'',
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };


  render() {
    return(
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name = "search"
            label="Search"
            style={{ margin: 10 }}
            placeholder="Enter keywords"
            margin="normal"
            onChange={this.handleInputChange}
          />
          <Button type="submit" color="primary">Submit</Button>
        </form>
      </Fragment>
    )
  }
}

export default Search
