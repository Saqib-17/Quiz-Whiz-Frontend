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
            <Link
              to="/group"
              className="relative mx-auto rounded-xl bg-secondary-color px-2 py-4 text-xl font-normal text-primary-color shadow-[0_20px_50px_rgba(211,_104,_49,_0.7)] transition-transform hover:scale-105 hover:bg-pink hover:text-white lg:px-16 lg:py-8 lg:text-3xl group"
            >
              <div
                className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#d36831] via-[#ff4d6d] to-[#9d4edd] opacity-30 blur-lg transition duration-1000 group-hover:opacity-100 group-hover:duration-200"
              ></div>
              <span className="relative">Start Quiz</span>
            </Link>
            <p>Practice tests designed to boost your confidence and sharpen your skills.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
