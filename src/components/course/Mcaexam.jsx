import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import axios from "axios";
// import { examcount } from '../../assets/test';
// import { mcaPaper } from '../../assets/mcadata';

const Mcaexam = () => {
    const [columns, setColumns] = useState([]);
    const [records, setRecords] = useState([]);
    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(null);
    const [correct, setCorrect] = useState(0);
    const [wrong, setWrong] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [lock, setLock] = useState(false);
    const [result, setResult] = useState(false);
    const [score, setScore] = useState(0);
    // const [newpaper,setNewpaper]=useState("")
    // const [examcouunt2,setExamcount2]=useState()

    // const changePapers=(event)=>{
    //     setNewpaper(event.target.value)
    //   }
    //   const changeExams=(event)=>{
    //     setExamcount2(event.target.value)  
    //   }

    useEffect(() => {
        axios.get('https://courseapi-3kus.onrender.com/api/courseexam?sub=mca&status=true')
            .then(res => {
                // console.log(res.data.Courseexam);
                const courseExamData = res.data.Courseexam;
                setColumns(Object.keys(courseExamData[0])); // Assuming all records have the same structure
                setRecords(courseExamData);
                setQuestion(courseExamData[0]); // Set the first question
            })
            .catch(err => console.log(err));
    }, []);

    const checkans = (e, ansIndex) => {
        setSelectedOption(ansIndex); // Set the clicked option
    };

    const handleNext = () => {
        if (selectedOption !== null) {
            if (question.ans === selectedOption) {
                setCorrect(prev => prev + 1);
                setScore(correct - (wrong * 0.25) + 1);
            } else {
                setWrong(prev => prev + 1);
                setScore(correct - ((wrong + 1) * 0.25));
            }
        }

        if (index === records.length - 1) {
            alert("Exam Finished");
            setResult(true);
            return;
        }

        setIndex(prev => prev + 1);
        setQuestion(records[index + 1]); // Update to the next question
        setLock(false);
        setSelectedOption(null); // Reset the selected option for the next question
    };

    return (
        <div>
            <Navbar />
            <div className='flex justify-center'>
                <div className='mt-2 font-bold text-[30px]'>MCA Exam</div>
            </div>
            <div className='w-auto mx-4 mt-10 mb-6 text-black flex flex-col gap-[20px] rounded-lg hero-bg-color p-10'>
                <h1>MCA Exam</h1>
                <hr className='h-[2px] border-none bg-[#707070]' />
                {result ? (
                    <>
                        <div className='font-bold text-[30px]'>{`Your Score is ${score}`}</div>
                        <div>{`Correct = ${correct}`}</div>
                        <div>{`Wrong = ${wrong}`}</div>
                    </>
                ) : (
                    <>
                        {question && (
                            <>
                                <h2 className='text-[20px] font-normal '>{question.des}</h2>
                                <h2 className='text-[20px] font-semibold '>{index + 1}.{question.question}</h2>
                                <ul className='flex flex-col'>
                                    {[question.option1, question.option2, question.option3, question.option4].map((option, optIndex) => (
                                        <li 
                                            key={optIndex}
                                            onClick={(e) => checkans(e, optIndex + 1)}
                                            className={`h-auto pl-4 hero-ag-color p-2 rounded-md mb-5 cursor-pointer 
                                                ${selectedOption === optIndex + 1 ? 'bg-black text-white' : ''}`}
                                        >
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                        <button 
                            className='m-auto w-32 h-10 bg-green-400 text-white font-semibold rounded-2xl cursor-pointer'
                            onClick={handleNext}
                        >
                            Next
                        </button>
                        <div className='m-auto'>{index + 1} of {records.length} questions</div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Mcaexam;
