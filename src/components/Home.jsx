import { Link } from 'react-router-dom';
import onlineTestImage from '../assets/test.svg';

export default function Home() {
  return (
    <main className="bg-secondary-color flex justify-center">
      <div className="lg:py-10 animate-fade-in">
        <div className="flex flex-col lg:flex-row-reverse items-center text-primary-color gap-10 lg:gap-24">
          <img
            className="lg:w-[600px] hover:scale-105 transition-transform duration-300"
            src={onlineTestImage}
            alt="Exam illustration"
          />
          <div className="flex flex-col items-center lg:items-start lg:gap-16 space-y-4">
            <h1 className="font-medium lg:text-6xl text-3xl text-center">Get exam-ready,</h1>
            <h1 className="text-end font-medium lg:text-6xl text-3xl">stress-free.</h1>
            <Link to="/group">
              <button
                className="relative bg-secondary-color px-2 mx-auto lg:px-16 shadow-[0_20px_50px_rgba(211,_104,_49,_0.7)] text-primary-color rounded-xl lg:text-3xl text-xl lg:py-8 py-4 font-normal hover:bg-pink hover:text-white transition-transform transform hover:scale-105 group"
              >
                <div
                  className="absolute -inset-1 bg-gradient-to-r from-[#d36831] via-[#ff4d6d] to-[#9d4edd] rounded-xl blur-lg opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
                ></div>
                <span className="relative">Start Quiz</span>
              </button>
            </Link>
            <p>Practice tests designed to boost your confidence and sharpen your skills.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
