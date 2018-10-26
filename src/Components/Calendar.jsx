import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
import CalendarDialog from './CalendarDialog.jsx'
import Button from '@material-ui/core/Button';

const localizer = BigCalendar.momentLocalizer(moment)



class Calendar extends React.Component {
  state = {
    events: [
      {
        id:1,
        start: new Date(),
        end: new Date(moment().add(2, "days")),
        title: "random event",
        description: "event description",
      },
      {
        id:2,
        start: new Date('2018-12-17'),
        end: new Date('2018-12-18'),
        title: 'new random event',
        description: 'this is random event 2',
      },
    ],
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






  render() {
    return(

      <div style={{height: '800px'}}>
        <Button onClick={this.createEventRouteChange} style={{border:"1px solid lightgrey", borderRadius:"2px"}}>
          Add new Event
        </Button>
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
