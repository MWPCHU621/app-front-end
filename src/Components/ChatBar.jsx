import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';

export default class ChatBar extends Component {
   constructor() {
    super();
    this.state = {
      text: ''
    };
  }

  render() {
    return (
      <footer className="chatbar" style={{bottom: 0}} >
        <form onSubmit={this.handleFormSubmit}>
          <TextField
            id="outlined-full-width"
            label="Chat Bar"
            style={{ margin: 8 }}
            placeholder="Type a message and hit ENTER"
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            value={this.state.text}
            onChange={this.handleInputChange}
            onKeyDown={this.keydownFunction}
          />
        </form>
      </footer>
    );
  }
  keydownFunction = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
     this.handleFormSubmit(e);
    }
  }
  handleInputChange = (e) => {
    this.setState({ text: e.target.value });
  };

  handleFormSubmit = e => {
    this.props.sendMsg(this.state.text)
    this.setState({ text: '' });
  };
}
