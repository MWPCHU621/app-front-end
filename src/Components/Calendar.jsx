import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
import Dialog from '@material-ui/core/Dialog';
import CalendarDialog from './CalendarDialog.jsx'

const localizer = BigCalendar.momentLocalizer(moment)

class Calendar extends React.Component {
  state = {
    events: [
      {
        start: new Date(),
        end: new Date(moment().add(2, "days")),
        title: "random event",
        description: "event description",
      },
      {
        start: new Date('2018-12-17'),
        end: new Date('2018-12-18'),
        title: 'new random event',
      },
    ]
  }

  //redirection to create new event page.
  createEventRouteChange = () => {
    let path = `/calendar/create_event`;
    this.props.history.push(path);
  }

  //handle action when an event on the calendar is click.
  //should redirect to new page to show details of the event
  eventClickAction = (e) => {
    let message = e.description + " at " + e.start.toDateString();
    // Dialog(message);
    alert(message);
  }



  render() {
    return(
      <div style={{height: '800px'}}>
        <button onClick={this.createEventRouteChange}>
          Add new Event
        </button>
        <BigCalendar
          localizer={localizer}
          events={this.state.events}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={CalendarDialog}
        />
      </div>
    )
  }
}

export default Calendar
