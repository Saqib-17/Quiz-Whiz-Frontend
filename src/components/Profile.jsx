import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import profileImage from "../assets/form-dp.png"; // same image as RN version

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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

        const res = await fetch("https://quiz-whiz-backend.vercel.app/api/users");
        const users = await res.json();
        const foundUser = users.find(
          (u) => u.uid === currentUser.uid || u.email === currentUser.email
        );

        if (!foundUser) {
          setError("User profile not found.");
        } else {
          setUser(foundUser);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

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
      <main className="flex justify-center px-4">
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
