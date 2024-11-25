import React, { useEffect, useState } from "react";
import logo from "../../public/logo.png";
import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const TeacherNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [log, setLog] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [l, setL] = useState("A");
  const [check, setCheck] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const logp = localStorage.getItem("teacherlogs");
        if (logp !== null) {
          const p = JSON.parse(logp);
          const studentRes = await axios.get(
            `https://courseapi-3kus.onrender.com/api/teachers?registerNumber=${p}`
          );
          const teacher = studentRes.data.teachers.map((e) => e.name);
          localStorage.setItem("teachername", JSON.stringify(teacher));
          const te = localStorage.getItem("teachername");
          let k = te.slice(2, 4);
          setL(k);
          setLog(false);
          setCheck(p);
        }
      } catch (err) {
        setErrorMessage("Failed to fetch data. Please try again.");
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const getlog = () => {
    const logp = localStorage.getItem("teacherlogs");
    setLog(!log);
    console.log(logp);
    navigate("/teacher");
  };

  const update = () => {
    localStorage.removeItem("teacherlogs");
    localStorage.removeItem("teachername");
    setLog(!log);
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      {/* Desktop Menu */}
      <nav className="lg:flex hidden justify-between items-center w-full h-16 text-white border-gray-200 bg-[#1E3A8A]">
        {/* Logo */}
        <div className="flex justify-center items-center gap-3">
          <img
            src={logo}
            className="h-20 w-20 pt-2 cursor-pointer"
            onClick={() => navigate("/teachercourseok@24")}
            alt="logo"
          />
          <div
            className="text-yellow-400 pb-3 font-semibold text-base cursor-pointer"
            onClick={() => navigate("/teachercourseok@24")}
          >
            E-College
          </div>
        </div>
        {/* Menu Items */}
        <div className="flex justify-center items-center gap-5 text-white ">
          <div
            className="hover:text-yellow-300  cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </div>
          <div
            className="hover:text-yellow-300 cursor-pointer"
            onClick={() => navigate("/attendence")}
          >
            Attendance
          </div>
          <div
            className="hover:text-yellow-300 cursor-pointer"
            onClick={() => navigate("/teacher-marks")}
          >
            Marks
          </div>
        </div>
        {/* Login */}
        <div className="flex justify-center items-center gap-3 m-2">
          {log ? (
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-white hover:text-blue-400"
              onClick={getlog}
            >
              LogIn
            </button>
          ) : (
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-white hover:text-blue-400"
              onClick={update}
            >
              LogOut
            </button>
          )}
          {/* Change */}
          <div
            className="cursor-pointer rounded-full h-10 w-10 bg-purple-700 text-white pl-3.5 pt-2"
            onClick={() => navigate(`/dashboard/${check}`)}
          >
            {l}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className="lg:hidden text-white border-gray-200 bg-[#1E3A8A]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Toggle Mobile Menu */}
            <button className="focus:outline-none" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? (
                <FaTimes className="m-2 h-6 w-5" />
              ) : (
                <FaBars className="m-2 h-6 w-5" />
              )}
            </button>
          </div>

          <div>
            <a href="#" className="flex justify-center items-center">
              <img
                src={logo}
                width={90}
                className="m-2 max-h-9 w-9"
                onClick={() => navigate("/teachercourseok@24")}
                alt="logo"
              />
              <div
                className="text-yellow-400 pb-2 font-semibold text-sm cursor-pointer"
                onClick={() => navigate("/teachercourseok@24")}
              >
                E-College
              </div>
            </a>
          </div>

          <div>
            <div
              className="cursor-pointer rounded-full h-6 w-6 bg-purple-700 text-white pl-1.5 mr-1"
              onClick={() => navigate(`/dashboard/${check}`)}
            >
              {l}
            </div>
          </div>
        </div>

        {/* Mobile Menu Items */}
        {isMobileMenuOpen && (
          <ul className="mx-2 p-2 mt-2 flex flex-col gap-4 text-white border-gray-200 dark:bg-[#1E3A8A] py-5 rounded-md">
            <li
              className="hover:text-yellow-300 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className="hover:text-yellow-300 cursor-pointer"
              onClick={() => navigate("/attendence")}
            >
              Attendance
            </li>
            <li
              className="hover:text-yellow-300 cursor-pointer"
              onClick={() => navigate("/teacher-marks")}
            >
              Marks
            </li>

            {log ? (
              <li
                className="bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-white hover:text-blue-400"
                onClick={getlog}
              >
                LogIn
              </li>
            ) : (
              <li
                className="bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-white hover:text-blue-400"
                onClick={update}
              >
                LogOut
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TeacherNav;
