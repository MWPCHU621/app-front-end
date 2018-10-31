import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';

import '../Style/sidebar.css'

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: props.userid,
    };
  }

  render() {
    let messageBar;
    if (this.props.notification === 0) {
       messageBar = <Link to="/messages">
              <ListItem button className="sidebar__notificationBadge">
                <ListItemText primary="Message" />
              </ListItem>
            </Link>
    } else {
       messageBar = <Link to="/messages">
              <ListItem button>
               <Badge color="primary" badgeContent={this.props.notification} className="sidebar__notificationBadge">
                <ListItemText primary="Message" />
                </Badge>
              </ListItem>
            </Link>
    }

    return (
      <Drawer
        className="drawer"
        variant="permanent"
        classes={{
          paper:"drawerPaper",
        }}
        anchor="left"
      >
        <CssBaseline/>
        <div  className='toolbar'>
          <List >
            <Link to="/dashboard">
              <ListItem button >
                <ListItemText primary="Dashboard" />
              </ListItem>
            </Link>
            <Divider/>
            <Link to="/Calendar">
              <ListItem button>
                <ListItemText primary="Calendar" />
              </ListItem>
            </Link>
            <Divider/>
            {messageBar}
            <Divider/>
            <Link to="/reminder">
              <ListItem button>
                <ListItemText primary="Reminder" />
              </ListItem>
            </Link>
          </List>
        </div>
      </Drawer>
    );

  }
}

// Sidebar.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default Sidebar;


