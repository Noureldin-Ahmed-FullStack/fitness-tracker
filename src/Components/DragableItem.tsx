import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities"
import { Divider, ListItemButton, ListItemText } from "@mui/material";
import { Excercise } from "./types";

interface ItemProps {
    item: Excercise;
    id: string;
}
export default function DragableItem(props: ItemProps) {
    const { item, id } = props
    const { listeners, attributes, setNodeRef, transform, transition } = useSortable({ id })
    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }
    return (
        <>
            <ListItemButton style={style} id={id} ref={setNodeRef} {...attributes} {...listeners} className='btn btn-secondary TouchActionNone flex-column my-1' >

                <ListItemText primary={item.ExcerciseName} secondary={item.Sets + " * " + item.Reps} />
            </ListItemButton>
            <Divider />
        </>

    )
}
