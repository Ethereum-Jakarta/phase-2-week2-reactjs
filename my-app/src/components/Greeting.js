import React, { useState } from 'react';

function Greeting(props) {
    // Menggunakan props untuk mendapatkan nama
    const { name } = props;
  
    // Menggunakan state untuk menghitung jumlah klik
    const [count, setCount] = useState(0);
  
    return (
      <div>
        <h3>Hello, {name}!</h3>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
      </div>
    );
  }
  
  export default Greeting;