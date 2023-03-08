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
import React, { useEffect, useRef } from 'react';
// import emailjs from '@emailjs/browser';
import * as emailjs from "emailjs-com"

import { useState } from "react";
import axios from "../../axiosClient";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

export default function Modal ({ open, setOpen, start,end, title,setTitle,events, setEvents,name,expertName,booking,to_email,from_email,request}) {
  console.log(name,expertName)
  const [time, setTime] = useState();
  const [description,setDesciption] = useState();
  const form = useRef();

  const [userDetails,setUserDetails] = useState(
  )
  const [expertDetails,setExpertDetails] = useState(
  )
  useEffect(() => {
    const getDetails = () =>{
      axios
      .get(`/api/explore-experts/portfolio/${name}`)
      .then((res) => {
        setUserDetails(res.data);
      })

      axios
      .get(`/api/explore-experts/portfolio/${expertName}`)
      .then((res) => {
        setExpertDetails(res.data);
      })
      .catch((err) => {
        console.log(`Error fetching sought expert in database: ${err}`);
      });
    }  
    getDetails()

  }, [name,expertName]);


  var template_param_expert = {
    to_email : expertDetails?.personal_details?.email,
    from_email:userDetails?.personal_details?.email,
    expert_name : expertName,
    user_name : name, 
    start_date: start,
    title:title,
    Time:time,
    phone_number: expertDetails?.personal_details?.phone_number,
    street : expertDetails?.personal_details?.address?.street,
    city:expertDetails?.personal_details?.address?.city,
    postal_code:expertDetails?.personal_details?.address?.postal_code,
    description:description,
  }

  var template_param_user = {
    to_email : userDetails?.personal_details?.email,
    from_email:expertDetails?.personal_details?.email,
    expert_name : expertName,
    user_name : name, 
    start_date: start,
    title:title,
    Time:time,
    phone_number: userDetails?.personal_details?.phone_number,
    street : userDetails?.personal_details?.address?.street,
    city:userDetails?.personal_details?.address?.city,
    postal_code:userDetails?.personal_details?.address?.postal_code,
    description:description,
  }
  console.log(template_param_expert)
  console.log(template_param_user)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title) {
      axios
        .post("/api/calendar/book-online", { start,end,title,UserName:name,expertName : expertName,allDay:true  })
        .then(({ data }) => setEvents([...events, data]))
        .catch((err) => console.log(err));
      setOpen(false);
      //mail to expert for user booking
      emailjs.send('service_tnbxdpq', 'template_gseatce', template_param_expert, '52YVtk3Co2hMAovzI')
      .then((result) => {
          console.log(result.status,result.text);
      }, (error) => {
          console.log(error.text);
      });
      // copy of confirmation mail to user for booking an expert
      emailjs.send('service_tnbxdpq', 'template_q6jcw4l', template_param_user, '52YVtk3Co2hMAovzI')
      .then((result) => {
          console.log(result.status,result.text);
      }, (error) => {
          console.log(error.text);
      });
      setTitle("");
      setTime("")
      setDesciption("");
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
         <TextField
           autoFocus
           margin="dense"
           id="time 24h format"
           label="9AM - 5PM"
           type="time"
           fullWidth
           value={time}
           onChange={(e) => setTime(e.target.value)}
         />
         <TextField
           autoFocus
           margin="dense"
           id="description"
           label="Description if any"
           type="text"
           fullWidth
           value={description}
           onChange={(e) => setDesciption(e.target.value)}
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
