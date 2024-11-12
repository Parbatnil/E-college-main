import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar";
import { MCA } from "../../../assets/Assets";
import axios from "axios";
import {mcaPaper} from '../../../assets/mcadata'
import TeacherNav from "../../TeacherNav";

const Mcalive = () => {
  const[papers,setPapers]=useState("")
  const changePaper=(event)=>{
    setPapers(event.target.value)
    
  }
  const [columns,setColumns]=useState([])
  const [teacher,setTeacher]=useState("")
  const [records,setRecords]=useState([])
  const [track,setTrack]=useState(null)
  useEffect(()=>{
    const tname = localStorage.getItem('teachername');
    setTrack(tname)
    axios.get('https://courseapi-3kus.onrender.com/api/products?sub=mcaLIVE')
    .then(res => {
      setColumns(Object.keys(res.data.mydata))
      setRecords(res.data.mydata)
    })
    .catch(err=>console.log(err))
  },[])

  const submit=(e)=>{
    e.preventDefault()
    const tname = localStorage.getItem('teachername');
    axios.post('https://courseapi-3kus.onrender.com/api/products',{"name":video,"link":link,"subtitle":papers,"sub":"mcaLIVE","time":time,"teacher":tname})
    .then(res=>alert("Data is Added successfully"))
      .catch(err=>console.log(err))
  }

  useEffect(()=>{
    const tname = localStorage.getItem('teachername');
    setTrack(tname)
    axios.get('https://courseapi-3kus.onrender.com/api/products?sub=mcaLIVE')
    .then(res => {
      // console.log(res.data.mydata)
      setColumns(Object.keys(res.data.mydata))
      setRecords(res.data.mydata)
    })
    .catch(err=>console.log(err))
  },[submit])

  const handelDelete=(_id)=>{
    const confirm=window.confirm("Would you like to Delete?");
    if (confirm){
      axios.delete(`https://courseapi-3kus.onrender.com/api/products/${_id}`)
      .then(res=>{
        alert("Data is Deleted successfully")
      })
      .catch(err=> console.log(err))
    }
  }
  const[time,setTime]=useState([])
  const [video, setVideo] = useState("");
  const[link,setLink]=useState("");
  const [ak, setAk] = useState(MCA[0]['papers'][0]['videos']);
  const[ar,setAr]=useState([])
  // console.log(ak)
  return (
    <div>
      <TeacherNav/>
        <div className=" flex justify-center items-center p-4 ">
        <h1 className="text-xl text-black">LIVE CLASS(MCA)</h1>
        </div>
      
      <div className=' flex justify-center items-center px-0 sm:px-3'>
      <div className=' container mt-2 mx-3 mb-4' >
        <div className=' overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color flex justify-center'>
            <div className=' container pb-8 sm:pb-0 mt-6'>
              <div className=" flex  flex-col sm:flex-row md:flex-col items-center sm:items-center sm:justify-center sm:gap-10 w-full text-black  ">
              <form onSubmit={submit}>
              <div>
            <h3 >SELECT PAPER</h3>
            <select className='border-2 border-gray-400 p-2 rounded-md w-80' value={papers} onChange={changePaper} required>
              <option ></option>
              {mcaPaper.map(paper =>(
                <option value={paper.subtitle} key={paper.name} >{paper.subtitle}</option>
              ))}
            </select>
            </div>
            <h3 >ENTER TOPIC</h3>
                <input type="text" name="video" id="video" className="border-2 border-gray-400 p-2 rounded-md w-80 bg-slate-300" placeholder="Eg.- Basic python" value={video} onChange={(e)=>setVideo(e.target.value)} required />

                <h3 >TIME</h3>
                <input type="text" name="time" id="time" className="border-2 border-gray-400 p-2 rounded-md w-80 bg-slate-300" placeholder="Eg.- 10.00a.m" value={time} onChange={(e)=>setTime(e.target.value)} required />

                <h3 >ENTER LINK</h3>
                <input type="text" name="link" id="link" className="border-2 border-gray-400 p-2 rounded-md w-80 bg-slate-300" placeholder="Eg.- https://www.google.com" value={link} onChange={(e)=>setLink(e.target.value)} required />
                {/* <h3 >ENTER YOUR NAME</h3>
                <input type="text" name="time" id="time" className="border-2 border-gray-400 p-2 rounded-md w-80 bg-slate-300" placeholder="Eg.- P.B,R.S" value={teacher} onChange={(e)=>setTeacher(e.target.value)} required /> */}
                <div className=" flex justify-center items-center mt-4">
                <button className='bg-primary text-white bg-orange-500 cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full '>submit</button>
                </div>
                </form>
                <h4>After Complete the class press "Del" in table</h4>
                <h1 className=" text-xl">Table</h1>
                <div className=" flex justify-center">
                <div className=" container mt-2">
                  <table className=" table">
                    <thead>
                      <tr>
                   <th>Name</th>
                  <th>Link</th>
                  <th>Teacher</th>
                  <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                    {records.map((d,i)=>(
                      <tr key={i}>
                         <td className="border-2 border-gray-400 p-2 rounded-md w-80 sm:w-auto bg-slate-300 ">{d.name}{d.time}</td>
                      
                      <td className="border-2 border-gray-400 p-2 rounded-md w-80 sm:w-auto bg-slate-300">{d.subtitle}</td>
                      <td className="border-2 border-gray-400 p-2 rounded-md w-80 sm:w-auto bg-slate-300">{d.teacher}</td>
                      {track===d.teacher?<td className="border-2 border-gray-400 p-2 rounded-md w-80 sm:w-auto bg-yellow-200 cursor-pointer" onClick={(e)=>handelDelete(d._id)}>Del</td>:<td className="border-2 border-gray-400 p-2 rounded-md w-80 sm:w-auto bg-slate-800 cursor-pointer" >Del</td>}
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
