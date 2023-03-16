import React, {useState, useEffect} from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask';

export default function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([]);

  // fetch tasks
  const fetchTasks = async() => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    return data;
  };
  
  // fetch task
  const fetchTask = async(id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    const getTasks = async () => {
      const dataFromServer = await fetchTasks();
      setTasks(dataFromServer);
    };
    getTasks();
  }, []) 

  async function handleAddTask(task) {
    const res = await fetch('http://localhost:5000/tasks', {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    const data = await res.json();
    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000 + 1);
    // const newTask = {...task, id}
    // setTasks([...tasks, newTask])
  }
  
  async function handleDelete(id) {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE"
    })
    
    setTasks(tasks.filter((task) => {
      return task.id !== id
    }))
  }

  async function handleReminder(id) {
    const taskToToggle = await fetchTask(id);
    const updTask = {...taskToToggle, reminder:!taskToToggle.reminder};

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(updTask)
    });
    const data = await res.json();
    
    setTasks(tasks.map((task) => {
      return  task.id === id ? {...task, reminder: data.reminder} : task
    }))
  }

  return (
    <div className="container">
      <Header showAddTask={showAddTask} handleAddForm={()=> {setShowAddTask(!showAddTask)}}/>
      {showAddTask && <AddTask addTask={handleAddTask} />}
      {tasks.length > 0 ? <Tasks tasks={tasks} toggleReminder={handleReminder} onDelete={handleDelete}/> : 'No Tasks to show'}
    </div>
  );
}