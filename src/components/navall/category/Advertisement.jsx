import React from "react";
import adverticement from "../../../../src/assets/ad1.mp4";

const Advertisement = () => {
  return (
    <section className="bg-gradient-to-r from-blue-900 to-blue-600 text-white py-12 px-6 md:px-16 m-3">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between">
        {/* Text Section */}
        <div className="mb-8 md:mb-0 md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Unlock Endless Possibilities!
          </h2>
          <p className="text-lg md:text-xl mb-6">
            Enroll in our programs today and take the first step toward building
            a brighter future. Explore courses designed for modern learners.
          </p>
        </div>

        {/* Video Section */}
        <div className="md:w-1/2 flex justify-center">
          <video
            className="rounded-2xl shadow-lg w-full max-w-xl"
            autoPlay
            loop
          >
            <source src={adverticement} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
};

export default Advertisement;
