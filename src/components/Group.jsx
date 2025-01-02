import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import SidebarHeader from './SidebarHeader';  // Import the SidebarHeader component
import science from '../assets/science.svg';
import business from '../assets/business.svg';
import arts from '../assets/arts.svg';
import studentIllustration from '../assets/Cool Kids - Study.png';

export default function Group() {
  return (
    <div className="bg-yellow-50 min-h-screen flex flex-col playwrite">
  
      {/* Sidebar & Header */}
      <SidebarHeader />
  
      {/* Main Content */}
      <main className="flex justify-center lg:ml-16 p-6 mt-16 md:mt-0">
        <section className="text-center">
          <h2 className="text-2xl lg:text-5xl font-bold text-maroon lg:pt-24">Which Group are you in?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 justify-center lg:pt-36 pt-6">
            {/* Commerce */}
            <div className="col-span-1 bg-yellow-200 rounded-lg shadow-md p-10 hover:bg-yellow-300 transition text-center">
              <img src={business} alt="Commerce Icon" className="mx-auto w-20 h-20 mb-6" />
              <p className="text-2xl font-medium text-maroon">Commerce</p>
            </div>
  
            {/* Science (Middle Card) */}
            <Link
              to="/subject"  // Use the Link component for routing
              className="col-span-1 lg:col-span-2 bg-yellow-300 rounded-lg shadow-lg p-12 hover:bg-yellow-400 transition text-center cursor-pointer">
              <img src={science} alt="Science Icon" className="mx-auto w-24 h-24 mb-6" />
              <p className="text-3xl font-bold text-maroon">Science</p>
            </Link>
  
            {/* Arts */}
            <div className="col-span-1 bg-yellow-200 rounded-lg shadow-md p-10 hover:bg-yellow-300 transition text-center">
              <img src={arts} alt="Arts Icon" className="mx-auto w-20 h-20 mb-6" />
              <p className="text-2xl font-medium text-maroon">Arts</p>
            </div>
          </div>
        </section>
  
        {/* Bottom Right Illustration */}
        <div className="absolute bottom-4 right-4 hidden md:block">
          <img src={studentIllustration} alt="Student Illustration" className="w-80" />
        </div>
      </main>
    </div>
  );
}
