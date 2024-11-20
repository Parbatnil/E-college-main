import React from "react";
import { motion } from "framer-motion";
import review1 from "../../../public/review1.jpeg";
import review2 from "../../../public/review2.jpeg";
import review3 from "../../../public/review3.jpeg";
import { FaCircleUser } from "react-icons/fa6";

const reviews = [
  {
    id: 1,
    name: "Abhmanyu Singh",
    avatar: review1,
    review: "Amazing service and support. Highly recommend!",
    rating: 5,
  },
  {
    id: 2,
    name: "Ankita Sharma",
    avatar: review2,
    review: "Great experience! Very user-friendly.",
    rating: 4,
  },
  {
    id: 3,
    name: "Rohan agarwal",
    avatar: review3,
    review: "Good value for the price. Satisfied with the service.",
    rating: 4,
  },
];

const ReviewsPage = () => {
  return (
    <div className=" bg-gradient-to-r from-blue-100 to-indigo-200 py-10 px-4 sm:px-8">
      <motion.h1
        className="text-3xl font-bold text-center mb-8 text-indigo-700 flex justify-center items-center "
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        User Reviews
        <FaCircleUser />
      </motion.h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: review.id * 0.2 }}
          >
            <div className="flex items-center gap-4">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-16 h-16 rounded-full border-2 border-indigo-500"
              />
              <div>
                <h2 className="text-xl font-semibold text-indigo-700">
                  {review.name}
                </h2>
                <p className="text-yellow-500">
                  {"★".repeat(review.rating)} {"☆".repeat(5 - review.rating)}
                </p>
              </div>
            </div>
            <p className="mt-4 text-gray-600">{review.review}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;
