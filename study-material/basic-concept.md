# Learn React Basic Concepts

Setelah kalian baca baca dari dokumentasi react , harusnya kalian sudah paham bahwa :

- React bukan sebuah framework lengkap seperti Angular, melainkan sebuah library yang fokus pada pembangunan UI.

- Sebagai proyek open-source yang dikembangkan oleh Facebook, React telah mendapatkan lebih dari 100,000 bintang di GitHub, menunjukkan popularitasnya yang luar biasa.

- Dalam arsitektur MVC (Model View Controller), React berperan sebagai lapisan view.

Salah satu fitur terpenting dari React adalah kemampuannya untuk membuat komponen. Komponen ini berfungsi seperti elemen HTML kustom yang dapat digunakan kembali, memungkinkan kalian untuk membangun UI dengan cepat dan efisien.
React juga menyederhanakan cara data disimpan dan dikelola dalam aplikasi melalui konsep state dan props. Pendekatan ini membuat manajemen data dalam aplikasi React menjadi lebih terstruktur dan mudah diprediksi.

Dalam pembahasan selanjutnya, kita akan mengeksplorasi lebih dalam tentang konsep-konsep ini dan fitur-fitur React lainnya. Mari kita mulai perjalanan kita dalam memahami React!

## Set up project, create react app

Create React App adalah sebuah tool yang dikembangkan oleh Facebook untuk memudahkan para developer dalam memulai proyek React. Tool ini bisa dibilang sebagai 'starter kit' yang sangat berguna, terutama bagi kalian yang baru memulai perjalanan dengan React.

https://create-react-app.dev/

Berikut beberapa poin penting tentang Create React App:

1. Kemudahan Penggunaan:

   Create React App menyediakan environment development React yang sudah dikonfigurasi secara optimal. Kalian tidak perlu pusing memikirkan konfigurasi Webpack, Babel, ESLint, dan tools lainnya. Semua sudah diatur dengan baik, sehingga Kalian bisa langsung fokus pada pengembangan aplikasi.

2. Zero Configuration:

   Salah satu keunggulan utama Create React App adalah konsep 'zero configuration'. Kalian tidak perlu melakukan setting apapun untuk memulai. Cukup jalankan satu perintah, dan kalian sudah siap untuk coding.

3. Fitur Modern:

   Create React App menyertakan fitur-fitur modern dalam pengembangan web, seperti hot reloading (perubahan langsung terlihat tanpa perlu me-refresh browser), automatic code splitting, dan optimisasi build untuk production.

4. Fleksibilitas:

   Meskipun Create React App menyembunyikan banyak konfigurasi, Kalian tetap bisa melakukan kustomisasi jika diperlukan. Fitur 'eject' memungkinkan Kalian untuk mengakses dan mengubah semua konfigurasi yang ada.

5. Dukungan Komunitas:

   Sebagai proyek yang didukung oleh Facebook dan komunitas React yang besar, Create React App selalu diperbarui dan ditingkatkan secara teratur.

Cara menggunakan Create React App sangat sederhana. Kalian hanya perlu menjalankan perintah berikut di terminal:

```
npx create-react-app my-app
cd my-app
npm start
```

Setelah jalan command, Kalian sudah memiliki aplikasi React yang siap di develop. Create React App benar-benar mempermudah proses memulai proyek React.


<img src="https://github.com/user-attachments/assets/e80266b2-f32e-435d-8cad-c21408a46728" width="300" height="400">

bisa kalian liat package.json ini sudah di konfigurasi oleh create-react-app, dan running command nya sudah dibuat.

```js
 "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

kalian bisa langsung jalankan `npm run start` untuk running project react ini.

![image](https://github.com/user-attachments/assets/2760d0c1-e379-4322-be8e-0400f5dd0deb)

## Cara React bekerja (behind the scene)

React bekerja dengan sangat efisien di balik layar, dan inilah proses utamanya:

1. Virtual DOM:
   React membuat salinan ringan dari DOM asli, yang disebut Virtual DOM. Ini adalah representasi JavaScript dari struktur DOM yang sebenarnya.

2. Rendering:
   Saat state atau props komponen berubah, React membuat Virtual DOM baru yang mencerminkan perubahan tersebut.

3. Diffing:
   React kemudian membandingkan Virtual DOM baru dengan yang lama melalui proses yang disebut "reconciliation". Ini dilakukan dengan algoritma diffing yang sangat efisien.

4. Batching:
   React mengelompokkan (batch) beberapa perubahan DOM yang diperlukan menjadi satu update, mengurangi jumlah manipulasi DOM yang sebenarnya.

5. Updating:
   Setelah menentukan perbedaan minimal, React hanya memperbarui bagian-bagian DOM yang benar-benar perlu diubah.

6. Lifecycle Methods:
   Selama proses ini, React memanggil berbagai lifecycle methods pada komponen, memungkinkan Kalian untuk menambahkan logika kustom pada berbagai tahap render.

7. Event Handling:
   React menggunakan sistem event delegation untuk menangani events secara efisien, meningkatkan performa terutama pada aplikasi besar.

Dengan pendekatan ini, React mampu memberikan performa yang sangat baik, bahkan untuk aplikasi yang kompleks dengan banyak komponen dan perubahan state yang sering terjadi. Inilah yang membuat React menjadi pilihan populer untuk membangun UI yang responsif dan dinamis.

![image](https://github.com/user-attachments/assets/c5c16f68-b599-4f29-b6c0-f5ef516e95c5)


Pembuktian bahwa kita menggunakan virtual dom adalah index.html yang ada di folder public. browser hanya membaca dom dari `<div id="root"></div>` , sedangkan kita memanipulasi content nya di virtual dom menggunakan JSX.

kalian bisa cek folder src/index.js dimana react render semua content JSX ke dalam DOM id root dalam html.

```js
const root = ReactDOM.createRoot(document.getElementById('root'));
```

dan content yang dirender adalah component app.js yang sudah dibuat default oleh create-react-app
```js
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

## Apa itu JSX ? 
JSX, atau JavaScript XML, adalah ekstensi sintaks untuk JavaScript yang digunakan dalam React. JSX memungkinkan pengembang untuk menulis kode yang terlihat seperti HTML langsung di dalam JavaScript, membuat proses pembuatan komponen UI menjadi lebih intuitif dan mudah dibaca.

Dengan JSX, Kalian dapat menggabungkan logika JavaScript dengan markup UI dalam satu file yang sama. Ini membantu dalam memvisualisasikan struktur komponen dan hubungannya dengan data yang digunakan. JSX tidak dijalankan langsung oleh browser, melainkan ditransformasi menjadi JavaScript murni oleh compiler seperti Babel sebelum dieksekusi. Transformasi ini mengubah elemen-elemen JSX menjadi panggilan fungsi React.createElement(), yang kemudian digunakan oleh React untuk membangun dan memperbarui DOM.

Berikut adalah contoh penggunaan JSX dalam komponen React:

```jsx
function Welcome(props) {
  return (
    <div className="welcome-message">
      <h1>Selamat datang, {props.name}!</h1>
      <p>Hari ini adalah {new Date().toLocaleDateString()}.</p>
    </div>
  );
}
```

Dalam contoh ini, kita melihat bagaimana JSX memungkinkan kita untuk menggabungkan markup HTML-like (`<div>`, `<h1>`, `<p>`) dengan ekspresi JavaScript (mengakses `props.name` dan memanggil `new Date().toLocaleDateString()`). Perhatikan juga penggunaan `className` alih-alih `class`, yang merupakan salah satu perbedaan sintaks JSX dari HTML stKalianr. JSX membuat kode React lebih ekspresif dan memudahkan pengembang dalam memvisualisasikan struktur UI yang sedang mereka bangun.

Kalian bisa langsung lihat dokumentasi react untuk belajar sifat" JSX yang lebih detail -> https://legacy.reactjs.org/docs/introducing-jsx.html

## React Component

![image](https://github.com/user-attachments/assets/de8e6051-f62e-4040-a418-44ba381013d9)


React Component dapat dianalogikan sebagai blok Lego dalam pembangunan aplikasi web. Sama seperti kita membangun struktur kompleks dari potongan-potongan Lego yang lebih kecil, kita juga membangun aplikasi React dari komponen-komponen yang lebih kecil dan dapat digunakan kembali.

Setiap komponen React adalah seperti sebuah blok Lego khusus yang memiliki bentuk, fungsi, dan karakteristiknya sendiri. Komponen ini bisa berupa sesuatu yang sederhana seperti tombol atau input, atau sesuatu yang lebih kompleks seperti formulir atau bahkan seluruh halaman. Sama seperti kita bisa menggabungkan blok-blok Lego untuk membuat struktur yang lebih besar, kita juga bisa menggabungkan komponen-komponen React untuk membuat antarmuka pengguna yang kompleks.

Keuntungan dari pendekatan ini adalah bahwa setiap komponen dapat dikembangkan, diuji, dan dikelola secara independen, namun tetap dapat bekerja sama dengan mulus dalam aplikasi yang lebih besar. Ini membuat pengembangan aplikasi React menjadi lebih terorganisir, efisien, dan mudah dipelihara, mirip dengan cara kita bisa dengan mudah menambah, mengurangi, atau mengganti blok-blok Lego dalam sebuah konstruksi.

### Functional Component vs Class Component

Functional Component:
- **Definisi**: Dibuat dengan fungsi JavaScript biasa.

- **State dan Lifecycle**: Menggunakan hook seperti `useState` dan `useEffect` untuk state dan efek samping.

- **Sintaksis**: Lebih sederhana dan mudah dibaca.

- **Contoh**:
   ```jsx
  import React from 'react';
  
  function Greeting({ name }) {
    return (
      <div className="greeting">
        <h1>Halo, {name}!</h1>
        <p>Selamat datang di aplikasi React kami.</p>
      </div>
    );
  }
  
  export default Greeting;
  ```

Class Component:
- **Definisi**: Dibuat dengan kelas ES6 yang mewarisi dari `React.Component`.

- **State dan Lifecycle**: Menggunakan properti `state` dan metode lifecycle seperti `componentDidMount` dan `componentDidUpdate`.

- **Sintaksis**: Lebih kompleks dengan banyak boilerplate.

- **Contoh**:
   ```jsx
    import React, { Component } from 'react';
    
    class Greeting extends Component {
      render() {
        return (
          <div className="greeting">
            <h1>Halo, {this.props.name}!</h1>
            <p>Selamat datang di aplikasi React kami.</p>
          </div>
        );
      }
    }
    
    export default Greeting;
    ```

### Ringkasan:
- **Functional Components**: Lebih sederhana, menggunakan hooks untuk state dan efek.
- **Class Components**: Lebih kompleks, menggunakan properti state dan metode lifecycle.

Kedua komponen ini dapat digunakan dalam komponen lain atau dalam aplikasi utama seperti ini:

```jsx
import React from 'react';
import Greeting from './Greeting';

function App() {
  return (
    <div className="app">
      <Greeting name="Alice" />
      <Greeting name="Bob" />
    </div>
  );
}

export default App;
```

Dengan menggunakan komponen, kita dapat dengan mudah membangun UI yang kompleks dan dapat dikelola dengan baik, memanfaatkan kekuatan reusabilitas dan modularitas yang ditawarkan oleh React.

## Props and State

![image](https://github.com/user-attachments/assets/1edb4647-799c-4b68-948c-feb0030aca17)

**Props** (singkatan dari "properties") dan **state** adalah dua konsep penting dalam React yang digunakan untuk mengelola data dan memengaruhi cara komponen berinteraksi dan merender konten.

**Props** adalah objek yang berisi nilai yang diteruskan dari komponen induk ke komponen anak. Props bersifat read-only, yang berarti komponen anak tidak boleh mengubahnya. Props berguna untuk membuat komponen yang dapat digunakan kembali dengan konfigurasi yang berbeda. Misalnya, komponen `Greeting` bisa menerima props `name` dan merender pesan selamat datang.

**State**, di sisi lain, adalah objek yang dikelola secara internal oleh komponen dan dapat berubah seiring waktu. State digunakan untuk menyimpan data yang dapat berubah, seperti input pengguna, status tombol, atau data yang diambil dari API. Ketika state diubah menggunakan metode `setState` (untuk class component) atau hook `useState` (untuk functional component), React akan merender ulang komponen tersebut dengan data terbaru.

### Contoh Penggunaan Props dan State

Saatnya kita buat component pertama di `my-app` project yang sudah kita buat dengan create-react-app. Kita akan buat komponen greetings dimana komponen ini menerima `props` nama dan didalamnya mengatur state counter untuk di render di app setiap user clink button count.

pertama kalian bisa hapus code" content react yang kita tidak pakai di src/app.js, dan buat `h2` untuk title app simple kita.

```JSX
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>React Greetings</h2>

      </header>
    </div>
  );
}

export default App;
```


buatlah folder `components` di dalam src/ , untuk menyimpan komponen" react yang bakal kita buat.
disini kita akan membuat components/Greeting.js.

kalian harus pehatikan, setiap membuat komponen huruf pertamanya wajib kapital (ini standar dari react).

```JSX
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
```

Dalam contoh di atas, komponen Greeting menerima props name dari komponen induk App dan menggunakan state untuk melacak jumlah klik tombol.

Saatnya implementasi komponen pertama kita di App.js, agar kita bisa mengirim props name untuk render di Greeting komponen.

App.js
```JSX
import './App.css';
import Greeting from './components/Greeting';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>React Greetings</h2>
        <Greeting name="Zexo"/>
      </header>
    </div>
  );
}

export default App;
```

## Testing First Components

![image](https://github.com/user-attachments/assets/5d3d4200-730e-4745-a0ea-9beea284c34c)

kalian bisa rasakan seberapa cepat rendering react untuk meng update content jumlah click. Inilah mengapa teknologi modern frontend sudah sangat berubah dibanding penggunaan DOM langsung saat jaman Jquery.

Flow Rendering react terjadi berulang kali untuk memanipulasi virtual dom dan handle diffing process untuk membandingkannya dengan DOM asli.

![image](https://github.com/user-attachments/assets/e7a0b0a8-3494-41a9-88f1-b82293b7a172)


## Next Step

Materi yang sudah kita pelajari cukup banyak disini, basic penting di react js adalah kombinasi antar components" react dan handle data flow menggunakan props dan state.
gua saranin kalian explore dan coba coba sendiri untuk membuat component lain di react.

Jangan lupa untuk explore hal lain dalam JSX, disini kalian hanya melihat gimana cara binding data menggunakan `{props.name}`. 

JSX bisa melakukan lebih dari itu, kalian cukup perlu terus untuk melatih membuat component agar melihat hal" baru yang ada di JSX. 


Next Part -> [React Todo : More Fundamental](https://github.com/Ethereum-Jakarta/phase-2-week2-reactjs/blob/main/study-material/react-todo.md)



