import React, { useState } from 'react';
import axios from 'axios';

const TaskItem = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await axios.put(`http://127.0.0.1:8000/api/tasks/${task.id}/`, editedTask);
      setIsEditing(false);
      onTaskUpdated();
    } catch (error) {
      console.error('Error updating task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setLoading(true);
      try {
        await axios.delete(`http://127.0.0.1:8000/api/tasks/${task.id}/`);
        onTaskDeleted();
      } catch (error) {
        console.error('Error deleting task:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleComplete = async () => {
    const updatedTask = {
      ...task,
      status: task.status === 'completed' ? 'pending' : 'completed'
    };
    
    setLoading(true);
    try {
      await axios.put(`http://127.0.0.1:8000/api/tasks/${task.id}/`, updatedTask);
      onTaskUpdated();
    } catch (error) {
      console.error('Error updating task:', error);
    } finally {
      setLoading(false);
    }
  };

  const priorityColors = {
    high: '#ff6b6b',
    medium: '#ffd93d',
    low: '#6bcf7f'
  };

  return (
    <div className="task-item" style={{ borderLeft: `4px solid ${priorityColors[task.priority]}` }}>
      {isEditing ? (
        <div className="task-edit">
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            className="edit-input"
          />
          <textarea
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            className="edit-textarea"
          />
          <select
            value={editedTask.priority}
            onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
            className="edit-select"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <div className="edit-actions">
            <button onClick={handleUpdate} disabled={loading} className="btn-save">
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button onClick={() => setIsEditing(false)} className="btn-cancel">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="task-header">
            <div className="task-title">
              <input
                type="checkbox"
                checked={task.status === 'completed'}
                onChange={toggleComplete}
                disabled={loading}
              />
              <h3 className={task.status === 'completed' ? 'completed' : ''}>
                {task.title}
              </h3>
            </div>
            <div className="task-actions">
              <button onClick={() => setIsEditing(true)} className="btn-edit">
                Edit
              </button>
              <button onClick={handleDelete} disabled={loading} className="btn-delete">
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
          
          <p className="task-description">{task.description || 'No description'}</p>
          
          <div className="task-footer">
            <span className={`task-status ${task.status}`}>
              {task.status}
            </span>
            <span className="task-priority">
              Priority: <strong>{task.priority}</strong>
            </span>
            {task.due_date && (
              <span className="task-due">
                Due: {new Date(task.due_date).toLocaleDateString()}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;