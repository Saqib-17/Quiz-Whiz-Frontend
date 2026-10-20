import { Link } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { useState, useEffect } from 'react';

export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoggedIn(Boolean(user));
    });
    return () => unsubscribe();
  }, []);

  return (
    <header className="lg:px-40 px-2 py-2 bg-secondary-color shadow-md sticky top-0 z-50">
      <nav>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div>
            <Link
              to="/"
              className="text-primary-color lg:text-3xl font-medium hover:text-brown transition-colors duration-300"
            >
              QuizWhiz
            </Link>
          </div>

          {/* Nav Links */}
          <div className="hidden lg:flex">
            <ul className="flex space-x-4">
              <li>
                <Link to="/features" className="text-primary-color lg:text-lg hover:text-pink transition-colors duration-300">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/solution" className="text-primary-color lg:text-lg hover:text-pink transition-colors duration-300">
                  Solution
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-primary-color lg:text-lg hover:text-pink transition-colors duration-300">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Auth Button */}
          <div>
            {!loggedIn ? (
              <Link
                to="/signupform"
                className="lg:text-lg bg-primary-color font-medium rounded-full px-8 py-2 text-white hover:bg-pink transition-transform transform hover:scale-105"
              >
                Try for Free
              </Link>
            ) : (
              <Link
                to="/profile"
                className="lg:text-lg bg-primary-color font-medium rounded-full px-8 py-2 text-white hover:bg-pink transition-transform transform hover:scale-105"
              >
                Profile
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
