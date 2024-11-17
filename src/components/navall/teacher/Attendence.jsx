import React, { useState, useEffect } from "react";
import axios from "axios";
import TeacherNav from "../../TeacherNav";
import { Dialog } from "@headlessui/react";

const Attendance = () => {
  const [datas, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const [dates, setDates] = useState(new Date().toLocaleString().slice(0, 10));
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showNotification, setShowNotification] = useState(false); // Notification state

  useEffect(() => {
    const tname = localStorage.getItem("teachername").slice(2, 7);
    axios
      .get(`https://courseapi-3kus.onrender.com/api/atten/?teacher=${tname}`)
      .then((res) => {
        setData(res.data.attend);
        setColumns(Object.keys(res.data.attend[0] || {}));
      })
      .catch((err) => console.log(err));
  }, [dates]);

  useEffect(() => {
    axios
      .get("https://courseapi-3kus.onrender.com/api/products/")
      .then((res) => {
        setColumns(Object.keys(res.data.mydata));
        setRecords(res.data.mydata);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (_id) => {
    axios
      .delete(`https://courseapi-3kus.onrender.com/api/atten/${_id}`)
      .then((res) => {
        setData((prevData) => prevData.filter((row) => row._id !== _id));
        setShowModal(false); // Close modal after deletion
        setShowNotification(true); // Show success notification
        setTimeout(() => setShowNotification(false), 3000); // Hide notification after 3 seconds
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <TeacherNav />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Paper
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Student
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Roll
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Present
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Total Class
              </th>
            </tr>
          </thead>
          <tbody>
            {datas
              .filter((ex) => ex.date === dates)
              .map((row, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-all">
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    {row.sub}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    {row.paper}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    {row.student}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    {row.roll}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    {row.date}
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-red-500 cursor-pointer"
                    onClick={() => {
                      setDeleteId(row._id);
                      setShowModal(true);
                    }}
                  >
                    Delete
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    {
                      datas.filter(
                        (e) => e.roll === row.roll && e.paper === row.paper
                      ).length
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    {datas.filter((e) => e.paper === row.paper).length}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Deletion */}
      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <Dialog.Panel className="bg-white rounded-lg p-6 max-w-sm w-full">
            <Dialog.Title className="text-xl font-semibold text-center text-gray-700">
              Confirm Deletion
            </Dialog.Title>
            <Dialog.Description className="my-4 text-center text-gray-600">
              Are you sure you want to delete this attendance record? This
              action cannot be undone.
            </Dialog.Description>
            <div className="flex justify-around">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded-full hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition"
              >
                Confirm
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Success Notification */}
      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          <p className="font-semibold">Attendance Deleted</p>
          <p>Record deleted successfully!</p>
        </div>
      )}
    </>
  );
};

export default Attendance;
