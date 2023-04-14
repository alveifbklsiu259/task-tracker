import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import store from './store';
import { Provider } from 'react-redux';
import { getTasks} from './features/tasks/tasksSlice';

store.dispatch(getTasks())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);