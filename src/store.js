import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './features/tasks/tasksSlice'
import { apiSlice } from './features/api/apiSlice'

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        tasks: tasksReducer
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware().concat(apiSlice.middleware)
    }
})

export default store