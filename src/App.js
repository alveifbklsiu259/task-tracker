import React, {useEffect, useCallback} from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { useTasksFunc} from './components/TasksProvider';

const targetURL = 'http://localhost:5000/tasks'

export default function App() {
  const {state, dispatch} = useTasksFunc();
  
  useEffect(() => {
    const getTasks = async () => {
      dispatch({type: 'tasksLoading'})
      try {
        const response = await fetch(targetURL);
        const data = await response.json()
        dispatch({type: 'tasksLoaded', payload: data})
      } catch {
        dispatch({type: 'loadingError'})
      }
        
    };
    getTasks();
  }, [dispatch])

  const handleAddTask = useCallback(async task => {
    const res = await fetch(targetURL, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    const data = await res.json();
    dispatch({type: 'addTask', payload: data});
  }, [dispatch])
  
  const handleDelete = useCallback(async id => {
    await fetch(`${targetURL}/${id}`, {
      method: "DELETE"
    })
    dispatch({type: 'deleteTask', payload: id})
  }, [dispatch])

  const handleReminder = useCallback(async id => {
    const target = state.tasks.find(task => task.id === id)
    const updTask = {...target, reminder:!target.reminder};
    await fetch(`${targetURL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(updTask)
    });
    dispatch({type: 'toggleTask', payload: id})
  }, [state, dispatch])

  return (
    <div className="container">
      <Header/>
      {state.showAddTask && <AddTask addTask={handleAddTask} />}
      <Tasks toggleReminder={handleReminder} onDelete={handleDelete}/>
    </div>
  );
};