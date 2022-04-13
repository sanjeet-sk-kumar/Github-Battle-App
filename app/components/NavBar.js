import React from "react";
import { ThemeConsumer } from "../context/theme";
import { FaMoon, FaRegSun, FaCloudSun, FaSun } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => (
        <div className="navbar">
          <nav className="row space-between">
            <ul className="row nav">
              <li className="mar-right10">
                <NavLink
                  exact
                  to="/"
                  className="navlink"
                  activeStyle={{ color: "#a6105b" }}
                >
                  Popular
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  to="/battle"
                  className="navlink"
                  activeStyle={{ color: "#a6105b" }}
                >
                  Battle
                </NavLink>
              </li>
            </ul>
            <button
              className="btn-clear btn-font pointer"
              onClick={toggleTheme}
            >
              {theme === "Light" ? (
                <FiMoon color="#908e8d" />
              ) : (
                <FiSun color="#908e8d" />
              )}
            </button>
          </nav>
        </div>
      )}
    </ThemeConsumer>
  );
};

export default NavBar;
