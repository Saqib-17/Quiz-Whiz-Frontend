import { Link } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { useState, useEffect } from 'react';

export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        setUserName(user.displayName || user.email?.split('@')[0] || "User");
      } else {
        setLoggedIn(false);
        setUserName("");
      }
    });
    return () => unsubscribe();
  }, []);

  // Function to handle smooth scroll for internal links
  const handleScroll = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      const yOffset = -80; // adjust for sticky navbar height
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

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
                <Link
                  to="/"
                  onClick={(e) => handleScroll(e, "features")}
                  className="text-primary-color lg:text-lg hover:text-pink transition-colors duration-300 cursor-pointer"
                >
                  Features
                </Link>
              </li>
              <li>
                <button>
                  <a className="text-primary-color lg:text-lg hover:text-pink transition-colors duration-300">
                    Solution
                  </a>
                </button>
              </li>
              <li>
                <button>
                  <a className="text-primary-color lg:text-lg hover:text-pink transition-colors duration-300">
                    Support
                  </a>
                </button>
              </li>
            </ul>
          </div>

          {/* Auth Button */}
          <div>
            {!loggedIn ? (
              <button>
                <Link
                  to="/SignupForm"
                  className="lg:text-lg bg-primary-color font-medium rounded-full px-8 py-2 text-white hover:bg-pink transition-transform transform hover:scale-105"
                >
                  Try for Free
                </Link>
              </button>
            ) : (
              <button>
                <Link
                  to="/profile"
                  className="lg:text-lg bg-primary-color font-medium rounded-full px-8 py-2 text-white hover:bg-pink transition-transform transform hover:scale-105"
                >
                  Profile
                </Link>
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
