import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 

export default function QuestionSet() {
  const { subject } = useParams(); 
  const navigate = useNavigate(); 
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);

        if (!subject) {
          setError("Invalid subject provided.");
          setLoading(false);
          return;
        }

        const response = await fetch(`https://quiz-whiz-backend.vercel.app/api/questions/${subject}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch questions: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.length === 0) {
          setError("No questions available for this subject.");
          return;
        }

        setQuestions(data);
      } catch (err) {
        setError(err.message.includes("Failed to fetch")
          ? "Unable to connect to the server. Please check your connection."
          : "Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [subject]);

  const handleSubmit = () => {
    const answers = questions.map((question, index) => {
      const selectedOption = document.querySelector(
        `input[name="q${index}"]:checked`
      );

      return {
        question: question.title,
        isCorrect: selectedOption
          ? question.options.find(opt => opt.text === selectedOption.value)?.isCorrect
          : false,
      };
    });

    navigate("/dashboard", { state: { answers } });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }
  
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="bg-yellow-50 min-h-screen flex flex-col playwrite">
      <header className="bg-yellow-100 border-b border-yellow-200 py-4 px-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-orange-600">{subject.charAt(0).toUpperCase() + subject.slice(1)} Quiz</h1>
      </header>

      <main className="flex-grow p-6 md:p-12 mx-4 lg:mx-60">
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {questions.map((question, index) => (
            <div key={index} className="bg-[#d4e5dc] shadow-lg rounded-lg p-4 md:p-6 hover:bg-[#c8e0d3] transition">
              <h2 className="text-xl font-semibold text-primary-color mb-2">
                Question {index + 1}
              </h2>
              <p className="text-gray-700 mb-4">{question.title}</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {question.options.map((option, optIndex) => (
                  <label key={optIndex} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`q${index}`}
                      value={option.text}
                      className="accent-green-500"
                    />
                    <span>{option.text}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </section>

        <div className="col-span-1 sm:col-span-2 flex justify-center my-4">
          <button
            type="button"
            className="text-white bg-gradient-to-r from-[#d36831] via-[#e47a4a] to-[#f08f5c] font-medium rounded-lg text-sm px-6 py-3"
            onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </main>
    </div>
  );
}
