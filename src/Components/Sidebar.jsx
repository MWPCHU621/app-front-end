import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
// const styles = {
//   root: {
//     flexGrow: 1,
//   },
//   grow: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginLeft: -12,
//     marginRight: 20,
//   },
// };
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: props.userid,
    };
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
       messageBar = <Link to="/messages">
              <ListItem button>
               <Badge color="primary" badgeContent={this.props.notification} >
                <ListItemText primary="Message" />
                </Badge>
              </ListItem>
            </Link>
    }

    return (
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

// export default withStyles(styles)(Sidebar);
export default Sidebar;


