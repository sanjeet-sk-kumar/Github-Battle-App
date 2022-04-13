import React from "react";
import { ThemeConsumer } from "../../context/theme";
const Loader = ({ loaderText = "Loading", delay = 1000 }) => {
  const [text, setText] = React.useState(loaderText);
  React.useEffect(() => {
    const id = setInterval(
      () =>
        setText((prev) =>
          prev === loaderText + "..." ? loaderText : prev + "."
        ),
      delay
    );
    return () => clearInterval(id);
  }, [loaderText, delay]);
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div
          className={`flex-center loader ` + (theme === "Dark" ? "dark" : "")}
        >
          <h2 className="lg-header">{text}</h2>
        </div>
      )}
    </ThemeConsumer>
  );
};

export default Loader;
