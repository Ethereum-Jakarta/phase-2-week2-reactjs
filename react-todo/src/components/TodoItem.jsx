import React from 'react';
import { MdDelete } from "react-icons/md";

function TodoItem({ task, onToggle, onDelete }) {
  return (
    <div className="todo-item">
      <div id="todo-left">
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            id='checkbox'
          />
          <span className="checkmark"></span>
        </label>

        <div id="todo-content">
          {
            task.completed ? (
              <span style={{ textDecoration: 'line-through' }}>
                {task.text}
              </span>
            ) : (
              <span>
                {task.text}
              </span>
            )
          }
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