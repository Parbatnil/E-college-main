import React from "react";
import { mentors } from "../../../assets/Assets";
import { motion } from "framer-motion"; // For animations

const Mentors = () => {
  return (
    <div className="pt-10 bg-gray-50 my-10">
      {/* Title */}
      <div className="flex justify-center items-center mb-8">
        <h1 className="text-center text-3xl sm:text-4xl font-extrabold text-gray-800">
          Mentors
        </h1>
      </div>

      {/* Mentors List */}
      <div className="flex flex-wrap justify-center items-center gap-6 px-4">
        {mentors.map((mentor) => (
          <motion.div
            key={mentor.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full sm:w-[90%] md:w-[90%] lg:w-[90%] xl:w-[90%] rounded-3xl bg-white shadow-lg overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row items-center">
              {/* Mentor Image */}
              <img
                src={mentor.image}
                alt={mentor.name}
                className="w-24 h-24 sm:w-32 sm:h-32 lg:w-32 lg:h-32 object-cover rounded-full mx-4 mt-4 sm:mt-0 shadow-md"
              />

              {/* Mentor Info */}
              <div className="flex flex-col flex-grow gap-4 p-4 sm:pl-6 sm:pr-10 text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-700">
                  {mentor.name}
                </h3>
                <p className="text-md sm:text-lg text-gray-500">
                  {mentor.title}
                </p>
                <p className="text-sm sm:text-base text-gray-600">
                  {mentor.description.slice(0, 100)}...
                </p>

                {/* Buttons */}
                <div className="mt-4 flex justify-center sm:justify-start">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-white hover:text-blue-800 transition-all"
                  >
                    <a href="mailto:ecollege2024@gmail.com">Message</a>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Mentors;
