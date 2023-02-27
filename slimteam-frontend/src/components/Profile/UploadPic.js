import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from "@mui/material/IconButton";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useState } from 'react';
import axios from 'axios';

export default function UploadPic({name}) {
  const [open, setOpen] = useState(false);
  const[profile_picture,setSelectedImage] = useState();
  const handleInput = async(e) => {
    const base64 = await toBase64(e.target.files[0]);
    setSelectedImage(base64);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  const editTodo = async() => {
    await axios.put(`http://localhost:8888/addprofilepic/${name}`, {profile_picture})
    .then(res => {
       console.log(res.data);
    })
    .catch(err => {
       console.log(err);
    });
    setOpen(false);
    }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton color="primary" aria-label="upload picture" component="label">
        <PhotoCamera onClick={handleClickOpen}/>
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit your Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            // label={task}
            type="file"
            fullWidth
            variant="standard"
            onChange={handleInput}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={editTodo}>UPLOAD</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}