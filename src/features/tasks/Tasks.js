import { memo } from "react";
import Task from './Task';
import { useSelector} from "react-redux";
import { selectTasks, selecStatus } from './tasksSlice'

const Tasks = memo(function Tasks() {
    const status = useSelector(selecStatus);
    const tasks = useSelector(selectTasks);
    let content;
    if (status === 'loading') {
        content = <p>Loading...</p>
    } else if (status === 'idle' && tasks.length === 0) {
        content = <p>No Tasks to show</p>
    } else if (status === 'error') {
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