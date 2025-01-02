import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import Home from '../assets/home.png';
import Features from '../assets/features.png';
import Solution from '../assets/solution.png';
import Support from '../assets/support.png';

export default function SidebarHeader() {
  return (
    <div>
      {/* Header Section */}
      <header className="bg-yellow-100 border-b border-yellow-200 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-4 hidden md:flex">
          <div className="w-14 h-10 rounded-full flex-shrink-0 overflow-hidden"></div>
          <span className="text-primary-color font-medium text-lg">Hello User</span>
        </div>
        <h1 className="text-3xl font-bold text-orange-600">QuizWhiz</h1>

        <div className="relative w-1/3 hidden md:block">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 16l-4-4m0 0l4-4m-4 4h16"
              />
            </svg>
          </span>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="w-full md:w-20 md:py-6 bg-yellow-100 border-t border-yellow-200 flex md:flex-col items-center justify-center md:fixed md:top-0 md:bottom-0 md:left-0 md:right-auto bottom-0 fixed md:border-r">
        <nav className="flex md:flex-col space-x-6 md:space-x-0 md:space-y-12">
          <Link to="/" className="text-orange-600 hover:text-orange-700"> {/* Changed from <a> to <Link> */}
            <img src={Home} alt="Home" className="w-6 h-6 md:w-12 md:h-12" />
          </Link>

          <Link to="/features" className="text-orange-600 hover:text-orange-700">
            <img src={Features} alt="Features" className="w-6 h-6 md:w-12 md:h-12" />
          </Link>

          <Link to="/solution" className="text-orange-600 hover:text-orange-700">
            <img src={Solution} alt="Solution" className="w-6 h-6 md:w-12 md:h-12" />
          </Link>

          <Link to="/support" className="text-orange-600 hover:text-orange-700">
            <img src={Support} alt="Support" className="w-6 h-6 md:w-12 md:h-12" />
          </Link>
        </nav>
      </aside>
    </div>
  );
}
