import React, { useEffect, useState } from "react";
import logo from "../../public/logo.png";
import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const AdminNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [log, setLog] = useState(true);
  const [l, setL] = useState("A");

  useEffect(() => {
    const logos = localStorage.getItem("logs");
    if (logos !== null) {
      const p = JSON.parse(logos);
      let k = p.slice(0, 1);
      setL(k);
      setLog(false);
    }
  }, []);

  const getlog = () => {
    const logp = localStorage.getItem("logs");
    navigate("/student");
  };

  const update = () => {
    localStorage.removeItem("logs");
    setLog(true);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      {/* Desktop Menu */}
      <nav className="lg:flex hidden justify-between items-center w-full h-16 bg-blue-900">
        {/* Logo */}
        <div className="flex justify-center items-center gap-3">
          <img
            src={logo}
            className="h-20 w-20 pt-2 cursor-pointer"
            onClick={() => navigate("/")}
            alt="logo"
          />
          <div
            className="text-white pb-3 font-semibold text-base cursor-pointer"
            onClick={() => navigate("/admin-dashboard")}
          >
            E-College
          </div>
        </div>
        {/* Menu Items */}
        <div className="flex justify-center items-center gap-5 text-gray-300">
          <div
            className="hover:text-white cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </div>
          <div
            className="hover:text-white cursor-pointer"
            onClick={() => navigate("/guidance")}
          >
            Guidance
          </div>
          <div
            className="hover:text-white cursor-pointer"
            onClick={() => navigate("/teacher")}
          >
            Teacher
          </div>
          <div
            className="hover:text-white cursor-pointer"
            onClick={() => navigate("/admin")}
          >
            Admin
          </div>
        </div>
        {/* Login */}
        <div className="flex justify-center items-center gap-3 m-2">
          <div className="cursor-pointer rounded-full h-10 w-10 bg-purple-700 text-white pl-3.5 pt-2">
            {l}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className="lg:hidden bg-blue-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Toggle Mobile Menu */}
            <button className="focus:outline-none" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? (
                <FaTimes className="m-2 h-6 w-5 text-white" />
              ) : (
                <FaBars className="m-2 h-6 w-5 text-white" />
              )}
            </button>
          </div>

          <div>
            <a href="#" className="flex justify-center items-center">
              <img
                src={logo}
                width={90}
                className="m-2 max-h-9 w-9"
                onClick={() => navigate("/")}
                alt="logo"
              />
              <div
                className="text-white pb-2 font-semibold text-sm cursor-pointer"
                onClick={() => navigate("/admin-dashboard")}
              >
                E-College
              </div>
            </a>
          </div>

          <div>
            <div className="cursor-pointer rounded-full h-6 w-6 bg-purple-700 text-white pl-1.5 mr-1">
              {l}
            </div>
          </div>
        </div>

        {/* Mobile Menu Items */}
        {isMobileMenuOpen && (
          <ul className="mx-2 p-2 mt-2 flex flex-col gap-4 text-gray-300 bg-blue-900 py-5 rounded-md">
            <li
              className="hover:text-white cursor-pointer"
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className="hover:text-white cursor-pointer"
              onClick={() => navigate("/guidance")}
            >
              Guidance
            </li>
            <li
              className="hover:text-white cursor-pointer"
              onClick={() => navigate("/teacher")}
            >
              Teacher
            </li>
            <li
              className="hover:text-white cursor-pointer"
              onClick={() => navigate("/admin")}
            >
              Admin
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminNav;
