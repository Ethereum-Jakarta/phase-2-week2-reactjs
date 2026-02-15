import React, { useState } from "react";

type AddTaskProp = {
  onAdd: (text: string) => unknown;
}

const AddTask: React.FC<AddTaskProp> = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    if (!text) return;
    onAdd(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add new task..."
      />
      <button type="submit">Add Task</button>
    </form>
  )
}

export default AddTask;
