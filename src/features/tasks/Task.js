import {FaTimes} from 'react-icons/fa'
import { memo } from 'react'
import { handleDelete, handleReminder } from './tasksSlice'
import { useDispatch } from 'react-redux'

const Task = memo(({task}) => {
    const dispatch = useDispatch()
    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => dispatch(handleReminder(task.id))}>
            <h3>{task.text} <FaTimes onClick={() => dispatch(handleDelete(task.id))} style={{color: 'red', cursor: 'pointer'}}/></h3>
            <p>{task.day}</p>
        </div>
    )
})

export default Task