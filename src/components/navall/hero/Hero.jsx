import React, { useEffect } from "react";
import HeroImage from "../../../assets/Hero.png";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // Import the AOS CSS

const HeroData = [
  {
    id: 1,
    Image: HeroImage,
    subtitle: "Streamline Your College Journey with Ease",
    title: "Your Education, Enhanced and Simplified",
    description:
      "eCollege provides a centralized platform to manage your courses, assignments, and academic resources efficiently. Stay connected with campus updates and streamline your education experience like never before.",
    path: "/course",
  },
];

const Hero = () => {
  const navigate = useNavigate();

  // Initialize AOS animation on component mount
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="relative flex py-10 px-2 bg-gradient-to-bl from-brandBlue to-white dark:text-[#1E3A8A] p-6">
      <div className="my-auto px-8 max-w-screen-xl mx-auto z-10">
        {/* Text section */}
        {HeroData.map((data) => (
          <div key={data.id}>
            <p
              className="bg-blue-300 inline-block px-4 py-2 rounded text-xl sm:text-lg lg:text-white text-white sm:text-white mb-4"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              {data.subtitle}
            </p>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white md:text-white lg:text-brandBlue mb-4"
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-delay="200"
            >
              {data.title}
            </h1>
            <p
              className="text-lg sm:text-xl text-white md:text-white lg:text-brandBlue mb-6"
              data-aos="fade-up"
              data-aos-duration="1400"
              data-aos-delay="400"
            >
              {data.description}
            </p>

            <div className="pt-6 sm:pt-10">
              <div className="flex">
                <button
                  onClick={() => navigate(data.path)}
                  className="bg-[#FFFFFF] dark:text-[#1E3A8A] py-3 px-6 rounded-xl text-lg sm:text-base transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hero image background for screens under 1200px */}
      <div className="absolute top-0 left-0 w-full h-full lg:hidden bg-gradient-to-bl from-blue-800 via-blue-600 to-transparent">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${HeroImage})` }}
        />
      </div>

      {/* Image for larger screens (above 1200px, image will be a regular img element) */}
      <div
        className="w-full max-w-[1300px] mx-auto lg:block hidden relative"
        data-aos="fade-left"
        data-aos-duration="1500"
        data-aos-delay="600"
      >
        <img
          src={HeroImage}
          alt="Hero"
          className="w-full mx-auto relative z-0 transition duration-500 ease-in-out transform hover:scale-105"
        />
      </div>
    </div>
  );
};

export default Hero;
