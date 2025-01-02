import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SidebarHeader from "./SidebarHeader";
import physicsIcon from "../assets/physics.svg";
import chemistryIcon from "../assets/chemistry.svg";
import biologyIcon from "../assets/biology.svg";
import studentIllustration from "../assets/Cool Kids - Study.png";

export default function ChooseSubject() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleNavigation = (subject) => {
    setLoading(true);
    navigate(`/questionset/${subject}`);
  };

  return (
    <div className="bg-yellow-50 min-h-screen flex flex-col playwrite">
      <SidebarHeader />

      <main className="flex justify-center lg:ml-16 p-6 mt-16 md:mt-0">
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
          </div>
        ) : (
          <section className="text-center">
            <h2 className="text-2xl lg:text-5xl font-bold text-maroon lg:pt-24">
              Choose Subject For Quiz
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 justify-center lg:pt-36 pt-6">
              <button
                onClick={() => handleNavigation("physics")}
                className="col-span-1 bg-yellow-200 rounded-lg shadow-md p-10 hover:bg-yellow-300 transition text-center"
              >
                <img
                  src={physicsIcon}
                  alt="Physics Icon"
                  className="mx-auto w-20 h-20 mb-6"
                />
                <p className="text-2xl font-medium text-maroon">Physics</p>
              </button>

              <button
                onClick={() => handleNavigation("chemistry")}
                className="col-span-1 lg:col-span-2 bg-yellow-300 rounded-lg shadow-lg p-12 hover:bg-yellow-400 transition text-center"
              >
                <img
                  src={chemistryIcon}
                  alt="Chemistry Icon"
                  className="mx-auto w-24 h-24 mb-6"
                />
                <p className="text-3xl font-bold text-maroon">Chemistry</p>
              </button>

              <button
                onClick={() => handleNavigation("biology")}
                className="col-span-1 bg-yellow-200 rounded-lg shadow-md p-10 hover:bg-yellow-300 transition text-center"
              >
                <img
                  src={biologyIcon}
                  alt="Biology Icon"
                  className="mx-auto w-20 h-20 mb-6"
                />
                <p className="text-2xl font-medium text-maroon">Biology</p>
              </button>
            </div>
          </section>
        )}
        <div className="absolute bottom-4 right-4 hidden md:block">
          <img
            src={studentIllustration}
            alt="Student Illustration"
            className="w-80"
          />
        </div>
      </main>
    </div>
  );
}
