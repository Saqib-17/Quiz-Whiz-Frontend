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

  return (
    <header className="lg:px-40 px-2 py-2 bg-secondary-color shadow-md sticky top-0 z-10">
      <nav>
        <div className="flex items-center justify-between">
          <div>
            <Link
              to="/"
              className="text-primary-color lg:text-3xl font-medium hover:text-brown transition-colors duration-300"
            >
              QuizWhiz
            </Link>
          </div>

          <div className="hidden lg:flex">
            <ul className="flex space-x-4">
              <li>
                <button>
                  <a className="text-primary-color lg:text-lg hover:text-pink transition-colors duration-300">
                    Features
                  </a>
                </button>
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
