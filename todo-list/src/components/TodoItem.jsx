import React from 'react';
import { MdDelete } from "react-icons/md";

function TodoItem({ task, onToggle, onDelete  }) {
  return (
    <div className="todo-item">
      <div id="todo-left">
        <label class="checkbox-container">
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
                id='checkbox'
            />
            <span class="checkmark"></span>
        </label>

        <div id="todo-content">
          <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.text}
          </span>
          <span className="date">{task.date.toLocaleString()}</span>
        </div>
      </div>
      
      <div id='todo-right'>
        <button id='d' onClick={() => onDelete(task.id)}><MdDelete /></button>
      </div>
    </div>
  );
}

export default TodoItem;