import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import FormHelperText from "@mui/material/FormHelperText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import { useState } from "react";
import axios from "axios";

export default function ExperienceEdit({name, id_exp, institution, position, from_date, until_date, setPortfolio}) {
  const [open, setOpen] = React.useState(false);
  const [inputInstitution, setInputInstitution] = useState();
  const [inputPosition, setInputPosition] = useState();
  const [inputFromDate, setInputFromDate] = useState();
  const [inputUntilDate, setInputUntilDate] = useState();

  const handleOnChangeInstitution = (e) => {
    setInputInstitution(e.target.value);
  };

  const handleOnChangePosition = (e) => {
    setInputPosition(e.target.value);
  };

  const handleOnChangeFromDate = (e) => {
    setInputFromDate(e.target.value);
  };

  const handleOnChangeUntilDate = (e) => {
    setInputUntilDate(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const experience = {
    experience: {
      institution: inputInstitution,
      position: inputPosition,
      from_date: inputFromDate,
      until_date: inputUntilDate,
    },
  };

  const handleSubmitEdit = () => {
    axios
    .put(`http://localhost:8888/portfolio/${name}/edit-experience/${id_exp}`, experience)
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
            label={position}
            placeholder="Position"
            fullWidth
            variant="standard"
            onChange={handleOnChangePosition}
          />
          <TextField
            autoFocus
            margin="dense"
            type="text"
            label={institution}
            placeholder="Company name"
            fullWidth
            variant="standard"
            onChange={handleOnChangeInstitution}
          />
          <TextField
            autoFocus
            margin="dense"
            type="date"
//            label={from_date}
            fullWidth
            onChange={handleOnChangeFromDate}
          />
          <TextField
            autoFocus
            margin="dense"
            type="date"
//            label={until_date}
            fullWidth
            onChange={handleOnChangeUntilDate}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitEdit}>DONE</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
