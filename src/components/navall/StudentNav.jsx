import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import StudentProfile from "./StudentProfile"; // Ensure this import is correct
import Courses from "./Courses"; // Ensure this import is correct
import Atten from "./Atten"; // Ensure this import is correct

const StudentNav = ({ student }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="md:w-64 w-full p-4 bg-[#1E3A8A] text-white">
        <div className="md:hidden flex justify-between items-center">
          <h2 className="text-2xl font-bold">Student Dashboard</h2>
          <button onClick={toggleMenu} className="text-white text-2xl">
            <FaBars />
          </button>
        </div>
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:block space-y-4 w-full`}
        >
          <h2 className="hidden md:block text-2xl font-bold mb-4">
            Student Dashboard
          </h2>
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/studentdashbord/profile"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-500 font-semibold"
                    : "text-white hover:text-yellow-700"
                }
              >
                Profile
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/studentdashbord/atten"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-500 font-semibold"
                    : "text-white hover:text-yellow-700"
                }
              >
                Attendance
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/studentdashbord/mycourse"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-500 font-semibold"
                    : "text-white hover:text-yellow-700"
                }
              >
                Courses
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4 overflow-auto">
        {/* Content will be shown here based on the selected route */}
      </div>
    </div>
  );
};

export default StudentNav;
