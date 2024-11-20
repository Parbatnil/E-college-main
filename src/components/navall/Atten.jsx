import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { MdOutlineDoneOutline } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Atten = () => {
  const [students, setStudents] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const logp = localStorage.getItem("studentid");
        const p = JSON.parse(logp);
        const response = await axios.get(
          `https://courseapi-3kus.onrender.com/api/atten/?roll=${p}`
        );
        setStudents(response.data.attend);
      } catch (error) {
        setError("Error fetching students.");
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  const attendanceSummary = students
    ? students.reduce((acc, student) => {
        if (!acc[student.paper]) {
          acc[student.paper] = 1;
        } else {
          acc[student.paper]++;
        }
        return acc;
      }, {})
    : {};

  return (
    <div className="p-6">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
        Student Attendance
      </h2>
      {students ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="overflow-x-auto"
          >
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Teacher Name</th>
                  <th className="px-4 py-2 text-left">Roll</th>
                  <th className="px-4 py-2 text-left">Paper Name</th>
                  <th className="px-4 py-2 text-left">Attendance</th>
                  <th className="px-4 py-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <motion.tr
                    key={`${student.paper}-${student.date}-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="hover:bg-gray-100 transition-all duration-300"
                  >
                    <td className="px-4 py-2 text-sm md:text-base">
                      {student.teacher}
                    </td>
                    <td className="px-4 py-2 text-sm md:text-base">
                      {student.roll}
                    </td>
                    <td className="px-4 py-2 text-sm md:text-base">
                      {student.paper}
                    </td>
                    <td className="px-4 py-2 text-sm md:text-base">
                      <MdOutlineDoneOutline className="text-green-500" />
                    </td>
                    <td className="px-4 py-2 text-sm md:text-base">
                      {student.date}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* New Responsive Attendance Summary Table */}
          <div className="mt-8">
            <h3 className="text-2xl md:text-3xl font-semibold text-center mb-4">
              Attendance Summary
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-4 py-2 md:px-6 md:py-3 text-left font-semibold text-sm md:text-lg">
                      Paper Name
                    </th>
                    <th className="px-4 py-2 md:px-6 md:py-3 text-left font-semibold text-sm md:text-lg">
                      Total Attendance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(attendanceSummary).map(([subject, count]) => (
                    <tr
                      key={subject}
                      className="border-b border-gray-200 hover:bg-gray-100 transition-all duration-300"
                    >
                      <td className="px-4 py-2 md:px-6 md:py-3 text-gray-700 text-sm md:text-base">
                        {subject}
                      </td>
                      <td className="px-4 py-2 md:px-6 md:py-3 text-gray-700 text-sm md:text-base">
                        {count}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              className="flex justify-center mt-8"
              onClick={() => navigate("/studentdashbord")}
            >
              <a
                href="#"
                className="px-8 py-4 bg-blue-800 text-yellow-500 rounded-lg font-semibold text-xl transition-all duration-300 transform hover:scale-105 hover:bg-yellow-400 hover:text-blue-500 flex items-center"
              >
                <FaArrowLeft className="ml-2 text-xl" />
                Back to Dashboard
              </a>
            </motion.div>
          </div>
        </>
      ) : (
        <div className="text-center text-xl text-gray-500">Loading...</div>
      )}
    </div>
  );
};

export default Atten;
