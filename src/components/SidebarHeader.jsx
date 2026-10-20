import { NavLink } from 'react-router-dom';
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
          <NavLink to="/" aria-label="Home" title="Home" className={({ isActive }) => isActive ? "text-orange-700" : "text-orange-600 hover:text-orange-700"}>
            <img src={Home} alt="" className="w-6 h-6 md:w-12 md:h-12" />
          </NavLink>

          <NavLink to="/features" aria-label="Features" title="Features" className={({ isActive }) => isActive ? "text-orange-700" : "text-orange-600 hover:text-orange-700"}>
            <img src={Features} alt="" className="w-6 h-6 md:w-12 md:h-12" />
          </NavLink>

          <NavLink to="/solution" aria-label="Solutions" title="Solutions" className={({ isActive }) => isActive ? "text-orange-700" : "text-orange-600 hover:text-orange-700"}>
            <img src={Solution} alt="" className="w-6 h-6 md:w-12 md:h-12" />
          </NavLink>

          <NavLink to="/support" aria-label="Support" title="Support" className={({ isActive }) => isActive ? "text-orange-700" : "text-orange-600 hover:text-orange-700"}>
            <img src={Support} alt="" className="w-6 h-6 md:w-12 md:h-12" />
          </NavLink>
        </nav>
      </aside>
    </div>
  );
}
