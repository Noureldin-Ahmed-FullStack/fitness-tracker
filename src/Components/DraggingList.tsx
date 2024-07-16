import { closestCorners, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import DragableItem from './DragableItem'
import { List } from '@mui/material'

export default function DraggingList() {
    const [PeopleList, setPeopleList] = useState(["ahmed", "adel", "Mohamed", "Kamal", "nour", "Ramy"])
    const getArrID = (id: string | number | undefined) => PeopleList.findIndex(PeopleList => PeopleList == id)
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (active.id === over?.id) return
        const originalPosition = getArrID(active.id)
        const newPosition = getArrID(over?.id)
        const newArr = arrayMove(PeopleList, originalPosition, newPosition)
        setPeopleList(newArr)
    }
    const sensors = useSensors(
        useSensor(PointerSensor), 
        useSensor(TouchSensor),  
        useSensor(KeyboardSensor)    
        )
    return (
        <div>
            <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
                <SortableContext items={PeopleList} strategy={verticalListSortingStrategy}>
                    <List sx={{maxWidth:'100%', overflow:'hidden'}}>
                        {PeopleList.map((item) => (
                            <DragableItem key={item} id={item} item={item} />
                        ))}

                        

                    </List>
                </SortableContext>
            </DndContext>
        </div>

    )
}
