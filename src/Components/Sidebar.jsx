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
              <ListItem button onClick={() => this.navigate('/dashboard')}>
                <ListItemText primary="Dashboard" />
              </ListItem>
            <Divider/>
              <ListItem button onClick={() => this.navigate('/calendar')}>
                <ListItemText primary="Calendar" />
              </ListItem>
            <Divider/>
            {messageBar}
            <Divider/>
              <ListItem button  onClick={() => this.navigate('/reminder')}>
                <ListItemText primary="Reminder" />
              </ListItem>
              <Divider/>
              <ListItem button onClick={() => this.navigate('/nutrition')}>
                <ListItemText primary="Nutrition" />
              </ListItem>
              <Divider/>
              <ListItem button onClick={() => this.navigate('/exercise')}>
                <ListItemText primary="Exercise" />
              </ListItem>
          </List>
        </div>
      </Drawer>
    );

  }
}

export default Sidebar;


