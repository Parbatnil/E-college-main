import React, { useEffect } from "react";
import { FaGraduationCap } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
import { PiExamFill } from "react-icons/pi";
import { GiFlexibleLamp } from "react-icons/gi";
import { RiVideoOnLine } from "react-icons/ri";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const Ribbon = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="flex flex-wrap justify-center mx-4 sm:mx-8 md:mx-16 my-5 gap-8">
      {/* PostGraduation */}
      <div
        className="text-[#1E3A8A] flex flex-col items-center"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <FaGraduationCap className="text-[80px] sm:text-[100px] md:text-[150px] transition-transform transform hover:scale-110 duration-300" />
        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-center mt-2">
          PostGraduation
        </p>
      </div>

      {/* UnderGraduation */}
      <div
        className="text-[#1E3A8A] flex flex-col items-center"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="200"
      >
        <FaPaperPlane className="text-[80px] sm:text-[100px] md:text-[150px] transition-transform transform hover:scale-110 duration-300" />
        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-center mt-2">
          UnderGraduation
        </p>
      </div>

      {/* Online Examination */}
      <div
        className="text-[#1E3A8A] flex flex-col items-center"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="400"
      >
        <PiExamFill className="text-[80px] sm:text-[100px] md:text-[150px] transition-transform transform hover:scale-110 duration-300" />
        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-center mt-2">
          Online Examination
        </p>
      </div>

      {/* Flexibility */}
      <div
        className="text-[#1E3A8A] flex flex-col items-center"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="600"
      >
        <GiFlexibleLamp className="text-[80px] sm:text-[100px] md:text-[150px] transition-transform transform hover:scale-110 duration-300" />
        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-center mt-2">
          Flexibility
        </p>
      </div>

      {/* Online Classes */}
      <div
        className="text-[#1E3A8A] flex flex-col items-center"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="800"
      >
        <RiVideoOnLine className="text-[80px] sm:text-[100px] md:text-[150px] transition-transform transform hover:scale-110 duration-300" />
        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-center mt-2">
          Online Classes
        </p>
      </div>
    </div>
  );
};

export default Ribbon;
