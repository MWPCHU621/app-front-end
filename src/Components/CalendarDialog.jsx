import React from 'react';
import  { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import axios from 'axios'
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class SimpleModal extends React.Component {

  state = {
    toEdit:false,
  }

  redirectToEdit = () => {
    this.setState({toEdit:true});
  }

  handleDelete = (e) => {
    console.log(this.props.eventInfo.id);
    const option = {
      method: "POST",
      url: 'http://localhost:3000/api/events/destroy',
      data: { id: this.props.eventInfo.id }
    }
    axios(option)
    .then((response) => {
      console.log(response.data)
      window.location.reload();
      this.props.eventClickAction()
    })
  }

  render() {
    const { classes, eventInfo } = this.props;

    if(this.state.toEdit) {
        return <Redirect to ={{
          pathname:'/calendar/edit_event',
          state:{referrer:eventInfo},
          }} />
    }

    let editButton;
    let deleteButton;
    if(JSON.parse(localStorage.getItem('token')).role === "doctor") {
      editButton = <Button onClick={this.redirectToEdit}>Edit</Button>
      deleteButton = <Button onClick={this.handleDelete}>Delete</Button>
    }

    return (
      <div>
        <Typography gutterBottom>Click to get the full Modal experience!</Typography>
        <Button onClick={this.props.eventClickAction}>Open Modal</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.show}
          onClose={this.eventClickAction}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              {eventInfo.title}
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              {eventInfo.description}
            </Typography>
            <Typography variant = "subtitle1" id="simple-modal-description">
              Start: {eventInfo.start.toString().substring(0,15)}
            </Typography>
            <Typography variant = "subtitle1" id="simple-modal-description">
              End: {eventInfo.end.toString().substring(0,15)}
            </Typography>
            {editButton}
            {deleteButton}
            <Button onClick={this.props.eventClickAction} style={{border:"1px solid grey"}}>Close</Button>
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;
