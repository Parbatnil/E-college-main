import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
const Bcaclass = () => {
    const [columns,setColumns]=useState([])
  const [records,setRecords]=useState([])
  useEffect(()=>{
    axios.get('https://courseapi-3kus.onrender.com/api/products?sub=bcaLIVE')
    .then(res => {
      setColumns(Object.keys(res.data.mydata))
      setRecords(res.data.mydata)
    })
    .catch(err=>console.log(err))
  },[])

    return (
        <div>
          <Navbar />
            <div className=" flex justify-center items-center p-4 ">
            <h1 className="text-xl text-black">Live Class(BCA)</h1>
            </div>
          
          <div className=' flex justify-center items-center px-0 sm:px-3'>
          <div className=' container mt-2 mx-3 mb-4' >
            <div className=' overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color flex justify-center'>
                <div className=' container pb-8 sm:pb-0 mt-6'>
                  <div className=" flex  flex-col sm:flex-row md:flex-col items-center sm:items-center sm:justify-center sm:gap-10 w-full text-black  ">
                 
                   
                    <h1 className=" text-xl">Table</h1>
                    <div className=" flex justify-center">
                    <div className=" container mt-2">
                      <table className=" table">
                        <thead>
                          <tr>
                      <th>Topic</th>
                      <th>Name</th>
                      <th>Teacher</th>
                      <th>Action</th>
                      </tr>
                      </thead>
                      <tbody>
                        {records.map((d,i)=>(
                          <tr key={i}>
                              <td className="border-2 border-gray-400 p-2 rounded-md w-80 sm:w-auto bg-slate-300">{d.name}</td>
                          
                              <td className="border-2 border-gray-400 p-2 rounded-md w-80 sm:w-auto bg-slate-300">{d.subtitle}</td>
                              <td className="border-2 border-gray-400 p-2 rounded-md w-80 sm:w-auto bg-slate-300">{d.teacher}</td>
                              <td className="border-2 border-gray-400 p-2 rounded-md w-80 sm:w-auto bg-red-500 cursor-pointer" onClick={()=>{
                        return(
                            window.open(d.link)
                        )
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

export default Bcaclass