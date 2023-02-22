import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

export default function LanguagesAdd({ name,id,portfolio , setPortfolio }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [language, setLanguage] = useState(null);
    const [proficiency, setProficiency] = useState(null);
  
    const languages = {
        languages :{language,proficiency}
    }
    const url = `http://localhost:8888/portfolio/${name}`;
    const AddLanguage = (e) => {
      e.preventDefault()
      axios.put(url, languages)
      .then((res) => {
      setPortfolio(res.data);
      });
      setOpen(false);
    };
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
         <IconButton aria-label="edit" size="large">
          <AddIcon onClick={handleClickOpen} fontSize="inherit" color="primary" />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New Experience</DialogTitle>
          <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
            }}
        >
          <MenuItem value="German">German</MenuItem>
          <MenuItem value="English">English</MenuItem>
          <MenuItem value="Russian">Russian</MenuItem>
          <MenuItem value="Arabic">Arabic</MenuItem>
        </Select>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={proficiency}
          onChange={(e) => {
            setProficiency(e.target.value);
            }}
        >
          <MenuItem value="Beginner">Beginner</MenuItem>
          <MenuItem value="Conversational">Conversational</MenuItem>
          <MenuItem value="Advanced">Advanced</MenuItem>#
          <MenuItem value="Native">Native</MenuItem>
        </Select>
      </FormControl>
          <DialogActions>
            <Button
             onClick={AddLanguage}
            >
              ADD
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  