import React, { useState, useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";
import AdminNav from "../../AdminNav";

const streamOptions = ["MBA", "BCA", "MCA", "BTech", "BArch", "BA", "MTech"];

const StudentsData = () => {
  const [students, setStudents] = useState([]);
  const [selectedStream, setSelectedStream] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null); // For editing a selected student
  const [editFormData, setEditFormData] = useState({
    name: "",
    starting: "",
    end: "",
    phonenumber: "",
  });

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://courseapi-3kus.onrender.com/api/students"
        );
        const data = await response.json();

        if (response.ok) {
          setStudents(data.students);
          setError("");
        } else {
          setError(data.message || "Failed to fetch students data.");
        }
      } catch (error) {
        console.error("Error fetching students' data:", error);
        setError("Server error, please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleStreamChange = (e) => {
    setSelectedStream(e.target.value);
  };

  const handleDelete = async (email) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        const response = await fetch(
          `https://courseapi-3kus.onrender.com/api/student/${email}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setStudents((prevStudents) =>
            prevStudents.filter((student) => student.email !== email)
          );
          alert("Student deleted successfully!");
        } else {
          const data = await response.json();
          alert(data.message || "Failed to delete student.");
        }
      } catch (error) {
        console.error("Error deleting student:", error);
        alert("Server error, please try again later.");
      }
    }
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setEditFormData({
      name: student.name,
      starting: student.starting,
      end: student.end,
      phonenumber: student.phonenumber,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const updatedStudent = {
      ...editFormData,
      email: selectedStudent.email,
    };

    try {
      const response = await fetch(
        `https://courseapi-3kus.onrender.com/api/student/${selectedStudent.email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedStudent),
        }
      );

      if (response.ok) {
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student.email === selectedStudent.email ? updatedStudent : student
          )
        );
        alert("Student updated successfully!");
        setSelectedStudent(null);
        setEditFormData({
          name: "",
          starting: "",
          end: "",
          phonenumber: "",
        });
      } else {
        const data = await response.json();
        alert(data.message || "Failed to update student.");
      }
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Server error, please try again later.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Filter students based on the selected stream
  const filteredStudents = selectedStream
    ? students.filter((student) => student.course === selectedStream)
    : students;

  return (
    <div className="">
      <AdminNav />
      <div className="p-8 bg-white min-h-screen text-black">
        <h1 className="text-2xl font-bold mb-4">Students Data</h1>

        {/* Stream Selection */}
        <div className="mb-4">
          <label htmlFor="stream" className="text-sm font-medium text-gray-700">
            Select Stream:
          </label>
          <select
            id="stream"
            value={selectedStream}
            onChange={handleStreamChange}
            className="mt-2 p-2 border border-gray-300 rounded-md w-full max-w-xs"
          >
            <option value="">All Streams</option>
            {streamOptions.map((stream) => (
              <option key={stream} value={stream}>
                {stream}
              </option>
            ))}
          </select>
        </div>

        {/* Loading, Error or Data Display */}
        {loading ? (
          <div className="flex justify-center items-center mt-10">
            <HashLoader
              loading={loading}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : error ? (
          <div>
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => setError("")} // Clear error and retry
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full bg-gray-200 border border-gray-300 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-300">
                  <th className="py-2 px-4 border-b border-gray-500">Name</th>
                  <th className="py-2 px-4 border-b border-gray-500">
                    Roll Number
                  </th>
                  <th className="py-2 px-4 border-b border-gray-500">
                    Exam-Roll Number
                  </th>
                  <th className="py-2 px-4 border-b border-gray-500">
                    Exam-Course
                  </th>
                  <th className="py-2 px-4 border-b border-gray-500">Course</th>
                  <th className="py-2 px-4 border-b border-gray-500">
                    Start Date
                  </th>
                  <th className="py-2 px-4 border-b border-gray-500">
                    End Date
                  </th>
                  <th className="py-2 px-4 border-b border-gray-500">Email</th>
                  <th className="py-2 px-4 border-b border-gray-500">
                    Phone Number
                  </th>
                  <th className="py-2 px-4 border-b border-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.email} className="hover:bg-gray-300">
                    <td className="py-2 px-4 border-b border-gray-500">
                      {student.name}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-500">
                      {student.roll}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-500">
                      {student.eroll}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-500">
                      {student.ecourse}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-500">
                      {student.course}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-500">
                      {student.starting}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-500">
                      {student.end}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-500">
                      {student.email}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-500">
                      {student.phonenumber}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-500 flex space-x-2">
                      <button
                        onClick={() => handleEdit(student)}
                        className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(student.email)}
                        className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Edit Modal */}
        {selectedStudent && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg max-w-lg w-full">
              <h2 className="text-xl font-bold mb-4">Edit Student</h2>
              <form onSubmit={handleEditSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={editFormData.name}
                    onChange={handleInputChange}
                    className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="starting"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Start Date:
                  </label>
                  <input
                    type="date"
                    id="starting"
                    name="starting"
                    value={editFormData.starting}
                    onChange={handleInputChange}
                    className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="end"
                    className="block text-sm font-medium text-gray-700"
                  >
                    End Date:
                  </label>
                  <input
                    type="date"
                    id="end"
                    name="end"
                    value={editFormData.end}
                    onChange={handleInputChange}
                    className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="phonenumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number:
                  </label>
                  <input
                    type="text"
                    id="phonenumber"
                    name="phonenumber"
                    value={editFormData.phonenumber}
                    onChange={handleInputChange}
                    className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setSelectedStudent(null)}
                    className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsData;
