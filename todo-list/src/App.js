import { useState } from 'react';
import './App.css';
import AddTask from './components/AddTask.jsx';
import TodoList from './components/TodoList.jsx';

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    console.log(task);
    setTasks([...tasks, { id: Date.now(), text: task, completed: false, date: new Date() }])
    
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center', color: '#43B2E2' }}>RPN Todo List</h1>
      <AddTask onAdd={addTask}/>
      <TodoList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask}/>
    </div>
  );
}

export default App;