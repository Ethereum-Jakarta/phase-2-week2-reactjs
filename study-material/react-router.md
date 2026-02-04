# React Router

![image](https://github.com/user-attachments/assets/89cfb4c9-a9e3-4887-96c8-71fef80dbf56)

React Router adalah library populer untuk mengelola routing dalam aplikasi React. Routing memungkinkan aplikasi untuk menampilkan konten yang berbeda berdasarkan URL yang diakses oleh user, tanpa perlu memuat ulang seluruh halaman. Ini sangat penting untuk membuat aplikasi single-page (SPA) yang responsif dan memberikan user experience yang mulus.

React Router DOM adalah versi React Router yang dirancang khusus untuk aplikasi web yang berjalan di browser. library ini menyediakan komponen-komponen yang memudahkan kalian untuk menentukan struktur navigasi aplikasi, menangani perubahan URL, dan merender komponen yang sesuai berdasarkan rute yang aktif.

Berikut adalah contoh penggunaan React Router DOM dalam sebuah aplikasi React sederhana:

```jsx
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

// Komponen untuk halaman Home
function Home() {
  return <h2>Halaman Utama</h2>;
}

// Komponen untuk halaman About
function About() {
  return <h2>Tentang Kami</h2>;
}

// Komponen untuk halaman Contact
function Contact() {
  return <h2>Hubungi Kami</h2>;
}

// Komponen utama App
function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Beranda</Link>
            </li>
            <li>
              <Link to="/about">Tentang</Link>
            </li>
            <li>
              <Link to="/contact">Kontak</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
```

Dalam contoh ini, kita menggunakan beberapa komponen kunci dari React Router DOM:

1. `<Router>`: Ini adalah komponen utama yang membungkus seluruh aplikasi yang menggunakan routing.

2. `<Link>`: Komponen ini digunakan untuk membuat tautan navigasi yang dapat diklik oleh pengguna.

3. `<Routes>`: Komponen ini mengelompokkan semua rute yang didefinisikan.

4. `<Route>`: Setiap komponen Route mendefinisikan pemetaan antara path URL dan komponen React yang harus dirender.

Dengan konfigurasi ini, ketika user mengklik tautan atau memasukkan URL tertentu, React Router akan merender komponen yang sesuai tanpa memuat ulang halaman. Ini menciptakan pengalaman navigasi yang cepat dan responsif dalam aplikasi React Kalian.

## Fitur Penting React Router DOM

ini adalah beberapa fitur penting lainnya dari React Router DOM yang perlu kalian ketahui, gua akan memberikan contoh penggunaannya dalam skenario yang sederhana. 


### Nested Routes (Rute Bersarang):

React Router DOM memungkinkan Anda untuk membuat rute bersarang, yang berguna untuk membuat layout yang kompleks dengan sub-navigasi.

Contoh:

```jsx
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <nav>
        <Link to="profile">Profil</Link>
        <Link to="settings">Pengaturan</Link>
      </nav>
      <Outlet />
    </div>
  );
}

function Profile() {
  return <h3>Profil Pengguna</h3>;
}

function Settings() {
  return <h3>Pengaturan Akun</h3>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

### URL Parameters (Parameter URL):

Kalian dapat menggunakan parameter dinamis dalam URL untuk merender konten berdasarkan value yang diberikan.

Contoh:

```jsx
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';

function ProductDetail() {
  let { id } = useParams();
  return <h2>Detail Produk: {id}</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="product/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### Programmatic Navigation (Navigasi Terprogram):

Kalian dapat menggunakan hook `useNavigate` untuk melakukan navigasi secara programatik.

Contoh:

```jsx
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  let navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    // Logika autentikasi di sini
    navigate('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit">Login</button>
    </form>
  );
}
```

### Protected Routes (Rute Terproteksi):

Kalian dapat membuat rute yang hanya dapat diakses oleh user yang telah terautentikasi.

(ini bakal sering kalian pakai jika di web kalian menggunakan backend dengan authentication)

Contoh:

```jsx
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

### Lazy Loading:

Untuk meningkatkan kinerja aplikasi, Kalian dapat menggunakan lazy loading untuk memuat komponen hanya ketika diperlukan.

Contoh:

```jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./components/Home'));
const About = lazy(() => import('./components/About'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

Fitur-fitur ini memungkinkan Kalian untuk membuat aplikasi React yang lebih kompleks dan dinamis dengan navigasi yang canggih. React Router DOM menyediakan fleksibilitas untuk menangani berbagai skenario routing, dari yang sederhana hingga yang sangat kompleks.

Silahkan explore dokumentasi React Router ini untuk menambah wawasan kalian dalam routing pada react.

https://reactrouter.com/en/main

## Implementasi React Router (ETHJKT Movie APP)

Misal dengnan contoh tadi kalian belum cukup untuk mengerti react router, gua udah nyiapin material project gimana cara perfom react router dom dalam real app.

Kalian bisa ekstrak `rpn-move-app.zip` yang ada di folder `project-material` repo ini.

install dependencies projectnya dan coba jalanin app nya `npm run start` or `yarn start`

cobain semua fitur app nya terlebih dahulu untuk introduction, sebelum membahas routing dalam project ini.

![image](https://github.com/user-attachments/assets/23db2e43-357f-45b7-9e9a-6d80f49a1d72)


## Definisi Route

Konfigurasi route pada app ini terletak di src/App.jsx.

```JSX
import { Detail, Root } from "./routes"
import { Routes, Route } from "react-router-dom"
import { Search } from "./routes/search"

export default function App() {
  return (
    <div className="min-h-[100vh] bg-base-color">
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/movie/:movieId" element={<Detail />} />
        <Route path="/search/:keyword" element={<Search />} />
      </Routes>
    </div>
  )
}
```

Rute "/": Ketika URL adalah root ("/"), komponen Root akan dirender.

Rute "/movie/:movieId": Ini adalah rute dinamis. ":movieId" adalah parameter URL yang akan menampilkan komponen Detail dengan ID film tertentu.

Rute "/search/:keyword": Juga rute dinamis, menampilkan komponen Search dengan kata kunci pencarian tertentu.

### Dynamic Routes with useParams

Disini kalian bisa lihat seberapa powerful useParams untuk dynamic rendering pada component react, dimana setiap detail page di klik, makan content dari movie mengikuti url yang diberikan.

routes/detail.tsx
```JSX
import { Breadcumb, DetailMovie } from "@/components"
import { useParams } from "react-router-dom"

export function Detail() {
  const params = useParams()

  return (
    <div className="bg-base-color min-h-[100vh] h-auto w-[100%]">
      <div className="w-4/5 lg:max-w-[65rem] mx-auto relative py-10 flex justify-center flex-col">
        <DetailMovie params={params.movieId} />
      </div>
    </div>
  )
}
```

misal kita hit url http://localhost:3000/movie/533535

otomatis detail page akan konsum content data movie dengan id `533535`.

![image](https://github.com/user-attachments/assets/798f762f-8bd8-429f-8923-6911db81eade)


Selain itu kita bisa menggunakan advance search feature dengan userParams, dimana content dinamis akan selalu mengikuti input :keyword dari user.

routes/search.tsx
```JSX
import { MovieList } from "@/components"
import { getSearchKeyword } from "@/modules/movies"
import { TMovieData } from "@/types"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export function Search() {
  const [searchData, setSearchData] = useState<TMovieData[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const params: any = useParams()

  const getSearchKeywordData = async () => {
    setLoading(true)
    const res = await getSearchKeyword(params.keyword, page)
    setSearchData(res.results)

    setLoading(false)
  }

  useEffect(() => {
    getSearchKeywordData()
  }, [params.keyword])

  return loading ? (
    <div className="w-full h-[80vh] flex justify-center align-middle">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  ) : searchData.length !== 0 ? (
    <div className="bg-base-color min-h-[100vh] h-auto w-[100%]">
      <div className="w-4/5 lg:max-w-[65rem] mx-auto relative py-10 flex justify-center flex-col">
        <MovieList movieData={searchData} />
      </div>
    </div>
  ) : (
    <div className="w-full h-[80vh] flex justify-center align-middle items-center">
      <div className="text-white text-3xl">NO DATA</div>
    </div>
  )
}
```

bisa kalian lihat url browser `http://localhost:3000/search/query=marvel`, akan render search value dari marvel :

![image](https://github.com/user-attachments/assets/dede1a54-6f03-4ba5-a9c8-6e5734e476ff)


## Next Part

Materi selanjutnya kalian akan belajar tailwind css , kalau kalian lihat RPN Movie project ini memakai tailwind css untuk styling componentnya.

Saatnya belajar tailwind css di materi selanjutnya -> [Tailwind CSS](https://github.com/Ethereum-Jakarta/phase-2-week2-reactjs/blob/main/study-material/tailwindcss.md)



