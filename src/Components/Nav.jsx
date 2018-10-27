import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link, Redirect } from "react-router-dom";
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

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: props.userid,
      show: false
    };
  }


  render() {
    if (this.state.redirect) {
      return (
        <Redirect to={this.state.redirect} />);
    }
    let LogBar;
    if (!this.state.userid) {
      LogBar = <div><Link to="/login">
              <Button color="inherit">Login</Button>
            </Link>
            <Link to="/register">
              <Button color="inherit">Register</Button>
            </Link></div>
    } else {
      LogBar = <Button color="inherit"
      onClick={() => {this.props.handleLogout(); this.setState({redirect: '/'})}} >
      Log Out</Button>
    }

    const topBarContent = (<AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Back on Track
            </Typography>
            <Link to="/">
              <Button color="inherit">Home</Button>
            </Link>
            {LogBar}
          </Toolbar>
        </AppBar>)

    return (
      <div>
        {topBarContent}

      </div>
    );

  }
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Nav);


