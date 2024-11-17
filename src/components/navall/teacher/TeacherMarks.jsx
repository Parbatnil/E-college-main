import React, { useEffect, useState } from "react";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";

const TeacherMarks = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const logos = localStorage.getItem("teachername");
    const k = logos.slice(2, 8);
    const p = logos ? JSON.parse(logos) : null;

    console.log(k);
    setLoading(true);

    if (p) {
      axios
        .get(`https://courseapi-3kus.onrender.com/api/result?teacher=${k}`)
        .then((res) => {
          console.log(res.data);
          setStudent(res.data.result);
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
    return (
      <div className="text-center text-red-500 mt-5">Error loading data.</div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      {student ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-4 py-3 border-b text-left font-semibold">
                  Name
                </th>
                <th className="px-4 py-3 border-b text-left font-semibold">
                  Roll No
                </th>
                <th className="px-4 py-3 border-b text-left font-semibold">
                  Course
                </th>
                <th className="px-4 py-3 border-b text-left font-semibold">
                  Paper
                </th>
                <th className="px-4 py-3 border-b text-left font-semibold">
                  Score
                </th>
                <th className="px-4 py-3 border-b text-left font-semibold">
                  Exam Number
                </th>
              </tr>
            </thead>
            <tbody>
              {student.map((result, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 transition duration-300 ease-in-out"
                >
                  <td className="px-4 py-3 border-b text-center">
                    {result.student}
                  </td>

                  <td className="px-4 py-3 border-b text-center">
                    {result.roll}
                  </td>
                  <td className="px-4 py-3 border-b text-center">
                    {result.sub}
                  </td>
                  <td className="px-4 py-3 border-b text-center">
                    {result.paper}
                  </td>
                  <td className="px-4 py-3 border-b text-center">
                    {result.score}
                  </td>
                  <td className="px-4 py-3 border-b text-center">
                    {result.examno}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-5">No data available.</div>
      )}
    </div>
  );
};

export default TeacherMarks;
