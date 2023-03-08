import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import { useState } from "react";
import axios from "../../../axiosClient";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function EducationEdit({name, id_edu, institute, degree, start_date, end_date, setPortfolio}) {
  const [open, setOpen] = React.useState(false);
  const [inputInstitute, setInputInstitute] = useState();
  const [inputDegree, setInputDegree] = useState();
  const [inputStartDate, setInputStartDate] = useState(start_date);
  const [inputEndDate, setInputEndDate] = useState(end_date);

  const handleOnChangeInstitute = (e) => {
    setInputInstitute(e.target.value);
  };

  const handleOnChangeDegree = (e) => {
    setInputDegree(e.target.value);
  };

  const handleOnChangeStartDate = (newValue) => {
    setInputStartDate(newValue);}

  const handleOnChangeEndDate= (newValue) => {
    setInputEndDate(newValue);}

  const handleClickOpen = () => {
    setOpen(true);
  };

  const education = {
    education: {
      institute: inputInstitute?inputInstitute:institute,
      degree: inputDegree?inputDegree:degree,
      start_date: inputStartDate?inputStartDate:start_date,
      end_date: inputEndDate?inputEndDate:end_date,
    },
  };

  const handleSubmitEdit = () => {
    axios
    .put(`/api/explore-experts/portfolio/${name}/edit-education/${id_edu}`, education)
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
        <DialogTitle>Edit education</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            type="text"
            label="degree"
            defaultValue={degree}
            placeholder="Degree"
            fullWidth
            variant="standard"
            onChange={handleOnChangeDegree}
          />
          <TextField
            autoFocus
            margin="dense"
            type="text"
            label="institute"
            defaultValue={institute}
            placeholder="University/College"
            fullWidth
            variant="standard"
            onChange={handleOnChangeInstitute}
          />
          <div style={{padding:"1rem"}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
         <div style={{padding:"1rem"}}>
        <DesktopDatePicker
          label="start date"
          inputFormat="MM/DD/YYYY"
          value={inputStartDate}
          onChange={handleOnChangeStartDate}
          renderInput={(params) => <TextField {...params} />}
        /></div>
        <div style={{padding:"1rem"}}>
          <DesktopDatePicker
          label="until_date"
          inputFormat="MM/DD/YYYY"
          value={inputEndDate}
          onChange={handleOnChangeEndDate}
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
