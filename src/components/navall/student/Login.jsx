import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import google from "../../../../public/google.svg";
import ok from "../../../../public/ok.gif";
import os from "../../../../public/os.gif";
const Login = ({ handleLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState(true);
  const [up, setUp] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);
    setLoading(true);

    try {
      const response = await axios.post(
        "https://courseapi-3kus.onrender.com/api/signin-student",
        formData
      );
      if (response.data.success) {
        setSuccessMessage("Sign-in successful!");
        localStorage.setItem("logs", JSON.stringify(formData.email));
        localStorage.setItem("check", JSON.stringify(false));
        navigate("/");
      } else {
        setErrorMessage("Invalid registration number or password.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className=" ">
        {/* <h1 className="text-3xl font-bold mb-6 text-gray-800">Sign In</h1> */}

        {loading ? (
          <div className=" flex justify-center items-center mt-10">
            <HashLoader
              loading={loading}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-center min-h-screen max-w-full">
              <div className="relative flex flex-col m-6 space-y-8 bg-white  shadow-2xl rounded-2xl md:flex-row md:space-y-0">
                {/* <!-- left side --> */}
                <div className="flex flex-col justify-center p-8 md:p-14">
                  <span className="mb-3 text-4xl font-bold">Welcome back</span>
                  <span className="font-light mb-8">
                    Welcom back! Please enter your details
                  </span>
                  <div className="py-4">
                    <span className="mb-2 text-md">Email</span>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="py-4">
                    <span className="mb-2 text-md">Password</span>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                      required
                    />
                  </div>
                  <div className="flex justify-between w-full py-4">
                    <div className="mr-24"></div>
                    <span className="font-bold text-md">Forgot password</span>
                  </div>
                  <button
                    className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    Sign in
                  </button>
                  {errorMessage && (
                    <p className="text-red-500 m-2 text-sm ">{errorMessage}</p>
                  )}
                  {successMessage && (
                    <p className="text-green-500 m-2 text-sm">
                      {successMessage}
                    </p>
                  )}
                  {/* <button
            className="w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-black hover:text-white"
          >
            <img src={google} alt="img" className="w-6 h-6 inline mr-2" />
            Sign in with Google
          </button> */}
                  <div className="text-center cursor-pointer ">
                    Dont'have an account?
                    <span
                      className="font-bold text-black hover:text-green-500"
                      onClick={() => handleLogin(up)}
                    >
                      Sign up for free
                    </span>
                  </div>
                </div>
                {/* right side */}
                <div className="relative">
                  <img
                    src={os}
                    alt="img"
                    className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
                  />
                  {/* <!-- text on image  --> */}
                  <div className="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
                    <span className="text-white text-xl"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          //   <form onSubmit={handleSubmit} className="space-y-6">
          //   <div>
          //     <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          //     <input
          //       type="email"
          //       name="email"
          //       id="email"
          //       value={formData.email}
          //       onChange={handleChange}
          //       className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          //       required
          //     />
          //   </div>
          //   <div>
          //     <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          //     <input
          //       type="password"
          //       name="password"
          //       id="password"
          //       value={formData.password}
          //       onChange={handleChange}
          //       className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          //       required
          //     />
          //   </div>
          //   <button
          //     type="submit"
          //     className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          //     disabled={isLoading}
          //   >
          //     {isLoading ? 'Signing In...' : 'Sign In'}
          //   </button>
          //   {errorMessage && <p className="text-red-500 mt-2 text-sm">{errorMessage}</p>}
          //   {successMessage && <p className="text-green-500 mt-2 text-sm">{successMessage}</p>}
          // </form>
        )}
      </div>
    </div>
  );
};

export default Login;
