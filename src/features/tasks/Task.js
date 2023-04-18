import {FaTimes} from 'react-icons/fa'
import { memo } from 'react'
import { useDeleteTaskMutation, useToggleTaskMutation } from './tasksSlice'

const Task = memo(({task}) => {
    const [deleteTask] = useDeleteTaskMutation();
    const [toggleTask] = useToggleTaskMutation();

    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => toggleTask(task)}>
            <h3>{task.text} <FaTimes onClick={() => deleteTask(task.id)} style={{color: 'red', cursor: 'pointer'}}/></h3>
            <p>{task.day}</p>
        </div>
    )
})

export default Task