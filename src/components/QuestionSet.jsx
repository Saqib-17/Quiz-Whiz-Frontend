import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../firebase/firebase";

export default function QuestionSet() {
  const { subject } = useParams();
  const navigate = useNavigate();

  const [questionSets, setQuestionSets] = useState([]);
  const [selectedSetId, setSelectedSetId] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const selectedSet = questionSets.find((set) => set._id === selectedSetId);
  const questions = selectedSet?.questions ?? [];

  useEffect(() => {
    const controller = new AbortController();

    const fetchQuestionSets = async () => {
      setLoading(true);
      setError(null);
      setQuestionSets([]);
      setSelectedSetId("");
      setSelectedAnswers({});

      if (!subject) {
        setError("Invalid subject provided.");
        setLoading(false);
        return;
      }

      const baseURL = "http://localhost:4000";

      try {
        const response = await fetch(
          `${baseURL}/api/questions/${encodeURIComponent(subject)}`,
          {
            headers: { "Content-Type": "application/json" },
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch question sets: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
          setError("No question sets available for this subject.");
          return;
        }

        setQuestionSets(data);
        setSelectedSetId(data[0]._id);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error fetching question sets:", err);
          setError(
            err.message.includes("Failed to fetch")
              ? "Unable to connect to the server. Please check your connection."
              : "Something went wrong. Please try again.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchQuestionSets();

    return () => controller.abort();
  }, [subject]);

  const handleSubmit = async () => {
    if (!selectedSet || submitting) return;

    const currentUser = auth.currentUser;
    if (!currentUser) {
      setSubmitError("Please log in again before submitting your quiz.");
      return;
    }

    const answers = questions.map((question, index) => {
      const selectedText = selectedAnswers[index];
      const selectedOption = question.options.find(
        (option) => option.text === selectedText,
      );
      const correctOption = question.options.find((option) => option.isCorrect);

      return {
        questionNumber: index + 1,
        question: question.title,
        selectedAnswer: selectedOption?.text ?? "Not answered",
        correctAnswer: correctOption?.text ?? "Correct answer unavailable",
        isCorrect: selectedOption?.isCorrect ?? false,
      };
    });

    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch(
        `http://localhost:4000/api/users/${encodeURIComponent(currentUser.uid)}/attempts`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            answers,
            subject,
            setName: selectedSet.setName,
          }),
        },
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not save your quiz result.");
      }

      navigate("/dashboard", { state: { answers } });
    } catch (err) {
      console.error("Error submitting quiz:", err);
      setSubmitError(err.message || "Could not save your quiz result.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="bg-yellow-50 min-h-screen flex flex-col playwrite">
      <header className="border-b py-4 px-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 mx-auto">
          <select
            id="question-set"
            value={selectedSetId}
            onChange={(event) => {
              setSelectedSetId(event.target.value);
              setSelectedAnswers({});
            }}
            className="border border-primary-color rounded px-3 py-2 bg-yellow-100"
          >
            {questionSets.map((set) => (
              <option key={set._id} value={set._id}>
                {set.setName}
              </option>
            ))}
          </select>
        </div>
      </header>

      <main className="flex-grow p-6 md:p-12 mx-4 lg:mx-60">
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {questions.map((question, index) => (
            <div
              key={`${selectedSetId}-${index}`}
              className="bg-[#d4e5dc] shadow-lg rounded-lg p-4 md:p-6 hover:bg-[#c8e0d3] transition"
            >
              <h2 className="text-xl font-semibold text-primary-color mb-2">
                Question {index + 1}
              </h2>

              <p className="text-gray-700 mb-4">{question.title}</p>

              <div className="mt-4 grid grid-cols-2 gap-2">
                {question.options.map((option, optionIndex) => (
                  <label
                    key={optionIndex}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="radio"
                      name={`q-${selectedSetId}-${index}`}
                      value={option.text}
                      checked={selectedAnswers[index] === option.text}
                      onChange={() =>
                        setSelectedAnswers((previousAnswers) => ({
                          ...previousAnswers,
                          [index]: option.text,
                        }))
                      }
                      className="accent-green-500"
                    />
                    <span>{option.text}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </section>

        {submitError && (
          <p className="text-center text-red-700" role="alert">
            {submitError}
          </p>
        )}

        <div className="col-span-1 sm:col-span-2 flex justify-center my-4">
          <button
            type="button"
            className="text-white bg-gradient-to-r from-[#d36831] via-[#e47a4a] to-[#f08f5c] font-medium rounded-lg text-sm px-6 py-3 disabled:opacity-50"
            onClick={handleSubmit}
            disabled={!selectedSet || submitting}
          >
            {submitting ? "Saving..." : "Submit"}
          </button>
        </div>
      </main>
    </div>
  );
}
