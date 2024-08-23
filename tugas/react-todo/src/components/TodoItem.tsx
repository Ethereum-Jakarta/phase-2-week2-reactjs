import type { Task } from "../App";
import { MdDelete } from "react-icons/md";

const TodoItem: React.FC<{
  task: Task;
  onDelete(id: number): unknown;
  onToggle(id: number): unknown;
}> = ({ task, onDelete, onToggle }) => (
  <div className="todo-item">
    <div id="todo-left">
      <label className="checkbox-container">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={_ => onToggle(task.id)}
          id="checkbox"
        />
        <span className="checkmark"></span>
      </label>
      <div id="todo-content">
        <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>{task.text}</span>
        <span className="date">{task.date.toLocaleString()}</span>
      </div>
    </div>
    <div id="todo-right">
      <button id="d" onClick={_ => onDelete(task.id)}><MdDelete/></button>
    </div>
  </div>
);

export default TodoItem;
