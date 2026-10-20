import { useEffect, useState } from "react";
import SidebarHeader from "./SidebarHeader";
import { auth } from "../firebase/firebase";

export default function Solutions() {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchSolutions = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setError("Please log in to view your solutions.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:4000/api/users/${encodeURIComponent(currentUser.uid)}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Could not load your attempted tests.");
        }

        const user = await response.json();
        const attemptedTests = Array.isArray(user.quizHistory)
          ? [...user.quizHistory]
              .filter((attempt) => Array.isArray(attempt.answers) && attempt.answers.length > 0)
              .reverse()
          : [];
        setAttempts(attemptedTests);
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          console.error("Error fetching attempted solutions:", fetchError);
          setError(fetchError.message || "Could not load your attempted tests.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchSolutions();
    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen bg-yellow-50 pb-20 md:pb-0 playwrite">
      <SidebarHeader />
      <main className="mx-auto max-w-5xl px-4 py-10 md:px-8 md:pl-28">
        <h1 className="text-3xl font-bold text-[#6B1E00]">Attempted Test Solutions</h1>

        {loading ? (
          <p className="mt-6">Loading solutions...</p>
        ) : error ? (
          <p className="mt-6 text-red-700" role="alert">{error}</p>
        ) : attempts.length === 0 ? (
          <p className="mt-6">No attempted test solutions yet.</p>
        ) : (
          <div className="mt-6 space-y-4">
            {attempts.map((attempt, attemptIndex) => (
              <details
                key={attempt._id ?? `${attempt.subject}-${attempt.setName}-${attemptIndex}`}
                className="rounded-lg bg-[#DFF1EA] p-5 shadow-sm"
              >
                <summary className="cursor-pointer list-none">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-bold text-[#6B1E00]">
                        {attempt.setName}
                      </h2>
                      <p className="text-sm text-gray-700">{attempt.subject}</p>
                      <time className="text-sm text-gray-600" dateTime={attempt.attemptedAt}>
                        {new Date(attempt.attemptedAt).toLocaleString()}
                      </time>
                    </div>
                    <span className="font-semibold text-[#6B1E00]">
                      {attempt.correctAnswers}/{attempt.totalQuestions} marks
                    </span>
                  </div>
                </summary>

                <ol className="mt-5 space-y-3 border-t border-[#b7d3c7] pt-4">
                  {attempt.answers.map((answer, answerIndex) => (
                    <li
                      key={`${answer.questionNumber ?? answerIndex}-${answer.question}`}
                      className="rounded-md bg-white/70 p-4"
                    >
                      <h3 className="font-semibold">
                        Question {answer.questionNumber ?? answerIndex + 1}: {answer.question}
                      </h3>
                      <p className={answer.isCorrect ? "mt-2 text-green-800" : "mt-2 text-red-800"}>
                        Your answer: {answer.selectedAnswer}
                      </p>
                      <p className="font-semibold text-green-800">
                        Correct answer: {answer.correctAnswer}
                      </p>
                    </li>
                  ))}
                </ol>
              </details>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
