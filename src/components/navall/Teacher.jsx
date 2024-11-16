import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import os from "../../../public/te.gif";

const Teacher = () => {
  const [formData, setFormData] = useState({
    registerNumber: "",
    password: "",
  });
  const [forgotPasswordData, setForgotPasswordData] = useState({
    registerNumber: "",
    oldPassword: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  // Handle input change for login form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle input change for forgot password form
  const handleForgotPasswordChange = (e) => {
    const { name, value } = e.target;
    setForgotPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);
    try {
      const response = await axios.post(
        "https://courseapi-3kus.onrender.com/api/signin-teacher",
        formData
      );
      if (response.data.success) {
        setSuccessMessage("Sign-in successful!");
        localStorage.setItem(
          "teacherlogs",
          JSON.stringify(formData.registerNumber)
        );
        navigate("/teachercourseok@24");
      } else {
        setErrorMessage("Invalid registration number or password.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle forgot password form submission
  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);
    try {
      const response = await axios.post(
        "https://courseapi-3kus.onrender.com/api/reset-password",
        forgotPasswordData
      );
      if (response.data.success) {
        setSuccessMessage("Password reset successful!");
        setIsModalOpen(false); // Close modal after success
      } else {
        setErrorMessage("Password reset failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        {loading ? (
          <div className="flex justify-center items-center mt-10">
            <HashLoader loading={loading} size={50} />
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-center min-h-screen max-w-full">
              <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
                {/* Left side */}
                <div className="flex flex-col justify-center p-8 md:p-14">
                  <span className="mb-3 text-4xl font-bold">Teacher LogIn</span>
                  <span className="font-light mb-8">
                    Welcome back! Please enter your details
                  </span>
                  <div className="py-4">
                    <span className="mb-2 text-md">Register Number</span>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                      name="registerNumber"
                      value={formData.registerNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="py-4">
                    <span className="mb-2 text-md">Password</span>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                      required
                    />
                  </div>
                  <div className="flex justify-between w-full py-4">
                    <div></div>
                    <button
                      className="font-bold text-md text-blue-600"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Forgot password
                    </button>
                  </div>
                  <button
                    className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
                    onClick={handleSubmit}
                  >
                    Sign in
                  </button>
                  {errorMessage && (
                    <p className="text-red-500 m-2 text-sm">{errorMessage}</p>
                  )}
                  {successMessage && (
                    <p className="text-green-500 m-2 text-sm">
                      {successMessage}
                    </p>
                  )}
                </div>

                {/* Right side */}
                <div className="relative">
                  <img
                    src={os}
                    alt="img"
                    className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Forgot Password Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Registration Number
                </label>
                <input
                  type="text"
                  name="registerNumber"
                  value={forgotPasswordData.registerNumber}
                  onChange={handleForgotPasswordChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Old Password
                </label>
                <input
                  type="password"
                  name="oldPassword"
                  value={forgotPasswordData.oldPassword}
                  onChange={handleForgotPasswordChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={forgotPasswordData.newPassword}
                  onChange={handleForgotPasswordChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-red-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teacher;
