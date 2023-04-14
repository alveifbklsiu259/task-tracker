import { useState } from 'react'
import swal from 'sweetalert'

export default function AddTask({addTask}) {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)
    const canSave = [text, day].every(Boolean);

    const onSubmit = e => {
        e.preventDefault();
        if(!canSave) {
            swal('Please enter some task or day & time')
            return
        } else {
            addTask({text, day, reminder, id: +(Math.random() * 10000).toFixed(0)});
            setText('')
            setDay('')
            setReminder(false)
        }
    }
    
    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Task</label>
                <input type="text" placeholder="Add Task" value={text} onChange={(e) => {setText(e.target.value)}}/>
            </div>
            <div className="form-control">
                <label>Day & Time</label>
                <input type="text" placeholder="Add Day & Time" value={day} onChange={(e) => {setDay(e.target.value)}}/>
            </div>
            <div className="form-control form-control-check">
                <label>Set Reminder</label>
                <input type="checkbox" checked={reminder}  onChange={(e) => {setReminder(e.target.checked)}}/>
            </div>
            <input type="submit" value="Save Task" className="btn btn-block"/>
        </form>
    )
}