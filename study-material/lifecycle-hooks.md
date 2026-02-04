# React Lifecycle Hook

Di materi kali ini gua akan ngajarin kalian gimana proses lifecycle dalam react dan menggunakan react hook (useEffect) untuk membuat proses di suatu lifecycle.

Sebelum belajar lifecycle dalam react, gua mau kalian pahamin apa itu react hooks terlebih dahulu, ini hanya penjelasan singkat saja terhadap macam macam react hooks. Detail materi untuk advance hooks akan dibahas lebih lanjut di week 3.

## Pengenalan React Hooks

React Hooks adalah fitur yang diperkenalkan di React 16.8 yang memungkinkan penggunaan state dan fitur-fitur lain dari React dalam komponen fungsional tanpa memerlukan kelas. Hooks memberikan cara yang lebih elegan dan modular untuk mengelola state, efek samping, dan berbagai aspek lain dari lifecycle komponen. Dengan Hooks, Anda bisa menghindari banyak keterbatasan dan kompleksitas yang datang dengan komponen berbasis kelas.

### Macam-Macam React Hooks dan Contoh Penggunaannya

1. **useState**: Hook ini digunakan untuk menambahkan state ke komponen fungsional. `useState` mengembalikan sepasang nilai: nilai state saat ini dan fungsi untuk memperbaruinya. Ini hook pertama yang kalian pelajari di week 1.
   
   **Contoh**:
   ```javascript
   import React, { useState } from 'react';

   function Counter() {
     const [count, setCount] = useState(0);

     return (
       <div>
         <p>You clicked {count} times</p>
         <button onClick={() => setCount(count + 1)}>Click me</button>
       </div>
     );
   }

   export default Counter;
   ```

2. **useEffect**: Hook ini digunakan untuk menjalankan efek samping dalam komponen fungsional, seperti data fetching, update DOM, dan set up/clean up subscriptions. `useEffect` menggantikan metode lifecycle seperti `componentDidMount`, `componentDidUpdate`, dan `componentWillUnmount`. Ini hook kedua yang kalian pelajari di materi ini.

   **Contoh**:
   ```javascript
   import React, { useEffect, useState } from 'react';

   function DataFetcher() {
     const [data, setData] = useState(null);

     useEffect(() => {
       fetch('https://api.example.com/data')
         .then(response => response.json())
         .then(data => setData(data));
     }, []); // Empty dependency array means this effect runs once after the initial render

     return (
       <div>
         <pre>{JSON.stringify(data, null, 2)}</pre>
       </div>
     );
   }

   export default DataFetcher;
   ```

3. **useContext**: Hook ini digunakan untuk mengakses nilai dari Context. Context menyediakan cara untuk melewatkan data melalui komponen tree tanpa harus melewatkan props secara manual di setiap level.

   **Contoh**:
   ```javascript
   import React, { useContext } from 'react';

   const MyContext = React.createContext();

   function Display() {
     const value = useContext(MyContext);
     return <div>{value}</div>;
   }

   function App() {
     return (
       <MyContext.Provider value="Hello from context">
         <Display />
       </MyContext.Provider>
     );
   }

   export default App;
   ```

4. **useReducer**: Hook ini digunakan untuk mengelola state yang kompleks dengan reducer function, mirip dengan konsep yang digunakan dalam Redux. `useReducer` adalah alternatif dari `useState` untuk state yang lebih kompleks.

   **Contoh**:
   ```javascript
   import React, { useReducer } from 'react';

   const initialState = { count: 0 };

   function reducer(state, action) {
     switch (action.type) {
       case 'increment':
         return { count: state.count + 1 };
       case 'decrement':
         return { count: state.count - 1 };
       default:
         throw new Error();
     }
   }

   function Counter() {
     const [state, dispatch] = useReducer(reducer, initialState);

     return (
       <div>
         <p>Count: {state.count}</p>
         <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
         <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
       </div>
     );
   }

   export default Counter;
   ```

5. **useRef**: Hook ini digunakan untuk mengakses elemen DOM langsung atau menyimpan nilai mutable yang tidak memicu rerender ketika berubah.

   **Contoh**:
   ```javascript
   import React, { useRef } from 'react';

   function TextInput() {
     const inputRef = useRef(null);

     const focusInput = () => {
       inputRef.current.focus();
     };

     return (
       <div>
         <input ref={inputRef} type="text" />
         <button onClick={focusInput}>Focus the input</button>
       </div>
     );
   }

   export default TextInput;
   ```

Dengan Hooks, pengembangan komponen fungsional di React menjadi lebih powerful dan fleksibel. Hooks memungkinkan penggunaan state dan fitur-fitur React lainnya tanpa harus menggunakan komponen berbasis kelas, membuat kode lebih bersih dan mudah dikelola.


## React Lifecycle
Dalam React, setiap komponen memiliki lifecycle yang terdiri dari beberapa fase: mounting, updating, dan unmounting. Pada komponen berbasis kelas, lifecycle ini dikelola melalui metode lifecycle seperti `componentDidMount`, `componentDidUpdate`, dan `componentWillUnmount`. Pada komponen fungsional, React Hooks menyediakan cara yang lebih modular dan mudah untuk mengelola efek samping dalam berbagai fase lifecycle komponen.

#### Lifecycle pada Class Component:
![image](https://github.com/user-attachments/assets/dc1ab5ba-4233-4f36-88e2-6cabcee37863)

1. **Mounting**: Ketika komponen pertama kali dimasukkan ke dalam DOM, metode `componentDidMount` dipanggil. Ini sering digunakan untuk operasi seperti pengambilan data dari API.
2. **Updating**: Ketika state atau props berubah, komponen dapat diperbarui. Metode `componentDidUpdate` dipanggil setelah render terjadi. Ini berguna untuk merespons perubahan pada props atau state.
3. **Unmounting**: Ketika komponen dihapus dari DOM, metode `componentWillUnmount` dipanggil. Ini digunakan untuk membersihkan sumber daya seperti timer atau listeners.

**Contoh Class Component**:
```javascript
import React, { Component } from 'react';

class MyComponent extends Component {
  componentDidMount() {
    console.log('Component did mount');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Component did update');
  }

  componentWillUnmount() {
    console.log('Component will unmount');
  }

  render() {
    return <div>Hello, World!</div>;
  }
}

export default MyComponent;
```

#### Lifecycle pada Functional Component dengan Hooks:
![image](https://github.com/user-attachments/assets/9f74e0bc-fced-4e6e-85e5-be8678501e46)

React Hooks seperti `useEffect` memungkinkan komponen fungsional mengelola efek samping dalam berbagai fase lifecycle dengan cara yang lebih sederhana dan terpisah-pisah. Hook `useEffect` menggantikan beberapa metode lifecycle yang ada di komponen kelas.

1. **Mounting dan Updating**: Hook `useEffect` dijalankan setelah render pertama kali dan setelah setiap update. Untuk menjalankan efek hanya sekali (setara dengan `componentDidMount`), Anda bisa memberikan array kosong `[]` sebagai argumen kedua.
2. **Unmounting**: Untuk membersihkan efek (setara dengan `componentWillUnmount`), `useEffect` dapat mengembalikan fungsi cleanup yang akan dipanggil sebelum komponen di-unmount.

**Contoh Functional Component**:
```javascript
import React, { useEffect, useState } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Component did mount or update');

    return () => {
      console.log('Component will unmount');
    };
  }, []); // Empty array means this effect runs once on mount and clean up on unmount

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default MyComponent;
```

Dalam kedua contoh, kita melihat bagaimana lifecycle komponen di React dapat dikelola baik melalui metode lifecycle di komponen berbasis kelas maupun melalui hooks di komponen fungsional. Penggunaan hooks memberikan pendekatan yang lebih terstruktur dan modular, membuat kode lebih mudah dibaca dan dikelola.

## Explore Challange

Gua mau kalian pahamin dalem banget tentang lifecycle dan cara kerja useEffect buat handle API, karena impact nya sangat besar banget buat pengalaman react kalian.

https://react.dev/learn/lifecycle-of-reactive-effects

https://rapidapi.com/guides/fetch-api-react

## react-todo implement useEffect

Kerena di RPN fokus menggunakan hooks dalam react jadi kita hanya implementasi useEffect saja. Karena komponen class ini sudah lawas sekali dan jarang dipakai oleh komunitas.

fitur yang akan kita buat kali ini di react-todo yaitu menyimpan data task setiap addTask di trigger. kita akan simpan task ini ke dalam localstorage dan akan selalu get ulang setiap komponen awal di render ulang. 

### Kenapa perlu di simpan ?

karena ini SPA, jadi data yang kalian simpan di state itu hanyalah sementara jadi setiap page nya di reload, state default akan selalu rendering array kosong.

https://github.com/user-attachments/assets/6729dd34-8118-425b-af6a-4cf1299680f9

### Store Process & Consume Process

Store Process adalah menyimpan task ke dalam localstorage ketika di lifecyle addTask. useEffect bisa melakukan watch variabel, dimana setiap variabel yang diwatch berubah valuenya, maka akan jalan proses didalam useEffect tersebut.

Sedangkan Consume Process ini untuk get semua tasks yang ada di localstorage ketika komponen awal masih belum di render, jadi kita akan menggunakan lifecycle `mounting` pada proses ini. 

langsung saja kita implementasi 2 useEffect ke dalam react-todo project.

App.js
```JSX
import { useEffect, useState } from 'react';
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
    let filtered = tasks.filter(task => task.id !== id)
    setTasks(filtered);

    //force store
    localStorage.setItem('tasks', JSON.stringify(filtered));
  };

  //store process
  useEffect(() => {
    if(tasks.length != 0){
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks])

  //consume process
  useEffect(() => {
    let previousTasks = JSON.parse(localStorage.getItem('tasks'))

    setTasks(previousTasks)
  }, [])

  

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

mungkin kalian bingung kenapa harus ada `if(tasks.length != 0)` di store process, karna pada dasarnya useEffect ini berjalan asynchronous atau berbarengan. Jika kalian tidak mengecek logic task.length 0 atau tidak maka otomatis consume process akan broke karena setiap awal render kita selalu store `[]` array kosong di localstorage.

dan bisa kalian lihat di consume process betapa mudahnya kita untuk menambahkan previousTask kedalam state sebelum react render componentnya (mounting). Jadi setelah contentnya ready di show browser data state kita sudah terupdate dengan sync yang ada di localstorage.

`consume process` ini bisa kalian gunakan juga untuk fetch data API , ini hal yang umum ketika react komunikasi dengan backend. Selama asynchronousnya di handle diluar useEffect. Dan params `[]` watch variabel nya harus kosong untuk menentukan proses ke `mounting`.

### Showcase
saat nya testing fitur ini di react-todo project.

https://github.com/user-attachments/assets/a1ba28fe-7a20-4b12-ba09-ae708506f41d


Selanjutnya kalian akan mengerjakan logic challange pertama di reacjt js.

Next Part -> [Logic Challange : React Public API](https://github.com/Ethereum-Jakarta/phase-2-week2-reactjs/blob/main/study-material/lc-public-api.md)






