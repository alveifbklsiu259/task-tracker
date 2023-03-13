import {FaTimes} from 'react-icons/fa'

export default function Task({task, handleDelete, toggleReminder}) {
    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => {toggleReminder(task.id)}}>
            <h3>{task.text} <FaTimes onClick={() => {handleDelete(task.id)}} style={{color: 'red', cursor: 'pointer'}}/></h3>
            <p>{task.day}</p>
        </div>
    )
}