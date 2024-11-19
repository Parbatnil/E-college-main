import React from "react";
import { PROJECTS } from "../../../assets/Assets";
import { useNavigate } from "react-router-dom";

const Exam = () => {
  const navigate = useNavigate();

  return (
    <section className="py-10 mx-3 bg-blue-900" id="project">
      <h2 className="mb-12 text-center text-4xl text-white hover:text-red-200 font-bold">
        Popular Exams
      </h2>
      <div className="flex items-center justify-center px-0 sm:px-7">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.filter((project) => {
            if (project.title.toLowerCase().includes("i".toLowerCase())) {
              return project;
            }
          }).map((project) => (
            <div
              key={project.id}
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
                <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">
                  {project.name}
                </h3>
                <p className="text-gray-600 text-sm mb-5 text-center">
                  {project.description}
                </p>
                <button
                  onClick={() => navigate(project.Link)}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-medium py-2 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-colors duration-300"
                >
                  Take Exam
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Exam;
