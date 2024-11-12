import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HashLoader  from "react-spinners/HashLoader"
import google from '../../../public/google.svg'
import os from '../../../public/te.gif'
const Teacher = () => {
  const [formData, setFormData] = useState({
    registerNumber: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);
    setLoading(true);
    try {
      const response = await axios.post('https://courseapi-3kus.onrender.com/api/signin-teacher', formData);
      if (response.data.success) {
        setSuccessMessage('Sign-in successful!');
        localStorage.setItem("teacherlogs",JSON.stringify(formData.registerNumber))
        navigate('/teachercourseok@24');
      } else {
        setErrorMessage('Invalid registration number or password.');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'An error occurred. Please try again.');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
    finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <div className="">

        {loading ? (
        <div className=' flex justify-center items-center mt-10'>
        <HashLoader  
      loading={loading}
      size={50}
      aria-label="Loading Spinner"
      data-testid="loader"
      />
      </div>
      ) :
          (
          
            <div>
        <div className="flex items-center justify-center min-h-screen max-w-full">
      <div
        className="relative flex flex-col m-6 space-y-8 bg-white  shadow-2xl rounded-2xl md:flex-row md:space-y-0"
      >
        {/* <!-- left side --> */}
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Teacher LogIn</span>
          <span className="font-light mb-8">
            Welcom back! Please enter your details
          </span>
          <div className="py-4">
            <span className="mb-2 text-md">RegisterNumber</span>
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
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              required
            />
          </div>
          <div className="flex justify-between w-full py-4">
            <div className="mr-24">
            </div>
            <span className="font-bold text-md">Forgot password</span>
          </div>
          <button
            className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
            onClick={handleSubmit} 
            disabled={isLoading}
          >
            Sign in
          </button>
          {errorMessage && <p className="text-red-500 m-2 text-sm ">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 m-2 text-sm">{successMessage}</p>}
         
        </div>
        {/* right side */} 
        <div className="relative">
          <img
            src={os}
            alt="img"
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
          {/* <!-- text on image  --> */}
          <div
            className="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block"
          >
            <span className="text-white text-xl"
              >
            </span>
          </div>
        </div>
      </div>
    </div>
    </div>

          
        //   <form onSubmit={handleSubmit} className="space-y-6">
        //   <div>
        //     <label className="block text-sm font-medium text-gray-600 mb-1">Registration Number</label>
        //     <input
        //       type="text"
        //       name="registerNumber"
        //       value={formData.registerNumber}
        //       onChange={handleChange}
        //       className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:border-blue-500"
        //       required
        //     />
        //   </div>
        //   <div>
        //     <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
        //     <input
        //       type="password"
        //       name="password"
        //       value={formData.password}
        //       onChange={handleChange}
        //       className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:border-blue-500"
        //       required
        //     />
        //   </div>
        //   <button
        //     type="submit"
        //     className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300 focus:outline-none"
        //     disabled={isLoading}
        //   >
        //     {isLoading ? 'Signing In...' : 'Sign In'}
        //   </button>
        //   {errorMessage && (
        //     <p className="text-red-500 text-sm mt-4 text-center">{errorMessage}</p>
        //   )}
        //   {successMessage && (
        //     <p className="text-green-500 text-sm mt-4 text-center">{successMessage}</p>
        //   )}
        // </form>
        )}

      </div>
    </div>
  );
};

export default Teacher;
