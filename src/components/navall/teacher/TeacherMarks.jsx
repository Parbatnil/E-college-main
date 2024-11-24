import React, { useEffect, useState } from "react";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import TeacherNav from "../../TeacherNav";
import { examcount } from "../../../assets/test";

const checkCourse = [
  "mca",
  "bca",
  "btech",
  "mtech",
  "bba",
  "mba",
  "jeemain",
  "wbjee",
  "jeca",
  "ipmat",
  "cat",
];

const TeacherMarks = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedExamCount, setSelectedExamCount] = useState("");

  useEffect(() => {
    const logos = localStorage.getItem("teachername");
    const k = logos?.slice(2, 8);
    const p = logos ? JSON.parse(logos) : null;

    setLoading(true);

    if (p) {
      axios
        .get(`https://courseapi-3kus.onrender.com/api/result?teacher=${logos}`)
        .then((res) => {
          setStudent(res.data.result);
        })
        .catch(() => setShowError(true))
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
    <>
      <TeacherNav />
      <div className="container mx-auto px-4 mt-8">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="w-full sm:w-auto">
            <label className="block font-medium text-gray-700 mb-2">
              Select Course:
            </label>
            <select
              className="w-full sm:w-auto border rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="">-- Select Course --</option>
              {checkCourse.map((course) => (
                <option key={course} value={course}>
                  {course.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full sm:w-auto">
            <label className="block font-medium text-gray-700 mb-2">
              Select Exam Count:
            </label>
            <select
              className="w-full sm:w-auto border rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={selectedExamCount}
              onChange={(e) => setSelectedExamCount(e.target.value)}
            >
              <option value="">-- Select Exam Count --</option>
              {examcount.map((count) => (
                <option key={count.exam} value={count.exam}>
                  {count.exam}
                </option>
              ))}
            </select>
          </div>
        </div>

        {student ? (
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
              <thead>
                <tr className="bg-blue-600 text-white text-sm sm:text-base">
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
                {student
                  .filter(
                    (d) =>
                      d.sub === selectedCourse &&
                      d.examno === selectedExamCount
                  )
                  .map((result, index) => (
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
          <div className="text-center text-gray-500 mt-8">
            Please select course and exam count to view results.
          </div>
        )}
      </div>
    </>
  );
};

export default TeacherMarks;
