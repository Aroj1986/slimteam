import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HeadlineEdit({name, id_expert, first_name, last_name, skills, city, nationality, setPortfolio}) {
  const [open, setOpen] = React.useState(false);
  const [inputFirstName, setInputFirstName] = useState();
  const [inputLastName, setInputLastName] = useState();
  const [inputSkills, setInputSkills] = useState([]);
  const [inputCity, setInputCity] = useState();
  const [inputNationality, setInputNationality] = useState();

  console.log(id_expert, first_name, last_name, skills, city, nationality)

  const handleOnChangeFirstName = (e) => {
    setInputFirstName(e.target.value);
  };

  const handleOnChangeLastName = (e) => {
    setInputLastName(e.target.value);
  };

  const handleOnChangeSkills = (e) => {
    setInputSkills(e.target.value);
  };

  const handleOnChangeAddress = (e) => {
    setInputCity(e.target.value);
  };
  
  const handleOnChangeNationality = (e) => {
    setInputNationality(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const personal_details = {
    personal_details: {
      first_name: inputFirstName,
      last_name: inputLastName,
      skills: inputSkills,
      city: inputCity,
      nationality: inputNationality,
    },
  };

  const handleSubmitEdit = async () => {
    await axios
    .put(`http://localhost:8888/portfolio/${name}/edit-headline/${id_expert}`, personal_details)
    .then((res) => {
      setPortfolio(res.data)
    });
    setOpen(false);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  console.log(name, id_expert, personal_details)

  return (
    <div>
      <IconButton aria-label="edit" size="large">
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
            label={first_name}
            placeholder="First name"
            fullWidth
            variant="standard"
            onChange={handleOnChangeFirstName}
          />
          <TextField
            autoFocus
            margin="dense"
            type="text"
            label={last_name}
            placeholder="Last name"
            fullWidth
            variant="standard"
            onChange={handleOnChangeLastName}
          />
          <TextField
            autoFocus
            margin="dense"
            type="text"
            label={skills}
            placeholder="Skills"
            fullWidth
            variant="standard"
            onChange={handleOnChangeSkills}
          />
          <TextField
            autoFocus
            margin="dense"
            type="text"
            label={city}
            placeholder="City"
            fullWidth
            variant="standard"
            onChange={handleOnChangeAddress}
          />
          <TextField
            autoFocus
            margin="dense"
            type="text"
            label={nationality}
            placeholder="Nationality"
            fullWidth
            variant="standard"
            onChange={handleOnChangeNationality}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitEdit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}