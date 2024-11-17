import React, { useState } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { FlagIcon } from "@heroicons/react/24/solid";
import Login from "./student/Login";
import { useNavigate } from "react-router-dom";
import SignUp from "./student/SignUp";
import { div } from "framer-motion/client";

export function ErrorSection7() {
  const [showLogin, setShowLogin] = useState(true);

  const handleLogin = (credentials) => {
    setShowLogin(false);
    // Handle login here
  };

  const handleSignUp = (data) => {
    console.log("Sign up attempt:", data);
    // Handle sign-up here
  };

  return (
    <>
      <div className="text-red-800 font-extrabold flex items-center justify-center py-2 text-2xl">
        You never logged in{" "}
      </div>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
        {showLogin ? (
          <Login handleLogin={handleLogin} />
        ) : (
          <SignUp handleSignUp={handleSignUp} />
        )}
      </div>
    </>
  );
}

export default ErrorSection7;
