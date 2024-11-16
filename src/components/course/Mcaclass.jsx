import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";

const Mcaclass = () => {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentname, setStudentname] = useState("");
  const [roll, setRoll] = useState("");
  const [time, setTime] = useState(new Date());
  const [fixt, setFixt] = useState(time.toLocaleString().slice(0, 10)); // Today's date in 'MM/DD/YY' format
  const [refresh, setRefresh] = useState(false); // New state for auto-refresh

  // Fetch live class records and filter by today's date
  useEffect(() => {
    axios
      .get("https://courseapi-3kus.onrender.com/api/products?sub=mcaLIVE")
      .then((res) => {
        // Filter records to match today's date
        const filteredRecords = res.data.mydata.filter(
          (record) => record.date === fixt
        );
        setColumns(Object.keys(res.data.mydata));
        setRecords(filteredRecords);
      })
      .catch((err) => console.log(err));

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [fixt]); // Run the effect again when `fixt` changes

  // Fetch student data
  useEffect(() => {
    const logos = localStorage.getItem("logs");
    const p = JSON.parse(logos);

    axios
      .get(`https://courseapi-3kus.onrender.com/api/students/?email=${p}`)
      .then((res) => {
        const studentsData = res.data.students;
        setStudentname(studentsData.map((e) => e.name).join(", "));
        const rollNumbers = studentsData.map((e) => e.roll);
        setRoll(rollNumbers);
      })
      .catch((err) => console.log(err));
  }, []);

  // Fetch attendance data for students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `https://courseapi-3kus.onrender.com/api/atten/?roll=${roll}&date=${fixt}`
        );
        setStudents(response.data.attend);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    if (roll) {
      fetchStudents();
    }
  }, [roll, fixt, refresh]); // Add `refresh` as a dependency

  // Handle attendance submission
  const attend = (a, b, c) => {
    const isEmailExist = students.some((student) => student.paper === b);

    if (isEmailExist) {
      window.open(c);
    } else {
      axios
        .post("https://courseapi-3kus.onrender.com/api/atten", {
          sub: "mcaLIVE",
          teacher: a.slice(2, 7),
          paper: b,
          date: fixt,
          student: studentname,
          roll: roll,
        })
        .then((res) => {
          setRefresh(!refresh); // Toggle `refresh` to trigger re-render
        })
        .catch((err) => console.log(err));
      window.open(c);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center p-4">
        <h1 className="text-xl text-black">Live Class(MCA)</h1>
      </div>

      <div className="flex justify-center items-center px-0 sm:px-3">
        <div className="container mt-2 mx-3 mb-4">
          <div className="overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color flex justify-center">
            <div className="container pb-8 sm:pb-0 mt-6">
              <div className="flex flex-col sm:flex-row md:flex-col items-center sm:items-center sm:justify-center sm:gap-10 w-full text-black">
                <h1 className="text-xl">{`Time ${time.toLocaleString()}`}</h1>
                <div className="flex justify-center">
                  <div className="container mt-2">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Topic</th>
                          <th>Name</th>
                          <th>Teacher</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {records.map((d, i) => (
                          <tr key={i}>
                            <td className="border-2 border-gray-400 p-2 rounded-md w-80 sm:w-auto bg-slate-300">
                              {d.name}
                            </td>
                            <td className="border-2 border-gray-400 p-2 rounded-md w-80 sm:w-auto bg-slate-300">
                              {d.subtitle}
                            </td>
                            <td className="border-2 border-gray-400 p-2 rounded-md w-80 sm:w-auto bg-slate-300">
                              {d.teacher}
                            </td>
                            <td
                              className="border-2 border-gray-400 p-2 rounded-md w-80 sm:w-auto bg-red-500 cursor-pointer"
                              onClick={() =>
                                attend(d.teacher, d.subtitle, d.link)
                              }
                            >
                              live {d.time}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mcaclass;
