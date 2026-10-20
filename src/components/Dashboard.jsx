import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SidebarHeader from "./SidebarHeader";
import Feedbacksvg from "../assets/Feedback.svg";
import { auth } from "../firebase/firebase";

const QuizWhiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);
  const [leaderboardError, setLeaderboardError] = useState("");
  const [showAnalysis, setShowAnalysis] = useState(false);
  const answers = location.state?.answers ?? [];
  const incorrectAnswers = answers.filter((answer) => !answer.isCorrect);
  const correctAnswers = answers.length - incorrectAnswers.length;
  const wrongAnswers = incorrectAnswers.length;
  const currentUserUid = auth.currentUser?.uid;

  useEffect(() => {
    const controller = new AbortController();

    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/users/leaderboard", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load the leaderboard.");
        }

        const users = await response.json();
        if (!Array.isArray(users)) {
          throw new Error("The leaderboard response was invalid.");
        }

        setLeaderboard(users);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching leaderboard:", error);
          setLeaderboardError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLeaderboardLoading(false);
        }
      }
    };

    fetchLeaderboard();

    return () => controller.abort();
  }, []);

  const getFeedback = () => {
    if (answers.length === 0) {
      return "Complete a quiz to get personalized feedback.";
    }

    const percentage = (correctAnswers / answers.length) * 100;

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
                {leaderboardLoading ? (
                  <p className="mt-4 text-center">Loading leaderboard...</p>
                ) : leaderboardError ? (
                  <p className="mt-4 text-center text-red-700" role="alert">
                    {leaderboardError}
                  </p>
                ) : leaderboard.length === 0 ? (
                  <p className="mt-4 text-center">No quiz scores yet.</p>
                ) : (
                  <ol className="mt-4 max-h-64 space-y-2 overflow-y-auto">
                    {leaderboard.map((leader, index) => (
                      <li
                        key={leader.uid}
                        className={`flex items-center justify-between gap-3 rounded-md px-3 py-2 ${
                          leader.uid === currentUserUid
                            ? "bg-[#f6d7a7] font-bold"
                            : "bg-white/60"
                        }`}
                      >
                        <span className="min-w-0 truncate">
                          {index + 1}. {leader.fullName}
                          {leader.uid === currentUserUid ? " (You)" : ""}
                        </span>
                        <span className="shrink-0 text-sm">
                          {leader.totalCorrectAnswers ?? 0} pts
                        </span>
                      </li>
                    ))}
                  </ol>
                )}
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
                {answers.length === 0 ? (
                  <p className="mt-4">Submit a quiz to see your question analysis.</p>
                ) : wrongAnswers === 0 ? (
                  <p className="mt-4">No incorrect answers. Great job!</p>
                ) : (
                  <>
                    <p className="mt-4">
                      You got {wrongAnswers} of {answers.length} questions wrong.
                    </p>
                    <button
                      type="button"
                      aria-expanded={showAnalysis}
                      aria-controls="incorrect-answer-review"
                      onClick={() => setShowAnalysis((visible) => !visible)}
                      className="mt-4 rounded-lg bg-[#d36831] px-5 py-2 font-semibold text-white hover:bg-[#b55424]"
                    >
                      {showAnalysis ? "Hide wrong answers" : "Show wrong answers"}
                    </button>
                    {showAnalysis && (
                      <ol
                        id="incorrect-answer-review"
                        className="mt-5 space-y-4 text-left"
                      >
                        {incorrectAnswers.map((answer, index) => (
                          <li
                            key={`${answer.questionNumber ?? index}-${answer.question}`}
                            className="rounded-lg bg-white/70 p-4"
                          >
                            <h3 className="font-bold">
                              Question {answer.questionNumber ?? index + 1}
                            </h3>
                            <p className="mt-1">{answer.question}</p>
                            <p className="mt-2 text-red-800">
                              Your answer: {answer.selectedAnswer ?? "Not answered"}
                            </p>
                            <p className="font-semibold text-green-800">
                              Correct answer: {answer.correctAnswer ?? "Unavailable"}
                            </p>
                          </li>
                        ))}
                      </ol>
                    )}
                  </>
                )}
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
