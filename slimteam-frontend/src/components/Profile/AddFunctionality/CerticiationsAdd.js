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
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';

export default function CerticiationsAdd({
  name,
  id,
  portfolio,
  setPortfolio,
}) {
  const [open, setOpen] = useState(false);
  const [certification, setCertification] = useState(null);
  const [start_date, setstart] = useState(null);

  const certifications = {
    certifications: {
      certification_name: certification,
      valid_from: start_date,
    },
  };
  const url = `http://localhost:8888/portfolio/${name}`;
  const AddCeritifications = (e) => {
    e.preventDefault();
    axios.put(url, certifications).then((res) => {
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
        <AddIcon onClick={handleClickOpen} fontSize="inherit" color="inherit" />
      </IconButton>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Add certifications</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl sx={{ m: 1, minWidth: 300 }}>
              {/* <InputLabel htmlFor="demo-dialog-native">Language</InputLabel> */}
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Certification Name"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setCertification(e.target.value);
                }}
              />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: 150 }}>
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
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={AddCeritifications}>ADD</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
