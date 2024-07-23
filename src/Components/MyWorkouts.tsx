import React, { useContext, useState } from "react"
import { MyContext } from "./ContextProvider"
import { GiWeightLiftingUp } from "react-icons/gi";
import { Box, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
import './style.css'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { PiArrowBendDoubleUpLeftFill } from "react-icons/pi";

import './style.css'

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
import { Excercise } from "./types";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "./FireBaseSetup";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function MyWorkouts() {
  const [ExcersiseList, setExcersiseList] = useState<Excercise[]>([])
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

  const PostExercise = async (data: any) => {
    try {
      console.log(data);

      const workOutsDocRef = doc(collection(db, 'Workouts'));
      await setDoc(workOutsDocRef, {
        id: workOutsDocRef.id,
        ...data
      })
    } catch (error) {
      console.error(error);
    }

  }
  const { WorkOuts, userDbData,fetchWorkOuts } = useContext(MyContext)
  const DeleteWorkout = async (id:string) =>{
    try {
      console.log(id);

        const workOutsDocRef = doc(db, 'Workouts',id);
        await deleteDoc(workOutsDocRef)
        if (fetchWorkOuts && userDbData) {
          await fetchWorkOuts(userDbData)
        }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="w-100 ">
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const obj = {
              name: formJson.WorkoutName,
              image: '',
              WorkOuts: ExcersiseList,
              user: userDbData?.id
            }
            if (ExcersiseList.length != 0) {
              PostExercise(obj)
            }else{
              console.log("Excersise list is empty");
              
            }
            handleClose();
          },
        }}
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
              <TextField
                autoFocus
                required
                margin="dense"
                id="WorkoutName"
                name="WorkoutName"
                label="Workout Name"
                type="text"
                variant="filled"
              />
            </Typography>
            <Button autoFocus type="submit" color="inherit">
              save
            </Button>
          </Toolbar>
        </AppBar>

        <Button variant="outlined" sx={{ marginY: '1rem' }} onClick={handleNestedOpen} color="secondary">Add Excercise</Button>
        {ExcersiseList.length != 0 ? (
          <DraggingList ExcersiseList={ExcersiseList} setExcersiseList={setExcersiseList} />
        ) : (
          <p className="text-center greyColor">This excercise is empty. Add excercise <div className="rotated-90"><PiArrowBendDoubleUpLeftFill /></div></p>
        )}
      </Dialog>

      <Dialog
        open={NestedDialogue}
        onClose={handleNestedClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const obj: Excercise = {
              id: (ExcersiseList.length + 1).toString(),
              ExcerciseName: formJson.ExcersiseName,
              Reps: formJson.Reps,
              Sets: formJson.Sets,
              Img: "Img Test",
            }
            console.log(obj);

            const newARR: Excercise[] = [...ExcersiseList, { ...obj, id: (ExcersiseList.length + 1).toString() }]
            setExcersiseList(newARR)
            handleNestedClose();
          },
        }}
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
            id="ExcersiseName"
            name="ExcersiseName"
            label="Excersise Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="Sets"
            name="Sets"
            label="No. sets"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="Reps"
            name="Reps"
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
            sx={{ marginTop: '1rem' }}
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNestedClose}>Cancel</Button>
          <Button type="submit">Add Excercise</Button>
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
            <Box className="w-100 bg-dark position-relative rounded-3 myOutline d-flex flex-column align-items-center justify-content-center noLink" minHeight={'12rem'} maxHeight={'12rem'}>
            <div className="position-absolute top-0 end-0">
              <div className="d-flex flex-column me-2 mt-2">
                <button className="btn btn-outline-info mb-1 p-1 pt-0"><FaRegEdit /></button>
                <button onClick={()=>DeleteWorkout(item.id)} className="btn btn-outline-danger p-1 pt-0"><FaRegTrashAlt /></button>
              </div>
            </div>
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
