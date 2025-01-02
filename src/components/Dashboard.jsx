import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SidebarHeader from './SidebarHeader';
import Feedbacksvg from '../assets/Feedback.svg';

const QuizWhiz = () => {
  const location = useLocation(); // Get the passed state from QuestionSet page
  const navigate = useNavigate(); // For navigating to other pages
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [attempts, setAttempts] = useState(0); // Track attempts

  const userId = "example-user-id"; // Replace with dynamic user ID logic

  useEffect(() => {
    if (location.state && location.state.answers) {
      const { answers } = location.state;

      // Calculate correct and wrong answers
      const correct = answers.filter(answer => answer.isCorrect).length;
      const wrong = answers.length - correct;

      setCorrectAnswers(correct);
      setWrongAnswers(wrong);
    }

    // Fetch attempts from backend
    const fetchAttempts = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/getAttempts/${userId}`);
        const data = await response.json();
        setAttempts(data.attempts || 0);
      } catch (error) {
        console.error("Error fetching attempts:", error);
      }
    };

    fetchAttempts();
  }, [location.state]);

  return (
    <div className="bg-yellow-50 min-h-screen flex flex-col playwrite">
      {/* Header Section */}
      <SidebarHeader />

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-12 mx-4 lg:mx-60">
        <section>
          <div className="flex-1 flex flex-col space-y-8 p-6 lg:pl-12">
            {/* Score Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 rounded-lg shadow-md">
              <div className="col-span-1 lg:col-span-2 flex flex-col bg-[#d4e5dc] rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold">Your Score</h2>
                  <p className="text-2xl font-bold">
                    {correctAnswers}/{correctAnswers + wrongAnswers}
                  </p>
                </div>
                <div className="flex justify-center space-x-12 mt-6">
                  <div className="flex flex-col items-center space-y-4 text-xl font-bold">
                    <p>Right</p>
                    <p className="lg:text-4xl text-2xl">{correctAnswers}</p>
                  </div>
                  <div className="flex flex-col items-center space-y-4 text-xl font-bold">
                    <p>Wrong</p>
                    <p className="lg:text-4xl text-2xl">{wrongAnswers}</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#d4e5dc] rounded-lg shadow-md p-6">
                <h2 className="text-lg font-bold text-center">Leaderboard</h2>
                <ul className="mt-4 space-y-2">
                  <li>1. Faisal Ahmed</li>
                  <li>2. Shahidul Sakib</li>
                  <li>3. Lazima Mishfa</li>
                  <li>4. Mr. Batman</li>
                  <li className="font-bold text-maroon">• You are on 10th</li>
                </ul>
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 rounded-lg shadow-md">
              <div className="bg-[#d4e5dc] rounded-lg shadow-md p-6 text-center">
                <h2 className="text-lg font-bold">Your Growth</h2>
                <img
                  className="w-[180px] mx-auto"
                  src="#"
                  alt="Coming soon"
                />
              </div>
              <div className="bg-[#d4e5dc] rounded-lg shadow-md p-6 text-center">
                <h2 className="text-lg font-bold">Number of Attempts</h2>
                <p className="text-2xl lg:text-4xl font-bold mt-4 pt-4 lg:pt-10">
                  {attempts}
                </p>
              </div>
              <div className="bg-[#d4e5dc] rounded-lg shadow-md p-6 lg:py-20">
                <h2 className="text-lg font-bold text-center">Feedback</h2>
                <p className="mt-4 italic text-center">
                  "Push your limits – success follows hard work!"
                </p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 right-4 hidden md:block">
            <img
              src={Feedbacksvg}
              alt="Student Illustration"
              className="w-60"
            />
          </div>
        </section>
      </main>

      <div className="flex justify-center my-4">
        <button
          className="text-white bg-gradient-to-r from-[#d36831] via-[#e47a4a] to-[#f08f5c] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-[#c75c25] shadow-lg shadow-[#e47a4a]/50 dark:shadow-lg dark:shadow-[#d36831]/80 font-medium rounded-lg text-sm px-6 py-3 text-center mb-2"
          onClick={() => navigate("/")}
        >
          Retake Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizWhiz;
