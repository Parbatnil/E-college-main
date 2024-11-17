import React from "react";
import { PROJECTS } from "../../../assets/Assets";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Project = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-10 px-3 md:px-10" id="project">
      <h2 className="mb-12 text-center text-4xl lg:text-5xl font-bold text-blue-900">
        Popular Courses
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
              whileHover={{ scale: 1.05, rotate: -1 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-blue-900 to-blue-700 flex flex-col items-center w-full max-w-md mx-auto p-6 rounded-3xl gap-y-6 shadow-lg transform transition-transform"
            >
              <div className="w-full">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-56 object-cover rounded-2xl shadow-md transition-transform duration-300 transform hover:scale-105"
                />
              </div>
              <span className="bg-yellow-300 text-center text-blue-800 font-semibold rounded-full px-6 py-2">
                {`Unlock Your Future with ${project.name}`}
              </span>
              <h3 className="text-2xl text-white font-extrabold text-center leading-tight">
                {project.name}
              </h3>
              <p className="text-yellow-100 text-center px-4">
                {project.description}
              </p>
              <motion.button
                onClick={() => navigate(project.Link)}
                whileHover={{ scale: 1.1 }}
                className="bg-white text-blue-900 py-3 px-8 rounded-full text-lg font-semibold shadow-md hover:bg-yellow-100 transition-colors"
              >
                View Course
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Project;
