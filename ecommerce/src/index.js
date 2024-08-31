import React from 'react'
import ReactDOM from 'react-dom/client'
import HomePages from './pages/Home'
import ViewProduct from './pages/ViewProduct'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ViewCategory from './pages/ViewCategory'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<HomePages/>}  exact />
        <Route path='/Category/:category' element={<ViewCategory/>}  exact />
        <Route path='/DetailsProduct/:id' element={<ViewProduct/>}  exact />
      </Routes>
    </Router>  
  </React.StrictMode>,
)
