import React from "react";
import fun from "../assets/fun.png";
import track from "../assets/track.png";
import boost from "../assets/boost.png";

export default function Features() {
  return (
    <section  id="features" className="bg-secondary-color min-h-screen flex flex-col justify-center items-center py-40 px-6 lg:px-24 relative z-0">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl text-[#d36831] mb-20 text-center font-bold">
        Exciting Features Are Coming Soon!
      </h1>

      {/* Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-16 max-w-6xl w-full">

        {/* Fun Quizzes Card */}
        <div className="relative z-0 flex flex-col items-center gap-4 rounded-2xl p-10 sm:p-12 shadow-md hover:shadow-2xl hover:scale-105 transition-transform duration-300 min-h-[300px] overflow-hidden bg-gradient-to-br from-[#f6a185] to-[#ec9e78]">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-200 via-pink-200 to-yellow-200 opacity-20 blur-xl scale-110 pointer-events-none z-0"></div>
          <div className="bg-white p-4 rounded-full shadow-lg mb-4 transform hover:-translate-y-2 transition duration-300 z-10">
            <img src={fun} alt="Fun Quizzes" className="w-32 h-32 sm:w-40 sm:h-40 object-contain" />
          </div>
          <h3 className="font-bold text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-500 z-10">
            Fun Quizzes
          </h3>
          <p className="text-gray-800 text-sm sm:text-base text-center z-10">
            Engaging quizzes for all subjects.
          </p>
        </div>

        {/* Track Progress Card */}
        <div className="relative z-0 flex flex-col items-center gap-4 rounded-2xl p-10 sm:p-12 shadow-md hover:shadow-2xl hover:scale-105 transition-transform duration-300 min-h-[300px] overflow-hidden bg-gradient-to-br from-[#ffb085] to-[#ff9d6a]">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 via-orange-200 to-pink-200 opacity-20 blur-xl scale-110 pointer-events-none z-0"></div>
          <div className="bg-white p-4 rounded-full shadow-lg mb-4 transform hover:-translate-y-2 transition duration-300 z-10">
            <img src={track} alt="Track Progress" className="w-32 h-32 sm:w-40 sm:h-40 object-contain" />
          </div>
          <h3 className="font-bold text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-500 z-10">
            Track Progress
          </h3>
          <p className="text-gray-800 text-sm sm:text-base text-center z-10">
            Monitor your learning and improvement.
          </p>
        </div>

        {/* Boost Knowledge Card */}
        <div className="relative z-0 flex flex-col items-center gap-4 rounded-2xl p-10 sm:p-12 shadow-md hover:shadow-2xl hover:scale-105 transition-transform duration-300 min-h-[300px] overflow-hidden bg-gradient-to-br from-[#f6c89f] to-[#f3b87a]">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-200 via-yellow-200 to-orange-200 opacity-20 blur-xl scale-110 pointer-events-none z-0"></div>
          <div className="bg-white p-4 rounded-full shadow-lg mb-4 transform hover:-translate-y-2 transition duration-300 z-10">
            <img src={boost} alt="Boost Knowledge" className="w-32 h-32 sm:w-40 sm:h-40 object-contain" />
          </div>
          <h3 className="font-bold text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-500 z-10">
            Boost Knowledge
          </h3>
          <p className="text-gray-800 text-sm sm:text-base text-center z-10">
            Strengthen understanding and memory with fun.
          </p>
        </div>

      </div>

      {/* Call to Action */}
      <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
        <a
          href="mailto:sakib17shahidul@gmail.com"
          className="px-6 py-3 bg-[#d36831] text-white rounded-full hover:bg-[#ff4d6d] transition duration-300"
        >
          Contact Me
        </a>
        <a
          href="https://drive.google.com/file/d/1IexOYfIYzKe7QeHKx27_2SvXTigHdZSS/view?usp=sharing"
          target="_blank"
          className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300"
        >
          Download APK
        </a>
      </div>

      {/* Small Note */}
      <p className="text-gray-500 text-s mt-6 text-center max-w-sm">
        Our mobile app is under active development. Stay tuned for updates and new
        features!
      </p>
    </section>
  );
}
