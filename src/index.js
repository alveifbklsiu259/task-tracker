import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import TasksProvider from './components/TasksProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <TasksProvider>
        <App />
    </TasksProvider>
);