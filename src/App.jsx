import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { auth } from './firebase/firebase';
import Header from './components/Header';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import SignupForm from './components/SignupForm';
import Group from './components/Group';
import Subject from './components/Subject';
import QuestionSet from './components/QuestionSet';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Profile from './components/Profile';

function App() {
  const location = useLocation();

  // Function to protect private routes
  const RequireAuth = (Component) => {
    return auth.currentUser ? <Component /> : <Navigate to="/login" replace />;
  };

  return (
    <>
      {/* Render Header */}
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/signupform" element={<Header />} />
        <Route path="/login" element={<Header />} />
        <Route path="/group" element={<Header />} />
        <Route path="/subject" element={<Header />} />
        <Route path="/questionset/:subject" element={<Header />} />
        <Route path="/dashboard" element={<Header />} />
        <Route path="/profile" element={<Header />} />
      </Routes>

      {/* Main Routes */}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signupform" element={<SignupForm />} />
        <Route path="/login" element={<Login />} />

        {/* Private routes */}
        <Route path="/group" element={RequireAuth(Group)} />
        <Route path="/subject" element={RequireAuth(Subject)} />
        <Route path="/questionset/:subject" element={RequireAuth(QuestionSet)} />
        <Route path="/dashboard" element={RequireAuth(Dashboard)} />
        <Route path="/profile" element={RequireAuth(Profile)} />
      </Routes>

      {/* Render AboutUs on Landing Page */}
      {location.pathname === '/' && <AboutUs />}

      {/* Render Footer only on the Landing Page */}
      {location.pathname === '/' && <Footer />}
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
