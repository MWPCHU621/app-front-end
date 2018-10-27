import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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
  constructor(props) {
    super(props);
    this.state = {
      userid: props.userid,
      show: false
    };
  }
  logInHelper = () => {
    if (!this.state.userid) {
      return (<div><Link to="/login">
              <Button color="inherit">Login</Button>
            </Link>
            <Link to="/register">
              <Button color="inherit">Register</Button>
            </Link></div>)
    } else {
      return (<Button color="inherit" onClick={this.props.handleLogout}>Log Out</Button>)
    }
  }
  componentDidMount() {
  }

  render() {

    const topBarContent = (<AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Back on Track
            </Typography>
            <Link to="/">
              <Button color="inherit">Home</Button>
            </Link>
            { this.logInHelper() }
          </Toolbar>
        </AppBar>)
    const sideBarContent = (
      <div style={{width: 120}}>
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
          <Link to="/todo">
            <ListItem button>
              <ListItemText primary="Task" />
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
        {topBarContent}
        {sideBarContent}

      </div>
    );

  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);


