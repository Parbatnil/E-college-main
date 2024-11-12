import React, { useState, useEffect } from 'react';
import axios from "axios";

const Attendance = () => {
  const [datas, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [dates, setDates] = useState(new Date().toLocaleString().slice(0,10));

  useEffect(() => {
    const tname = localStorage.getItem('teachername').slice(2,7);
    axios.get(`https://courseapi-3kus.onrender.com/api/atten/?teacher=${tname}`)
      .then(res => {
        setData(res.data.attend);  // Assuming res.data.attend is an array
        setColumns(Object.keys(res.data.attend[0] || {})); // Set columns if data exists
      })
      .catch(err => console.log(err));
   
  }, [dates]);

  const handleDelete = (_id) => {
    const confirm = window.confirm("Would you like to delete?");
    if (confirm) {
      axios.delete(`https://courseapi-3kus.onrender.com/api/atten/${_id}`)
        .then(res => {
          alert("Attendance deleted successfully");
          // Update state to remove the deleted item from the UI
          setData(prevData => prevData.filter(row => row._id !== _id));
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse bg-white shadow-lg rounded-lg">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Subject
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Paper
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Student
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Action
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {datas.filter(ex => ex.date === dates)
          .map((row, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{row.sub}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{row.paper}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{row.student}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{row.date}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-red-500 cursor-pointer"
                  onClick={() => handleDelete(row._id)}>
                Delete
              </td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                {datas.filter(e => e.student === row.student && e.paper === row.paper).length}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
