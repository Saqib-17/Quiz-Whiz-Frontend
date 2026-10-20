import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import profileImage from "../assets/form-dp.png"; // same image as RN version

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);
  const [leaderboardError, setLeaderboardError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          setError("No logged-in user found.");
          setLoading(false);
          return;
        }

        const res = await fetch(
          `http://localhost:4000/api/users/${encodeURIComponent(currentUser.uid)}`,
        );

        if (!res.ok) {
          throw new Error("Could not load your profile.");
        }

        setUser(await res.json());
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.message || "Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLeaderboardClick = async () => {
    if (showLeaderboard) {
      setShowLeaderboard(false);
      return;
    }

    setShowLeaderboard(true);
    if (leaderboard.length > 0) return;

    setLeaderboardLoading(true);
    setLeaderboardError("");
    try {
      const response = await fetch(
        "http://localhost:4000/api/users/leaderboard",
      );
      if (!response.ok) {
        throw new Error("Could not load the leaderboard.");
      }

      const users = await response.json();
      if (!Array.isArray(users)) {
        throw new Error("The leaderboard response was invalid.");
      }

      setLeaderboard(users);
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
      setLeaderboardError(err.message || "Could not load the leaderboard.");
    } finally {
      setLeaderboardLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      alert("Logout Error: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8DC] flex flex-col">
      {/* Header */}
      <header className="bg-[#D36831] py-12 text-center rounded-b-3xl mb-8 shadow-md">
        <div className="flex flex-col items-center">
          <div className="border-4 border-[#FFD966] rounded-full p-1 mb-4">
            <img
              src={profileImage}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover"
            />
          </div>
          <h1 className="text-white text-2xl font-bold">
            Welcome, {user?.fullName || "Guest"}!
          </h1>
        </div>
      </header>

      {/* Profile Info */}
      <main className="flex flex-col items-center gap-6 px-4">
        <div className="bg-[#DFF1EA] w-full max-w-lg rounded-2xl shadow-md p-8">
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="loader border-t-4 border-[#D36831] rounded-full w-10 h-10 animate-spin"></div>
            </div>
          ) : error ? (
            <p className="text-center text-red-500 text-lg">{error}</p>
          ) : (
            <>
              <h2 className="text-[#6B1E00] text-xl font-bold mb-4 text-center">
                Profile Details
              </h2>
              <p className="text-gray-700 text-base mb-2">
                <strong>Full Name:</strong> {user?.fullName}
              </p>
              {user?.userClass && (
                <p className="text-gray-700 text-base mb-2">
                  <strong>Class:</strong> {user.userClass}
                </p>
              )}
              <p className="text-gray-700 text-base mb-2">
                <strong>Email:</strong> {user?.email}
              </p>
            </>
          )}
        </div>

        {!loading && !error && (
          <section className="w-full max-w-lg rounded-2xl bg-[#DFF1EA] p-8 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-[#6B1E00]">Previous Tests</h2>
              <button
                type="button"
                onClick={handleLeaderboardClick}
                aria-expanded={showLeaderboard}
                aria-controls="profile-leaderboard"
                className="rounded-lg bg-[#D36831] px-4 py-2 font-semibold text-white transition hover:bg-[#b55424]"
              >
                {showLeaderboard ? "Hide leaderboard" : "View leaderboard"}
              </button>
            </div>

            {user?.quizHistory?.length ? (
              <ol className="mt-5 space-y-3">
                {[...user.quizHistory].reverse().map((attempt, index) => {
                  const percentage = Math.round(
                    (attempt.correctAnswers / attempt.totalQuestions) * 100,
                  );

                  return (
                    <li
                      key={attempt._id ?? `${attempt.setName}-${attempt.attemptedAt}-${index}`}
                      className="rounded-lg bg-white/70 p-4"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h3 className="font-bold text-gray-800">
                            {attempt.setName}
                          </h3>
                          <p className="text-sm text-gray-600">{attempt.subject}</p>
                        </div>
                        <p className="font-semibold text-[#6B1E00]">
                          {attempt.correctAnswers}/{attempt.totalQuestions} ({percentage}%)
                        </p>
                      </div>
                      <time
                        className="mt-2 block text-sm text-gray-600"
                        dateTime={attempt.attemptedAt}
                      >
                        {new Date(attempt.attemptedAt).toLocaleString()}
                      </time>
                    </li>
                  );
                })}
              </ol>
            ) : (
              <p className="mt-5 text-gray-700">You haven’t completed any tests yet.</p>
            )}

            {showLeaderboard && (
              <div id="profile-leaderboard" className="mt-6 border-t border-[#b7d3c7] pt-5">
                <h3 className="text-lg font-bold text-[#6B1E00]">Leaderboard</h3>
                {leaderboardLoading ? (
                  <p className="mt-3">Loading leaderboard...</p>
                ) : leaderboardError ? (
                  <p className="mt-3 text-red-700" role="alert">
                    {leaderboardError}
                  </p>
                ) : leaderboard.length ? (
                  <ol className="mt-3 max-h-64 space-y-2 overflow-y-auto">
                    {leaderboard.map((leader, index) => (
                      <li
                        key={leader.uid}
                        className={`flex items-center justify-between gap-3 rounded-md px-3 py-2 ${
                          leader.uid === auth.currentUser?.uid
                            ? "bg-[#f6d7a7] font-bold"
                            : "bg-white/70"
                        }`}
                      >
                        <span className="min-w-0 truncate">
                          {index + 1}. {leader.fullName}
                          {leader.uid === auth.currentUser?.uid ? " (You)" : ""}
                        </span>
                        <span className="shrink-0 text-sm">
                          {leader.totalCorrectAnswers ?? 0} pts
                        </span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="mt-3">No quiz scores yet.</p>
                )}
              </div>
            )}
          </section>
        )}
      </main>

      {/* Logout Button */}
      {!loading && !error && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLogout}
            className="bg-[#D36831] text-white font-semibold px-8 py-3 rounded-xl hover:bg-[#b55424] transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
