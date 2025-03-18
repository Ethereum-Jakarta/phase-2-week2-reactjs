import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Profile from "../pages/profile";
import User from "../pages/user";
import Category from "../pages/category";
import Product from "../pages/product";
import Order from "../pages/order";
import Home from "../pages";
import NotFound from "../pages/error/404";

const SidebarLayout = () => {
  return (
    <Sidebar>
      <Outlet />
    </Sidebar>
  );
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        {/* <Route element={}> */}
          <Route element={<SidebarLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users" element={<User />} />
            <Route path="/categories" element={<Category />} />
            <Route path="/products" element={<Product />} />
            <Route path="/orders" element={<Order />} />
          </Route>
        {/* </Route> */}

        {/* Not Found Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
