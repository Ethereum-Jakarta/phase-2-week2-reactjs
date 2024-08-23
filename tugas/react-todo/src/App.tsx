import React, { useEffect, useState } from "react";
import "./App.css";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";

export type Task = {
  id: number;
  text: string;
  completed: boolean;
  date: Date;
}

const App: React.FC<{}> = () => {
  const [tasks, setTasks] = useState([] as Task[]);
  const [isFetched, setIsFetched] = useState(false);

  const addTask = (task: string) => {
    console.log(task);
    setTasks([...tasks, { id: Date.now(), text: task, completed: false, date: new Date() }]);
  }

  const toggleTask = (id: number) => setTasks(tasks.map(task => 
    task.id === id ? ({...task, completed: !task.completed}) : task
  ));

  const deleteTask = (id: number) => setTasks(tasks.filter(task => task.id !== id));

  /**
   * INFO: Untuk ini saya bikin sendiri ya sir.
   * soalnya yang ditutor kalo tasks dihapus semua
   * saat refresh malah muncul lagi.
   */
  useEffect(() => {
    if (!isFetched) {
      const prevTasks: Task[] = JSON.parse(localStorage.getItem("tasks") ?? "[]");
      setTasks(prevTasks.map(x =>
        /** 
         * INFO: parse the iso string into Date
         * because when you saving the tasks
         * the Date object become isoString
         */
        ({...x, date: new Date(x.date)})
      ));
      setIsFetched(true);
    } else {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, isFetched]);

  // useEffect(() => {
  //   if (!tasks.length) return;
  //   localStorage.setItem("tasks", JSON.stringify(tasks));
  // }, [tasks]);
  //
  // useEffect(() => {
  //   const previousTasks = JSON.parse(localStorage.getItem("tasks") ?? "[]") as Task[];
  //   setTasks(previousTaskse(x.date))
  // ));
  // }, []);

  return (
    <div className="App">
      <h1 style={{ textAlign: "center", color: "#43B2E2" }} className="title">RPN Todo List</h1>
      <AddTask onAdd={addTask} />
      <TodoList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  );
}

export default App;
