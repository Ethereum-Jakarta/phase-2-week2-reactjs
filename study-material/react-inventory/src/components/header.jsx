import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Daftar menu untuk Header
  const menuItems = [
    { path: "/", name: "Dashboard" },
    { path: "/profile", name: "Profile" },
    { path: "/users", name: "Users" },
    { path: "/categories", name: "Categories" },
    { path: "/products", name: "Products" },
    { path: "/orders", name: "Orders" },
    { path: "/login", name: "Login" },
    { path: "/register", name: "Register" },
    { path: "/logout", name: "Logout" },
  ];

  return (
    <nav className="bg-green-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold">
            My Inventory
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✖" : "☰"}
          </button>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`hover:text-gray-300 ${
                    location.pathname === item.path ? "text-gray-300 font-semibold" : ""
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <ul className="md:hidden flex flex-col space-y-2 pb-4">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block px-4 py-2 hover:bg-green-700 ${
                    location.pathname === item.path ? "bg-green-700" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Header;
