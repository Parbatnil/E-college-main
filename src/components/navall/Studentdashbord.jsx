import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import StudentNav from "./StudentNav"; // Sidebar component
import StudentProfile from "./StudentProfile"; // Profile component
import Atten from "./Atten"; // Attendance component
import Courses from "./Courses"; // Courses component
import ErrorSection7 from "./ErrorSection7"; // Error component
import HashLoader from "react-spinners/HashLoader";

const Studentdashbord = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const logos = localStorage.getItem("logs");
    const p = logos ? JSON.parse(logos) : null;

    setLoading(true);

    if (p) {
      axios
        .get(`https://courseapi-3kus.onrender.com/api/students?email=${p}`)
        .then((res) => {
          setStudent(res.data.students[0]);
        })
        .catch((err) => {
          console.error(err);
          setShowError(true);
        })
        .finally(() => setLoading(false));
    } else {
      setTimeout(() => {
        setShowError(true);
        setLoading(false);
      }, 2000);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-10">
        <HashLoader
          loading={loading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  if (showError) {
    return <ErrorSection7 />;
  }

  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        {/* <StudentNav student={student} /> */}

        {/* Content Area */}
        <div className="flex-1 p-4 overflow-auto">
          <Routes>
            <Route path="/" element={<StudentProfile student={student} />} />
            <Route path="/atten" element={<Atten />} />
            <Route path="/mycourse" element={<Courses student={student} />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Studentdashbord;
