import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TeacherDashboard = () => {
  const { registerNumber } = useParams(); // Get register number from URL
  const [teacherData, setTeacherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle between light and dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply the dark mode class to the body
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Fetch teacher data by registration number
    const fetchTeacherData = async () => {
      try {
        const logp = localStorage.getItem('teacherlogs');
        const p = JSON.parse(logp);
        const response = await axios.get(`https://courseapi-3kus.onrender.com/api/teacher/${p}`);
        setTeacherData(response.data);
      } catch (error) {
        setErrorMessage('Failed to fetch teacher data.');
      } finally {
        setIsLoading(false); // Ensure loading state is turned off
      }
    };

    fetchTeacherData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-red-500 dark:text-red-400">{errorMessage}</div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-300`}>
      <div className="flex justify-center gap-4 w-full max-w-4xl p-4">
        <h1 className={`text-3xl sm:text-4xl font-extrabold ${isDarkMode ? 'text-white' : 'text-gray-800'} transition-colors duration-300`}>
          Teacher Dashboard
        </h1>
        <button
          onClick={toggleDarkMode}
          className={`py-2 px-4 rounded-full shadow-md hover:bg-opacity-90 transition duration-300 ${
            isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      {teacherData ? (
        <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors duration-300">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-indigo-600 dark:text-indigo-400">
            Registered Data
          </h2>
        <div className='flex overflow-auto'>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b-2 p-2 sm:p-4 text-left text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase">
                  Field
                </th>
                <th className="border-b-2 p-2 sm:p-4 text-left text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(teacherData).map(([key, value]) => (
                <tr key={key} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  <td className="border-b p-2 sm:p-4 text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200">
                    {key}
                  </td>
                  <td className="border-b p-2 sm:p-4 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    {Array.isArray(value) ? value.join(', ') : typeof value === 'object' && value !== null ? JSON.stringify(value) : value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
                </div>
        </div>
      ) : (
        <div className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>No data available.</div>
      )}
    </div>
  );
};

export default TeacherDashboard;
