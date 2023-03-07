import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from "@mui/material/IconButton";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import axios from "../../../axiosClient";

export default function LanguageEdit({name,id_lang,language,proficiency,setPortfolio}) {
    const [open, setOpen] = useState(false);
    const [languageEdit, setLanguageEdit] = useState(null);
    const [proficiencyEdit, setProficiencyEdit] = useState(null);
    
    const languages = {
      languages: { language:languageEdit?languageEdit:language, proficiency:proficiencyEdit?proficiencyEdit:proficiency },
    };
    const url = `/portfolio/${name}`;
    const AddLanguages = (e) => {
        axios
        .put(
          `/portfolio/${name}/edit-languages/${id_lang}`,
          languages
        )
        .then((res) => {
          setPortfolio(res.data);
        });
      setOpen(false);
    };
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason !== 'backdropClick') {
        setOpen(false);
      }
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
        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Add Languages</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              {/* <InputLabel htmlFor="demo-dialog-native">Language</InputLabel> */}
              <TextField
              autoFocus
              margin="dense"
              id="name"
              label="language"
              defaultValue={language}
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setLanguageEdit(e.target.value);
                }}
            />
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-dialog-select-label">Proficiency</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                defaultValue={proficiency}
                onChange={(e) => {
                  setProficiencyEdit(e.target.value);
                  }}
                input={<OutlinedInput label="Proficiency" />}
              >
                <MenuItem value="">
                </MenuItem>
                <MenuItem value="beginner">Beginner</MenuItem>
                <MenuItem value="Conversational">Conversational</MenuItem>
                <MenuItem value="Advanced">Advanced</MenuItem>
                <MenuItem value="Native">Native</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button  onClick={AddLanguages}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
