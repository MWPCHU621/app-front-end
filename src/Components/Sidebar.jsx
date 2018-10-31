import React, { Component } from 'react';
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
  navigate = (url) => {
      this.props.history.push(url)
    }
  render() {
    let messageBar;
    if (this.props.notification === 0 || !localStorage.getItem('token')) {
       messageBar =
              <ListItem
                button
                onClick={() => this.navigate('/messages')}
                className="sidebar__notificationBadge">
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
            <Link to="/nutrition">
              <ListItem button>
                <ListItemText primary="Nutrition" />
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


