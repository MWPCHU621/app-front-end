import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios'

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      visited: false
    }
  }
  componentDidMount() {
    const option = {
      method: "GET",
      url: 'http://localhost:3000/api/messages/index',
      params: {id: this.props.id}
    }
    axios(option)
    .then((response) => {
      if (response.status === 200) {
        this.setState({messages: response.data.messages})
      }
    })
  }

  render() {
      const messageRender_database = this.state.messages.map((msg) =>  {
        return (
          <div className="message" key={msg.id}>
            <List>
              <ListItem button>
                <ListItemText secondary={msg.sender_name} />
                <ListItemText primary={msg.content} />
              </ListItem>
            </List>
          </div>
          )
      })


    const messageRender = this.props.messages.map((msg) =>  {
        return (
          <div className="message" key={msg.id}>

            <List>
              <ListItem button>
                <ListItemText secondary={msg.sender_name} />
                <ListItemText primary={msg.content} />
              </ListItem>
            </List>
          </div>
          )
    })
    return (
      <React.Fragment>
      {messageRender_database}
      {messageRender}
      </React.Fragment>
    );
  }
}

