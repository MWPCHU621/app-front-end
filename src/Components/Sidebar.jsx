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
    if (this.props.notification === 0) {
       messageBar =
              <ListItem button onClick={() => this.navigate('/messages')}>
                <ListItemText primary="Message" />
              </ListItem>

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
        <Link to="/dashboard">
          <ListItem button>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>
          <Link to="/calendar">
            <ListItem button>
              <ListItemText primary="Calendar" />
            </ListItem>
          </Link>
          {messageBar}
          <Link to="/reminder">
            <ListItem button>
              <ListItemText primary="Reminder" />
            </ListItem>
          </Link>
        </List>
      </div>
    );

  }
}

// Sidebar.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default Sidebar;


