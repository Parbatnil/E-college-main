// import React, { useEffect, useState } from 'react'
// import logo from '../../public/logo.png'
// import { FaTimes } from 'react-icons/fa'
// import { FaBars } from 'react-icons/fa6'
// import { useNavigate } from 'react-router-dom';
// import { FaSearch } from "react-icons/fa";
// const Navbar = () => {
//     const[isMobileMenuOpen,setIsMobileMenuOpen]=useState(false)
//     const navigate= useNavigate();
//     const [log,setLog]=useState(true)
//     const [l,setL]=useState("A")
//     useEffect(()=>{
//         const logos=localStorage.getItem('logs')
//         if(logos!==null){
//         const p = JSON.parse(logos);
//         let k= p.slice(0, 1);
//         setL(k)
//         setLog(false)
//     }
//     },[])
//     const getlog=(e)=>
//         {
//             const logp=localStorage.getItem('logs')
//         navigate('/student')
//     }
//     const update=()=>{
//         localStorage.removeItem('logs')
//         setLog(true)
//     }

//     const toggleMobileMenu = () => {
//         setIsMobileMenuOpen(!isMobileMenuOpen)
//     }
//   return (
//     <div>
//         {/* desktop menu */}
//         <nav className=" lg:flex hidden justify-between items-center w-full h-16 bg-slate-200 ">
//             {/* logo */}
//             <div className='flex justify-center items-center gap-3'>
//                 <img src={logo} className='h-20 w-20 pt-2 cursor-pointer' onClick={()=> navigate('/')} alt="logo"/>
//                 <div className='text-green-700 pb-3 font-semibold text-base cursor-pointer' onClick={()=> navigate('/')}>E-College</div>
//             </div>
//             {/* menu items */}
//             <div className='flex justify-center items-center gap-5 text-gray-600'>
//                     <div className='hover:text-black cursor-pointer' onClick={()=> navigate('/')} >Home</div>
//                     <div className='hover:text-black cursor-pointer' onClick={()=> navigate('/guardian')}>Guardian</div>
//                     <div className='hover:text-black cursor-pointer' onClick={()=> navigate('/teacher')}>Teacher</div>
//                     <div className='hover:text-black cursor-pointer' onClick={()=> navigate('/admin')}>Admin</div>
//                     <div className='hover:text-black cursor-pointer' onClick={()=> navigate('/management')}>Management</div>
//             </div>
//             {/* login */}
//             <div className='flex justify-center items-center gap-3 m-2'>
//             <FaSearch className=' cursor-pointer' onClick={()=> navigate('/search')}/>
//             {log?<button className='bg-orange-500 text-white py-2 px-4 rounded-3xl' onClick={getlog}>Student LogIn</button>
//                 :<button className='bg-orange-500 text-white py-2 px-4 rounded-3xl' onClick={update}>Studnt LogOut</button>}
//                 {/* change */}
//                 <div className='cursor-pointer rounded-full h-10 w-10 bg-purple-700 text-white pl-3.5 pt-2' onClick={()=> navigate('/studentdashbord')}>{l}</div>
//             </div>
//         </nav>
//         {/* Mobile Menu */}
//         <div className=' rounded-lg max-h-12 backdrop-blur-md lg:hidden bg-slate-200'>
//                 <div className=' flex items-center justify-between'>

//                 <div className=' flex items-center gap-3'>
//                         {/* change */}
//                         <button className=' focus:outline-none lg:hidden' onClick={toggleMobileMenu}>{isMobileMenuOpen ? (
//                             <FaTimes className='m-2 h-6 w-5'/>
//                         ):(
//                             <FaBars className='m-2 h-6 w-5'/>
//                         )}</button>

//                         <FaSearch className=' cursor-pointer' onClick={()=> navigate('/search')}/>
//                     </div>

//                     <div>
//                         <a href="#" className=' flex justify-center items-center'>
//                             <img src={logo} width={90} className='m-2 max-h-9 w-9' onClick={()=> navigate('/')} alt="logo" />
//                             <div className='text-green-700 pb-2 font-semibold text-sm cursor-pointer' onClick={()=> navigate('/')}>E-College</div>
//                         </a>
//                     </div>
//                     <div>
//                     <div className='cursor-pointer rounded-full h-6 w-6 bg-purple-700 text-white pl-1.5 mr-1' onClick={()=> navigate('/studentdashbord')}>{l}</div>
//                     </div>
//                 </div>
//                 {isMobileMenuOpen && (
//                     <ul className='mx-2 z-1000 p-2 mt-2 flex flex-col gap-4 text-gray-600 bg-slate-200 py-5 rounded-md '>
//                         <li className='hover:text-black cursor-pointer' onClick={()=> navigate('/')}>Home</li>
//                         <li className='hover:text-black cursor-pointer' onClick={()=> navigate('/guardian')}>Guardian</li>
//                         <li className='hover:text-black cursor-pointer' onClick={()=> navigate('/teacher')}>Teacher</li>
//                         <li className='hover:text-black cursor-pointer' onClick={()=> navigate('/admin')}>Admin</li>
//                         <li className='hover:text-black cursor-pointer' onClick={()=> navigate('/management')}>Management</li>
//                         {log?<li className='hover:text-black cursor-pointer' onClick={getlog}>Student LogIn</li>
//                 :<li className='hover:text-black cursor-pointer' onClick={update}>Studnt LogOut</li>}
//                     </ul>
//                 )}
//             </div>
//     </div>
//   )
// }

// export default Navbar

import React, { useEffect, useState } from "react";
import logo from "../../public/logo.png";
import { FaTimes, FaSearch } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [log, setLog] = useState(true);
  const [l, setL] = useState("A");

  useEffect(() => {
    const logos = localStorage.getItem("logs");
    const arnab = JSON.parse(logos);
    setEmail(arnab);
    if (logos !== null) {
      const p = JSON.parse(logos);
      let k = p.slice(0, 1);
      setL(k);
      setLog(false);
    }
  }, []);

  const getLog = () => {
    navigate("/student");
  };

  const update = () => {
    localStorage.removeItem("logs");
    setLog(true);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      {/* Top Navbar */}
      <nav className="bg-white border-gray-200 dark:bg-[#1E3A8A]">
        <div className="flex justify-between items-center mx-auto max-w-screen-xl pt-2">
          <a
            onClick={() => navigate("/")}
            className="flex items-center cursor-pointer space-x-3"
          >
            <img src={logo} alt="logo" className="h-14 w-14" />
            <span className="text-2xl font-semibold text-[#1F2937] dark:text-white">
              E-College
            </span>
          </a>

          <div className="flex items-center space-x-6">
            <FaSearch
              className="cursor-pointer text-white"
              onClick={() => navigate("/search")}
            />
            <button
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Bottom Navbar */}
      <nav
        className={`bg-[#FFFFFF] dark:bg-[#1E3A8A] ${
          isMobileMenuOpen ? "block" : "hidden"
        } md:block`}
      >
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center justify-between">
            <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 text-sm">
              <li
                className="cursor-pointer hover:underline text-[#1F2937] dark:text-white"
                onClick={() => navigate("/")}
              >
                Home
              </li>

              <li
                className="cursor-pointer hover:underline text-[#1F2937] dark:text-white"
                onClick={() => navigate("/teacher")}
              >
                Teacher
              </li>
              <li
                className="cursor-pointer hover:underline text-[#1F2937] dark:text-white"
                onClick={() => navigate("/admin")}
              >
                Admin
              </li>
            </ul>
            <div className="flex items-center space-x-4">
              {log ? (
                <button
                  className="bg-[#FFFFFF] text-[#1E3A8A] py-2 px-4 rounded-xl"
                  onClick={getLog}
                >
                  Student LogIn
                </button>
              ) : (
                <button
                  className="bg-[#FFFFFF] text-[#1E3A8A] py-2 px-4 rounded-xl"
                  onClick={update}
                >
                  Student LogOut
                </button>
              )}
              <div className="flex flex-col items-center justify-center">
                <div
                  className="cursor-pointer rounded-full h-10 w-10 bg-purple-700 text-white flex items-center justify-center"
                  onClick={() => navigate("/studentdashbord")}
                >
                  {l}
                </div>
                <div className="text-white font-semibold"> {email}</div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
