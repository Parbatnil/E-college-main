import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Slide, Fade } from "react-reveal";
import backgroundImg from "../../assets/white.jpg";

import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import StudentProfile from "./StudentProfile"; // Profile component
import Atten from "./Atten"; // Attendance component
import Courses from "./Courses"; // Courses component
import ErrorSection7 from "./ErrorSection7"; // Error component
import HashLoader from "react-spinners/HashLoader";
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
        <div className="relative bg-gradient-to-r from-indigo-600 to-blue-600 text-white h-screen flex items-center justify-center overflow-hidden p-4">
          {/* Background Video or Image */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center opacity-30"
            style={{ backgroundImage: backgroundImg }}
          ></div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black opacity-50"></div>

          {/* Welcome Content */}
          <div className="text-center max-w-4xl space-y-6 z-10 relative">
            {/* Title Section with Animation */}
            <Fade bottom duration={1500}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight text-white">
                Welcome to the Future of Education!
              </h1>
            </Fade>

            {/* Description Section with Animation */}
            <Slide left duration={1500}>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-6">
                Join thousands of students learning with our interactive
                platform. We offer a personalized learning experience that helps
                you grow.
              </p>
            </Slide>

            {/* Call to Action Button with Icon */}
            <Fade bottom duration={1500}>
              <div className="flex justify-center mt-8">
                <a
                  href="#"
                  className="px-8 py-4 bg-yellow-500 text-blue-800 rounded-lg font-semibold text-xl transition-all duration-300 transform hover:scale-105 hover:bg-yellow-400 flex items-center"
                >
                  Get Started
                  <FaArrowRight className="ml-2 text-xl" />
                </a>
              </div>
            </Fade>

            {/* Features Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 px-4">
              {/* Feature 1 */}
              <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-center mb-4">
                  <div
                    className="w-12 h-12 bg-indigo-500 text-white rounded-full flex items-center justify-center"
                    onClick={() => navigate("/studentdashbord/profile")}
                  >
                    <FaArrowRight size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Interactive Lessons
                </h3>
                <p className="text-gray-600">
                  Engage with fun, interactive lessons and quizzes tailored to
                  your learning pace.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-indigo-500 text-white rounded-full flex items-center justify-center">
                    <FaArrowRight size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Expert Tutors</h3>
                <p className="text-gray-600">
                  Learn from industry experts who are passionate about sharing
                  their knowledge.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-indigo-500 text-white rounded-full flex items-center justify-center">
                    <FaArrowRight size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Track Your Progress
                </h3>
                <p className="text-gray-600">
                  Get personalized feedback and track your learning progress
                  with ease.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<StudentProfile student={student} />} />
        <Route path="/atten" element={<Atten />} />
        <Route path="/mycourse" element={<Courses student={student} />} />
      </Routes>
    </>
  );
};

export default StudentAniDash;
