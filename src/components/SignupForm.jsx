import { useState } from "react";
import singupdp from '../assets/form-dp.svg';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.js";
import { getFirebaseErrorMessage } from "../firebase/firebaseErrors.js";

const SuccessModal = ({ closeModal }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">Welcome to QuizWhiz!</h2>
      <p className="text-gray-600 text-center mb-6">
         Your account has been created successfully.
      </p>
      <div className="flex justify-center">
        <button
          onClick={closeModal}
          className="px-6 py-2 bg-primary-color text-white rounded-md hover:bg-light-pink transition"
        >
          Start Exploring
        </button>
      </div>
    </div>
  </div>
);

export default function SignupForm() {
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [userClass, setUserClass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const response = await fetch("http://localhost:4000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          userClass,
          uid: user.uid,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create user on the backend.");
      }

      const data = await response.json();
      console.log("Backend response:", data);
      openModal();
    } catch (error) {
      console.error("Error during signup:", error);
      const customMessage =
        error.code ? getFirebaseErrorMessage(error.code) : "An unexpected error occurred. Please try again later.";
      setError(customMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-secondary-color flex items-center justify-center min-h-screen playwrite">
      <div className="rounded-lg shadow-lg flex flex-col md:flex-row p-4 sm:p-6 md:p-8 max-w-4xl w-full">
        <div className="md:w-1/2 flex flex-col items-center justify-center p-4 sm:p-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary-color mb-4">QuizWhiz</h1>
          <div className="w-40 h-40 sm:w-48 sm:h-48 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <img src={singupdp} alt="QuizWhiz Logo" className="lg:w-full" />
          </div>
        </div>

        <div className="md:w-1/2 p-4 sm:p-6 bg-[#d4e5dc] rounded-lg">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800 text-center md:text-left">
            Create a New Account
          </h2>
          <p className="text-gray-600 mb-6 text-sm sm:text-base text-center md:text-left">
            Join QuizWhiz Today
          </p>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {loading && (
            <div className="loader text-primary-color"></div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="full-name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-color focus:border-primary-color sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-color focus:border-primary-color sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-color focus:border-primary-color sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-color focus:border-primary-color sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="class" className="block text-sm font-medium text-gray-700">Enter your class</label>
              <input
                type="text"
                id="class"
                value={userClass}
                onChange={(e) => setUserClass(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-color focus:border-primary-color sm:text-sm"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-color hover:bg-light-pink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-color"
              >
                {loading ? "Processing..." : "Sign Up"}
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-gray-600 text-sm">
            Already have an account? <a href="/login" className="text-primary-color hover:underline">Log in</a>
          </p>
        </div>
      </div>

      {modalVisible && <SuccessModal closeModal={closeModal} />}
    </div>
  );
}