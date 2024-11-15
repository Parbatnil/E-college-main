import React, { useEffect } from "react";
import { mentors } from "../../../assets/Assets";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const Mentors = () => {
  // Initialize AOS for scroll-based animations
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="bg-white py-16">
      <div className="flex justify-center items-center pt-10">
        <h1 className="mb-8 text-center text-3xl lg:text-4xl font-bold text-[#1E3A8A]">
          Meet Our Mentors
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-8 lg:px-16">
        {mentors.map((items) => (
          <div
            key={items.id}
            className="relative flex justify-center items-center bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="w-full h-full flex flex-col sm:flex-row items-center p-6">
              {/* Mentor Image */}
              <div className="flex justify-center items-center mb-4 sm:mb-0">
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full border-4 border-[#1E3A8A] overflow-hidden shadow-md">
                  <img
                    src={items.image}
                    alt={items.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Mentor Details */}
              <div className="text-center sm:text-left sm:ml-6">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#1E3A8A]">
                  {items.name}
                </h3>
                <p className="mt-2 text-sm sm:text-lg lg:text-xl text-gray-600">
                  {items.title}
                </p>
                <p className="mt-4 text-xs sm:text-sm text-gray-500 lg:text-base">
                  {items.description}
                </p>

                {/* Message Button */}
                <div className="flex justify-center sm:justify-start mt-6">
                  <a
                    href="mailto:ecollege2024@gmail.com"
                    className="inline-block text-center bg-[#1E3A8A] text-white py-2 px-6 rounded-full text-sm sm:text-base hover:bg-blue-600 transition-colors duration-300"
                  >
                    Message
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mentors;
