import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

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

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: props.userid,
      show: false
    };
  }


  render() {
    let LogBar;
    if (!this.state.userid) {
      LogBar = <div><Link to="/login">
              <Button style={{color:"white", textDecoration:"none"}}>Login</Button>
            </Link>
            <Link to="/register">
              <Button style={{color:"white", textDecoration:"none"}}>Register</Button>
            </Link></div>
    } else {
      LogBar = <Button style={{color:"white", textDecoration:"none"}}
      onClick={this.props.handleLogout} >Log Out</Button>
    }

    return (
      <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Back on Track
            </Typography>
            <Link to="/">
              <Button style={{color:"white", textDecoration:"none"}}>Home</Button>
            </Link>
            {LogBar}
          </Toolbar>
        </AppBar>
    );

  }
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Nav);


