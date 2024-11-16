import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";

const SignUp = ({ onSignUp }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [guardian, setGuardian] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "https://courseapi-3kus.onrender.com/api/students"
        );
        setStudents(response.data.students);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  const validateForm = () => {
    if (!name.trim()) return "Name is required.";
    if (!email.trim()) return "Email is required.";
    const isEmailExist = students.some((student) => student.email === email);
    if (isEmailExist) return "Email already exists.";
    if (password.length < 8)
      return "Password must be at least 8 characters long.";
    const phoneRegex = /^\d{10}$/;
    if (!phone.match(phoneRegex)) return "Phone number must be 10 digits.";
    if (!guardian.trim()) return "Guardian name is required.";
    return ""; // No error
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const error = validateForm();
    if (error) {
      setErrorMessage(error); // Show error message
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        "https://courseapi-3kus.onrender.com/api/register-student",
        {
          name,
          email,
          password,
          guardian,
          phonenumber: phone,
        }
      );
      alert("Registered successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error registering student:", error);
      setErrorMessage("Error registering. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">
          Sign Up
        </h2>

        {loading ? (
          <div className="flex justify-center items-center mt-10">
            <HashLoader
              loading={loading}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <p className="text-red-500 text-sm text-center">{errorMessage}</p>
            )}
            <div className="flex items-center border-b-2 border-gray-300 py-2">
              <svg
                className="h-5 w-5 text-gray-500 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h14M5 12l5 5m-5-5l5-5"
                />
              </svg>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border-0 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Full Name"
              />
            </div>

            <div className="flex items-center border-b-2 border-gray-300 py-2">
              <svg
                className="h-5 w-5 text-gray-500 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 8c0 4-4 8-4 8s-4-4-4-8a4 4 0 118 0z"
                />
              </svg>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border-0 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email Address"
              />
            </div>

            <div className="flex items-center border-b-2 border-gray-300 py-2">
              <svg
                className="h-5 w-5 text-gray-500 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM12 13c-3.31 0-6 1.69-6 3v2h12v-2c0-1.31-2.69-3-6-3z"
                />
              </svg>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border-0 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Password"
              />
            </div>

            <div className="flex items-center border-b-2 border-gray-300 py-2">
              <svg
                className="h-5 w-5 text-gray-500 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h16m-8 0l-4 4m4-4l4-4"
                />
              </svg>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border-0 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Phone Number"
              />
            </div>

            <div className="flex items-center border-b-2 border-gray-300 py-2">
              <svg
                className="h-5 w-5 text-gray-500 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 5c0 1.5-1.5 3-3 3-1.5 0-3-1.5-3-3s1.5-3 3-3c1.5 0 3 1.5 3 3zm-5 1.5c-2.5 0-5 1.5-5 4.5v6h10v-6c0-3-2.5-4.5-5-4.5z"
                />
              </svg>
              <input
                type="text"
                id="guardian"
                value={guardian}
                onChange={(e) => setGuardian(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border-0 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Guardian Name"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
            >
              Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
