import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "../Calender/myCalendar.css";
import axios from "../../axiosClient";
import * as emailjs from "emailjs-com";
import { color } from "@mui/system";
import { NavLink, useParams } from "react-router-dom";
import ExpertView from "./ViewProfileinBookings/ExpertView";
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

export default function ManageBookings() {
  const { name } = useParams();
  const [open, setOpen] = React.useState(false);
  const [reason, setReason] = React.useState("");
  const [editEvent, setEditEvent] = useState(null);
  const [bookings, setBookings] = useState([]);
  const localizer = momentLocalizer(moment);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/managebookings/${name}`
        );
        setBookings(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleOK = ({
    expert_UserName,
    user_UserName,
    reason,
    title,
    start,
    _id,
  }) => {
    setEditEvent(null);
    axios
      .delete(`/book-online/${_id}`)
      .then((response) => {
        console.log("Event got deleted successfully", response.data);
        setBookings(
          bookings.filter((event) => {
            return event._id != response.data._id;
          })
        );
        setOpen(false);
        setReason("");
        //  mail to expert for user booking
        //  emailjs.send('service_uvp0rck', 'template_9qeisr9', {
        //   to_email : to_email
        //   ,from_email:from_email
        //   ,expert_name : expert_UserName
        //   ,user_name : user_UserName
        //   ,reason : reason
        //   ,start_date: start
        //   ,title:title
        //  }, 'f_2ehsvnxo2qEtz7Z')
        //  .then((result) => {
        //      console.log(result.status,result.text);
        //  }, (error) => {
        //      console.log(error.text);
        //  });
      })
      .catch((error) => {
        console.error("Error deleting event", error);
      });
  };
  const handleChange = (event) => {
    setReason(event.target.value || "");
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const handleDelete = () => {
    setOpen(true);
  };

  const handleEventSelect = (event, start) => {
    setEditEvent(event);
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
        color: "black",
        backgroundColor: "#7f6d7f",
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
    <div>
      <div>
        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
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
            <Button onClick={() => handleOK(editEvent)}>Ok</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className="calendar-event">
      <div className="calendar-container">
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
            views={[Views.MONTH, Views.AGENDA]}
          />
        </div>
        {editEvent && (
          <div className="event-editor">
            <h4>BOOKING DETAILS </h4>
            <p>SERVICE : {editEvent.title}</p>
            <p>
              EXPERT_NAME :{" "}
              <NavLink to={`/viewexpertprofile/${editEvent.expert_UserName}`}>
                {editEvent.expert_UserName}
              </NavLink>
            </p>
            <p>
              BOOKING MADE BY :{" "}
              <NavLink to={`/viewuserprofile/${editEvent.user_UserName}`}>
                {editEvent.user_UserName}
              </NavLink>
            </p>
            <div className="event-editor2">
              <button
                className="delete-button"
                style={{ borderRadius: "0.7rem", backgroundColor: "gray" }}
                onClick={() => handleDelete(editEvent)}
              >
                CANCEL BOOKING
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
