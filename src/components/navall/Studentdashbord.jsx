import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";

const Studentdashbord = () => {
  const [records, setRecords] = useState([]);
  const [columns, setColumns] = useState([]);
  useEffect(() => {
    const logos = localStorage.getItem("logs");
    const p = JSON.parse(logos);
    axios
      .get(`https://courseapi-3kus.onrender.com/api/students?email=${p}`)
      .then((res) => {
        setRecords(res.data.students);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Navbar />
      <div>
        {records.map((e) => (
          <div key={e.email}>{e.name}</div>
        ))}
      </div>
    </>
  );
};

export default Studentdashbord;
