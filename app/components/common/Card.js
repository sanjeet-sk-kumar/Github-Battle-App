import React from "react";
import { ThemeConsumer } from "../../context/theme";

const Card = ({ login, headerText, subheaderText, url, href, children }) => {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className={`card` + (theme === "Dark" ? " dark-bg" : "")}>
          {headerText && (
            <h4 className="center-text lg-header">{headerText}</h4>
          )}
          <img src={url} alt={`avatar of ${login}`} className="avatar" />
          {subheaderText && <h4 className="center-text">{subheaderText}</h4>}
          <h2 className="center-text">
            <a href={href} className="link">
              {login}
            </a>
          </h2>
          {children}
        </div>
      )}
    </ThemeConsumer>
  );
};

export default Card;
