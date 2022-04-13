import React from "react";
import queryString from "query-string";
import { battle } from "../utils/api";
import Loader from "./common/Loader";
import Card from "./common/Card";
import {
  FaUser,
  FaCompass,
  FaUsers,
  FaBriefcase,
  FaUserFriends,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { ThemeConsumer } from "../context/theme";

const ProfileList = ({ profile }) => {
  return (
    <ul className="card-list">
      {profile.name && (
        <li>
          <FaUser color="#EF7373" size={22} />
          {profile.name}
        </li>
      )}
      {profile.location && (
        <li>
          <FaCompass color="#9073FF" size={22} />
          {profile.location}
        </li>
      )}
      {profile.company && (
        <li>
          <FaBriefcase color="#795548" size={22} />
          {profile.company}
        </li>
      )}
      <li>
        <FaUsers color="#81C3F5" size={22} />
        {profile.followers} followers
      </li>
      <li>
        <FaUserFriends color="#40B75F" size={22} />
        {profile.following} followings
      </li>
    </ul>
  );
};
const Results = (props) => {
  const [winner, setWinner] = React.useState();
  const [loser, setLoser] = React.useState();
  const [error, setError] = React.useState();
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const { playerOne, playerTwo } = queryString.parse(props.location.search);
    battle([playerOne, playerTwo])
      .then((results) => {
        setWinner(results[0]);
        setLoser(results[1]);
        setLoading(false);
        console.log(results);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
        console.log(err);
      });
  }, []);
  if (loading) return <Loader loaderText="Battling" delay="400" />;
  if (error) <p className="error center-text">{error}</p>;
  return (
    <ThemeConsumer>
      {({ theme }) => {
        return (
          <div>
            <div className="grid-box">
              {winner && (
                <Card
                  headerText="Winner"
                  subheaderText={`Score: ${winner.score}`}
                  login={winner.profile.login}
                  url={winner.profile.avatar_url}
                  href={winner.profile.html_url}
                >
                  <ProfileList profile={winner.profile} />
                </Card>
              )}
              {loser && (
                <Card
                  headerText="Loser"
                  subheaderText={`Score: ${loser.score}`}
                  login={loser.profile.login}
                  url={loser.profile.avatar_url}
                  href={loser.profile.html_url}
                >
                  <ProfileList profile={loser.profile} />
                </Card>
              )}
            </div>

            <Link
              className={`dark-btn pointer ${
                theme === "Light" ? "light-bg" : "dark-bg"
              }`}
              to="/battle"
            >
              Reset
            </Link>
          </div>
        );
      }}
    </ThemeConsumer>
  );
};

export default Results;
