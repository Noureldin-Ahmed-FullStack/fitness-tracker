import React, { useContext, useState } from "react"
import { MyContext } from "./ContextProvider"
import { GiWeightLiftingUp } from "react-icons/gi";
import { Box } from "@mui/material"
import { Link } from "react-router-dom";
import './style.css'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function MyWorkouts() {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { WorkOuts } = useContext(MyContext)
  return (
    <div className="w-100 ">
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItemButton>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItemButton>
        </List>
      </Dialog>
      <h1>My Workout Plans!</h1>
      {/* <button className="btn btn-outline-success mb-3">Add Workout</button> */}
      <Button variant="outlined" sx={{marginBottom: '2rem'}} onClick={handleClickOpen}>
        Add Workout
      </Button>
      <div className='text-light row g-3 justify-content-center w-100'>
        {WorkOuts?.map((item) => (
          <div key={item.id} className='col-6 col-md-4'>
            <Box className="w-100 bg-dark rounded-3 myOutline d-flex flex-column align-items-center justify-content-center noLink" minHeight={'12rem'} maxHeight={'12rem'} component={Link} to={'/bmi'}>
              <div className='p-3'>
                <h5>{item?.name}</h5>
                <GiWeightLiftingUp size={100} />
              </div>
            </Box>
          </div>
        ))}
      </div>
    </div>

  )
}
