import React, { useEffect, useState } from "react";
import logo from "../../public/logo.png";
import { FaTimes, FaBars, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [initial, setInitial] = useState("A");
  const navigate = useNavigate();

  useEffect(() => {
    const logs = localStorage.getItem("logs");
    if (logs) {
      const initial = JSON.parse(logs).charAt(0); // Get first character
      setInitial(initial);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem("logs");
      setIsLoggedIn(false);
    } else {
      navigate("/student");
    }
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div>
      {/* Desktop Navbar */}
      <nav className="hidden lg:flex justify-between items-center w-full h-16 bg-slate-200">
        {/* Logo Section */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} className="h-20 w-20 pt-2" alt="logo" />
          <div
            className="text-green-700 pb-3 font-semibold text-base"
            onClick={() => navigate("/admin-dashboard")}
          >
            E-College
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex items-center gap-5 text-gray-600">
          <div
            className="hover:text-black cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </div>
          <div
            className="hover:text-black cursor-pointer"
            onClick={() => navigate("/guidance")}
          >
            Guidance
          </div>
          <div
            className="hover:text-black cursor-pointer"
            onClick={() => navigate("/teacher")}
          >
            Teacher
          </div>
          <div
            className="hover:text-black cursor-pointer"
            onClick={() => navigate("/admin")}
          >
            Admin
          </div>
        </div>

        {/* Login/Logout Button */}
        <div className="flex items-center gap-3 m-2">
          <FaSearch
            className="cursor-pointer"
            onClick={() => navigate("/search")}
          />
          <button
            className="bg-orange-500 text-white py-2 px-4 rounded-3xl"
            onClick={handleLoginLogout}
          >
            {isLoggedIn ? "Student Logout" : "Student Login"}
          </button>
          <div className="cursor-pointer rounded-full h-10 w-10 bg-purple-700 text-white flex items-center justify-center">
            {initial}
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <div className="rounded-lg max-h-12 backdrop-blur-md lg:hidden bg-slate-200">
        <div className="flex items-center justify-between">
          {/* Hamburger Menu Icon */}
          <button className="focus:outline-none" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <FaTimes className="m-2 h-6 w-5" />
            ) : (
              <FaBars className="m-2 h-6 w-5" />
            )}
          </button>

          {/* Logo Section */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={logo} width={90} className="m-2 max-h-9 w-9" alt="logo" />
            <div
              className="text-green-700 pb-2 font-semibold text-sm"
              onClick={() => navigate("/admin-dashboard")}
            >
              E-College
            </div>
          </div>

          {/* Initial Letter Circle */}
          <div className="cursor-pointer rounded-full h-6 w-6 bg-purple-700 text-white flex items-center justify-center">
            {initial}
          </div>
        </div>

        {/* Mobile Menu Items */}
        {isMobileMenuOpen && (
          <ul className="mx-2 z-1000 p-2 mt-2 flex flex-col gap-4 text-gray-600 bg-slate-200 py-5 rounded-md">
            <li
              className="hover:text-black cursor-pointer"
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className="hover:text-black cursor-pointer"
              onClick={() => navigate("/guidance")}
            >
              Guidance
            </li>
            <li
              className="hover:text-black cursor-pointer"
              onClick={() => navigate("/teacher")}
            >
              Teacher
            </li>
            <li
              className="hover:text-black cursor-pointer"
              onClick={() => navigate("/admin")}
            >
              Admin
            </li>
            <li
              className="hover:text-black cursor-pointer"
              onClick={handleLoginLogout}
            >
              {isLoggedIn ? "Student Logout" : "Student Login"}
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminNav;
