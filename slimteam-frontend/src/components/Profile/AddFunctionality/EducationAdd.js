import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import axios from "axios";

export default function EducationAdd({ name,id,portfolio , setPortfolio }) {
      const [open, setOpen] = useState(false);
      const [institute, setInstitution] = useState(null);
      const [degree, setPosition] = useState(null);
      const [start_date, setstart] = useState(null);
      const [end_date, setend] = useState(null);
    
    
      const education = {
        education :{institute ,degree, start_date, end_date}
      }
      const url = `http://localhost:8888/portfolio/${name}`;
      const AddEducation = (e) => {
        e.preventDefault()
        axios.put(url, education)
        .then((res) => {
        setPortfolio(res.data);
        });
        setOpen(false);
      };
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
      return (
        <div>
          <IconButton aria-label="edit" size="large">
            <AddIcon onClick={handleClickOpen} fontSize="inherit" color="primary" />
          </IconButton>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add New Experience</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="College"
                // value={institution}
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => {
                    setInstitution(e.target.value);
                  }}
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="degree"
                // value = {position}
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => {
                    setPosition(e.target.value);
                  }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="start date"
                  value={start_date}
                  onChange={(newValue) => {
                    setstart(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
    
                <DatePicker
                  label="end date"
                  value={end_date}
                  onChange={(newValue) => {
                    setend(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </DialogContent>
            <DialogActions>
              <Button
               onClick={AddEducation}
              >
                ADD
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
    