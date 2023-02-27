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

export default function CertificationEdit({
  name,
  id_cert,
  certification_name,
  valid_from,
  setPortfolio,
}) {
  const [open, setOpen] = React.useState(false);
  const [inputCertificateName, setInputCertificateName] = useState();
  const [inputFromDate, setInputFromDate] = useState();

  const handleOnChangeCertificate = (e) => {
    setInputCertificateName(e.target.value);
  };

  const handleOnChangeFromDate = (e) => {
    setInputFromDate(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const certifications = {
    certifications: {
      certification_name: inputCertificateName,
      valid_from: inputFromDate,
    },
  };

  const handleSubmitEdit = () => {
    axios
      .put(
        `http://localhost:8888/portfolio/${name}/edit-certification/${id_cert}`,
        certifications
      )
      .then((res) => {
        setPortfolio(res.data);
      });
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        <DialogTitle>Edit certification</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            type="text"
            label={certification_name}
            placeholder="Certificate name"
            fullWidth
            variant="standard"
            onChange={handleOnChangeCertificate}
          />
          <TextField
            autoFocus
            margin="dense"
            type="date"
//            label={valid_from}
            fullWidth
            onChange={handleOnChangeFromDate}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitEdit}>DONE</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
