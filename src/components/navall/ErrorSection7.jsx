import React from "react";
import { Typography, Button } from "@material-tailwind/react";
import { FlagIcon } from "@heroicons/react/24/solid";
import Login from "./student/Login";

export function ErrorSection7() {
  return (
    <div className="h-screen mx-auto grid place-items-center text-center">
      <div>
        {" "}
        <p className="py-10 font-bold text-red-700">
          You never have logged in so please login first{" "}
        </p>
      </div>
      <Login />
    </div>
  );
}

export default ErrorSection7;
