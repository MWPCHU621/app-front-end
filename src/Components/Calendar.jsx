import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
import CalendarDialog from './CalendarDialog.jsx'
import Button from '@material-ui/core/Button';
import axios from 'axios'
const localizer = BigCalendar.momentLocalizer(moment)



class Calendar extends React.Component {
  state = {
    events: [],
    show: false,
    selectedEvent: {},
  }

  //redirection to create new event page.
  createEventRouteChange = () => {
    let path = `/calendar/create_event`;
    this.props.history.push(path);
  }

  //handle action when an event on the calendar is click.
  //should redirect to new page to show details of the event
  eventClickAction = (e) => {
    // let message = e.description + " at " + e.start.toDateString();
    // // Dialog(message);
    // alert(message);

    this.setState({
      show:!this.state.show,
      selectedEvent: {
        title: e.title,
        description: e.description,
        start: e.start,
        end: e.end,
      }
    })

    if(this.state.show) {
    }
  }

  componentDidMount() {
    const options = {
      method: "GET",
      url: 'http://localhost:3000/api/events/index',
      params: {id: JSON.parse(localStorage.getItem('token')).user_id,
      role: JSON.parse(localStorage.getItem('token')).role}
    }
    axios(options)
    .then((response) => {
      const fakeData = [
      {
        id:1,
        start: new Date(),
        end: new Date(moment().add(2, "days")),
        title: "random event",
        description: "event description",
        doctor_id: 1,
        client_id: 2
      },
      {
        id:2,
        start: new Date('2018-12-17'),
        end: new Date('2018-12-18'),
        title: 'new random event',
        description: 'this is random event 2',
        doctor_id: 1,
        client_id: 2
      }
    ]

      this.setState({events: fakeData})
    })



  }

  render() {
    let addButton;
    if(JSON.parse(localStorage.getItem('token')).role === "doctor"){
      addButton = <Button onClick={this.createEventRouteChange} style={{border:"1px solid lightgrey", borderRadius:"2px"}}>
        Add new Event
      </Button>
    }
    return(

      <div style={{height: '800px'}}>
        {addButton}
        <BigCalendar
          localizer={localizer}
          events={this.state.events}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={this.eventClickAction}
        />
        <div>
          {this.state.show ?
            <CalendarDialog
              eventClickAction={this.eventClickAction}
              show={this.state.show}
              eventInfo={this.state.selectedEvent}
            /> : null}
        </div>

      </div>
    )
  }



}

export default Calendar
