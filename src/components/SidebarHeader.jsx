import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import Home from '../assets/home.png';
import Features from '../assets/features.png';
import Solution from '../assets/solution.png';
import Support from '../assets/support.png';

export default function SidebarHeader() {
  return (
    <div>
      

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
