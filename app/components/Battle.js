import React from "react";
import { ThemeConsumer } from "../context/theme";
import {
  FaUserFriends,
  FaFighterJet,
  FaTrophy,
  FaSearch,
  FaTimesCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Instruction = () => {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className="instruction-container">
          <h1 className="center-text lg-header">Instruction</h1>
          <ol className="container-sm grid-box pad0">
            <li className="center-text">
              <h3 className="sm-header">Enter Two github user</h3>
              <FaUserFriends
                className={`avatar ${theme === "Dark" ? "dark" : "light"}-bg`}
                color="#CD8D42"
                size={140}
              />
            </li>
            <li className="center-text">
              <h3 className="sm-header">Battle</h3>
              <FaFighterJet
                className={`avatar ${theme === "Dark" ? "dark" : "light"}-bg `}
                color="rgb(144 142 141)"
                size={140}
              />
            </li>
            <li className="center-text">
              <h3 className="sm-header">See the winner</h3>
              <FaTrophy
                className={`avatar ${theme === "Dark" ? "dark" : "light"}-bg`}
                color="#F5CD00"
                size={140}
              />
            </li>
          </ol>
        </div>
      )}
    </ThemeConsumer>
  );
};

const PlayerInput = ({ label, onSubmit }) => {
  const [userName, setUserName] = React.useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(userName);
  };
  const onUsernameChanged = (event) => {
    setUserName(event.target.value);
  };
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <form className="player" onSubmit={handleSubmit}>
          <label className="player-label" htmlFor="username">
            {label}
          </label>
          <div className="row mar-top10 margin-bottom10">
            <input
              id="username"
              type="text"
              value={userName}
              onChange={onUsernameChanged}
              placeholder="github username"
            />
            <button type="submit" className="pointer" disabled={!userName}>
              <FaSearch color="#11264d" size={22} />
            </button>
          </div>
        </form>
      )}
    </ThemeConsumer>
  );
};

const PlayerPreview = ({ username, onReset }) => {
  return (
    <ThemeConsumer>
      {({ theme }) => {
        return (
          <div
            className={`player-preview-container ${
              theme === "Light" ? "light-bg" : "dark-bg"
            }`}
          >
            <div className="player-info">
              <img
                className="avatar-small mar-right10"
                src={`https://github.com/${username}.png?size=200`}
                alt={`avatar of ${username}`}
              />
              <a
                className="player-name link"
                href={`https://github.com/${username}`}
              >
                {username}
              </a>
              <button
                className="btn-clear del-btn pointer"
                onClick={() => onReset(null)}
              >
                <FaTimesCircle color="red" size={22}></FaTimesCircle>
              </button>
            </div>
          </div>
        );
      }}
    </ThemeConsumer>
  );
};
const Battle = () => {
  const [playerOne, setPlayerOne] = React.useState(null);
  const [playerTwo, setPlayerTwo] = React.useState(null);
  const [profile, setProfile] = React.useState();
  const handleSubmit = (playerId, playerName) => {
    playerId === "playerOne"
      ? setPlayerOne(playerName)
      : setPlayerTwo(playerName);
  };
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <>
          <Instruction />
          <div className="players-container">
            <h1 className="lg-header center-text">Players</h1>
            <div className="row space-around">
              {!playerOne ? (
                <PlayerInput
                  label="Player One"
                  onSubmit={(playerName) =>
                    handleSubmit("playerOne", playerName)
                  }
                />
              ) : (
                <PlayerPreview
                  username={playerOne}
                  onReset={(playerName) =>
                    handleSubmit("playerOne", playerName)
                  }
                />
              )}
              {!playerTwo ? (
                <PlayerInput
                  label="Player Two"
                  onSubmit={(playerName) =>
                    handleSubmit("playerTwo", playerName)
                  }
                />
              ) : (
                <PlayerPreview
                  username={playerTwo}
                  onReset={(playerName) =>
                    handleSubmit("playerTwo", playerName)
                  }
                />
              )}
            </div>
            {playerOne && playerTwo && (
              <Link
                className={`dark-btn pointer ${
                  theme === "Light" ? "light-bg" : "dark-bg"
                }`}
                to={{
                  pathname: "battle/results",
                  search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`,
                }}
              >
                Battle
              </Link>
            )}
          </div>
        </>
      )}
    </ThemeConsumer>
  );
};

export default Battle;
