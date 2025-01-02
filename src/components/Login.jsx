import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";

const SuccessModal = ({ closeModal }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">🎉 Login Successful!</h2>
      <p className="text-gray-600 text-center mb-6">
        Welcome back! You are being redirected to the home page.
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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setModalVisible(true);
  const closeModal = () => {
    setModalVisible(false);
    navigate("/"); // Redirect immediately after closing the modal
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      openModal();
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-secondary-color flex items-center justify-center min-h-screen">
      <div className="rounded-lg shadow-lg p-6 bg-[#d4e5dc] w-96">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Login to Your Account</h2>
        <form onSubmit={handleLogin} className="space-y-4">
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
          {error && <p className="text-red-500 text-center">{error}</p>}
          {loading && <p className="text-center text-gray-500">Logging in...</p>}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-color hover:bg-light-pink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-color"
            >
              {loading ? "Processing..." : "Login"}
            </button>
          </div>
        </form>
      </div>

      {modalVisible && <SuccessModal closeModal={closeModal} />}
    </div>
  );
}
