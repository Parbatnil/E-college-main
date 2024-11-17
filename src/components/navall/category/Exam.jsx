import React from "react";
import { PROJECTS } from "../../../assets/Assets";
import { useNavigate } from "react-router-dom";

const Exam = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-10 mx-3 bg-blue-900" id="project">
      <h2 className="mb-12 text-center text-4xl font-semibold text-white">
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
              className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center"
            >
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-56 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-semibold text-blue-800 text-center mb-2">
                {project.name}
              </h3>
              <p className="text-sm sm:text-base text-gray-700 text-center mb-4">
                {project.description}
              </p>
              <button
                onClick={() => navigate(project.Link)}
                className="bg-blue-800 text-white py-2 px-6 rounded-full text-sm sm:text-base font-medium shadow-md hover:bg-blue-700 transition"
              >
                Take Exam
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Exam;
