## Tailwind CSS

![image](https://github.com/user-attachments/assets/fb92ed61-812b-4b94-9d83-b2abec91b75a)

Tailwind CSS adalah framework CSS utilitas-first yang dirancang untuk mempermudah dan mempercepat proses pengembangan UI. Berbeda dengan framework CSS tradisional seperti Bootstrap atau Foundation yang menyediakan komponen siap pakai, Tailwind CSS menyediakan kumpulan kelas utilitas yang dapat digabungkan untuk membangun desain kustom tanpa harus menulis CSS dari awal.

### Fitur Utama Tailwind CSS

1. **Utilitas-First**: Tailwind CSS menyediakan ribuan kelas utilitas kecil yang bisa digunakan langsung di HTML untuk mengatur tata letak, warna, tipografi, spasi, dan banyak aspek desain lainnya. Kelas-kelas ini mencakup berbagai properti CSS, seperti `margin`, `padding`, `color`, `font`, `background`, dan banyak lagi.

2. **Desain Kustom**: Dengan Tailwind, pengembang memiliki kontrol penuh atas desain mereka. Karena tidak ada komponen default yang mengatur gaya, setiap elemen dapat dirancang sesuai kebutuhan tanpa harus menimpa gaya yang ada.

3. **Responsive Design**: Tailwind menyediakan kelas utilitas untuk responsivitas yang mudah digunakan dengan menambahkan prefiks breakpoints seperti `sm:`, `md:`, `lg:`, `xl:`, dan `2xl:`.

4. **Mode JIT (Just-in-Time)**: Tailwind CSS 2.1 dan versi terbaru memperkenalkan mode JIT yang mengkompilasi hanya kelas utilitas yang digunakan dalam proyek, sehingga menghasilkan ukuran file CSS yang lebih kecil dan performa yang lebih cepat.

5. **Kustomisasi**: Tailwind sangat mudah disesuaikan. Kalian dapat mengubah tema default, menambahkan atau menghapus kelas utilitas, dan menyesuaikan konfigurasi sesuai kebutuhan proyek Kalian dengan menggunakan file konfigurasi `tailwind.config.js`.

## Contoh Sederhana Penggunaan Tailwind CSS

Berikut adalah contoh sederhana dari sebuah komponen kartu (card) yang menggunakan kelas-kelas Tailwind CSS:

```jsx
import React from 'react';

function ProductCard({ name, description, price, imageUrl }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full h-48 object-cover" src={imageUrl} alt={name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-800">{name}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          ${price}
        </span>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
```

Dalam contoh ini:

1. Kontainer utama menggunakan kelas-kelas seperti `max-w-sm` (lebar maksimum), `rounded` (sudut bulat), `overflow-hidden` (menyembunyikan overflow), `shadow-lg` (bayangan besar), dan `bg-white` (latar belakang putih).

2. Gambar produk menggunakan `w-full` (lebar penuh), `h-48` (tinggi tetap), dan `object-cover` (menjaga aspek rasio gambar).

3. Teks judul menggunakan `font-bold`, `text-xl` (ukuran font ekstra besar), dan `text-gray-800` (warna teks abu-abu gelap).

4. Deskripsi menggunakan `text-gray-700` dan `text-base` untuk styling teks.

5. Harga ditampilkan dalam span dengan latar belakang abu-abu (`bg-gray-200`), sudut bulat (`rounded-full`), dan padding.

6. Tombol "Add to Cart" menggunakan warna latar belakang biru (`bg-blue-500`), efek hover (`hover:bg-blue-700`), teks putih, dan sudut bulat.

Kalian bisa menggunakan komponen ini dalam aplikasi React Kalian seperti ini:

```jsx
import React from 'react';
import ProductCard from './ProductCard';

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ProductCard 
          name="Product 1"
          description="This is a description for Product 1."
          price="19.99"
          imageUrl="https://example.com/product1.jpg"
        />
        <ProductCard 
          name="Product 2"
          description="This is a description for Product 2."
          price="29.99"
          imageUrl="https://example.com/product2.jpg"
        />
        {/* Tambahkan lebih banyak ProductCard sesuai kebutuhan */}
      </div>
    </div>
  );
}

export default App;
```

Dalam contoh App ini, kita menggunakan `container`, `mx-auto` (margin horizontal otomatis), dan `p-4` (padding) untuk layout utama. Grid system Tailwind (`grid`, `grid-cols-*`) digunakan untuk layout responsif.

Penggunaan Tailwind CSS dengan React memungkinkan Kalian untuk dengan cepat membangun UI yang responsif dan konsisten tanpa perlu menulis CSS kustom. Namun, pastikan untuk mengonfigurasi proyek React Kalian dengan benar untuk menggunakan Tailwind CSS, biasanya melalui PostCSS dan file konfigurasi Tailwind.

## Konfigurasi Tailwind CSS (Set Up Project)

Untuk menggunakan Tailwind CSS dalam proyek React, Kalian perlu mengikuti beberapa langkah untuk mengatur Tailwind CSS dengan benar. Berikut adalah langkah-langkahnya :

#### Langkah 1: Set Up Project React dengan Tailwind CSS

1. **Buat Proyek React Baru**:
   ```bash
   npx create-react-app my-tailwind-app
   cd my-tailwind-app
   ```

2. **Install Tailwind CSS**:
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

3. **Konfigurasikan Tailwind CSS**:
   Buka file `tailwind.config.js` dan tambahkan path ke file-file komponen React Kalian:
   ```javascript
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: [
       "./src/**/*.{js,jsx,ts,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

4. **Tambahkan Direktif Tailwind ke CSS Kalian**:
   Buka atau buat file `src/index.css` dan tambahkan direktif Tailwind berikut:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

5. **Impor CSS ke Proyek React**:
   Pastikan file `src/index.js` atau `src/index.tsx` mengimpor `index.css`:
   ```javascript
   import React from 'react';
   import ReactDOM from 'react-dom';
   import './index.css';
   import App from './App';
   import reportWebVitals from './reportWebVitals';

   ReactDOM.render(
     <React.StrictMode>
       <App />
     </React.StrictMode>,
     document.getElementById('root')
   );

   reportWebVitals();
   ```

#### Langkah 2: Contoh Komponen React dengan Tailwind CSS

Berikut adalah contoh komponen React yang menggunakan kelas-kelas Tailwind CSS untuk membuat UI pengguna yang sederhana:

**File `src/App.js`**:
```javascript
import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">React with Tailwind CSS</h1>
        <p className="mb-4">You clicked {count} times</p>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          onClick={() => setCount(count + 1)}
        >
          Click Me
        </button>
      </div>
    </div>
  );
}

export default App;
```

### Penjelasan Kode

- **`min-h-screen`**: Menetapkan tinggi minimum elemen menjadi 100vh (tinggi layar penuh).
- **`flex items-center justify-center`**: Menggunakan Flexbox untuk menempatkan konten di tengah secara vertikal dan horizontal.
- **`bg-gray-100`**: Menetapkan latar belakang berwarna abu-abu terang.
- **`bg-white`**: Menetapkan latar belakang elemen menjadi putih.
- **`p-8`**: Menetapkan padding sebesar 2rem (32px) di semua sisi.
- **`rounded`**: Menetapkan border radius untuk membuat sudut elemen menjadi melingkar.
- **`shadow-md`**: Menambahkan bayangan sedang ke elemen.
- **`text-center`**: Menetapkan teks menjadi rata tengah.
- **`text-2xl font-bold mb-4`**: Menetapkan ukuran font besar, tebal, dan margin bawah.
- **`bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700`**: Menetapkan gaya untuk tombol, termasuk latar belakang biru, teks putih, padding, border radius, dan efek hover.

Dengan mengikuti langkah-langkah di atas, Kalian dapat mengintegrasikan Tailwind CSS ke dalam proyek React Kalian dan memanfaatkan kelas-kelas utilitasnya untuk membangun UI yang modern dan responsif.


## Explore Challange

Menurut gua materi library seperti ini sangat susah diajarkan jika kalian tidak mencoba nya, kalian bisa melatihnya dengan mencoba semua class yang ada di tailwind dan membaca dokumentasi nya.

Jadi challange kali ini kalian harus membaca dokumentasi tailwind CSS untuk melatih pemahaman kalian dalam menggunakan class-class nya.

https://tailwindcss.com/

Dokumentasi tailwind ini cukup simple dan mudah dipelajarin, jadi coba deep dive langsung untuk baca baca dokumentasinya.

dan terakhir, kalian juga bisa explore komponen-komponen react yang ada di ETHJKT Movie APP. disana ada beberapa case tailwind yang sangat berguna buat kalian kedepannya.

```JSX
import { BASE_TMDB_IMAGE_URL, MOVIE_POSTER_SIZE } from "@/config"
import { TMovieData } from "@/types"
import { genres } from "@/utils"
import { Link } from "react-router-dom"

const Card = ({ data }: { data: TMovieData }) => {
  const imgUrl = data.poster_path
    ? `${BASE_TMDB_IMAGE_URL}/${MOVIE_POSTER_SIZE}/${data.poster_path}`
    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSWSxsVpAmqb_T7CLGolJ193Bw9xh7X7r0yQ&s"

  return (
    <Link to={`/movie/${data.id}`}>
      <div
        id="card"
        className="w-full h-[16rem] rounded-xl relative overflow-hidden mb-5"
      >
        <img
          src={imgUrl}
          alt={`${data.original_title}`}
          loading="lazy"
          className="w-full h-full object-cover"
        />

        <div className="absolute top-1 w-fit m-4 rounded-xl px-2 py-1 bg-[#43B2E2] flex text-white align-middle items-center">
          <svg
            width="15px"
            height="15px"
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            className="iconify iconify--twemoji"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              fill="#FDFDFE"
              d="M27.287 34.627c-.404 0-.806-.124-1.152-.371L18 28.422l-8.135 5.834a1.97 1.97 0 0 1-2.312-.008a1.971 1.971 0 0 1-.721-2.194l3.034-9.792l-8.062-5.681a1.98 1.98 0 0 1-.708-2.203a1.978 1.978 0 0 1 1.866-1.363L12.947 13l3.179-9.549a1.976 1.976 0 0 1 3.749 0L23 13l10.036.015a1.975 1.975 0 0 1 1.159 3.566l-8.062 5.681l3.034 9.792a1.97 1.97 0 0 1-.72 2.194a1.957 1.957 0 0 1-1.16.379z"
            />
          </svg>
          <span className="ml-[0.1rem] font-bold">
            {data.vote_average.toString().substring(0, 3)}
          </span>
        </div>

        <div className="absolute bottom-1 w-fit h-fit z-10 m-4">
          <div className="text-white  font-semibold">{data.original_title}</div>
          <div className="text-xs font-semibold mt-1">
            {genres[data.genre_ids?.sort()[0]]}
          </div>
        </div>

        <div
          id="card-backdrop"
          className="w-full h-[100%] absolute bottom-0 hidden lg:block"
        ></div>
      </div>
    </Link>
  )
}

export const MovieList = ({ movieData }: { movieData: TMovieData[] }) => {
  return (
    <div className="w-full h-auto gap-4 grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] relative overflow-hidden py-8">
      {movieData.map((e) => (
        <Card data={e} />
      ))}
    </div>
  )
}

```

## Other Resources

Resource lain kalian bisa nonton para expert praktek dengan tailwind css, salah satunya creator ini :

Disini dia build nike website menggunakan tailwind css (from scratch), menurut gua ini lumayan ngebantu banget buat belajar.

https://www.youtube.com/watch?v=tS7upsfuxmo&t=11s

## Next Part

Selanjutkan kalian akan mengerjakan Logic Nolep IS menggunakan tailwind css

[Logic Nolep : React Inventory](https://github.com/Ethereum-Jakarta/phase-2-week2-reactjs/blob/main/study-material/ln-react-inventory.md)

