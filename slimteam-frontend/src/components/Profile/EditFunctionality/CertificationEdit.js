import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
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
  const [inputFromDate, setInputFromDate] = useState(valid_from);

  const handleOnChangeCertificate = (e) => {
    setInputCertificateName(e.target.value);
  };

  const handleOnChangeFromDate = (newValue) => {
    setInputFromDate(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const certifications = {
    certifications: {
      certification_name: inputCertificateName?inputCertificateName:certification_name,
      valid_from: inputFromDate?inputFromDate:valid_from,
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
      <IconButton aria-label="edit" size="small">
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
            label="Name of Certification"
            defaultValue={certification_name}
            placeholder="Certificate name"
            fullWidth
            variant="standard"
            onChange={handleOnChangeCertificate}
          />
          <div style={{padding:"1rem"}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
         <div style={{padding:"1rem"}}>
        <DesktopDatePicker
          label="from date"
          inputFormat="MM/DD/YYYY"
          value={inputFromDate}
          onChange={handleOnChangeFromDate}
          renderInput={(params) => <TextField {...params} />}
        /></div>
          </LocalizationProvider>
          </div>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose}>CANCEL</Button>
          <Button onClick={handleSubmitEdit}>DONE</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
