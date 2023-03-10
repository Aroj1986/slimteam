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
import axios from "../../../axiosClient";
import "../profile.css";

export default function HeadlineEdit({
  name,
  id_expert,
  first_name,
  last_name,
  street,
  city,
  nationality,
  email,
  phone_number,
  setPortfolio,
  setName,
}) {
  const [open, setOpen] = React.useState(false);
  const [inputFirstName, setInputFirstName] = useState(first_name);
  const [inputLastName, setInputLastName] = useState(last_name);
  const [inputStreet, setInputStreet] = useState(street);
  const [inputCity, setInputCity] = useState(city);
  const [inputNationality, setInputNationality] = useState(nationality);
  const [inputEmail, setInputEmail] = useState();
  const [inputPhoneNo, setInputPhoneNo] = useState(phone_number);

  console.log(
    id_expert,
    first_name,
    last_name,
    street,
    city,
    nationality,
    email,
    phone_number
  );

  // to capitalize first letter of the word
  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleOnChangeFirstName = (e) => {
    setInputFirstName(capitalizeWords(e.target.value));
  };

  const handleOnChangeLastName = (e) => {
    setInputLastName(capitalizeWords(e.target.value));
  };

  const handleOnChangeStreet = (e) => {
    setInputStreet(capitalizeWords(e.target.value));
  };

  const handleOnChangeCity = (e) => {
    setInputCity(capitalizeWords(e.target.value));
  };

  const handleOnChangeNationality = (e) => {
    setInputNationality(capitalizeWords(e.target.value));
  };

  /*   const handleOnChangeEmail = (e) => {
    setInputEmail(e.target.value);
  }; */

  // to format the phone number as (XXX - XXXX - XXXX)
  const handleOnChangePhoneNo = (e) => {
    if (e.target.value.length < 13) {
      const currentPhoneNumber = ("" + e.target.value).replace(/\D/g, "");

      let formattedPhoneNumber = `${currentPhoneNumber.substring(0, 3)}${
        currentPhoneNumber.length > 3 ? "-" : ""
      }${currentPhoneNumber.substring(3, 7)}${
        currentPhoneNumber.length > 7 ? "-" : ""
      }${currentPhoneNumber.substring(7, 11)}`;

      setInputPhoneNo(formattedPhoneNumber);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const personal_details = {
    personal_details: {
      first_name: inputFirstName,
      last_name: inputLastName,
      address: {
        street: inputStreet,
        city: inputCity,
      },
      nationality: inputNationality,
      //      email: inputEmail,
      phone_number: inputPhoneNo,
    },
  };

  console.log(personal_details);

  const handleSubmitEdit = async () => {
    await axios
      .put(
        `/api/explore-experts/portfolio/${name}/edit-headline/${id_expert}`,
        personal_details
      )
      .then((res) => {
        setPortfolio(res.data);
        console.log(res.data);
        setName(inputFirstName);
      });
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
     <div className="editButton"> <IconButton aria-label="edit" size="small">
        <EditSharpIcon
          onClick={handleClickOpen}
          fontSize="inherit"
          color="inherit"
        />
      </IconButton> </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit education</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            type="text"
            label="First Name"
            defaultValue={first_name}
            placeholder="First name"
            fullWidth
            variant="standard"
            onChange={handleOnChangeFirstName}
            disabled
          />
          <TextField
            autoFocus
            margin="dense"
            type="text"
            label="Last Name"
            defaultValue={last_name}
            fullWidth
            variant="standard"
            onChange={handleOnChangeLastName}
          />
          <TextField
            autoFocus
            margin="dense"
            type="text"
            label="Street"
            defaultValue={street}
            fullWidth
            variant="standard"
            onChange={handleOnChangeStreet}
          />
          <TextField
            autoFocus
            margin="dense"
            type="text"
            label="City"
            defaultValue={city}
            placeholder="City"
            fullWidth
            variant="standard"
            onChange={handleOnChangeCity}
          />
          <TextField
            autoFocus
            margin="dense"
            type="text"
            label="Country"
            defaultValue={nationality}
            placeholder="Country"
            fullWidth
            variant="standard"
            onChange={handleOnChangeNationality}
          />
          {/*           <TextField
            autoFocus
            margin="dense"
            type="text"
            label={email}
            placeholder="email"
            fullWidth
            variant="standard"
            onChange={handleOnChangeEmail}
          /> */}
          <TextField
            autoFocus
            margin="dense"
            type="text"
            label="Phone Number"
            defaultValue={phone_number}
            placeholder="Phone Number"
            fullWidth
            variant="standard"
            onChange={handleOnChangePhoneNo}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitEdit}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
