import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="flex items-center justify-center gap-5">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-bold border-b-2 border-blue-600 pb-1"
              : "text-gray-600 hover:text-blue-500"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/pastes"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-bold border-b-2 border-blue-600 pb-1"
              : "text-gray-600 hover:text-blue-500"
          }
        >
          pastes
        </NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
