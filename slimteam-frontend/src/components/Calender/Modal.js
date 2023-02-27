import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import AddIcon from "@mui/icons-material/Add";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FormHelperText from '@mui/material/FormHelperText';
import { NavLink } from 'react-router-dom';
import React, { useRef } from 'react';
// import emailjs from '@emailjs/browser';
import * as emailjs from "emailjs-com"

import { useState } from "react";
import axios from "axios";

export default function Modal ({ open, setOpen, start,end, title,setTitle,events, setEvents,name,expertName,booking,to_email,from_email,request}) {
  // const [title, setTitle] = useState("");
  // const [events, setEvents] = useState([]);
  console.log(booking)
  const form = useRef();
  var template_param = {
    to_email,from_email,expert_name : expertName,user_name : name, start_date: start,title:title
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title) {
      axios
        .post("http://localhost:8888/book-online", { start,end,title,UserName:name,expertName : expertName  })
        .then(({ data }) => setEvents([...events, data]))
        .catch((err) => console.log(err));
      setOpen(false);
      // emailjs.send('service_uvp0rck', 'template_9qeisr9', template_param, 'f_2ehsvnxo2qEtz7Z')
      // .then((result) => {
      //     console.log(result.status,result.text);
      // }, (error) => {
      //     console.log(error.text);
      // });
      setTitle("")
    }
  };

const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    
    <div>
      {booking ? 
     <Dialog ref={form} open={open} onClose={handleClose}>
     <DialogTitle>Please mention the Service </DialogTitle>
     <DialogContent>
     <TextField
           autoFocus
           margin="dense"
           id="title"
           label="Name of the Service"
           type="text"
           fullWidth
           value={title}
           onChange={(e) => setTitle(e.target.value)}
         />
       </DialogContent>
     <DialogActions>
     <Button onClick={handleClose} color="primary">
           Cancel
         </Button>
         <Button onClick={handleSubmit} color="primary">
           Submit
         </Button>
     </DialogActions>
   </Dialog> :
   <Dialog open={open} onClose={handleClose}>
   <DialogTitle>Appointment not available, please select other day!! 😄</DialogTitle>
   {/* <FormHelperText id="component-helper-text">
 You cannot book your appointments in the past and for 2 day from today 😉
 </FormHelperText> */}
   <DialogActions>
   <Button onClick={handleClose} color="primary">
         <NavLink to={`/book-online/${name}`} >OK</NavLink>
       </Button>
   </DialogActions>
 </Dialog>  
    }
     
    </div>
  );
}
