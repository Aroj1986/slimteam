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


import { useState } from "react";
import axios from "axios";

export default function Modal ({ open, setOpen, start, events, setEvents}) {
  
  const [title, setTitle] = useState("");
  // const [events, setEvents] = useState([]);

  const handleSubmit = () => {
    if (title) {
      axios
        .post("http://localhost:8888/book-online", { start, title })
        .then(({ data }) => setEvents([...events, data]))
        .catch((err) => console.log(err));
      setOpen(false);
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
   
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a Reason for a Appointment</DialogTitle>
        <DialogContent>
        <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title"
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
      </Dialog>
    </div>
  );
}
