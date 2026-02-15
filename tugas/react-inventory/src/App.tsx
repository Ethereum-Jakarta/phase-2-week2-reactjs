import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./lib/layouts/MainLayout";
import Cart from "./routes/Cart";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Products from "./routes/Products";
import Register from "./routes/Register";
import Verify from "./routes/Verify";

const App: FC<{}> = () =>
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="products" element={<Products />} />
        <Route path="*" element={<div>NotFound</div>} />
      </Route>
    </Routes>
  </BrowserRouter>

export default App;
