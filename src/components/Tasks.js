import Task from './Task'

export default function Tasks({tasks, onDelete, toggleReminder}) {
    return (
        <>
            {tasks.map((task) => (
                <Task key={task.id} task={task} handleDelete={onDelete} toggleReminder={toggleReminder}/>
            ))}
        </>
    )
}