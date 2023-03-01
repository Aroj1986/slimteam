import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "../Calender/myCalendar.css";
import axios from "axios";

export default function ManageBookings({name}) {
    const [editEvent, setEditEvent] = useState(null);
    const [expert, setExpert] = useState(null);
    const [bookings, setBookings] = useState([]);
    const localizer = momentLocalizer(moment);
    const [found, setFound] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await axios.get(`http://localhost:8888/managebookings/${name}`);
              setBookings(response.data)
            //   setExpert(response.data)
              setExpert(response.data.map((val) => {
                return {title : val.title, name:val.expert_UserName}
              }) )
            } catch (error) {
              console.log(error);
            }
          };
          fetchData();
    },[name])

    console.log(expert)

    const handleDelete = ({ _id }) => {
        setEditEvent(null);
        axios
          .delete(`http://localhost:8888/book-online/${_id}`)
      
          .then((response) => {
            console.log("Event got deleted successfully", response.data);
            setBookings(
              bookings.filter((event) => {
                return event._id != response.data._id;
              })
            );
          })
          .catch((error) => {
            console.error("Error deleting event", error);
          });
      };

    const handleEventSelect = (event,start) => {
        setEditEvent(event);
        setFound(expert.find(element => element.title === editEvent.title))
         
      };
    const eventPropGetter = (event) => {
        const isBooked = bookings.some(
          (e) =>
            e !== event && moment(event.start).isBetween(e.start, e.end, null, "[]")
        );
        return {
          className: isBooked ? "booked" : "available",
          disabled: isBooked,
          style: {
            // borderLeft: isBooked ? "5px solid blue" : "5px solid black",
            color:"black",
            backgroundColor:"#008080"
          },
        };
      };
    
      const eventStyleGetter = (event,start, end, isSelected) => {
        console.log(event);
        var backgroundColor = '#' + event.hexColor;
        var style = {
            backgroundColor: backgroundColor,
            borderRadius: '0px',
            opacity: 0.8,
            color: 'black',
            border: '0px',
            display: 'block'
        };
        return {
            style: style
        };
    };
  return (
    <div>
        <Calendar
        className="calender-styling"
        localizer={localizer}
        events={bookings}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectEvent={handleEventSelect}
        eventPropGetter={eventPropGetter}
        eventStyleGetter={eventStyleGetter}
      />

{editEvent && (
        <div className="event-editor">
          <h3>Appointment Details</h3>
          <p>Service :  {editEvent.title}</p>
           <p>ExpertName : {found.name}</p>
          <div className="event-editor2">
            {/* <button
              className="edit-button"
              onClick={() => handleEdit(editingEvent)}
            >
              Edit
            </button> */}
            <button
              className="delete-button"
              onClick={() => handleDelete(editEvent)}
            >
              Delete
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
