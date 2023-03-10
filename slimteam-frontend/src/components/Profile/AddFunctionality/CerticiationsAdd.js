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
import axios from "../../../axiosClient";

export default function CerticiationsAdd({ name,id,portfolio , setPortfolio }) {
    const [open, setOpen] = useState(false);
    const [certification, setCertification] = useState(null);
    const [start_date, setstart] = useState(null);
  
    const certifications = {
        certifications :{certification_name:certification,valid_from:start_date}
    }
    const url = `/api/explore-experts/portfolio/${name}`;
    const AddCeritifications = (e) => {
      e.preventDefault()
      axios.put(url, certifications)
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
        <IconButton aria-label="edit" size="small">
          <AddIcon onClick={handleClickOpen} fontSize="inherit" color="inherit" />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New Experience</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Certification name"
              // value={institution}
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setCertification(e.target.value);
                }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Valid from"
                value={start_date}
                onChange={(newValue) => {
                    setstart(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button
             onClick={AddCeritifications}
            >
              ADD
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  