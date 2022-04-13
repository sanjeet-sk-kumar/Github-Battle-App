import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ThemeProvider } from "./context/theme";
import NavBar from "./components/NavBar";
import Loader from "./components/common/Loader";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Popular = React.lazy(() => import("./components/Popular"));
const Battle = React.lazy(() => import("./components/Battle"));
const Results = React.lazy(() => import("./components/Results"));
const App = () => {
  const [theme, setTheme] = React.useState("Dark");
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "Light" ? "Dark" : "Light"));
  };
  const value = React.useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme]
  );
  return (
    <ThemeProvider value={value}>
      <div className={`container` + (theme === "Light" ? " light" : " dark")}>
        <Router>
          <NavBar className="navbar"></NavBar>
          <React.Suspense fallback={<Loader />}>
            <Switch>
              <Route exact path="/" component={Popular} />
              <Route exact path="/battle" component={Battle} />
              <Route exact path="/battle/results" component={Results} />
            </Switch>
          </React.Suspense>
        </Router>
      </div>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
