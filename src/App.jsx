import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { auth } from './firebase/firebase';
import Header from './components/Header';
import Home from './components/Home';
import Features from './components/Features';
import Footer from './components/Footer';
import SignupForm from './components/SignupForm';
import Group from './components/Group';
import ChooseSubject from './components/Subject'; 
import QuestionSet from './components/QuestionSet';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Profile from './components/Profile';

function App() {
  const location = useLocation();


  const RequireAuth = (Component) => {
    return auth.currentUser ? <Component /> : <Navigate to="/login" replace />;
  };

  return (
    <>
  
      <Header />

      {/* Main Routes */}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signupform" element={<SignupForm />} />
        <Route path="/login" element={<Login />} />

      
        <Route path="/group" element={RequireAuth(Group)} />

        
        <Route path="/subject/:group" element={RequireAuth(ChooseSubject)} />

        <Route path="/questionset/:subject" element={RequireAuth(QuestionSet)} />
        <Route path="/dashboard" element={RequireAuth(Dashboard)} />
        <Route path="/profile" element={RequireAuth(Profile)} />

      
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      
      {location.pathname === '/' && <Features />}
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
