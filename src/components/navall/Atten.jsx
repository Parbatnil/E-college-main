import React from "react";
import { motion } from "framer-motion";
const Atten = () => {
  const subjects = [
    { subject: "Mathematics", attendance: "Present" },
    { subject: "Computer Science", attendance: "Absent" },
    { subject: "Physics", attendance: "Present" },
    { subject: "Chemistry", attendance: "Present" },
    { subject: "English", attendance: "Absent" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <motion.div
        className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">
          Your Subject Attendance
        </h1>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {subjects.map((subject, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className={`p-4 rounded-lg shadow-md ${
                subject.attendance === "Present" ? "bg-green-100" : "bg-red-100"
              }`}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{subject.subject}</h2>
                <span
                  className={`px-4 py-1 rounded-full ${
                    subject.attendance === "Present"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {subject.attendance}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Atten;
