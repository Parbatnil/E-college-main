import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import backgroundImg from "../../assets/white.jpg";

const Atten = () => {
  return (
    <div className="relative bg-gradient-to-r from-indigo-600 to-blue-600 text-white h-screen flex items-center justify-center overflow-hidden p-4">
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight text-white"
        >
          Welcome to the Future of Education!
        </motion.h1>

        {/* Description Section with Animation */}
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
          className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-6"
        >
          Join thousands of students learning with our interactive platform. We
          offer a personalized learning experience that helps you grow.
        </motion.p>

        {/* Call to Action Button with Icon */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="flex justify-center mt-8"
        >
          <a
            href="#"
            className="px-8 py-4 bg-yellow-500 text-blue-800 rounded-lg font-semibold text-xl transition-all duration-300 transform hover:scale-105 hover:bg-yellow-400 flex items-center"
          >
            Get Started
            <FaArrowRight className="ml-2 text-xl" />
          </a>
        </motion.div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 px-4">
          {[
            {
              title: "Interactive Lessons",
              description:
                "Engage with fun, interactive lessons and quizzes tailored to your learning pace.",
            },
            {
              title: "Expert Tutors",
              description:
                "Learn from industry experts who are passionate about sharing their knowledge.",
            },
            {
              title: "Track Your Progress",
              description:
                "Get personalized feedback and track your learning progress with ease.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: index * 0.3 }}
              className="bg-white text-gray-800 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-indigo-500 text-white rounded-full flex items-center justify-center">
                  <FaArrowRight size={24} />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Atten;
