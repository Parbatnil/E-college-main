import React from "react";
import Navbar from "../../Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import AdminNav from "../../AdminNav";
import {
  FaUserGraduate,
  FaUserPlus,
  FaChalkboardTeacher,
  FaUserTie,
} from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <AdminNav />
      <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 pb-16">
        <h2 className="text-5xl font-bold mb-12 text-gray-800">
          Admin Dashboard
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 w-full max-w-6xl px-4">
          {/* Student Data Card */}
          <div
            className="p-8 rounded-xl shadow-lg cursor-pointer transition-transform transform hover:scale-105 bg-white/90 text-indigo-700 border border-gray-300 backdrop-blur-lg"
            onClick={() => navigate("/student-data")}
          >
            <FaUserGraduate className="text-4xl mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Student Data</h3>
            <p className="text-sm">
              View, manage, and update all student-related information.
            </p>
          </div>

          {/* Student Registration Card */}
          <div
            className="p-8 rounded-xl shadow-lg cursor-pointer transition-transform transform hover:scale-105 bg-white/90 text-indigo-700 border border-gray-300 backdrop-blur-lg"
            onClick={() => navigate("/student-register")}
          >
            <FaUserPlus className="text-4xl mb-4" />
            <h3 className="text-2xl font-semibold mb-2">
              Student Registration
            </h3>
            <p className="text-sm">
              Register new students and manage their profiles efficiently.
            </p>
          </div>

          {/* Teacher Data Card */}
          <div
            className="p-8 rounded-xl shadow-lg cursor-pointer transition-transform transform hover:scale-105 bg-white/90 text-indigo-700 border border-gray-300 backdrop-blur-lg"
            onClick={() => navigate("/teachers-data")}
          >
            <FaChalkboardTeacher className="text-4xl mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Teacher Data</h3>
            <p className="text-sm">
              Access, update, and organize all teacher-related information.
            </p>
          </div>

          {/* Teacher Registration Card */}
          <div
            className="p-8 rounded-xl shadow-lg cursor-pointer transition-transform transform hover:scale-105 bg-white/90 text-indigo-700 border border-gray-300 backdrop-blur-lg"
            onClick={() => navigate("/teacher-register")}
          >
            <FaUserTie className="text-4xl mb-4" />
            <h3 className="text-2xl font-semibold mb-2">
              Teacher Registration
            </h3>
            <p className="text-sm">
              Register new teachers and maintain their profiles.
            </p>
          </div>
        </div>

        {/* Back to Home Button */}
        {/* <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8 }}
          className="absolute bottom-6 left-1 transform -translate-x-1/2 "
        >
          <NavLink
            href="#"
            className="px-8 py-4   bg-[#003366] text-white rounded-lg font-semibold text-xl transition-all duration-300 transform hover:scale-105 hover:bg-[#002244] flex items-center"
            onClick={() => navigate("/")}
          >
            <FaArrowLeft className="ml-2 text-xl" />
            Back to Home
          </NavLink>
        </motion.div> */}
      </div>
    </>
  );
};

export default AdminDashboard;
