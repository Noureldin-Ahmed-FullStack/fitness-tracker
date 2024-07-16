import React, { useContext, useState } from "react"
import { MyContext } from "./ContextProvider"
import { GiWeightLiftingUp } from "react-icons/gi";
import { Box, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
import { Link } from "react-router-dom";
import './style.css'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import ListItemText from '@mui/material/ListItemText';
// import ListItemButton from '@mui/material/ListItemButton';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
// import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded';
// import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import { TransitionProps } from '@mui/material/transitions';
import DraggingList from "./DraggingList";
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
  const [NestedDialogue, setNestedDialogue] = useState(false);

  const handleNestedOpen = () => {
    setNestedDialogue(true);
  };

  const handleNestedClose = () => {
    setNestedDialogue(false);
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
              Add a Workout!
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Button variant="outlined" sx={{ marginY: '1rem' }} onClick={handleNestedOpen} color="secondary">Add Excercise</Button>
        {/* <List>
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
        </List> */}
        <DraggingList />
      </Dialog>
      
      <Dialog
        open={NestedDialogue}
        onClose={handleNestedClose}
      // PaperProps={{
      //   component: 'form',
      //   onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
      //     event.preventDefault();
      //     const formData = new FormData(event.currentTarget);
      //     const formJson = Object.fromEntries((formData as any).entries());
      //     const email = formJson.email;
      //     console.log(email);
      //     handleNestedClose();
      //   },
      // }}
      >
        <DialogTitle>submit Excersise</DialogTitle>
        <DialogContent>
          <DialogContentText>
            this is where you describe you excercise
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="Excersise_Name"
            name="Excersise_Name"
            label="Excersise Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="sets"
            name="sets"
            label="No. sets"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="reps"
            name="reps"
            label="No. reps"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            id="outlined-textarea"
            fullWidth
            rows={3}
            label="Instructions / Describtion"
            placeholder="Instructions"
            variant="outlined"
            sx={{marginTop:'1rem'}}
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNestedClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>
      <h1>My Workout Plans!</h1>
      {/* <button className="btn btn-outline-success mb-3">Add Workout</button> */}
      <Button variant="outlined" sx={{ marginBottom: '2rem' }} onClick={handleClickOpen}>
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
