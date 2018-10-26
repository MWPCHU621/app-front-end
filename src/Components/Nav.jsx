import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Link } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class ButtonAppBar extends Component {
  constructor() {
    super();
    this.state = {
      show: false
    };
  }

  render() {
    const sideBarContent = (
      <div style={{width: 120}}>
        <List>

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
          <Link to="/todo">
            <ListItem button>
              <ListItemText primary="Info" />
            </ListItem>
          </Link>
          <Link to="/search">
            <ListItem button>
              <ListItemText primary="search" />
            </ListItem>
          </Link>
        </List>
      </div>
    );
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Back on Track
            </Typography>
            <Link to="/">
              <Button color="inherit">Home</Button>
            </Link>
            <Link to="/dashboard">
              <Button color="inherit">Dashboard</Button>
            </Link>
            <Link to="/login">
              <Button color="inherit">Login</Button>
            </Link>
            <Link to="/register">
              <Button color="inherit">Register</Button>
            </Link>
            <Button color="inherit" onClick={this.props.handleLogout}>Log Out</Button>

          </Toolbar>
        </AppBar>
        {sideBarContent}
      </div>
    );

  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);


