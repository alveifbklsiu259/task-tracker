import {FaTimes} from 'react-icons/fa'
import { memo } from 'react'
import { deleteTask, toggleTask } from './tasksSlice'
import { useDispatch } from 'react-redux'

const Task = memo(({task}) => {
    const dispatch = useDispatch()
    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => dispatch(toggleTask(task))}>
            <h3>{task.text} <FaTimes onClick={() => dispatch(deleteTask(task.id))} style={{color: 'red', cursor: 'pointer'}}/></h3>
            <p>{task.day}</p>
        </div>
    )
})

export default Task