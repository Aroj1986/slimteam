import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "./myCalendar.css";
import axios from "axios";
import Modal from "./Modal";

const MyCalendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [title, setTitle] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [open, setOpen] = useState(false);
  
  const localizer = momentLocalizer(moment);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8888/book-online");
        setEvents(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log(events);

  // const handleSelect = () => {
  
  //   const now = new Date();
  //   if (start < now.setHours(0, 0, 0, 0)) {
  //     alert("You cannot book an appointment in the past!");
  //     return;
  //   }

  //   const title = window.prompt("Enter a title for your appointment:");
  //   if (title) {
  //     axios
  //       .post("http://localhost:8888/book-online", { start, end, title })
  //       .then(({ data }) => setEvents([...events, data]))
  //       .catch((err) => console.log(err));
  //   }

  
  // };
  // }
  const handleEdit = ({ _id, title }) => {
    const newTitle = window.prompt(
      "Enter a new title for your appointment:",
      title
    );
    if (newTitle) {
      const updatedEvents = events.map((event) => {
        if (event._id === _id) {
          return { ...event, title: newTitle };
        }
        return event;
      });
      setEvents(updatedEvents);
      setEditingEvent(null);
      axios
        .put(`http://localhost:8888/book-online/${_id}`, { title: newTitle })
        .then((response) => {
          console.log("Event updated successfully", response.data);
          const findEvent = events.findIndex((event) => event._id === _id);
          if (findEvent === -1)
            throw new Error("Could not find event in the events state");
          const newEvents = [...events];
          newEvents[findEvent] = response.data;
          setEvents(newEvents);
        })
        .catch((error) => {
          console.error("Error updating event", error);
        });
    }
  };

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

  const handleEventSelect = (start) => {
    setOpen(true)
    setStartDate(start.slots[0]);
};
 

  // const eventPropGetter = (event) => {
  //   const isBooked = events.some(
  //     (e) =>
  //       e !== event && moment(event.start).isBetween(e.start, e.end, null, "[]")
  //   );
  //   return {
  //     className: isBooked ? "booked" : "available",
  //     disabled: isBooked,
  //     style: {
  //       borderLeft: isBooked ? "5px solid red" : "5px solid #3174ad",
  //     },
  //   };
  // };

  // const eventStyleGetter = (event) => {
  //   return {
  //     style: {
  //       backgroundColor: "red",
  //       borderRadius: "0px",
  //       opacity: 0.8,
  //       color: "white",
  //       border: "0px",
  //     },
  //   };
  // };

  return (
    
    <div className="calender-full">
      <Modal open={open} setOpen={setOpen} start={startDate} events={events} setEvents={setEvents}/>
      {/* <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="yyyy-MM-dd"
      /> */}
      <Calendar
        className="calender-styling"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleEventSelect}
        onSelectEvent={handleEventSelect}
        // eventPropGetter={eventPropGetter}
        // eventStyleGetter={eventStyleGetter}
      />

      {editingEvent && (
        <div className="event-editor">
          <h3>Edit Appointment</h3>
          <p>Title: {editingEvent.title}</p>
          <div className="event-editor2">
            <button
              className="edit-button"
              onClick={() => handleEdit(editingEvent)}
            >
              Edit
            </button>
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

export default MyCalendar;
