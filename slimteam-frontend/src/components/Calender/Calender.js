import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "./myCalendar.css";
import axios from "axios";
import Modal from "./Modal";
import { useParams } from "react-router-dom";
import { accordionDetailsClasses } from "@mui/material";

const MyCalendar = ({ name, expertName }) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [booking, setBooking] = useState();
  const localizer = momentLocalizer(moment);
  const[to_email,setToEmail] = useState();
  const[from_email,setfromEmail] = useState();
  const [bookedDates, setBookedDates] = useState([]);
  const[request,setRequest] = useState();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8888/book-online/${name}/${expertName}`);
        setEvents(response.data);
        const user = await axios .get(`http://localhost:8888/profile-details/${name}`)
        setfromEmail(user.data[0].personal_details.email)
       const expert = await axios .get(`http://localhost:8888/profile-details/${expertName}`)
       setToEmail(expert.data[0].personal_details.email)
       const bookedDate = await axios.get("http://localhost:8888/book-online");
       console.log(bookedDate.data)
       setBookedDates(bookedDate.data.map((value) => {
            return value.start
        }))
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

// console.log(bookedDates)

 const handleSlotSelect = (start,date) => {
  setOpen(true);
  
  
  // console.log(moment(start.start).format("YYYY-MM-DD") )
  // console.log( found.split("T")[0])
  const now = new Date();
  if (start.slots[0] < now.setHours(48, 0, 0, 0)) {
    console.log("past")
    setBooking(false)
  }
  else {
    const found = bookedDates.find(element => element.split("T")[0] === moment(start.start).format("YYYY-MM-DD"));
    console.log(found)
     if ( found === undefined ) {
     setBooking(true)
    setRequest("POST")
    setStartDate(moment(start.start).format("YYYY-MM-DD"));
    setEndDate(moment(start.start).format("YYYY-MM-DD"));
    }
    else if(found !== "") {
          setBooking(false)
    }

  }
};

// const handleEdit = () => {
//   // const newTitle = setBooking(true)
//   setOpen(true);
//   setBooking(true)
//   setRequest("PUT")
// };

const handleDelete = ({ _id }) => {
  setEditingEvent(null);
  axios
    .delete(`http://localhost:8888/book-online/${_id}`)

    .then((response) => {
      console.log("Event got deleted successfully", response.data);
      setEvents(
        events.filter((event) => {
          return event._id != response.data._id;
        })
      );
    })
    .catch((error) => {
      console.error("Error deleting event", error);
    });
};


  const handleEventSelect = (event,start) => {
    setEditingEvent(event);
  };


  const eventPropGetter = (event) => {
    const isBooked = events.some(
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
    <div className="calender-full">
      <Modal
        open={open}
        setOpen={setOpen}
        start={startDate}
        end={endDate}
        events={events}
        setEvents={setEvents}
        title={title}
        setTitle={setTitle}
        name={name}
        expertName={expertName}
        booking={booking}
        to_email={to_email}
        from_email ={from_email}
        request={request}
        setEditingEvent={setEditingEvent}
      />
      <Calendar
        className="calender-styling"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSlotSelect}
        onSelectEvent={handleEventSelect}
        eventPropGetter={eventPropGetter}
        eventStyleGetter={eventStyleGetter}
        tileDisabled={({date}) => [0, 6].includes(date.getDay())}
      />
       {editingEvent && (
        <div className="event-editor">
          <h3>Edit Appointment</h3>
          <p>Title: {editingEvent.title}</p>
          <div className="event-editor2">
            {/* <button
              className="edit-button"
              onClick={() => handleEdit(editingEvent)}
            >
              Edit
            </button> */}
            <button
              className="delete-button"
              onClick={() => handleDelete(editingEvent)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

//     </div>
//   );
// };

export default MyCalendar;
