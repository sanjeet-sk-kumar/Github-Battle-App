import React from "react";
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle,
} from "react-icons/fa";
import fetchPopularRepos from "../utils/api";
import Card from "./common/Card";
import Loader from "./common/Loader";
import Tooltip from "./common/Tooltip";

const ReposGrid = ({ repos = [] }) => {
  console.log(repos, "Inside RepoGrid");
  return (
    <div className="grid-box">
      {repos.map((repo, index) => {
        const { owner, html_url, stargazers_count, open_issues, forks } = repo;
        const { login, avatar_url } = owner;
        return (
          <Card
            headerText={`#${index + 1}`}
            login={login}
            url={avatar_url}
            href={html_url}
          >
            <ul className="card-list">
              <li>
                <Tooltip text="Github username">
                  <FaUser className="avatar-sm" color="#FFBF74" size={22} />
                  <a href={`https://github.com/${login}`}>{login}</a>
                </Tooltip>
              </li>
              <li>
                <FaStar color="#F5CD00" size={22} />
                {stargazers_count} stars
              </li>
              <li>
                <FaCodeBranch color="#8BCDFF" size={22} />
                {forks} forks
              </li>
              <li>
                <FaExclamationTriangle color="rgb(241, 138, 147)" size={22} />
                {open_issues} open issues
              </li>
            </ul>
          </Card>
        );
      })}
    </div>
  );
};

const LanguageNavBar = ({
  languages = [],
  onLanguageChanged,
  languageSelected,
}) => {
  return (
    <ul className="flex-center">
      {languages.map((lang) => (
        <li key={lang}>
          <button
            className={
              `btn-clear navlink pointer` +
              (languageSelected === lang ? " active" : "")
            }
            onClick={() => onLanguageChanged(lang)}
          >
            {lang}
          </button>
        </li>
      ))}
    </ul>
  );
};

const Popular = () => {
  const languages = ["All", "Javascript", "CSS", "Ruby", "Java", "Python"];
  const [selectedLang, setSelectedLang] = React.useState("All");
  const [repos, setRepos] = React.useState({});
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    fetchPopularRepos(selectedLang)
      .then((res) => {
        console.log(res);
        setRepos((prev) => ({ ...prev, [selectedLang]: res }));
      })
      .catch((err) => setError(`Something went wrong. cause ${err}`));
  }, [selectedLang]);

  const updateLanguage = (lang) => {
    setSelectedLang(lang);
  };

  const isLoading = () => {
    return !repos[selectedLang] && !error;
  };
  return (
    <>
      <LanguageNavBar
        languages={languages}
        languageSelected={selectedLang}
        onLanguageChanged={(lang) => updateLanguage(lang)}
      />
      {isLoading() && <Loader loaderText="Fetching Repos" delay="400" />}
      {error && <p className="error-msg">{error}</p>}
      {repos[selectedLang] && <ReposGrid repos={repos[selectedLang]} />}
    </>
  );
};

export default Popular;
