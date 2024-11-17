import React from "react";
import { FaUserGraduate } from "react-icons/fa";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
// import StudentProfile from "./StudentProfile"; // Profile component
import Atten from "./Atten"; // Attendance component
import Courses from "./Courses"; // Courses component
import ErrorSection7 from "./ErrorSection7"; // Error component
import HashLoader from "react-spinners/HashLoader";

const StudentProfile = () => {
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

  if (!student) {
    return <ErrorSection7 />; // If student data is not passed or still loading
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 min-h-screen py-10 px-5 sm:px-10">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-wide mb-4">
          Student Profile
        </h2>
        <p className="text-xl text-gray-100">
          Welcome to your personalized profile page.
        </p>
      </div>

      {/* Profile Card */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl p-8 sm:p-10 lg:p-12 space-y-8 transform hover:scale-105 transition-all duration-300 ease-in-out">
        {/* Name & Icon Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-6 sm:space-y-0 sm:space-x-8">
          <div className="flex items-center space-x-4">
            <FaUserGraduate className="text-6xl text-indigo-600" />
            <h1 className="text-4xl font-semibold text-[#1E3A8A]">
              Hi! {student.name}
            </h1>
          </div>
        </div>

        {/* Main Profile Information */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:bg-indigo-50 transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-800">
                Roll Number
              </h3>
              <p className="text-gray-600">{student.roll}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:bg-indigo-50 transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-800">Course</h3>
              <p className="text-gray-600">{student.course}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:bg-indigo-50 transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-800">Guardian</h3>
              <p className="text-gray-600">{student.guardian}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:bg-indigo-50 transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-800">
                Course Duration
              </h3>
              <p className="text-gray-600">
                {student.starting} - {student.end}
              </p>
            </div>
          </div>
        </div>

        {/* Academic Details */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-[#1E3A8A] mb-4">
            Academic Qualifications
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-center">
            {student.bca && (
              <div
                className="bg-indigo-600 text-white py-4 rounded-xl transform hover:scale-110 transition-transform duration-300"
                onClick={() => navigate("/bca")}
              >
                <p>BCA</p>
              </div>
            )}
            {student.mca && (
              <div
                className="bg-indigo-600 text-white py-4 rounded-xl transform hover:scale-110 transition-transform duration-300"
                onClick={() => navigate("/mca")}
              >
                <p>MCA</p>
              </div>
            )}
            {student.btech && (
              <div className="bg-indigo-600 text-white py-4 rounded-xl transform hover:scale-110 transition-transform duration-300">
                <p>BTech</p>
              </div>
            )}
            {student.mtech && (
              <div className="bg-indigo-600 text-white py-4 rounded-xl transform hover:scale-110 transition-transform duration-300">
                <p>MTech</p>
              </div>
            )}
            {student.bba && (
              <div className="bg-indigo-600 text-white py-4 rounded-xl transform hover:scale-110 transition-transform duration-300">
                <p>BBA</p>
              </div>
            )}
            {student.mba && (
              <div className="bg-indigo-600 text-white py-4 rounded-xl transform hover:scale-110 transition-transform duration-300">
                <p>MBA</p>
              </div>
            )}
          </div>
        </div>

        {/* Table Section with Animations */}
        <div className="overflow-x-auto mt-10">
          <table className="w-full table-auto text-left text-gray-700">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-4 py-2 font-semibold">Label</th>
                <th className="px-4 py-2 font-semibold">Value</th>
              </tr>
            </thead>
            <tbody className="animate__animated animate__fadeIn">
              {[
                { label: "Email ID", value: student.email },
                { label: "Phone Number", value: student.phonenumber },
              ].map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-indigo-100 transition-all duration-300"
                >
                  <td className="px-4 py-2">{item.label}</td>
                  <td className="px-4 py-2">{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className="flex justify-center mt-8"
            onClick={() => navigate("/studentdashbord")}
          >
            <a
              href="#"
              className="px-8 py-4 bg-blue-800 text-yellow-500 rounded-lg font-semibold text-xl transition-all duration-300 transform hover:scale-105 hover:bg-yellow-400 flex items-center"
            >
              <FaArrowLeft className="ml-2 text-xl" />
              Back to Dashboard
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
