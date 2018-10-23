import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"

const localizer = BigCalendar.momentLocalizer(moment)

class Calendar extends React.Component {
  state = {
    events: [
      {
        start: new Date(),
        end: new Date(moment().add(2, "days")),
        title: "random event",
      }
    ]
  }

  render() {
    return(
      <div style={{height: '800px'}}>

        <BigCalendar
          localizer={localizer}
          events={this.state.events}
          startAccessor="start"
          endAccessor="end"
        />
        <button>
          hello
        </button>
      </div>
    )
  }
}

export default Calendar
