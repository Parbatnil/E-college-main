import React from "react";
import { Tcourse } from "../../../assets/Assets";
import { useNavigate } from "react-router-dom";
import TeacherNav from "../../TeacherNav";

const Teachercourse = () => {
  const navigate = useNavigate();

  return (
    <div>
      <TeacherNav />
      <section className="pt-10 mx-3 mb-4" id="project">
        <h2 className="mb-8 text-center text-3xl lg:text-4xl">
          Course (Teacher)
        </h2>
        <div className="flex items-center justify-center px-0 sm:px-7">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Tcourse.filter((project) => {
              if (project.title1.toLowerCase().includes("xt".toLowerCase())) {
                return project;
              }
            }).map((project) => (
              <div
                key={project.id}
                className="relative rounded-3xl bg-white shadow-lg overflow-hidden"
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-64 object-cover rounded-t-3xl"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 mt-2 text-sm sm:text-base">
                    {project.description}
                  </p>
                  <div className="mt-4">
                    <a
                      onClick={() => navigate(project.Link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-blue-600 text-white text-sm px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300"
                    >
                      View Course
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Teachercourse;
