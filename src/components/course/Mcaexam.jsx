import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import { useNavigate } from "react-router-dom";
//dialog added
//import { Dialog } from "@headlessui/react";

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
  //
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        "https://courseapi-3kus.onrender.com/api/courseexam?sub=mca&status=true"
      )
      .then((res) => {
        const courseExamData = res.data.Courseexam;
        setColumns(Object.keys(courseExamData[0])); // Assuming all records have the same structure
        setRecords(courseExamData);
        setQuestion(courseExamData[0]); // Set the first question
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    const logos = localStorage.getItem("logs");
    const p = logos ? JSON.parse(logos) : null;

    setLoading(true);

    if (p) {
      axios
        .get(`https://courseapi-3kus.onrender.com/api/students?email=${p}`)
        .then((res) => {
          setStudent(res.data.students[0]);
        })
        .catch((err) => {
          console.error(err);
          setShowError(true);
        })
        .finally(() => setLoading(false));
    } else {
      setTimeout(() => {
        setShowError(true);
        setLoading(false);
      }, 2000);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-10">
        <HashLoader
          loading={loading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  const checkans = (e, ansIndex) => {
    setSelectedOption(ansIndex); // Set the clicked option
  };

  const submitResult = () => {
    axios
      .post("https://courseapi-3kus.onrender.com/api/result", {
        sub: "mca",
        teacher: question.teacher,
        paper: question.paper,
        student: student.name,
        roll: student.roll,
        examno: question.examnumber,
        score: score,
        email: student.email,
      })
      .then((res) => {
        console.log("ok");
        setRefresh(!refresh); // Toggle refresh to trigger re-render
      })
      .catch((err) => console.log(err));
    navigate("/");
  };

  const handleNext = () => {
    if (selectedOption !== null) {
      if (question.ans === selectedOption) {
        setCorrect((prev) => prev + 1);
        setScore(correct - wrong * 0.25 + 1);
      } else {
        setWrong((prev) => prev + 1);
        setScore(correct - (wrong + 1) * 0.25);
      }
    }

    if (index === records.length - 1) {
      alert("Exam Finished");
      setResult(true);
      return;
    }

    setIndex((prev) => prev + 1);
    setQuestion(records[index + 1]); // Update to the next question
    setLock(false);
    setSelectedOption(null); // Reset the selected option for the next question
  };

  return (
    <div>
      {/* <Navbar /> */}
      <div className="flex justify-center">
        <div className="mt-2 font-bold text-[30px]">MCA Exam</div>
      </div>
      <div className="w-auto mx-4 mt-10 mb-6 text-black flex flex-col gap-[20px] rounded-lg hero-bg-color p-10 bg-blue-700">
        {" "}
        {/* Changed to bg-blue-700 */}
        <h1>MCA Exam</h1>
        <hr className="h-[2px] border-none bg-blue-700" />{" "}
        {/* Adjusted to match the new blue color */}
        {result ? (
          <>
            <div className="flex justify-center flex-col items-center space-y-6 ">
              <p>Please Click On the Submit </p>
              <button
                className="bg-blue-600 text-white w-20 h-10 rounded-xl"
                onClick={submitResult}
              >
                Submit
              </button>
            </div>
          </>
        ) : (
          <>
            {question && (
              <>
                <h2 className="text-[20px] font-normal ">{question.des}</h2>
                <h2 className="text-[20px] font-semibold ">
                  {index + 1}.{question.question}
                </h2>
                <ul className="flex flex-col">
                  {[
                    question.option1,
                    question.option2,
                    question.option3,
                    question.option4,
                  ].map((option, optIndex) => (
                    <li
                      key={optIndex}
                      onClick={(e) => checkans(e, optIndex + 1)}
                      className={`h-auto pl-4 hero-ag-color p-2 rounded-md mb-5 cursor-pointer 
                                      ${
                                        selectedOption === optIndex + 1
                                          ? "bg-black text-white"
                                          : ""
                                      }`}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </>
            )}
            <button
              className="m-auto w-32 h-10 bg-green-400 text-white font-semibold rounded-2xl cursor-pointer"
              onClick={handleNext}
            >
              Next
            </button>
            <div className="m-auto">
              {index + 1} of {records.length} questions
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Mcaexam;
