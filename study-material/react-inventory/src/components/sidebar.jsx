import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaBox, FaUsers, FaShoppingCart, FaBars, FaTag, FaTimes } from "react-icons/fa";
import Navbar from "./navbar";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const sidebarRef = useRef(null);

  const menuItems = [
    { path: "/", name: "Dashboard", icon: <FaHome /> },
    { path: "/users", name: "Users", icon: <FaUsers /> },
    { path: "/categories", name: "Categories", icon: <FaTag /> },
    { path: "/products", name: "Products", icon: <FaBox /> },
    { path: "/orders", name: "Orders", icon: <FaShoppingCart /> },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full bg-gray-800 bg-opacity-90 text-white w-64 p-5 transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0 
        shadow-[0_4px_10px_rgba(11,11,11,0.5)] drop-shadow-lg`}
      >
        {/* Logo */}
        <h1 className="text-2xl font-bold mb-6 ml-10 md:ml-0">My Inventory</h1>

        {/* Menu Items */}
        <ul>
          {menuItems.map((item) => (
            <li key={item.path} className="mb-1">
              <Link
                to={item.path}
                className={`flex items-center p-2 rounded-md hover:bg-green-800 ${
                  location.pathname === item.path ? "bg-green-700" : ""
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Menu Button (Mobile) */}
      <button
        className="fixed top-2 left-4 text-white bg-gray-600 p-2 rounded-md md:hidden z-50 shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Content Area */}
      <div className="flex-1 min-h-screen md:ml-64 bg-gray-700">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Sidebar;