import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import '../Style/sidebar.css'

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: props.userid,
      show: false
    };
  }


  render() {
    if (this.props.redirect) {
      return (
        <Redirect to='/' />);
    }

    return (
      <div className="sidebar" style={{width: 120}}>
        <List>
          <Link to="/dashboard">
          <ListItem button>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>
          <Link to="/Calendar">
            <ListItem button>
              <ListItemText primary="Calendar" />
            </ListItem>
          </Link>
          <Link to="/messages">
            <ListItem button>
              <ListItemText primary="Message" />
            </ListItem>
          </Link>
          <Link to="/reminder">
            <ListItem button>
              <ListItemText primary="Reminder" />
            </ListItem>
          </Link>
          <Link to="/search">
            <ListItem button>
              <ListItemText primary="Search" />
            </ListItem>
          </Link>
        </List>
      </div>
    );

  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Sidebar;


