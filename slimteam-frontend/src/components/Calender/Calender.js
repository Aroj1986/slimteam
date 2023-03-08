import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "./myCalendar.css";
import axios from "../../axiosClient";
import Modal from "./Modal";
import * as emailjs from "emailjs-com";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const MyCalendar = ({ name, expertName }) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const [booking, setBooking] = useState();
  const localizer = momentLocalizer(moment);
  const [to_email, setToEmail] = useState();
  const [from_email, setfromEmail] = useState();
  const [bookedDates, setBookedDates] = useState([]);
  const [request, setRequest] = useState();
  const exptname = localStorage.getItem("expertName");
  const usName = localStorage.getItem("name");
  const [reason, setReason] = React.useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/calendar/book-online/${
            name ? name : usName
          }/${exptname}`
        );
        setEvents(response.data);
        const userw = await axios.get(
          `/api/explore-experts/profile-details/${name}`
        );
        setfromEmail(userw.data[0].personal_details.email);
        const expert = await axios.get(
          `/api/explore-experts/profile-details/${exptname}`
        );
        setToEmail(expert.data[0].personal_details.email);
        const bookedDate = await axios.get("/api/calendar/book-online");
        setBookedDates(
          bookedDate.data.map((value) => {
            return value.start;
          })
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  console.log(openCancel)

  const handleSlotSelect = (start, date) => {
    setOpen(true);

    // console.log(moment(start.start).format("YYYY-MM-DD") )
    // console.log( found.split("T")[0])
    const now = new Date();
    if (start.slots[0] < now.setHours(48, 0, 0, 0)) {
      console.log("past");
      setBooking(false);
    } else {
      const found = bookedDates.find(
        (element) =>
          element.split("T")[0] === moment(start.start).format("YYYY-MM-DD")
      );
      if (found === undefined) {
        setBooking(true);
        setRequest("POST");
        setStartDate(moment(start.start).format("YYYY-MM-DD"));
        setEndDate(moment(start.start).format("YYYY-MM-DD"));
      } else if (found !== "") {
        setBooking(false);
      }
    }
  };

  const handleChange = (event) => {
    setReason(event.target.value || "");
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpenCancel(false);
    }
  };

  const handleDelete = () => {
    setOpenCancel(true);
  };
  const handleOK = ({
    expert_UserName,
    user_UserName,
    title,
    start,
    _id,
  }) => {

    setEditingEvent(null);
    axios
      .delete(`/api/calendar/book-online/${_id}`)
      .then((response) => {
        console.log("Event got deleted successfully", response.data);
        setEvents(
          events.filter((event) => {
            return event._id != response.data._id;
          })
        );
        setOpenCancel(false);
        setReason("");
        //mail to expert for user booking
         emailjs.send('service_uvp0rck', 'template_9qeisr9', {
          to_email : to_email
          ,from_email:from_email
          ,expert_name : expert_UserName
          ,user_name : user_UserName
          ,start_date: start
          ,title:title
          ,reason : reason
         }, 'f_2ehsvnxo2qEtz7Z')
         .then((result) => {
             console.log(result.status,result.text);
         }, (error) => {
             console.log(error.text);
         });
      })

      .catch((error) => {
        console.error("Error deleting event", error);
      });
  };

  const handleEventSelect = (event, start) => {
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
        color: "black",
        backgroundColor: " #7f6d7f",
      },
    };
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    console.log(event);
    var backgroundColor = "#" + event.hexColor;
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: "0px",
      opacity: 0.8,
      color: "black",
      border: "0px",
      display: "block",
    };
    return {
      style: style,
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
        name={usName}
        expertName={exptname}
        booking={booking}
        to_email={to_email}
        from_email={from_email}
        request={request}
        setEditingEvent={setEditingEvent}
      />
       <div>
        <Dialog disableEscapeKeyDown open={openCancel} onClose={handleClose}>
        <DialogTitle>Please select the reason for cancellation</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="demo-dialog-native">Reason</InputLabel>
              <Select
                native
                value={reason}
                onChange={handleChange}
                input={
                  <OutlinedInput label="Reason" id="demo-dialog-native" />
                }
              >
                <option aria-label="None" value="" />
                <option value="Not available on the day of Booking">
                  Not available on the day of Appointment
                </option>
                <option value="Have other B[kings">
                  Have another appointment
                </option>
                <option value="Other">Other</option>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleOK(editingEvent)}>Ok</Button>
        </DialogActions>
      </Dialog>
     
      <div className="calendar-event">
        <div className="calendar-container">
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
            tileDisabled={({ date }) => [0, 6].includes(date.getDay())}
            views={[Views.MONTH, Views.AGENDA]}
          />
        </div>
        <div>
          {editingEvent && (
            <div className="event-editor">
              <h4>BOOKING DETAILS </h4>
              <p>SERVICE : {editingEvent.title}</p>
              <p>
                EXPERT_NAME :{" "}
                <NavLink
                  to={`/viewexpertprofile/${editingEvent.expert_UserName}`}
                >
                  {editingEvent.expert_UserName}
                </NavLink>
              </p>
              <p>
                BOOKING MADE BY :{" "}
                <NavLink to={`/viewuserprofile/${editingEvent.user_UserName}`}>
                  {editingEvent.user_UserName}
                </NavLink>
              </p>
              <div className="event-editor2">
                <button
                  className="delete-button"
                  style={{borderRadius:"0.7rem", backgroundColor:"gray"}}
                  onClick={() => handleDelete(editingEvent)}
                >
                  CANCEL BOOKING
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

//     </div>
//   );
// };

export default MyCalendar;
