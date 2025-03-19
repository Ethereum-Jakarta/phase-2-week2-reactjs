import { useState, useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logoutUser } from "../api/auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logoutUser();
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white shadow-[0_4px_10px_rgba(11,11,11,0.5)] drop-shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          <div className="text-lg font-semibold"></div>

          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center space-x-2 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <FaUser className="w-10 h-10 rounded-full border border-gray-500 p-1" />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg">
                <ul className="py-2">
                  <li>
                    <Link
                      to="/profile"
                      className={`block px-4 py-2 text-white hover:bg-gray-700 ${
                        location.pathname === "/profile" ? "bg-gray-700" : ""
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      className="block w-full text-left px-4 py-2 text-white hover:bg-red-600"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
