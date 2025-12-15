import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/tasks/');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // CALCULATE INSIDE THE COMPONENT, AFTER tasks IS DEFINED
  const totalTasks = tasks.length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const pendingCount = tasks.filter(t => t.status === 'pending').length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.status === 'completed';
    if (filter === 'pending') return task.status === 'pending';
    return true;
  });

  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Task Manager</h1>
          <p>Welcome, {user?.username}!</p>
        </div>
        <div className="header-actions">
          <button 
            onClick={() => document.body.classList.toggle('dark-mode')}
            className="theme-toggle"
            title="Toggle dark/light mode"
          >
            🌙/☀️
          </button>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-sidebar">
          <div className="stats">
            <h3>Task Stats</h3>
            <p>Total: {totalTasks}</p>
            <p>Completed: {completedCount}</p>
            <p>Pending: {pendingCount}</p>
            
            <div className="progress-container">
              <p>Completion Progress: {completionPercentage}%</p>
              <div className="progress-bar">
                <div 
                  className={`progress-fill ${
                    completionPercentage >= 70 ? 'excellent' : 
                    completionPercentage >= 40 ? 'good' : 'poor'
                  }`}
                  style={{ width: `${completionPercentage}%` }}
                >
                  {completionPercentage}%
                </div>
              </div>
            </div>
          </div>

          <div className="filters">
            <h3>Filter Tasks</h3>
            <button 
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              All Tasks
            </button>
            <button 
              className={filter === 'pending' ? 'active' : ''}
              onClick={() => setFilter('pending')}
            >
              Pending
            </button>
            <button 
              className={filter === 'completed' ? 'active' : ''}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>

          <button 
            onClick={() => setShowForm(true)}
            className="btn-add-task"
          >
            + Add New Task
          </button>
        </div>

        <div className="dashboard-main">
          {showForm ? (
            <TaskForm 
              onClose={() => setShowForm(false)}
              onTaskCreated={fetchTasks}
            />
          ) : (
            <TaskList 
              tasks={filteredTasks}
              onTaskUpdated={fetchTasks}
              onTaskDeleted={fetchTasks}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;