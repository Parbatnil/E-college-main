import React from "react";
import Hero from "./hero/Hero";
import Navbar from "../Navbar";
import Project from "./category/Project";
import Exam from "./category/Exam";
import Mentors from "./category/Mentors";
import Advertisement from "./category/Advertisement";
import Footer from "../Footer";
import Ribbon from "./Ribbon";
import ReviewsPage from "../reviews/ReviewsPage";

const DisplayHome = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Ribbon />
      <Project />
      <Advertisement />
      <Exam />
      <Mentors />
      <ReviewsPage />
      <Footer />
    </>
  );
};

export default DisplayHome;
