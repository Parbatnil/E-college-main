import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import backgroundImg from "../../assets/white.jpg";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import StudentProfile from "./StudentProfile";
import Atten from "./Atten";
import Courses from "./Courses";
import ErrorSection7 from "./ErrorSection7";
import HashLoader from "react-spinners/HashLoader";
import MyMarks from "../MyMarks";

const StudentAniDash = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const logos = localStorage.getItem("logs");
    const p = logos ? JSON.parse(logos) : null;

    setLoading(true);

    if (p) {
      axios
        .get(`https://courseapi-3kus.onrender.com/api/students?email=${p}`)
        .then((res) => {
          setStudent(res.data.students[0]);
        })
        .catch((err) => {
          console.error(err);
          setShowError(true);
        })
        .finally(() => setLoading(false));
    } else {
      setTimeout(() => {
        setShowError(true);
        setLoading(false);
      }, 2000);
    }
  }, []);

  // Avoid accessing `roll` until `student` is available
  useEffect(() => {
    if (student?.roll) {
      localStorage.setItem("studentid", JSON.stringify(student.roll));
      const logp = localStorage.getItem("studentid");
      const p = JSON.parse(logp);
      console.log(p);
    }
  }, [student]); // Only run when `student` changes

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-10">
        <HashLoader
          loading={loading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  if (showError) {
    return <ErrorSection7 />;
  }

  return (
    <>
      <div>
        <div className="relative bg-gradient-to-r from-indigo-600 to-blue-600 text-white  overflow-y-auto flex items-center justify-center overflow-hidden p-4 min-h-screen">
          {/* Background Image */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${backgroundImg})` }}
          ></div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black opacity-50"></div>

          {/* Welcome Content */}
          <div className="text-center max-w-4xl space-y-6 z-10 relative">
            {/* Title Section with Animation */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight text-white"
            >
              Welcome to E-College Student Dashboard!
            </motion.h1>

            {/* Description Section with Animation */}
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5 }}
              className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-6"
            >
              Join thousands of students learning with our interactive platform.
              We offer a personalized learning experience that helps you grow.
            </motion.p>

            {/* Features Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 px-4">
              {/* Feature 1 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="bg-white text-gray-800 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                onClick={() => navigate("/studentdashbord/profile")}
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-indigo-500 text-white rounded-full flex items-center justify-center">
                    <FaArrowRight size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Student Profile
                </h3>
                <p className="text-gray-600">
                  Open Your Student Profile to check your Details
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="bg-white text-gray-800 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                onClick={() => navigate("/studentdashbord/atten")}
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-indigo-500 text-white rounded-full flex items-center justify-center">
                    <FaArrowRight size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">My Attendence</h3>
                <p className="text-gray-600">
                  Student Attence for there classes
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="bg-white text-gray-800 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                onClick={() => navigate("/my-marks")} // Adding a navigation link
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-indigo-500 text-white rounded-full flex items-center justify-center">
                    <FaArrowRight size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Marks</h3>
                <p className="text-gray-600">
                  Get Your marks based on examination
                </p>
              </motion.div>
              {/* Call to Action Button with Icon */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
                className="flex justify-center mt-8"
                onClick={() => navigate("/")}
              >
                <a
                  href="#"
                  className="px-8 py-4 bg-yellow-500 text-blue-800 rounded-lg font-semibold text-xl transition-all duration-300 transform hover:scale-105 hover:bg-yellow-400 flex items-center"
                >
                  <FaArrowLeft className="ml-2 text-xl" />
                  Back to Home
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Routes>
        {/* <Route path="/" element={<StudentProfile student={student} />} /> */}
        <Route path="/atten" element={<Atten />} />
        {/* <Route path="/my-marks" element={<MyMarks />} /> */}
      </Routes>
    </>
  );
};

export default StudentAniDash;
