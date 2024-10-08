// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Change Switch to Routes
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import TaskList from './components/Tasks/TaskList';
import TaskForm from './components/Tasks/TaskForm';

const App = () => {
    const [tasks, setTasks] = useState([]);

    // Function to fetch tasks
    const fetchTasks = async () => {
        try {
            const response = await fetch('/api/tasks'); // Adjust this URL to your API endpoint
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setTasks(data); // Update the tasks state
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks(); // Fetch tasks when the component mounts
    }, []);

    return (
        <Router>
            <Routes> {/* Replace Switch with Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/tasks" element={
                    <>
                        <TaskForm fetchTasks={fetchTasks} />
                        <TaskList tasks={tasks} /> {/* Pass tasks as props */}
                    </>
                } />
                <Route path="/" element={<h1>Welcome to the To-Do App</h1>} />
            </Routes>
        </Router>
    );
};

export default App;
