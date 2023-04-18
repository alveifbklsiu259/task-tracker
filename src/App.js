import Header from './features/tasks/Header';
import Tasks from './features/tasks/Tasks';
import AddTask from './features/tasks/AddTask';
import { useSelector } from 'react-redux';
import { selectShowAddTaskVal } from './features/tasks/tasksSlice';

export default function App() {
  const showAddTask = useSelector(selectShowAddTaskVal)
  return (
    <div className="container">
      <Header/>
      {showAddTask && <AddTask/>}
      <Tasks />
    </div>
  );
};