import { closestCorners, DndContext, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import DragableItem from './DragableItem'
import { Divider, List, ListItemButton, ListItemText } from '@mui/material'

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
    return (
        <div>
            <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
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
