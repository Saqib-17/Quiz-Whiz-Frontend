import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SidebarHeader from "./SidebarHeader";
import physicsIcon from "../assets/physics.svg";
import chemistryIcon from "../assets/chemistry.svg";
import biologyIcon from "../assets/biology.svg";
import businessIcon from "../assets/businessSub.png";
import accountingIcon from "../assets/Accounting.png"; 
import economicsIcon from "../assets/Economics.png"; 
import historyIcon from "../assets/history.png"; 
import literatureIcon from "../assets/literature.png"; 
import geographyIcon from "../assets/geography.png"; 
import studentIllustration from "../assets/Cool Kids - Study.png";

export default function ChooseSubject() {
  const { group } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const subjectsByGroup = {
    Science: [
      { name: "physics", icon: physicsIcon },
      { name: "chemistry", icon: chemistryIcon },
      { name: "biology", icon: biologyIcon },
    ],
    Commerce: [
      { name: "business", icon: businessIcon },
      { name: "accounting", icon: accountingIcon },
      { name: "economics", icon: economicsIcon },
    ],
    Arts: [
      { name: "history", icon: historyIcon },
      { name: "literature", icon: literatureIcon },
      { name: "geography", icon: geographyIcon },
    ],
  };

  const subjects = subjectsByGroup[group] || [];

  const handleNavigation = (subject) => {
    setLoading(true);
    navigate(`/questionset/${subject}`);
  };

  return (
    <div className="bg-yellow-50 min-h-screen flex flex-col playwrite">
      <SidebarHeader />

      <main className="flex justify-center p-6 mt-16 md:mt-0">
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
          </div>
        ) : (
          <section className="text-center w-full max-w-6xl mx-auto">
            <h2 className="text-2xl lg:text-5xl font-bold text-maroon lg:pt-24">
              Choose Subject For Quiz
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 justify-center lg:pt-36 pt-6">

              {/* Left card */}
              {subjects[0] && (
                <button
                  onClick={() => handleNavigation(subjects[0].name)}
                  className="col-span-1 bg-yellow-200 rounded-lg shadow-md p-10 hover:bg-yellow-300 transition text-center"
                >
                  <img
                    src={subjects[0].icon}
                    alt={`${subjects[0].name} Icon`}
                    className="mx-auto w-20 h-20 mb-6"
                  />
                  <p className="text-2xl font-medium text-maroon">
                    {subjects[0].name.charAt(0).toUpperCase() + subjects[0].name.slice(1)}
                  </p>
                </button>
              )}

              {/* Middle card */}
              {subjects[1] && (
                <button
                  onClick={() => handleNavigation(subjects[1].name)}
                  className="col-span-1 lg:col-span-2 bg-yellow-300 rounded-lg shadow-lg p-12 hover:bg-yellow-400 transition text-center"
                >
                  <img
                    src={subjects[1].icon}
                    alt={`${subjects[1].name} Icon`}
                    className="mx-auto w-24 h-24 mb-6"
                  />
                  <p className="text-3xl font-bold text-maroon">
                    {subjects[1].name.charAt(0).toUpperCase() + subjects[1].name.slice(1)}
                  </p>
                </button>
              )}

              {/* Right card */}
              {subjects[2] && (
                <button
                  onClick={() => handleNavigation(subjects[2].name)}
                  className="col-span-1 bg-yellow-200 rounded-lg shadow-md p-10 hover:bg-yellow-300 transition text-center"
                >
                  <img
                    src={subjects[2].icon}
                    alt={`${subjects[2].name} Icon`}
                    className="mx-auto w-20 h-20 mb-6"
                  />
                  <p className="text-2xl font-medium text-maroon">
                    {subjects[2].name.charAt(0).toUpperCase() + subjects[2].name.slice(1)}
                  </p>
                </button>
              )}

            </div>
          </section>
        )}

        <div className="absolute bottom-4 right-4 hidden md:block">
          <img src={studentIllustration} alt="Student Illustration" className="w-80" />
        </div>
      </main>
    </div>
  );
}
