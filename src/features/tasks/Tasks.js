import { memo } from "react";
import Task from './Task';
import { useSelector} from 'react-redux'
import {useGetTasksQuery, selectTasks} from './tasksSlice'

const Tasks = memo(function Tasks() {
    const tasks = useSelector(selectTasks)

    const {
        isLoading,
        isSuccess,
        isError,
    } = useGetTasksQuery()

    let content;
    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isSuccess && tasks.length === 0) {
        content = <p>No Tasks to show</p>
    } else if (isError) {
        content = <p style={{color: 'red'}}>Please connect to the json server at port 5000</p>
    } else {
        content = (
            <>
                {tasks.map((task) => (
                    <Task key={task.id} task={task}/>
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