import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";

const Mcaclass = () => {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const [dataas, setDataas] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentname, setStudentname] = useState("");
  const [time, setTime] = useState(new Date());
  const [fixt, setFixt] = useState(time.toLocaleString().slice(0, 10));
  const [refresh, setRefresh] = useState(false);  // New state for auto-refresh

  useEffect(() => {
    axios.get('https://courseapi-3kus.onrender.com/api/products?sub=mcaLIVE')
      .then(res => {
        setColumns(Object.keys(res.data.mydata));
        setRecords(res.data.mydata);
      })
      .catch(err => console.log(err));

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const logos = localStorage.getItem('logs');
    const p = JSON.parse(logos);

    axios.get(`https://courseapi-3kus.onrender.com/api/students/?email=${p}`)
      .then(res => {
        setDataas(res.data.students);
        setStudentname(res.data.students.map((e) => e.name).join(", "));
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`https://courseapi-3kus.onrender.com/api/atten/?student=${studentname}&date=${fixt}`);
        setStudents(response.data.attend);
        console.log(response.data.attend);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    if (studentname) {
      fetchStudents();
    }
  }, [studentname, fixt, refresh]);  // Add `refresh` as a dependency

  const attend = (a, b, c) => {
    const isEmailExist = students.some((student) => student.paper === b);

    if (isEmailExist) {
      console.log("have");
      window.open(c);
    } else {
      axios.post('https://courseapi-3kus.onrender.com/api/atten', {
        "sub": "mca",
        "teacher": a.slice(2, 7),
        "paper": b,
        "date": fixt,
        "student": studentname
      })
        .then(res => {
          console.log("ok");
          setRefresh(!refresh);  // Toggle `refresh` to trigger re-render
        })
        .catch(err => console.log(err));
      window.open(c);
    }
  };

  return (
    <div>
      <Navbar />
      <div className=" flex justify-center items-center p-4 ">
        <h1 className="text-xl text-black">Live Class(MCA)</h1>
      </div>

      <div className=' flex justify-center items-center px-0 sm:px-3'>
        <div className=' container mt-2 mx-3 mb-4' >
          <div className=' overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color flex justify-center'>
            <div className=' container pb-8 sm:pb-0 mt-6'>
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
                        {records.map((d, i) => (
                          <tr key={i}>
                            <td className="border-2 border-gray-400 p-2 rounded-md w-80 sm:w-auto bg-slate-300">{d.name}</td>
                            <td className="border-2 border-gray-400 p-2 rounded-md w-80 sm:w-auto bg-slate-300">{d.subtitle}</td>
                            <td className="border-2 border-gray-400 p-2 rounded-md w-80 sm:w-auto bg-slate-300">{d.teacher}</td>
                            <td className="border-2 border-gray-400 p-2 rounded-md w-80 sm:w-auto bg-red-500 cursor-pointer" onClick={() => {
                              attend(d.teacher, d.subtitle, d.link)
                            }}>live{d.time}</td>
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
}

export default Mcaclass;
