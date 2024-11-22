import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HashLoader from "react-spinners/HashLoader";
import AdminNav from '../../AdminNav';

const Data=[
    {
        id:1,
        name:"MCA"},
    {
    id:2,
    name:"BCA"},
    {
    id:3,
    name:"MBA"},
    {
        id:4,
        name:"BTech"},
    {
            id:5,
            name:"BBA"},
            {
                id:6,
                name:"MTech"},
                {
                    id:7,
                    name:"JECA"},
                    {
                        id:8,
                        name:"WBJEE"},
                        {
                            id:9,
                            name:"JEEMAIN"},
                            {
                                id:10,
                                name:"GATE"},
                                {
                                    id:11,
                                    name:"IPMAT"},
                                    {
                                        id:12,
                                        name:"CAT"},
]

const Addstudent= ({ onSignUp }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [guardian, setGuardian] = useState('');
  const [coursex,setCoursex]=useState("");
  const [status,setStatus]=useState(true);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [lock,setLock]=useState(false)
  const [low,setLow]=useState("");
  const [time, setTime] = useState(new Date().toLocaleString().slice(0,10));
  const [fixt, setFixt] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('https://courseapi-3kus.onrender.com/api/students');
        setStudents(response.data.students);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);
  const handleChange = (event) => {
    setCoursex(event.target.value);
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setLow(coursex.toLowerCase())

    const isEmailExist = students.some((student) => student.email === email);
    if (isEmailExist) {
      setErrorMessage('Email already exists');
      setLoading(false);
      return;
    }

    console.log(coursex)
    try {
      await axios.post('https://courseapi-3kus.onrender.com/api/register-student', {
        name,
        email,
        password,
        guardian,
        phonenumber: phone
      });
      alert('Registered successfully!');
      setLock(true)
   
    } catch (error) {
      console.error('Error registering student:', error);
      setErrorMessage('Error registering. Please try again.');
    } finally {
      setLoading(false);
    }
  };
 

  const handleSubscription = async (e) => {
    e.preventDefault();
    alert("Unlock Id")
    try {
      // const logp = localStorage.getItem('logs');
      // const p = JSON.parse(logp);
      let change=parseInt(time.slice(6,10));
        let changenew=change+2;
        let enddate=changenew.toString();
        let fast=time.slice(0,6);
        let result=fast.concat(enddate)
      await axios.put(`https://courseapi-3kus.onrender.com/api/student/${email}`, {"course":coursex, low: true ,"starting":time,"end":result});
      setLock(false);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Subscription failed. Please Login.');
      console.error(error);
    }
  };
  const gotohome=()=>{
    navigate("/admin-dashboard")
  }

  return (
    <>
    <AdminNav/>
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      {lock? (<div className='flex flex-col gap-4'><button
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleSubscription}
            >
              Unlock Id
            </button>
            <button
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={gotohome}
            >
              Go to home
            </button></div>
            ):(<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Student register</h2>

        {loading ? (
          <div className="flex justify-center items-center mt-10">
            <HashLoader loading={loading} size={50} aria-label="Loading Spinner" data-testid="loader" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <p className="text-red-500 text-sm text-center">{errorMessage}</p>
            )}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters long.</p>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="guardian" className="block text-sm font-medium text-gray-700">Guardian</label>
              <input
                type="text"
                id="guardian"
                value={guardian}
                onChange={(e) => setGuardian(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <h3 className="mt-3">Course</h3>
                  <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={coursex} onChange={handleChange}>
                    <option >--course--</option>
                    {Data.map(sem => (
                      <option value={sem.name} key={sem.id}>{sem.name}</option>
                    ))}
                  </select>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Generate Id
            </button>
          </form>
        )}
      </div>)}
    </div>
    </>
  );
};

export default Addstudent;
