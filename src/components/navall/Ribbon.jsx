import React from "react";
import { FaGraduationCap } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
import { PiExamFill } from "react-icons/pi";
import { GiFlexibleLamp } from "react-icons/gi";
import { RiVideoOnLine } from "react-icons/ri";

const Ribbon = () => {
  return (
    <div className="flex flex-wrap justify-around mx-4 sm:mx-8 md:mx-16 my-5 gap-8">
      <div className="text-[#1E3A8A] flex flex-col items-center">
        <FaGraduationCap className="text-[80px] sm:text-[100px] md:text-[150px]" />
        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-center mt-2">
          PostGraduation
        </p>
      </div>
      <div className="text-[#1E3A8A] flex flex-col items-center">
        <FaPaperPlane className="text-[80px] sm:text-[100px] md:text-[150px]" />
        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-center mt-2">
          UnderGraduation
        </p>
      </div>
      <div className="text-[#1E3A8A] flex flex-col items-center">
        <PiExamFill className="text-[80px] sm:text-[100px] md:text-[150px]" />
        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-center mt-2">
          Online Examination
        </p>
      </div>
      <div className="text-[#1E3A8A] flex flex-col items-center">
        <GiFlexibleLamp className="text-[80px] sm:text-[100px] md:text-[150px]" />
        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-center mt-2">
          Flexibility
        </p>
      </div>
      <div className="text-[#1E3A8A] flex flex-col items-center">
        <RiVideoOnLine className="text-[80px] sm:text-[100px] md:text-[150px]" />
        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-center mt-2">
          Online Classes
        </p>
      </div>
    </div>
  );
};

export default Ribbon;
