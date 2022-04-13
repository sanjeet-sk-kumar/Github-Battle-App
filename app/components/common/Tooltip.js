import React from "react";
import Hover from "./Hover";
import { ThemeConsumer } from "../../context/theme";

const Tooltip = ({ children, text }) => {
  return (
    <ThemeConsumer>
      {({ theme }) => {
        return (
          <Hover>
            {(hovering) => (
              <div className="tooltip-container">
                {hovering && (
                  <p
                    className={
                      theme === "Dark" ? "tooltip-dark" : "tooltip-light"
                    }
                  >
                    {text}
                  </p>
                )}
                {children}
              </div>
            )}
          </Hover>
        );
      }}
    </ThemeConsumer>
  );
};

export default Tooltip;
