import { closestCorners, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
// import { useState } from 'react'
import DragableItem from './DragableItem'
import { List } from '@mui/material'
interface Excercise{
    id: string;
    ExcerciseName:string;
    Img: string;
    Reps: number;
    Sets: number;
}
interface props{
    ExcersiseList: Excercise[];
    setExcersiseList: React.Dispatch<React.SetStateAction<Excercise[] | []>>;
}
export default function DraggingList(props:props) {
    const {ExcersiseList , setExcersiseList} = props
    // const [ExcersiseList, setExcersiseList] = useState([{
    //     id: 'wadawdawd',
    //     ExcerciseName: 'pull ups',
    //     Img : 'test',
    //     Reps: 15,
    //     Sets : 3
    // },{
    //     id: 'wadawdawd2',
    //     ExcerciseName: 'pull ups',
    //     Img : 'test',
    //     Reps: 15,
    //     Sets : 3
    // },{
    //     id: 'wadawdawd3',
    //     ExcerciseName: 'pull ups',
    //     Img : 'test',
    //     Reps: 15,
    //     Sets : 3
    // },])

    const getArrID = (id: string | number | undefined) => ExcersiseList.findIndex(ExcersiseList => ExcersiseList.id == id)
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (active.id === over?.id) return
        const originalPosition = getArrID(active.id)
        const newPosition = getArrID(over?.id)
        const newArr = arrayMove(ExcersiseList, originalPosition, newPosition)
        setExcersiseList(newArr)
    }
    const sensors = useSensors(
        useSensor(PointerSensor), 
        useSensor(TouchSensor),  
        useSensor(KeyboardSensor)    
        )
    return (
        <div>
            <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
                <SortableContext items={ExcersiseList} strategy={verticalListSortingStrategy}>
                    <List sx={{maxWidth:'100%', overflow:'hidden'}}>
                        {ExcersiseList.map((item) => (
                            <DragableItem key={item.id} id={item.id} item={item} />
                        ))}

                        

                    </List>
                </SortableContext>
            </DndContext>
        </div>

    )
}
