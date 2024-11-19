import React from "react";
import Navbar from "../Navbar";
import { PROJECTS } from "../../assets/Assets";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Course = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Course Section */}
      <section className="pt-10 px-3 md:px-10" id="project">
        <h2 className="mb-12 text-center text-4xl lg:text-5xl font-extrabold text-blue-900">
          Courses
        </h2>
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.filter((project) => {
              if (project.title.toLowerCase().includes("a".toLowerCase())) {
                return project;
              }
            }).map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="max-w-sm w-full bg-white rounded-2xl shadow-md overflow-hidden transition-transform duration-300 transform hover:-translate-y-3 hover:shadow-lg"
              >
                {/* Image Section */}
                <div className="relative">
                  <img
                    className="w-full h-48 object-cover"
                    src={project.image}
                    alt={project.name}
                  />
                  <span className="absolute top-4 left-4 bg-blue-500 text-white text-xs uppercase font-bold py-1 px-3 rounded-full shadow-md">
                    {`Unlock Your Future with ${project.name}`}
                  </span>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-5">
                    {project.description}
                  </p>
                  <motion.button
                    onClick={() => navigate(project.Link)}
                    whileHover={{ scale: 1.1 }}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-medium py-2 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-colors duration-300"
                  >
                    View Course
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Course;
