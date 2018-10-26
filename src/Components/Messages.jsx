import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default class Messages extends Component {


  render() {
    const messageRender = this.props.messages.map((msg) =>  {
        return (
          <div className="message">

            <List>
              <ListItem button>
                <ListItemText primary={msg.sender_name} secondary={msg.content} />
              </ListItem>
            </List>
          </div>
          )
    })
    return (
      <div  className="messages">{messageRender}</div>
    );
  }
}

