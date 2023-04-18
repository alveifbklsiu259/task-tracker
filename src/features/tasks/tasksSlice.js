import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

const tasksAdapter = createEntityAdapter()

const initialState = tasksAdapter.getInitialState({
    showAddTask: false,
});

const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTasks: builder.query({
            query: () => '/tasks',
            providesTags: ['tasks'],
            transformResponse: (responseData) => {
                return tasksAdapter.setAll(initialState, responseData)
            }
        }),
        addTask: builder.mutation({
            query: task => ({
                url: `/tasks`,
                method: "POST",
                body: task
            }),
            invalidatesTags:['tasks']
        }),
        deleteTask: builder.mutation({
            query: id => ({
                url: `/tasks/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['tasks']
        }),
        toggleTask: builder.mutation({
            query: task => ({
                url: `/tasks/${task.id}`,
                method: "PUT",
                body: {...task, reminder: !task.reminder}
            }),
            invalidatesTags: ['tasks']
        })
    })
})

export const {
    useGetTasksQuery,
    useAddTaskMutation,
    useDeleteTaskMutation,
    useToggleTaskMutation
} = extendedApiSlice

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
})

// selector
export const selectShowAddTaskVal = state => state.tasks.showAddTask

export const selectTasksResult = extendedApiSlice.endpoints.getTasks.select();
export const selectTasksData = createSelector(selectTasksResult, result => result.data)

export const {
    selectAll: selectTasks,
} = tasksAdapter.getSelectors(state => selectTasksData(state) ?? initialState)

export const {addFormToggled} = tasksSlice.actions
export default tasksSlice.reducer