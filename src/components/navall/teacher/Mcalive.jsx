import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../../Navbar";
// import { mca } from "../../../assets/Assets";
import axios from "axios";
import { mcaPaper } from "../../../assets/mcadata";
import TeacherNav from "../../TeacherNav";

const timeBlock = ['9:30 am', '10:00 am', '10:30 am', '11:00 am', '11:30 am', '12:00 pm', '12:30 pm','1:00 pm','1:30 pm','2:00 pm','2:30 pm','3:00 pm','3:30 pm','4:00 pm','4:30 pm','5:00 pm','7:44 pm'];

const Mcalive = () => {
  const [papers, setPapers] = useState("");
  const [columns, setColumns] = useState([]);
  const [teacher, setTeacher] = useState("");
  const [records, setRecords] = useState([]);
  const [track, setTrack] = useState(null);
  const [timek, setTimek] = useState(new Date());
  const [fixt, setFixt] = useState(timek.toLocaleString().slice(0, 10));
  const [timeCheck, setTimeCheck] = useState("");
  const [video, setVideo] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [time, setTime] = useState("");
  // const [ak, setAk] = useState(mca[0]["papers"][0]["videos"]);
  const [ar, setAr] = useState([]);

  useEffect(() => {
    const updateTime = () => {
      const indiaTime = new Intl.DateTimeFormat('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
      }).format(new Date());

      setTime(indiaTime);
    };

    updateTime(); // Update immediately
    const interval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    setTimeCheck(selectedTime);

    // Parse the selected time and current time
    const currentTime = new Date();
    const [currentHours, currentMinutes] = [currentTime.getHours(), currentTime.getMinutes()];
    const formattedCurrentTime = `${currentHours % 12 || 12}:${currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes} ${currentHours >= 12 ? 'pm' : 'am'}`;

    // Convert both times to Date objects for comparison
    const selectedDate = new Date(`1970-01-01T${convertTo24HourFormat(selectedTime)}`);
    const currentDate = new Date(`1970-01-01T${convertTo24HourFormat(formattedCurrentTime)}`);

    if (selectedDate > currentDate) {
      setError(""); // No error if the selected time is in the future
    } else {
      setError("Invalid Time.");
    }
  };

  const convertTo24HourFormat = (time12h) => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'pm' && hours !== 12) {
      hours += 12;
    } else if (modifier === 'am' && hours === 12) {
      hours = 0;
    }

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
  };

  useEffect(() => {
    const tname = localStorage.getItem("teachername");
    setTrack(tname);
    // console.log(tname)
    // console.log(fixt)
    axios
      .get("https://courseapi-3kus.onrender.com/api/products?sub=mcaLIVE")
      .then((res) => {
        setColumns(Object.keys(res.data.mydata));
        setRecords(res.data.mydata);
      })
      .catch((err) => console.log(err));
  }, []);

  const submit = (e) => {
    e.preventDefault();
    const today = new Date();
    const tname = localStorage.getItem("teachername");
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
const day = String(today.getDate()).padStart(2, '0');
const year = String(today.getFullYear()).slice(-2); // Get the last two digits of the year

// Combine into MM/DD/YY format
const formattedDate = `${month}/${day}/${year}`;

// console.log(formattedDate); 
    if (!error)
{    axios
      .post("https://courseapi-3kus.onrender.com/api/products", {
        name: video,
        link: link,
        subtitle: papers,
        sub: "mcaLIVE",
        time: timeCheck,
        teacher: tname,
        date: formattedDate,
      })
      .then((res) => alert("Data is Added successfully"))
      .catch((err) => console.log(err));}
      else{
        console.log("ok");
      }
  };
  useEffect(() => {
    axios.get('https://courseapi-3kus.onrender.com/api/products?sub=mcaLIVE')
    .then(res => {
      // console.log(res.data.mydata)
      setColumns(Object.keys(res.data.mydata))
      setRecords(res.data.mydata)
    })
    .catch(err=>console.log(err))
  }, [submit])

  const handelDelete = (_id) => {
    const confirm = window.confirm("Would you like to Delete?");
    if (confirm) {
      axios
        .delete(`https://courseapi-3kus.onrender.com/api/products/${_id}`)
        .then((res) => {
          alert("Data is Deleted successfully");
        })
        .catch((err) => console.log(err));
    }
  };

// Get today's date in MM/DD/YY format
const today = new Date();
const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
const day = String(today.getDate()).padStart(2, '0');
const year = String(today.getFullYear()).slice(-2); // Get last two digits of the year
const todayDate = `${month}/${day}/${year}`;

// Filter records to show only those whose date matches today's date
const filteredRecords = records.filter((record) => {
  const recordDate = record.date?.trim(); // Ensure no extra spaces
  return recordDate === todayDate;
});


  return (
    <div>
      <TeacherNav />
      <div className="flex justify-center items-center p-4 ">
        <h1 className="text-xl text-black">LIVE CLASS(mca)</h1>
      </div>

      <div className="flex justify-center items-center px-0 sm:px-3">
        <div className="container mt-2 mx-3 mb-4">
          <div className="overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color flex justify-center">
            <div className="container pb-8 sm:pb-0 mt-6">
              <div className="flex flex-col sm:flex-row md:flex-col items-center sm:items-center sm:justify-center sm:gap-10 w-full text-black">
              <h1>{`Current Time ${time} `}</h1>
                      
                <form onSubmit={submit}>
                  <div>
                    <h3>SELECT PAPER</h3>
                    <select
                      className="border-2 border-gray-400 p-2 rounded-md w-80"
                      value={papers}
                      onChange={(e) => setPapers(e.target.value)}
                      required
                    >
                      <option></option>
                      {mcaPaper.map((paper) => (
                        <option value={paper.subtitle} key={paper.name}>
                          {paper.subtitle}
                        </option>
                      ))}
                    </select>
                  </div>
                  <h3>ENTER TOPIC</h3>
                  <input
                    type="text"
                    name="video"
                    id="video"
                    className="border-2 border-gray-400 p-2 rounded-md w-80 bg-slate-300"
                    placeholder="Eg.- Basic python"
                    value={video}
                    onChange={(e) => setVideo(e.target.value)}
                    required
                  />

                  <h3>Select a Time</h3>
                    <select 
                      className="border-2 border-gray-400 text-black p-2 rounded-md w-80 bg-slate-300"
                      name="time" 
                      value={timeCheck} 
                      onChange={handleTimeChange} 
                      required
                      >
                      <option value="" disabled>Select a time</option>
                        {timeBlock.map((e) => (
                        <option key={e} value={e}>{e}</option>
                          ))}
                        </select>
                  {error && <p style={{ color: 'red' }}>{error}</p>}

                  <h3>ENTER LINK</h3>
                  <input
                    type="text"
                    name="link"
                    id="link"
                    className="border-2 border-gray-400 p-2 rounded-md w-80 bg-slate-300"
                    placeholder="Eg.- https://www.google.com"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    required
                  />
                  <div className="flex justify-center items-center mt-4">
                    <button className="bg-primary text-white bg-orange-500 cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full ">
                      Submit
                    </button>
                  </div>
                </form>

                <h1 className="text-xl">Table</h1>
                <div className="flex justify-center">
                  <div className="container mt-2">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Topic</th>
                          <th>Paper</th>
                          <th>Teacher</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRecords.map((d, i) => (
                          <tr key={i}>
                            <td className="border-2 border-gray-400 p-2 rounded-md w-80 sm:w-auto bg-slate-300">
                              {d.name} {d.time}
                            </td>

                            <td className="border-2 border-gray-400 p-2 rounded-md w-80 sm:w-auto bg-slate-300">
                              {d.subtitle}
                            </td>
                            <td className="border-2 border-gray-400 p-2 rounded-md w-80 sm:w-auto bg-slate-300">
                              {d.teacher}
                            </td>
                            {track === d.teacher ? (
                              <td
                                className="border-2 border-gray-400 p-2 rounded-md w-80 sm:w-auto bg-yellow-200 cursor-pointer"
                                onClick={(e) => handelDelete(d._id)}
                              >
                                Del
                              </td>
                            ) : (
                              <td className="border-2 border-gray-400 p-2 rounded-md w-80 sm:w-auto bg-slate-800 cursor-pointer">
                                Del
                              </td>
                            )}
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

export default Mcalive;
