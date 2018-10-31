import React from 'react';
import  { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import InputAdornment from '@material-ui/core/InputAdornment';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import '../Style/calendarDialog.css'

function getModalStyle() {
  const top = 50;
  const left = 50;

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
      editButton =
        <Button onClick={this.redirectToEdit}className='modal-btn'>
          Edit
          <EditIcon className='leftIcon' />
        </Button>
      deleteButton =
        <Button onClick={this.handleDelete}className='modal-btn'>
          Delete
          <DeleteIcon className='leftIcon' />
        </Button>
    }

    return (
      <div >
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.show}
          onClose={this.eventClickAction}

        >
          <div style={getModalStyle()} className={classes.paper} id='modal-container'>
            <Typography variant="h6" id="modal-title" className='modal-title'>
              {eventInfo.title}
            </Typography>
            <Typography
              variant="subtitle1"
              id="simple-modal-description"
              className='modal-description'
            >
                {eventInfo.description}
            </Typography>

            <div className='modal-btnContainer'>
              {editButton}
              {deleteButton}
              <Button onClick={this.props.eventClickAction} className='modal-btn'>
                  Close
                  <CloseIcon className='leftIcon' />
              </Button>
            </div>
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
