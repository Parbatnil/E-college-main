import React, { useEffect, useState } from "react";
import { MCA } from "../../../assets/Assets";
import axios from "axios";
import {mcaPaper} from '../../../assets/mcadata'
import { examcount } from "../../../assets/test";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import TeacherNav from "../../TeacherNav";
import { answerop } from "../../../assets/test";
const Mcateacherexam = () => {
  const[papers,setPapers]=useState("")
  const [newpaper,setNewpaper]=useState("")
  const [examcouunt2,setExamcount2]=useState()
  const navigate= useNavigate();
  const changePaper=(event)=>{
    setPapers(event.target.value)
  }
  const changePapers=(event)=>{
    setNewpaper(event.target.value)
  }
  const changeExam=(event)=>{
    setExamcount1(event.target.value)
    
  }
  const changeExams=(event)=>{
    setExamcount2(event.target.value)
    
  }
  const changeans=(event)=>{
    setAns(event.target.value)
    
  }
  const {id}=useParams()
  const [columns,setColumns]=useState([])
  const[teacher,setTeacher]=useState("")
  const [records,setRecords]=useState([])
  const [question,setQuestion]=useState('')
  const [option1,setOption1]=useState('')
  const [option2,setOption2]=useState('')
  const [option3,setOption3]=useState('')
  const [option4,setOption4]=useState('')
  const [examcount1,setExamcount1]=useState()
  const [ans,setAns]=useState()
  const [pub,setPub]=useState(false)
  const [track,setTrack]=useState(null)
  useEffect(()=>{
    const tname = localStorage.getItem('teachername');
    const p = tname.slice(2, 8);
    setTrack(p)
    axios.get('https://courseapi-3kus.onrender.com/api/courseexam?sub=mca')
    .then(res => {
        // console.log(res.data.Courseexam)
      setColumns(Object.keys(res.data.Courseexam))
      setRecords(res.data.Courseexam)
    })
    .catch(err=>console.log(err))
  },[])

  const submit=(e)=>{
    e.preventDefault()
    console.log("hello")
    const tname = localStorage.getItem('teachername');
    const p = tname.slice(2, 8);
    axios.post('https://courseapi-3kus.onrender.com/api/courseexam-student',{"sub":"mca","teacher":p,"paper":papers,"des":question,"question":video,"option1":option1,"option2":option2,"option3":option3,"option4":option4,"ans":ans,"examnumber":examcount1})
    .then(res=>alert("Data is Added successfully"))
      .catch(err=>console.log(err))
  }

  const handelPublish=(_id)=>{
    const confirm=window.confirm("Would you like to Live this Qustion?");
    if (confirm){
      axios.put(`https://courseapi-3kus.onrender.com/api/courseexam/${_id}`,{ "status": true })
      .then(res=>{
        setPub(true)
        alert("Exam is Published")
      })
      .catch(err=> console.log(err))
    }
  }

  const handelDelete=(_id)=>{
    const confirm=window.confirm("Would you like to Delete?");
    if (confirm){
      axios.delete(`https://courseapi-3kus.onrender.com/api/courseexam/${_id}`)
      .then(res=>{
        alert("Data is Deleted successfully")
      })
      .catch(err=> console.log(err))
    }
  }
  const [video, setVideo] = useState("");
  const[link,setLink]=useState("");
  const [ak, setAk] = useState(MCA[0]['papers'][0]['videos']);
  const[ar,setAr]=useState([])
  // console.log(ak)
  return (
    <div>
      <TeacherNav/>
        <div className=" flex justify-center items-center p-4 ">
        <h1 className="text-xl text-black">Exam(MCA)</h1>
        </div>
      
      <div className=' flex justify-center items-center px-0 sm:px-3'>
      <div className=' container mt-2 mx-3 mb-4' >
        <div className=' overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color flex justify-center'>
            <div className=' container pb-8 sm:pb-0 mt-6'>
              <div className=" flex  flex-col sm:flex-row md:flex-col items-center sm:items-center sm:justify-center sm:gap-10 w-full text-black  ">
              <form >
              <div>
            <h3 >SELECT PAPER **</h3>
            <select className='border-2 border-gray-400 p-2 rounded-md w-80' value={papers} onChange={changePaper} required>
              <option ></option>
              {mcaPaper.map(paper =>(
                <option value={paper.subtitle} key={paper.name} >{paper.subtitle}</option>
              ))}
            </select>
            </div>

            <div>
            <h3 >SELECT EXAM NUMBER **</h3>
            <select className='border-2 border-gray-400 p-2 rounded-md w-80' value={examcount1} onChange={changeExam} required>
              <option ></option>
              {examcount.map(paper =>(
                <option value={paper.exam} key={paper.exam} >{paper.exam}</option>
              ))}
            </select>
            </div>
           
            <h3 >QUESTION DESCRIPTION</h3>
                <input type="text" name="question" id="question" className="border-2 border-gray-400 p-2 rounded-md w-80 bg-slate-300" placeholder="Question" value={question} onChange={(e)=>setQuestion(e.target.value)} />
            <h3 >ENTER QUESTION **</h3>
                <input type="text" name="question" id="question" className="border-2 border-gray-400 p-2 rounded-md w-80 bg-slate-300" placeholder="Question" value={video} onChange={(e)=>setVideo(e.target.value)} required />
                
                <h6 >OPTION 1 **</h6>
                <input type="text" name="text" id="text" className="border-2 border-gray-400 p-2 rounded-md w-80 bg-slate-300" placeholder="option1" value={option1} onChange={(e)=>setOption1(e.target.value)} required />
                <h6 >OPTION 2 **</h6>
                <input type="text" name="text" id="text" className="border-2 border-gray-400 p-2 rounded-md w-80 bg-slate-300" placeholder="option2" value={option2} onChange={(e)=>setOption2(e.target.value)} required />
                <h6 >OPTION 3</h6>
                <input type="text" name="text" id="text" className="border-2 border-gray-400 p-2 rounded-md w-80 bg-slate-300" placeholder="option3" value={option3} onChange={(e)=>setOption3(e.target.value)}  />
                <h6 >OPTION 4</h6>
                <input type="text" name="text" id="text" className="border-2 border-gray-400 p-2 rounded-md w-80 bg-slate-300" placeholder="option4" value={option4} onChange={(e)=>setOption4(e.target.value)} />
               
                <div>
            <h3 >SELECT ANSWER **</h3>
            <select className='border-2 border-gray-400 p-2 rounded-md w-80' value={ans} onChange={changeans} required>
              <option ></option>
              {answerop.map(paper =>(
                <option value={paper.ans} key={paper.ans} >{paper.ans}</option>
              ))}
            </select>
            </div>
                
                {/* <h3 >ENTER YOUR NAME</h3>
                <input type="text" name="video" id="video" className="border-2 border-gray-400 p-2 rounded-md w-80 bg-slate-300" placeholder="Eg.- P.B,R.S" value={teacher} onChange={(e)=>setTeacher(e.target.value)} required /> */}
                <div className=" flex justify-center items-center mt-4">
                <button className='bg-primary text-white bg-orange-500 cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full ' onClick={submit}>submit</button>
                </div>
                </form>
                
                <h1>Table</h1>
                <div>
            <h3 >SELECT PAPER</h3>
            <select className='border-2 border-gray-400 p-1 rounded-md w-24' value={newpaper} onChange={changePapers} required>
              <option ></option>
              {mcaPaper.map(paper =>(
                <option value={paper.subtitle} key={paper.name} >{paper.subtitle}</option>
              ))}
            </select>
            </div>
            <div>
            <h3 >SELECT EXAM NUMBER</h3>
            <select className='border-2 border-gray-400 p-1 rounded-md w-40' value={examcouunt2} onChange={changeExams} required>
              <option ></option>
              {examcount.map(paper =>(
                <option value={paper.exam} key={paper.exam} >{paper.exam}</option>
              ))}
            </select>
            </div>
                <div className=" flex justify-center">
                <div className=" container mt-2 mb-3 flex overflow-auto ">
                
                  <table className=" table">
                    <thead>
                      <tr>
                  <th>Papername</th>
                  <th>Exam</th>
                  <th>Qustion</th>
                  <th>Teacher</th>
                  <th>Publish</th>
                  <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                    {records.filter((d )=> (d.teacher === track) &&(d.paper===newpaper)&&(d.examnumber===examcouunt2)).map((d,i)=>(
                      <tr key={i}>
                          <td className="border-2 border-gray-400 p-2 rounded-md w-80 sm:w-auto bg-slate-300">{d.paper}</td>
                      
                          <td className="border-2 border-gray-400 p-2 rounded-md w-80 sm:w-auto bg-slate-300">{d.examnumber}</td>
                          <td className="border-2 border-gray-400 p-2 rounded-md w-80 sm:w-auto bg-slate-300">{d.question}</td>
                          <td className="border-2 border-gray-400 p-2 rounded-md w-80 sm:w-auto bg-slate-300">{d.teacher}</td>
                          {d.status?<td className="border-2 border-gray-400 p-2 rounded-md w-80 sm:w-auto bg-green-500 cursor-pointer" >Live</td>:<td className="border-2 border-gray-400 p-2 rounded-md w-80 sm:w-auto bg-yellow-200 cursor-pointer" onClick={(e)=>handelPublish(d._id)}>Pub</td>}
                          <td className="border-2 border-gray-400 p-2 rounded-md w-80 sm:w-auto bg-yellow-200 cursor-pointer" onClick={(e)=>handelDelete(d._id)}>Del</td>
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

export default Mcateacherexam;
