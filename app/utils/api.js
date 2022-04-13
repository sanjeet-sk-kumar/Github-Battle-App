//we are doing this to increase the API access limi
const id = "YOUR_ID";
const secret = "YOUR_SECRET_ID";
const param = `?client_id=${id}&client_secret=${secret}`;

// Function to fetch the user github profile
export const getUserProfile = (username) => {
  return fetch(`https://api.github.com/users/${username}${param}`)
    .then((res) => res.json())
    .then((userProfile) => {
      if (userProfile.message) throw new Error(userProfile.message);
      return userProfile;
    });
};

// Function to fetch the user's repos
const getUserRepos = (username) => {
  return fetch(
    `https://api.github.com/users/${username}/repos${param}&per_page=100`
  )
    .then((res) => res.json())
    .then((userRepos) => {
      if (userRepos.message) throw new Error(userRepos.message);
      return userRepos;
    });
};

// function to sum of all the stars of each individual repo
const getStartCount = (repos) => {
  return repos.reduce((total, curRepo) => total + curRepo.stargazers_count, 0);
};

// function to calculate the user score based on followers and repository star
const calculateScore = (followers, repos) => {
  return followers + getStartCount(repos);
};

// function to generate user data along with score
const getUserDetails = (username) => {
  return Promise.all([getUserProfile(username), getUserRepos(username)]).then(
    ([profile, repos]) => {
      return { profile, score: calculateScore(profile.followers, repos) };
    }
  );
};

// sort player arrays based on their calculated score
const sortPlayers = (players) => {
  return players.sort((a, b) => b.score - a.score);
};

// function two battle between the users
export const battle = (players) => {
  return Promise.all([
    getUserDetails(players[0]),
    getUserDetails(players[1]),
  ]).then((results) => {
    return sortPlayers(results);
  });
};

const fetchPopularRepos = (lang) => {
  return fetch(
    `https://api.github.com/search/repositories?q=stars:>1+language:${lang}&sort=stars&order=desc`
  )
    .then((res) => res.json())
    .then((repos) => {
      if (!repos.items) throw new Error(repos.message);
      return repos.items;
    });
};

export default fetchPopularRepos;
