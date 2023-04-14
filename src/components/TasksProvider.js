import { createContext, useReducer, useContext} from 'react';
const initialState = {
  tasks: [],
  showAddTask: false,
  status: null
}

export const TasksContext = createContext(initialState);

export default function TasksProvider({children}) {
  const [state, dispatch] = useReducer(tasksReducer, initialState)
  
  return (
    <TasksContext.Provider value={{state, dispatch}}>
      {children}
    </TasksContext.Provider>
  )
};

const tasksReducer = (state, action) => {
  switch (action.type) {
    case 'tasksLoaded' : {
      return {
        ...state, tasks: action.payload, status: 'idle'
      }
    }
    case 'addTask' : {
      return {
        ...state, tasks: [...state.tasks, action.payload]
      }
    }
    case 'deleteTask' : {
      return {
        ...state, tasks: state.tasks.filter(task => task.id !== action.payload)
      }
    }
    case 'toggleTask' : {
      return {
        ...state, tasks: state.tasks.map(task => task.id === action.payload ? {...task, reminder: !task.reminder} : task)
      }
    }
    case 'toggleAddForm' : {
      return {
        ...state, showAddTask: !state.showAddTask
      }
    }
    case 'tasksLoading' : {
      return {
        ...state, status: 'loading'
      }
    }
    case 'loadingError' : {
      return {
        ...state, status: 'error'
      }
    }
    default :
      return state
  }
}

// custom hooks
export function useTasksFunc() {
  return useContext(TasksContext);
};

// conventional naming
// custom hooks in function and memoization