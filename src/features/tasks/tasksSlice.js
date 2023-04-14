const initialState = {
    tasks: [],
    status: null,
    showAddTask: false
};

const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'tasks/tasksLoaded' : {
            return {
                ...state, tasks: action.payload, status: 'idle'
            }
        }
        case 'tasks/taskAdded' : {
            return {
                ...state, tasks: [...state.tasks, action.payload]
            }
        }
        case 'tasks/taskDeleted' : {
            return {
                ...state, tasks: state.tasks.filter(task => task.id !== action.payload)
            }
        }
        case 'tasks/taskToggled' : {
            return {
                ...state, tasks: state.tasks.map(task => task.id === action.payload ? {...task, reminder: !task.reminder} : task)
            }
        }
        case 'tasks/addFormToggled' : {
            return {
                ...state, showAddTask: !state.showAddTask
            }
        }
        case 'tasks/tasksLoading' : {
            return {
                ...state, status: 'loading'
            }
        }
        case 'tasks/loadingError' : {
            return {
                ...state, status: 'error'
            }
        }
        default :
            return state
    }
};

// action creator
const tasksLoaded = tasks => {
    return {
        type: 'tasks/tasksLoaded',
        payload: tasks
    }
}

export const tasksAdded = task => {
    return {
        type: 'tasks/taskAdded',
        payload: task
    }
}

export const taskeDeleted = id => {
    return {
        type: 'tasks/taskDeleted',
        payload: id
    }
}

export const taskToggled = id => {
    return {
        type: 'tasks/taskToggled',
        payload: id
    }
}

export const addFormToggled = () => {
    return {
        type: 'tasks/addFormToggled',
    }
}

export const tasksLoading = () => {
    return {
        type: 'tasks/tasksLoading',
    }
}

export const loadingError = () => {
    return {
        type: 'tasks/loadingError',
    }
}

// thunk function
const targetURL = 'http://localhost:5000/tasks'

export const handleGetTasks = () =>  async dispatch => {
    dispatch(tasksLoading())
    try {
      const response = await fetch(targetURL);
      const data = await response.json()
      dispatch(tasksLoaded(data))
    } catch {
      dispatch(loadingError())
    }
}

export const handleAddTask = task => {
    return async dispatch => {
        const res = await fetch(targetURL, {
          method: "POST",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(task)
        });
        const data = await res.json();
        dispatch(tasksAdded(data));
    }
}

export const handleDelete = id => {
    return async dispatch => {
        await fetch(`${targetURL}/${id}`, {
            method: "DELETE"
        });
        dispatch(taskeDeleted(id))
    }
}

export const handleReminder = id => {
    return async (dispatch, getState) => {
        const target = getState().tasks.tasks.find(task => task.id === id)
        const updTask = {...target, reminder:!target.reminder};
        await fetch(`${targetURL}/${id}`, {
            method: "PUT",
            headers: {
            "Content-type": "application/json"
            },
            body: JSON.stringify(updTask)
        });
        dispatch(taskToggled(id))
    }
}

// selector
export const selectTasks = state => state.tasks.tasks
export const selecStatus = state => state.tasks.status
export const selectShowAddTaskVal = state => state.tasks.showAddTask

export default tasksReducer