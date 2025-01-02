import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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

function App() {
  const location = useLocation(); // Get the current location

  return (
    <>
      {/* Conditionally render Header based on routes */}
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/signupform" element={<Header />} />
        <Route path="/login" element={<Header />} />
      </Routes>

      {/* Main Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signupform" element={<SignupForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/group" element={<Group />} />
        <Route path="/subject" element={<Subject />} />
        <Route path="/questionset/:subject" element={<QuestionSet />} />
        <Route path="/dashboard" element={<Dashboard />} />
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
