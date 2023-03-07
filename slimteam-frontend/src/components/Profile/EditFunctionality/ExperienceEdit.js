import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import { useState } from "react";
import axios from "../../../axiosClient";

export default function ExperienceEdit({name, id_exp, institution, position, from_date, until_date, setPortfolio}) {
  const [open, setOpen] = React.useState(false);
  const [inputInstitution, setInputInstitution] = useState();
  const [inputPosition, setInputPosition] = useState();
  const [inputFromDate, setInputFromDate] = useState(from_date);
  const [inputUntilDate, setInputUntilDate] = useState(until_date);

  const handleOnChangeInstitution = (e) => {
    setInputInstitution(e.target.value);
  };

  const handleOnChangePosition = (e) => {
    setInputPosition(e.target.value);
  };

  const handleOnChangeFromDate = (newValue) => {
    setInputFromDate(newValue);
  };

  const handleOnChangeUntilDate = (newValue) => {
    setInputUntilDate(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
console.log(inputFromDate,inputUntilDate)
  const experience = {
    experience: {
      institution: inputInstitution?inputInstitution:institution,
      position: inputPosition?inputPosition:position,
      from_date: inputFromDate?inputFromDate:from_date,
      until_date: inputUntilDate?inputUntilDate:until_date,
    },
  };

  const handleSubmitEdit = () => {
    axios
    .put(`/portfolio/${name}/edit-experience/${id_exp}`, experience)
    .then((res) => {
      setPortfolio(res.data)
    });
    setOpen(false);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton aria-label="edit" size="small">
        <EditSharpIcon
          onClick={handleClickOpen}
          fontSize="inherit"
          color="inherit"
        />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit experience</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            type="text"
            label="position"
            defaultValue={position}
            placeholder="Position"
            fullWidth
            variant="standard"
            onChange={handleOnChangePosition}
          />
          <TextField
            autoFocus
            margin="dense"
            type="text"
            label="institution"
            defaultValue={institution}
            placeholder="Company name"
            fullWidth
            variant="standard"
            onChange={handleOnChangeInstitution}
          />
          <div style={{padding:"1rem"}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
         <div style={{padding:"1rem"}}>
        <DesktopDatePicker
          label="from_date"
          inputFormat="MM/DD/YYYY"
          value={inputFromDate}
          onChange={handleOnChangeFromDate}
          renderInput={(params) => <TextField {...params} />}
        /></div>
        <div style={{padding:"1rem"}}>
          <DesktopDatePicker
          label="until_date"
          inputFormat="MM/DD/YYYY"
          value={inputUntilDate}
          onChange={handleOnChangeUntilDate}
          renderInput={(params) => <TextField {...params} />}
        />
        </div>
          </LocalizationProvider>
          </div>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose}>CANCEL</Button>
          <Button onClick={handleSubmitEdit}>SAVE</Button>
        </DialogActions>
        
      </Dialog>
    </div>
  );
}
