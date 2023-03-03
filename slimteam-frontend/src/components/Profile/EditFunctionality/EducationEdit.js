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
import axios from "axios";

export default function EducationEdit({name, id_edu, institute, degree, start_date, end_date, setPortfolio}) {
  const [open, setOpen] = React.useState(false);
  const [inputInstitute, setInputInstitute] = useState();
  const [inputDegree, setInputDegree] = useState();
  const [inputStartDate, setInputStartDate] = useState();
  const [inputEndDate, setInputEndDate] = useState();

  const handleOnChangeInstitute = (e) => {
    setInputInstitute(e.target.value);
  };

  const handleOnChangeDegree = (e) => {
    setInputDegree(e.target.value);
  };

  const handleOnChangeStartDate = (e) => {
    setInputStartDate(e.target.value);
  };

  const handleOnChangeEndDate = (e) => {
    setInputEndDate(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const education = {
    education: {
      institute: inputInstitute,
      degree: inputDegree,
      start_date: inputStartDate,
      end_date: inputEndDate,
    },
  };

  const handleSubmitEdit = () => {
    axios
    .put(`http://localhost:8888/portfolio/${name}/edit-education/${id_edu}`, education)
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
            label={degree}
            placeholder="Degree"
            fullWidth
            variant="standard"
            onChange={handleOnChangeDegree}
          />
          <TextField
            autoFocus
            margin="dense"
            type="text"
            label={institute}
            placeholder="University/College"
            fullWidth
            variant="standard"
            onChange={handleOnChangeInstitute}
          />
          <TextField
            autoFocus
            margin="dense"
            type="date"
//            label={start_date}
            fullWidth
            onChange={handleOnChangeStartDate}
          />
          <TextField
            autoFocus
            margin="dense"
            type="date"
//            label={end_date}
            fullWidth
            onChange={handleOnChangeEndDate}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitEdit}>DONE</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
