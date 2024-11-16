import React from "react";
import ad1 from "../../../assets/ad1.mp4";
import { motion } from "framer-motion";

const Advertisement = () => {
  return (
    <div className="relative m-5 bg-gradient-to-r from-blue-500 to-green-400 text-white py-10 px-5 lg:py-16 lg:px-20 rounded-lg shadow-lg overflow-hidden">
      {/* Video Background */}
      <video
        src={ad1}
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover opacity-70 rounded-lg"
      />

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {/* Text Section */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <motion.h1
            className="text-3xl lg:text-5xl font-bold"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            Welcome to eCollege
          </motion.h1>
          <motion.p
            className="mt-4 text-lg lg:text-xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            Join the leading platform for online education. Learn from the best,
            anywhere, anytime!
          </motion.p>
          <motion.button
            className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg shadow-md transform hover:scale-105 transition-all"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            Explore Courses
          </motion.button>
        </div>
      </div>

      {/* Overlay for darkening the video background */}
      <div className="absolute inset-0 bg-black opacity-25 rounded-lg"></div>
    </div>
  );
};

export default Advertisement;
