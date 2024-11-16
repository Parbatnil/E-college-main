import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import HashLoader from "react-spinners/HashLoader";
import { motion } from "framer-motion";

const Admin = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const handleAdminAuth = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://courseapi-3kus.onrender.com/api/admin-auth",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ adminId, adminPassword }),
        }
      );

      const data = await response.json();

      if (data.success) {
        navigate("/admin-dashboard");
      } else {
        setAuthError(data.message || "Authentication failed");
      }
    } catch (error) {
      console.error("Error authenticating admin:", error);
      setAuthError("Server error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 overflow-hidden">
        <motion.h3
          className="text-3xl font-extrabold mb-8 text-blue-700"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Admin Login
        </motion.h3>

        {loading ? (
          <motion.div
            className="flex justify-center items-center mt-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <HashLoader
              loading={loading}
              size={60}
              color="#3b82f6"
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </motion.div>
        ) : (
          <motion.div
            className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mb-6">
              <label
                htmlFor="id"
                className="block text-gray-700 font-semibold mb-2"
              >
                Admin ID
              </label>
              <motion.input
                placeholder="Enter Admin ID"
                type="text"
                name="id"
                id="id"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                whileFocus={{ scale: 1.05 }}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold mb-2"
              >
                Password
              </label>
              <motion.input
                placeholder="Enter Password"
                type="password"
                name="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                whileFocus={{ scale: 1.05 }}
              />
            </div>
            <motion.button
              onClick={handleAdminAuth}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 font-semibold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>

            {/* Authentication error message */}
            {authError && (
              <motion.p
                className="text-red-600 text-center mt-4 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {authError}
              </motion.p>
            )}
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Admin;
