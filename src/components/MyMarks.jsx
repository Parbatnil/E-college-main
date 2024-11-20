import React, { useEffect, useState } from "react";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const MyMarks = () => {
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
        .get(`https://courseapi-3kus.onrender.com/api/result?email=${p}`)
        .then((res) => {
          console.log(res.data);
          setStudent(res.data.result);
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
    return (
      <div className="text-center text-red-500 mt-5">Error loading data.</div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      {student ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-4 py-3 border-b text-left font-semibold">
                  Name
                </th>
                <th className="px-4 py-3 border-b text-left font-semibold">
                  Teacher
                </th>
                <th className="px-4 py-3 border-b text-left font-semibold">
                  Course
                </th>
                <th className="px-4 py-3 border-b text-left font-semibold">
                  Paper
                </th>
                <th className="px-4 py-3 border-b text-left font-semibold">
                  Score
                </th>
                <th className="px-4 py-3 border-b text-left font-semibold">
                  Exam Number
                </th>
              </tr>
            </thead>
            <tbody>
              {student.map((result, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 transition duration-300 ease-in-out"
                >
                  <td className="px-4 py-3 border-b text-center">
                    {result.student}
                  </td>
                  <td className="px-4 py-3 border-b text-center">
                    {result.teacher}
                  </td>
                  <td className="px-4 py-3 border-b text-center">
                    {result.sub}
                  </td>
                  <td className="px-4 py-3 border-b text-center">
                    {result.paper}
                  </td>
                  <td className="px-4 py-3 border-b text-center">
                    {result.score}
                  </td>
                  <td className="px-4 py-3 border-b text-center">
                    {result.examno}
                  </td>
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
              className="px-8 py-4 bg-blue-800 text-yellow-500 rounded-lg font-semibold text-xl transition-all duration-300 transform hover:scale-105 hover:bg-yellow-400  hover:text-blue-500 flex items-center"
            >
              <FaArrowLeft className="ml-2 text-xl" />
              Back to Dashboard
            </a>
          </motion.div>
        </div>
      ) : (
        <div className="text-center text-red-500 mt-5 ">
          No data available
          <div>
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
        </div>

        //----//
      )}
    </div>
  );
};

export default MyMarks;
