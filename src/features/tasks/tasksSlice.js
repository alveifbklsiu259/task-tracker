import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

const tasksAdapter = createEntityAdapter()

const initialState = tasksAdapter.getInitialState({
    status: null,
    showAddTask: false
})

// thunk function
const targetURL = 'http://localhost:5000/tasks'

export const getTasks = createAsyncThunk('tasks/tasksfetched', async () => {
    const response = await fetch(targetURL);
    const data = await  response.json();
    return data
})

export const addTask = createAsyncThunk('tasks/taskAdded', async task => {
    const response = await fetch(targetURL, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(task)
    });
    const data = await response.json();
    return data
})

export const deleteTask = createAsyncThunk('tasks/taskDeleted', async id => {
    await fetch(`${targetURL}/${id}`, {
        method: "DELETE"
    });
    return id;
})

export const toggleTask = createAsyncThunk('tasks/taskToggled', async task => {
    const response = await fetch(`${targetURL}/${task.id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({...task, reminder: !task.reminder})
    });
    const data = await response.json();
    return data
})

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addFormToggled(state, action) {
            return {
                ...state, showAddTask: !state.showAddTask
            }
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getTasks.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.status = 'idle';
                tasksAdapter.setAll(state, action.payload)
            })
            .addCase(getTasks.rejected, (state, action) => {
                return {
                    ...state, status: 'error'
                }
            })
            .addCase(addTask.fulfilled, tasksAdapter.addOne)
            .addCase(deleteTask.fulfilled, tasksAdapter.removeOne)
            .addCase(toggleTask.fulfilled, (state, action) => {
                const {id, reminder} = action.payload
                const existingTask = state.entities[id];
                if (existingTask) {
                    existingTask.reminder = reminder
                }
                // return {...state, tasks: state.tasks.map(task => task.id === action.payload ? {...task, reminder: !task.reminder} : task)}
            })
    }
})

// selector
export const selecStatus = state => state.tasks.status
export const selectShowAddTaskVal = state => state.tasks.showAddTask

export const {
    selectAll: selectTasks,
} = tasksAdapter.getSelectors(state => state.tasks)

export const {tasksLoaded, taskAdded, taskDeleted, taskToggled, addFormToggled, tasksLoading, loadingError } = tasksSlice.actions
export default tasksSlice.reducer
