import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar";
import { MCA } from "../../../assets/Assets";
import axios from "axios";
import { bcaPaper } from "../../../assets/mcadata";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TeacherNav from "../../TeacherNav";
import { MdDeleteForever } from "react-icons/md";
const Bcateacher = () => {
  const [papers, setPapers] = useState("");
  const navigate = useNavigate();
  const changePaper = (event) => {
    setPapers(event.target.value);
  };
  const { id } = useParams();
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const [check, setCheck] = useState(null);
  const [track, setTrack] = useState(null);
  const [timek, setTimek] = useState(new Date());
  const [fixt, setFixt] = useState(timek.toLocaleString().slice(0, 10));
  useEffect(() => {
    const logp = localStorage.getItem("teacherlogs");
    const p = JSON.parse(logp);
    const tname = localStorage.getItem("teachername");
    setTrack(tname);
    setCheck(p);
    axios
      .get("https://courseapi-3kus.onrender.com/api/products?sub=bca")
      .then((res) => {
        // console.log(res.data.mydata)
        setColumns(Object.keys(res.data.mydata));
        setRecords(res.data.mydata);
      })
      .catch((err) => console.log(err));
  }, []);

  const submit = (e) => {
    e.preventDefault();
    const tname = localStorage.getItem("teachername");
    axios
      .post("https://courseapi-3kus.onrender.com/api/products", {
        name: video,
        link: link,
        subtitle: papers,
        sub: "bca",
        time: "00",
        teacher: tname,
        date: fixt,
      })
      .then((res) => alert("Data is Added successfully"))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("https://courseapi-3kus.onrender.com/api/products?sub=bca")
      .then((res) => {
        // console.log(res.data.mydata)
        setColumns(Object.keys(res.data.mydata));
        setRecords(res.data.mydata);
      })
      .catch((err) => console.log(err));
  }, [submit]);

  const handelDelete = (_id) => {
    const confirm = window.confirm("Would you like to Delete?");
    if (confirm) {
      axios
        .delete(`https://courseapi-3kus.onrender.com/api/products/${_id}`)
        .then((res) => {
          console.log(id);
          alert("Data is Deleted successfully");
        })
        .catch((err) => console.log(err));
    }
  };
  const [video, setVideo] = useState("");
  const [link, setLink] = useState("");
  const [teacher, setTeacher] = useState("");
  const [ak, setAk] = useState(MCA[0]["papers"][0]["videos"]);
  const [ar, setAr] = useState([]);
  // console.log(ak)
  return (
    <div>
      {track !== null ? (
        <div>
          <TeacherNav />
          <div className=" flex justify-center items-center p-4 ">
            <h1 className="text-xl text-black">Add Data(BCA)</h1>
          </div>

          <div className=" flex justify-center items-center px-0 sm:px-3">
            <div className=" container mt-2 mx-3 mb-4">
              <div className=" overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color flex justify-center">
                <div className=" container pb-8 sm:pb-0 mt-6">
                  <div className=" flex  flex-col sm:flex-row md:flex-col items-center sm:items-center sm:justify-center sm:gap-10 w-full text-black  ">
                    <form onSubmit={submit}>
                      <div>
                        <h3>SELECT PAPER</h3>
                        <select
                          className="border-2 border-gray-400 p-2 rounded-md w-80 bg-blue-200"
                          value={papers}
                          onChange={changePaper}
                          required
                        >
                          <option>--Select a Paper--</option>
                          {bcaPaper.map((paper) => (
                            <option value={paper.subtitle} key={paper.name}>
                              {paper.subtitle}
                            </option>
                          ))}
                        </select>
                      </div>
                      <h3>ENTER VIDEO</h3>
                      <input
                        type="text"
                        name="video"
                        id="video"
                        className="border-2 border-gray-400 p-2 rounded-md w-80 bg-blue-200"
                        placeholder="Eg.- Basic python"
                        value={video}
                        onChange={(e) => setVideo(e.target.value)}
                        required
                      />

                      <h3>ENTER LINK</h3>
                      <input
                        type="text"
                        name="link"
                        id="link"
                        className="border-2 border-gray-400 p-2 rounded-md w-80 bg-blue-200"
                        placeholder="Eg.- https://www.google.com"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        required
                      />
                      {/* <h3 >ENTER YOUR NAME</h3>
                <input type="text" name="video" id="video" className="border-2 border-gray-400 p-2 rounded-md w-80 bg-slate-300" placeholder="Eg.- P.B,R.S" value={teacher} onChange={(e)=>setTeacher(e.target.value)} required /> */}

                      <div className=" flex justify-center items-center mt-4">
                        <button className="bg-primary text-white bg-orange-500 cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full ">
                          submit
                        </button>
                      </div>
                    </form>
                    <button
                      className="bg-primary text-white bg-orange-500 cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full mt-4"
                      onClick={() => navigate(`/bcaliveok@24/${check}`)}
                    >
                      Live-Class
                    </button>
                    <h1>Table</h1>
                    <div className=" flex justify-center overflow-auto">
                      <div className=" container mt-2 mb-2 ">
                        <table className=" table">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Link</th>
                              <th>teacher</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {records
                              .filter((d) => d.teacher === track)
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
                                  {track === d.teacher ? (
                                    <td
                                      className="border-2 border-gray-400 p-2 rounded-md w-80 sm:w-auto bg-yellow-200 cursor-pointer text-red-500"
                                      onClick={(e) => handelDelete(d._id)}
                                    >
                                      <MdDeleteForever />
                                    </td>
                                  ) : (
                                    <td className="border-2 border-gray-400 p-2 rounded-md w-80 sm:w-auto bg-slate-800 cursor-pointer text-red-500">
                                      <MdDeleteForever />
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
      ) : (
        <div className=" flex justify-center items-center mt-10">
          <div className=" text-xl font-bold">404 NOT FOUND</div>
        </div>
      )}
    </div>
  );
};

export default Bcateacher;
