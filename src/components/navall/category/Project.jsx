import React from "react";
import { PROJECTS } from "../../../assets/Assets";
import { useNavigate } from "react-router-dom";

const Project = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-10 mx-3" id="project">
      <h2 className="mb-8 text-center text-3xl lg:text-4xl">Popular Course</h2>
      <div className="flex items-center justify-center px-0 sm:px-7">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.filter((project) => {
            if (project.title.toLowerCase().includes("a".toLowerCase())) {
              return project;
            }
          }).map((project) => (
            <div
              key={project.id}
              className="bg-blue-900 flex flex-col items-center w-full max-w-md mx-auto p-5 rounded-3xl gap-y-4 transition-transform duration-500 hover:scale-105"
            >
              <div className="w-full">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-48 object-cover rounded-xl"
                />
              </div>
              <span className="bg-yellow-300 text-center text-blue-800 font-semibold rounded-xl px-4 py-1">
                {`Unlock Your Future with ${project.name}`}
              </span>
              <h3 className="text-2xl text-white font-extrabold text-center">
                {project.name}
              </h3>
              <p className="text-yellow-200 text-center">
                {project.description}
              </p>
              <button
                onClick={() => navigate(project.Link)}
                className="bg-white text-blue-900 py-3 px-6 rounded-xl text-lg font-medium mb-5 sm:text-base hover:bg-gray-300 transition"
              >
                View Course
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Project;
