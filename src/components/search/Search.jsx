import React, { useState } from "react";
import Navbar from "../Navbar";
import { PROJECTS } from "../../assets/Assets";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center p-4">
        <input
          className="w-[200px] sm:w-[500px] p-3 rounded-xl bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold outline-none shadow-md placeholder-white transition-all duration-300 focus:w-[250px] sm:focus:w-[550px]"
          type="text"
          placeholder="Search here..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <section className="pt-10 mx-3" id="project">
        <div className="flex items-center justify-center px-0 sm:px-7">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.filter((project) => {
              if (searchTerm === "") return null;
              else if (
                project.name1.toLowerCase().includes(searchTerm.toLowerCase())
              )
                return project;
            }).map((project) => (
              <div
                key={project.id}
                className="group relative overflow-hidden rounded-3xl"
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-blue-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-lg p-4 rounded-xl">
                  <h3 className="mb-2 text-2xl sm:text-3xl font-semibold">
                    {project.name}
                  </h3>
                  <p className="mb-6 text-sm sm:text-lg text-center">
                    {project.description}
                  </p>
                  <button
                    onClick={() => navigate(project.Link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-blue-600 px-6 py-2 rounded-full hover:bg-gray-200 transition duration-300 font-medium"
                  >
                    View Course
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Search;
