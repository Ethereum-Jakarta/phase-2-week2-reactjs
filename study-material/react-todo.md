# React Todo List (More Fundamental)

Materi kali ini kita akan belajar lebih lanjut tentang React Component. Setelah kalian mengetahui basic cara react bekerja, 
kita sudah bisa memakai fungsi" dan kelebihan react dalam melakukan interaksi data dengan user.

Gua akan memakai contoh untuk membuat project simple todo list. Pertama tama kalian harus buat project baru menggunakan CRA (create react app).

`yarn create react-app todo-list`

*disini gua pakai package manager yarn, karena mac aga susah memakai NPM.


Seperti biasa bersihkan content default dari CRA di `App.js`

```JSX
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>ETHJKT Todo List</h1>
    </div>
  );
}

export default App;
```

## CSS Styling

Hal yang pertama kita pelajari adalah bagaimana kita menambahkan styling di dalam reactjs.

ada 2 cara untuk melakukan styling.

### .css file

cara pertama adalah kita membuat `.css` file terpisah dan melakukan import module ke dalam react component.
disini kita akan mengubah `App.css` dari default react menjadi custom styling kita sendiri.

Hapus semua code yang ada di `App.css` dan ganti color background seperti ini :

```css
.App {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

body {
  background-color: #161c24;
}
```

![image](https://github.com/user-attachments/assets/b6425f43-a84e-42c9-bb9a-2de13c94055e)

### Inline Styling (JSX)

cara kedua adalah kita melakukan inline styling menggunakan property `style` di setiap tag elemen JSX yang kalian buat.
karena font h1 jelek sekali, kita akan ubah ganti warna dan adjust centering.

```JSX
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 style={{textAlign: 'center', color: '#43B2E2'}}>ETHJKT Todo List</h1>
    </div>
  );
}

export default App;
```

seperti kalian lihat, ada perbedaan inline styling di JSX. dimana css ini menggunakan camelCase.

![image](https://github.com/user-attachments/assets/6fec46f6-ddcf-4202-87d0-b8aec67b4b33)


## Handling Events

Lanjut kita akan belajar gimana cara handling events di react. Sebelumnya kita sudah belajar 1 event di materi pertama yaitu `onClick` event.
Sekarang kita akan belajar Salah satu event yang umum dipakai untuk textfield yaitu `onChange` event.

`onChange` adalah event handler di React yang digunakan untuk menangani perubahan input pada elemen form, seperti `<input>`, `<textarea>`, dan `<select>`. 
Event ini dipicu setiap kali ada perubahan nilai pada elemen tersebut. `onChange` sangat berguna untuk mengontrol elemen input dan memperbarui state 
komponen berdasarkan input dari user.

Kita akan membuat komponen textfield untuk menulis task todolist di project ini, setiap user input text didalam textfield dan klik button submit. Maka todo yang sudah dibuat akan masuk kedalam state list of task.

Buatlah komponen `AddTask` di dalam folder src/components. 

src/components/AddTask.jsx
```JSX
import React, { useState } from 'react';

function AddTask({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return;
    onAdd(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add new task..."
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default AddTask;
```

jangan lupa tambahkan css untuk AddTask agar terlihat menarik, di `App.css`
```css
form {
  display: flex;
  margin-bottom: 20px;
}

input[type="text"] {
  flex-grow: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #FDFDFE
  ;
}

button {
  padding: 10px 20px;
  background-color: #43B2E2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
}
```

Fungsi `onChange` digunakan untuk menangani perubahan nilai input. Fungsi ini mengambil nilai terbaru dari event target (event.target.value) dan memperbarui state `text`.

Dengan menggunakan `onChange`, kita dapat membuat komponen form yang interaktif dan responsif terhadap input dari user, memastikan bahwa state komponen selalu sinkron dengan nilai input yang diberikan oleh user.

Props onAdd ini penghubung antara App.js dan AddTask komponen untuk menyalurkan data todo ke parent agar di push ke dalam `tasks` state.

update ke App.js
```JSX
import { useState } from 'react';
import './App.css';
import AddTask from './components/AddTask.jsx';

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    console.log(task)
    setTasks([...tasks, { id: Date.now(), text: task, completed: false, date: new Date() }]);
  };

  return (
    <div className="App">
      <h1 style={{textAlign: 'center', color: '#43B2E2'}}>ETHJKT Todo List</h1>
      <AddTask onAdd={addTask} />
    </div>
  );
}

export default App;
```

`addTask` function berfungsi untuk mendaftar kan task ke dalam task list state di parent `App`. 
Function ini disalurkan lewat props agar bisa dipanggil di AddTask component dimana kita melakukan 
handleChange event untuk menerima input dari user.

Testing untuk input todo di textfield dan mari kita lihat `console.log(task)` di inspect element.

![image](https://github.com/user-attachments/assets/49fb25f4-1cd3-4646-b3f9-3bc3ebf41b38)

Cek inspect element untuk memastikan kalau task yang di input dari user sudah sampai di parent component :

![image](https://github.com/user-attachments/assets/b49e94bd-8a8f-4f68-a183-9ccdec393c7c)

Fitur AddTask menggunakan event handling `onChange` telah selesai. Saatnya kita buat komponen untuk render semua tasks list.

## Rendering Lists

Sekarang kita bisa menampilkan task list dengan cara Embedding `.map` ES6 di ReactJs. Inilah mengapa kalian harus mengerti javascript dahulu sebelum react, karena banyak short hand code yang sering dipakai seperti ES6 dalam development react.

Disini kita membuat component TodoList dimana komponen ini akan rendering komponen individual `TodoItem` menggunakan function map ES6 di JSX.

Props yang disalurkan adalah task dari setiap callback data yang di terima didalam looping `.map`.

inilah flow komponen yang akan kita buat:
![image](https://github.com/user-attachments/assets/ab42bea9-e99a-4fe5-a501-37459170d09e)

Saat nya install modul React Icons untuk menggunakan salah satu icon Delete agar tampilan terlihat bagus.

jalankan command : `npm install react-icons --save` or `yarn add react-icons --save`

Setelah itu kita akan mulai dari komponen paling kecil yaitu `TodoItem`.

src/components/TodoItem.jsx

```JSX
import React from 'react';
import { MdDelete } from "react-icons/md";

function TodoItem({ task }) {
  return (
    <div className="todo-item">
      <div id="todo-left">
        <div id="todo-content">
            <span>
                {task.text}
            </span>
            <span className="date">{task.date.toLocaleString()}</span>
        </div>
      </div>
      
      <div id='todo-right'>
        <button><MdDelete /></button>
      </div>
    </div>
  );
}

export default TodoItem;
```

`<MdDelete/>` React icons ini bersifat text, jadi kita bisa bungkus menggunakan tag button agar komponen ini bersifat button dan mempunya property button.

`todo-content` karena kita sudah mempunyai propety task, kita bisa langsung binding data agar bisa menampilkannya di komponen ini.

lanjut membuat parent component todo, TodoList.jsx

src/components/TodoList.jsx
```JSX
import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ tasks}) {
  return (
    <div className="todo-list">
      {tasks.map(task => (
        <TodoItem
          key={task.id}
          task={task}
        />
      ))}
    </div>
  );
}
    
export default TodoList;
```

Bisa kalian lihat bagaimana mudahnya JSX untuk melakukan rendering list, dan perlu diperhatikan kalian wajib mendefinisikan unique `key` pada TodoItem.
valuenya wajib unik karena ini menandakan bahwa setiap elemen mempunya komponen masing".

Tambahkan css untuk design TodoList dan TodoItem :

App.css
```css
.todo-item {
  background-color: rgba(99, 99, 99, 0.115);
  border: 1px solid;
  border-radius: 5px;
  border-color: #43B2E2;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
}

.todo-item:hover {
  transform: translateX(-0.5rem);
  box-shadow: 0 20px 35px -25px #43b2e2;
  cursor: pointer;
}

.date {
  font-size: 12px;
  color: #888;
}

#todo-left {
  display: flex;
  flex-direction: row;
  gap: 10px 10px;
}

#todo-content {
  display: flex;
  flex-direction: column;
  justify-content: start;
}
```


Dan final step untuk implementasi TodoList di parent App.js agar deliver state task ke children.

App.js
```JSX
import { useState } from 'react';
import './App.css';
import AddTask from './components/AddTask.jsx';
import TodoList from './components/TodoList.jsx';

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    console.log(task)
    setTasks([...tasks, { id: Date.now(), text: task, completed: false, date: new Date() }]);
  };

  return (
    <div className="App">
      <h1 style={{textAlign: 'center', color: '#43B2E2'}}>ETHJKT Todo List</h1>
      <AddTask onAdd={addTask} />
      <TodoList tasks={tasks}/>
    </div>
  );
}

export default App;
```


### Show Case Test

![image](https://github.com/user-attachments/assets/a80d9ed3-2c5c-4f54-9db1-0dfe38daab93)

Kalian bisa testing fitur addTask dan melihat hasil task tersebut di tampilkan dengen component todoItem.
Selanjutnya kita akan menyelesaikan project ini dengan fitur completed dan delete task.

## Conditional Rendering

React conditional rendering adalah teknik untuk menampilkan komponen atau elemen tertentu berdasarkan kondisi tertentu. Dalam React, Kalian dapat menggunakan pernyataan kondisional seperti `if`, `else`, dan operator logika seperti `&&` atau `? :` untuk menentukan apakah suatu bagian dari UI harus dirender atau tidak, tergantung pada nilai state atau props. Ini memungkinkan Kalian untuk membuat UI yang dinamis dan responsif berdasarkan berbagai kondisi.

### Contoh Conditional Rendering:

Berikut adalah contoh sederhana menggunakan conditional rendering dengan pernyataan `if` dan operator `? :`.

**Contoh dengan pernyataan `if`:**

```javascript
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

function App() {
  return (
    <div>
      <Greeting isLoggedIn={true} />
    </div>
  );
}

export default App;
```

**Contoh dengan operator `? :`:**

```javascript
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  return (
    <div>
      {isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign up.</h1>}
    </div>
  );
}

function App() {
  return (
    <div>
      <Greeting isLoggedIn={true} />
    </div>
  );
}

export default App;
```

### Penjelasan:

1. **Pernyataan `if`**:
   - Pada contoh pertama, komponen `Greeting` menggunakan pernyataan `if` untuk menentukan apakah akan merender `UserGreeting` atau `GuestGreeting` berdasarkan nilai `isLoggedIn` yang diterima dari props.

2. **Operator `? :`**:
   - Pada contoh kedua, komponen `Greeting` menggunakan operator ternary `? :` untuk melakukan conditional rendering dalam satu baris kode. Jika `isLoggedIn` bernilai `true`, akan merender pesan "Welcome back!", jika tidak, akan merender pesan "Please sign up.".

Dengan conditional rendering, Kalian dapat membuat aplikasi React yang lebih fleksibel dan dinamis, memungkinkan UI untuk beradaptasi dengan berbagai kondisi dan memberikan pengalaman pengguna yang lebih baik.


### Todolist finishing feature

Saatnya menyelesaikan fitur tersisa dari todolist, dimana kita akan membuat checkbox untuk update complete task dan delete task ketika klik icon button trash.

masukan toggleTask dan deleteTask function sebaagai props di TodoList.

App.js
```JSX
import { useState } from 'react';
import './App.css';
import AddTask from './components/AddTask.jsx';
import TodoList from './components/TodoList.jsx';

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    console.log(task)
    setTasks([...tasks, { id: Date.now(), text: task, completed: false, date: new Date() }]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="App">
      <h1 style={{textAlign: 'center', color: '#43B2E2'}}>ETHJKT Todo List</h1>
      <AddTask onAdd={addTask} />
      <TodoList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask}/>
    </div>
  );
}

export default App;
```

Setelah itu di TodoList kalian juga harus melempar propsnya lagi ke child component `TodoItem`.

components/TodoList.jsx
```JSX
import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ tasks, onToggle, onDelete }) {
  return (
    <div className="todo-list">
      {tasks.map(task => (
        <TodoItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TodoList;
```

Terakhir kita akan membuat checkbox dengan onChange event enggunakan onToggle. Dan memasukan onDelete function ke button di class todo-right.

components/TodoItem.jsx
```JSX
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
            {
              task.completed ? (
                <span style={{textDecoration: 'line-through'}}>
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
```

Disini kita juga memakai conditional rendering pada task.text dimana ketika task itu sudah selesai maka text yang akan direndering adalah line-through text.

```JSX
<div id="todo-content">
            {
              task.completed ? (
                <span style={{textDecoration: 'line-through'}}>
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
```

### Testing

https://github.com/user-attachments/assets/e241ee06-1a6f-4c4f-a39d-1eb903ddadc8


### Refactor, style conditional rendering

Kita akan improve cara conditional rendering di style react, kalian bisa memalukan seperti ini :

```JSX
<div id="todo-content">
          <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.text}
          </span>
          <span className="date">{task.date.toLocaleString()}</span>
</div>
```

Jadi conditional rendering ini tidak terbatas hanya untuk render component di JSX saja, tapi kalian juga bisa melakukannya lewat styling react.
dan masih banyak lagi kombinasi kondisi-kondisi ini, seiring kalian menggunakan react pasti akan mengetahuinya nanti.

## CLOSING

Kita sudah selesai memepelajari fundamental dalam pembuatan component di react, setelah ini kalian akan belajar lifecycle dalam react menggunakan useEffect hook.

Push react-todo ini repo week2, karena react-todo ini masih dipakai untuk materi selanjutnya.

dan jangan lupa selalu explore dokumentasi reactjs.


Next Part -> [React Lifecycle Hook](https://github.com/Ethereum-Jakarta/phase-2-week2-reactjs/blob/main/study-material/lifecycle-hooks.md)








