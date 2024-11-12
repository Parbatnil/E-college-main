import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  // Toggle between light and dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply the dark mode class to the body
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <>
      <Navbar />
      <div className={`flex flex-col justify-center items-center min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-300`}>
        <div className="flex justify-end w-full max-w-4xl p-4">
          <button
            onClick={toggleDarkMode}
            className={`py-2 px-4 rounded-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'} shadow-md hover:bg-opacity-90 transition duration-300`}
          >
            {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>
        </div>
        <h2 className={`text-4xl font-extrabold mb-12 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Admin Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <button
            className={`py-4 px-8 rounded-lg shadow-lg hover:opacity-90 transition duration-300 transform hover:scale-105 ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-indigo-700'
            }`}
            onClick={() => navigate("/student-data")}
          >
            Student Data
          </button>
          <button
            className={`py-4 px-8 rounded-lg shadow-lg hover:opacity-90 transition duration-300 transform hover:scale-105 ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-indigo-700'
            }`}
            onClick={() => navigate("/student-register")}
          >
            Student Registration
          </button>
          <button
            className={`py-4 px-8 rounded-lg shadow-lg hover:opacity-90 transition duration-300 transform hover:scale-105 ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-indigo-700'
            }`}
            onClick={() => navigate("/teachers-data")}
          >
            Teacher Data
          </button>
          <button
            className={`py-4 px-8 rounded-lg shadow-lg hover:opacity-90 transition duration-300 transform hover:scale-105 ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-indigo-700'
            }`}
            onClick={() => navigate("/teacher-register")}
          >
            Teacher Registration
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
