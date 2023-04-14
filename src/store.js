import { createStore, applyMiddleware, combineReducers } from "redux";
import tasksReducer from './features/tasks/tasksSlice';
import thunkmiddleware from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkmiddleware));

const rootReducer = combineReducers({
    tasks: tasksReducer
});

const store = createStore(rootReducer, composedEnhancer);

export default store;
