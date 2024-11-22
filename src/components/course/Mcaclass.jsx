import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";

const Mcaclass = () => {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);

  const [date, setDate] = useState("");
  const [dataas, setDataas] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentname, setStudentname] = useState("");
  const [roll, setRoll] = useState("");
  const [time, setTime] = useState(new Date());
  const [fixt, setFixt] = useState(time.toLocaleString().slice(0, 10));
  const [checkTime,setCheckTime]=useState( new Date().toLocaleTimeString().slice(0,2));
  const [refresh, setRefresh] = useState(false); // New state for auto-refresh

  useEffect(() => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Add leading zero to month
    const day = String(today.getDate()).padStart(2, "0"); // Add leading zero to day
    const year = String(today.getFullYear()).slice(-2); // Get last two digits of year
    const todayDate = `${month}/${day}/${year}`; // Format: MM/DD/YY
    setDate(todayDate);

    axios
      .get("https://courseapi-3kus.onrender.com/api/products?sub=mcaLIVE")
      .then((res) => {
        setColumns(Object.keys(res.data.mydata));
        setRecords(res.data.mydata);
      })
      .catch((err) => console.log(err));

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const logos = localStorage.getItem("logs");
    const p = JSON.parse(logos);

    axios
      .get(`https://courseapi-3kus.onrender.com/api/students/?email=${p}`)
      .then((res) => {
        const studentsData = res.data.students;
        setDataas(studentsData);
        setStudentname(studentsData.map((e) => e.name).join(", "));
        const rollNumbers = studentsData.map((e) => e.roll);
        const parseRoll = JSON.parse(rollNumbers);
        setRoll(parseRoll);

        // Log roll data directly here
        // console.log(parseRoll);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `https://courseapi-3kus.onrender.com/api/atten/?roll=${roll}&date=${date}`
        );
        setStudents(response.data.attend);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    if (roll) {
      fetchStudents();
    }
  }, [roll, fixt, refresh]); // Add refresh as a dependency

  const attend = (a, b, c,d) => {
    const isEmailExist = students.some((student) => student.paper === b);

    let teacherTime=d.slice(0,2);
    if (teacherTime===checkTime)
    {if (isEmailExist) {
      console.log("have");
      window.open(c);
    } else 
      
      {axios
        .post("https://courseapi-3kus.onrender.com/api/atten", {
          sub: "mcaLIVE",
          teacher: a.slice(2, 7),
          paper: b,
          date: date,
          student: studentname,
          roll: roll,
        })
        .then((res) => {
          console.log("ok");
          setRefresh(!refresh); // Toggle refresh to trigger re-render
        })
        .catch((err) => console.log(err));
      window.open(c);}}
  
  };

  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(today.getDate()).padStart(2, "0");
  const year = String(today.getFullYear()).slice(-2); // Get last two digits of the year
  const todayDate = `${month}/${day}/${year}`;

  return (
    <div>
      <Navbar />
      <div className=" flex justify-center items-center p-4 ">
        <h1 className="text-xl text-black">Live Class(Mca)</h1>
      </div>

      <div className=" flex justify-center items-center px-0 sm:px-3">
        <div className=" container mt-2 mx-3 mb-4">
          <div className=" overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color flex justify-center">
            <div className=" container pb-8 sm:pb-0 mt-6">
              <div className=" flex  flex-col sm:flex-row md:flex-col items-center sm:items-center sm:justify-center sm:gap-10 w-full text-black  ">
                <h1 className=" text-xl">{`Time ${time.toLocaleString()}`}</h1>
                <div className=" flex justify-center">
                  <div className=" container mt-2">
                    <table className=" table">
                      <thead>
                        <tr>
                          <th>Topic</th>
                          <th>Name</th>
                          <th>teacher</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {records
                          .filter((e) => {
                            // Parse and reformat API date
                            const recordDate = e.date?.trim(); // Convert to Date object
                            // const formattedApiDate = `${String(apiDate.getMonth() + 1).padStart(2, '0')}/${String(apiDate.getDate()).padStart(2, '0')}/${String(apiDate.getFullYear()).slice(-2)}`;

                            return recordDate === todayDate;
                          })
                          .map((d, i) => (
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
                                  attend(d.teacher, d.subtitle, d.link,d.time)
                                }
                              >
                                live{d.time}
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
