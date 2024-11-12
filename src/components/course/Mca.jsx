import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { MCA } from '../../assets/Assets'
import ReactPlayer from 'react-player'
import axios from 'axios'
import {mcaSem} from '../../assets/mcadata.js'
import {mcaPaper} from '../../assets/mcadata.js'
import {mcavideos} from '../../assets/mcadata.js'
import { useNavigate } from 'react-router-dom';
import HashLoader  from "react-spinners/HashLoader"
import Payment from './Payment'

const Mca = () => {
  const navigate= useNavigate();
  const [columns,setColumns]=useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://courseapi-3kus.onrender.com/api/products?sub=mca');
        setColumns(Object.keys(res.data.mydata));
        setTestVideo(res.data.mydata);

        const logp = localStorage.getItem('logs');
        const p = JSON.parse(logp);
        const studentRes = await axios.get(`https://courseapi-3kus.onrender.com/api/students?email=${p}`);
        const student = studentRes.data.students.find(e => e.mca);
        setLock(student ? student.mca : false);
      } catch (err) {
        setErrorMessage('Failed to fetch data. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const[sem,setSem]=useState("--sem--")
  const[paper,setPaper]=useState("--paper--")
  const[video,setVideo]=useState("--video--")
  const[link,setLink]=useState(false)
  const[lock,setLock]=useState('')
  const [pay,setPay]=useState(true)
  const [loading, setLoading] = useState(true);
  const[testvideo,setTestVideo]=useState([])
  const[papers,setPapers]=useState([])
  const[videos,setVideos]=useState([])
  const[show,setShow]=useState(false)
  const[question,setQuestion]=useState('')
  const[answer,setAnswer]=useState('')
  const [errorMessage, setErrorMessage] = useState('');
  const changeSem=(event)=>{
    setSem(event.target.value)
    setPapers(mcaPaper.filter(sem=>sem.title===event.target.value))
  }
  const changePaper=(event)=>{
    setPaper(event.target.value)
    setVideos(testvideo.filter(paper=>paper.subtitle===event.target.value))
  }
  const changeVideo=(event)=>{
    setLink(true)
    setVideo(event.target.value)
  }
  const generateAnswer=async()=>{
    setAnswer("loading...")
   const response= await axios({
      url:`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCAEbKVzd8GkiF4oXqtZOLzYzByakMijaU`,
      method:"post",
      data:{"contents":[{"parts":[{"text":question}]}]},
    });
    const test=(response['data']['candidates'][0]['content']['parts'][0]['text']).split('**');
    setAnswer(test)
  }
  const handelChange=async()=>{
    try {
      const logp = localStorage.getItem('logs');
      const p = JSON.parse(logp);
      console.log(p)
      if (p!==null)
      {setPay(!pay)
      setErrorMessage('');}
      else{
        setErrorMessage('Please login to access this feature');
      }
    } catch (error) {
      setErrorMessage('Subscription failed. Please Login.');
      console.error(error);
    }
  }
  
  const handleSubscription = async (e) => {
    e.preventDefault();
    alert("Payment Successful")
    try {
      const logp = localStorage.getItem('logs');
      const p = JSON.parse(logp);
      await axios.put(`https://courseapi-3kus.onrender.com/api/student/${p}`, { "mca": true });
      setLock(true);
      setErrorMessage('');
      setPay(!pay)
    } catch (error) {
      setErrorMessage('Subscription failed. Please Login.');
      console.error(error);
    }
  };

  if (loading) {
    return (<div className=' flex justify-center items-center mt-10'>
      <HashLoader  
    loading={loading}
    size={50}
    aria-label="Loading Spinner"
    data-testid="loader"
    />
    </div>)
  }

  return (
    <div>
        {pay?(<div>
        <Navbar/>
        <div className=' flex justify-center items-center'>
            <h1 className=' text-xl mt-3 sm:text-3xl'>MCA</h1>
        </div>
        <div className=' flex justify-center items-center px-0 sm:px-3 ' >
        <div className=' container mt-2 mx-3 mb-6' >
        <div className=' overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color flex justify-center items-center '>
        <div className=' container pb-8 sm:pb-0'>

        <div className=' flex  flex-col sm:flex-row md:flex-col items-center sm:items-center sm:justify-center sm:gap-10 w-full text-black'>
          <div>
            <h3 className=' mt-3'>Select SEM</h3>
            <select className='border-2 border-gray-400 p-2 rounded-md w-80' value={sem} onChange={changeSem}>
              <option >--sem--</option>
              {mcaSem.map(sem =>(
                <option value={sem.title} key={sem.name}>{sem.name}</option>
              ))}
            </select>
            </div>
            <div>
            <h3>Select PAPER</h3>
            <select className='border-2 border-gray-400 p-2 rounded-md w-80' value={paper} onChange={changePaper}>
              <option >--paper--</option>
              {papers.map(paper =>(
                <option value={paper.subtitle} key={paper.name} >{paper.name}</option>
              ))}
            </select>
            </div>
            <div>
            <h3>Select VIDEOS</h3>
            <select className='border-2 border-gray-400 p-2 rounded-md w-80' value={video} onChange={changeVideo}>
              <option >--video--</option>
              {videos.map(video =>(
                <option key={video.name} className='text-wrap h-auto' value={video.link}>{video.name}</option>
                
              ))}
            </select>
            </div>
            {lock && link ? (
                  <div className="mt-4 mb-4">
                    <ReactPlayer url={video} controls width="100%" height="100%" />
                  </div>
                ) : !lock ? (<>
                  <h2 className="mt-3 mb-3">You need to BUY</h2>
                  <h3 className="mt-3 mb-3">LogIn before BUY</h3></>
                ) : (
                  <h2 className="mt-3 mb-3">Select Video</h2>
                )}
                {lock && (<div className='flex flex-col gap-4'>
                  <button className="bg-primary text-white bg-orange-500 cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full" onClick={() => navigate('/mcaClassok@24@27')}>
                    Live-Class
                  </button>
                  <button className="bg-primary text-white bg-orange-500 cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full" onClick={() => navigate('/mcaeaxm@24')}>
                    Exam
                  </button>
                  </div>
                )}
                <h2 className="my-2 hero-ag-color p-2 rounded-3xl cursor-pointer mb-4" onClick={() => setShow(!show)}>AI Chat Bot</h2>
                {lock && show && (
                  <div className="flex flex-col items-center gap-3">
                    <textarea value={question} onChange={(e) => setQuestion(e.target.value)} cols="30" rows="10" className="w-60 sm:w-[600px] rounded-xl"></textarea>
                    <button className="bg-primary text-white bg-black cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full mb-3" onClick={generateAnswer}>
                      Generate Answer
                    </button>
                    <p className="p-4">{answer}</p>
                  </div>
                )}
                {!lock && (
                  <button className="bg-primary text-white bg-orange-500 cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full" onClick={handelChange}>
                   BUY Rs.3000
                  </button>
                  // <Payment/>
                )}
                {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </div>

       </div> 
       </div> 
      </div>
        </div>
        </div>):(<Payment handleSubscription={handleSubscription}/>)}

    </div>
  )
}

export default Mca