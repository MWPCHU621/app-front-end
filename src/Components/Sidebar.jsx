import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: props.userid,
    };
  }
  navigate = (url) => {
      this.props.history.push(url)
    }
  render() {
    let messageBar;
    if (this.props.notification === 0) { //|| this.props.history.location.pathname === '/messages'
       messageBar = <Link to="/messages">
              <ListItem button>
                <ListItemText primary="Message" />
              </ListItem>
            </Link>
    } else {
       messageBar =
              <ListItem button onClick={() => this.navigate('/messages')}>
               <Badge color="primary" badgeContent={this.props.notification} >
                <ListItemText primary="Message" />
                </Badge>
              </ListItem>
    }

    return (
      <div className="sidebar" style={{width: 120}}>
        <List>
          <ListItem button onClick={() => this.navigate('/dashboard')} >
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={() => this.navigate('/calendar')}>
              <ListItemText primary="Calendar" />
            </ListItem>
          {messageBar}
            <ListItem button onClick={() => this.navigate('/reminder')}>
              <ListItemText primary="Reminder" />
            </ListItem>
        </List>
      </div>
    );

  }
}

// Sidebar.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default Sidebar;


