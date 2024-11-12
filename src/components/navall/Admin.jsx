import React, { useState} from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "../Navbar";
import HashLoader  from "react-spinners/HashLoader"
const Admin = () => {
  
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const handleAdminAuth = async () => {
  
    setLoading(true);
    try {
      const response = await fetch('https://courseapi-3kus.onrender.com/api/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminId, adminPassword }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        navigate('/admin-dashboard'); // Navigate to the teachers' data page
      } else {
        setAuthError(data.message || 'Authentication failed');
      }
    } catch (error) {
      console.error("Error authenticating admin:", error);
      setAuthError('Server error, please try again later.');
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
        <h3 className="text-3xl font-bold mb-8 text-gray-800">Admin Login</h3>

       {loading ? (
        <div className=' flex justify-center items-center mt-10'>
        <HashLoader  
      loading={loading}
      size={50}
      aria-label="Loading Spinner"
      data-testid="loader"
      />
      </div>
      ) :
        (<div className="bg-white shadow-lg rounded-lg p-8 w-96">
          <div className="mb-6">
            <label htmlFor="id" className="block text-gray-700 font-medium mb-2">
              Admin ID
            </label>
            <input
              placeholder="Admin ID"
              type="text"
              name="id"
              id="id"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={adminId}
              onChange={(e) => {setAdminId(e.target.value)}}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              placeholder="Password"
              type="password"
              name="password"
              id="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={adminPassword}
              onChange={(e) => {setAdminPassword(e.target.value)}}
            />
          </div>
          <button onClick={handleAdminAuth} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            Login
          </button>
        </div>)}

      </div>
    </>
  );
};

export default Admin;