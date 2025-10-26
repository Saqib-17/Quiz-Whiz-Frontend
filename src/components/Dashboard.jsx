import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SidebarHeader from './SidebarHeader';
import Feedbacksvg from '../assets/Feedback.svg';

const QuizWhiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [incorrectQuestions, setIncorrectQuestions] = useState([]);

  const userId = "example-user-id";

  useEffect(() => {
    if (location.state && location.state.answers) {
      const { answers } = location.state;

      const correct = answers.filter(answer => answer.isCorrect).length;
      const wrong = answers.length - correct;

      setCorrectAnswers(correct);
      setWrongAnswers(wrong);

      // Extract incorrect question numbers
      const incorrect = answers
        .map((answer, index) => (!answer.isCorrect ? index + 1 : null))
        .filter(q => q !== null);

      setIncorrectQuestions(incorrect);
    }

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

  const getFeedback = () => {
    const totalAnswers = correctAnswers + wrongAnswers;
    const percentage = (correctAnswers / totalAnswers) * 100;

    if (percentage <= 30) {
      return "Don't lose hope! Start with the basics and keep practicing—progress takes time.";
    } else if (percentage <= 60) {
      return "Good job! You're improving steadily. Keep practicing to sharpen your skills.";
    } else if (percentage <= 80) {
      return "Great work! You're performing well. A little extra effort will make you excel!";
    } else {
      return "Amazing performance! You're excelling—keep pushing boundaries for greater success!";
    }
  };

  return (
    <div className="bg-yellow-50 min-h-screen flex flex-col playwrite">
      <SidebarHeader />

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
              {/* Feedback Card */}
              <div className="bg-[#d4e5dc] rounded-lg shadow-md p-6 text-center order-1">
                <h2 className="text-lg font-bold">Feedback</h2>
                <p className="mt-4">{getFeedback()}</p>
              </div>

              {/* Merged Card */}
              <div className="col-span-2 bg-[#d4e5dc] rounded-lg shadow-md p-6 text-center order-2">
                <h2 className="text-lg font-bold">Question Analysis</h2>
                <p className="mt-4">You answered the following questions incorrectly:</p>
                <ul className="list-disc list-inside mt-4 text-left">
                  {incorrectQuestions.length > 0 ? (
                    incorrectQuestions.map((q, index) => (
                      <li key={index}>Question {q}</li>
                    ))
                  ) : (
                    <li>No incorrect questions! Great job!</li>
                  )}
                </ul>
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
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default QuizWhiz;
