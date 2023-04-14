import { memo } from "react"
import Task from './Task'
import { useTasksFunc } from "./TasksProvider"

const Tasks = memo(function Tasks({onDelete, toggleReminder}) {
    const {state, state: {tasks = []}} = useTasksFunc();

    let content;
    if (state.status === 'loading') {
        content = <p>Loading...</p>
    } else if (state.status === 'idle' && state.tasks.length === 0) {
        content = <p>No Tasks to show</p>
    } else if (state.status === 'error') {
        content = <p style={{color: 'red'}}>Please connect to the json server at port 5000</p>
    } else {
        content = (
            <>
                {tasks.map((task) => (
                    <Task key={task.id} task={task} handleDelete={onDelete} toggleReminder={toggleReminder}/>
                ))}
            </>
        )
    }
    return (
        <>
            {content}
        </>
    )
})

export default Tasks