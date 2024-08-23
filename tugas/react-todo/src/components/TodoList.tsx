import type { Task } from "../App";
import TodoItem from "./TodoItem";

const TodoList: React.FC<{
  tasks: Task[];
  onDelete(id: number): unknown;
  onToggle(id: number): unknown;
}> = ({ tasks, onToggle, onDelete }) => (
  <div>
    {tasks.map(task =>
      (
        <TodoItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      )
    )}
  </div>
);

export default TodoList;
