const jwt = require("jsonwebtoken");

const createAccessToken = (payload) => {
  const accessToken = jwt.sign({ payload }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });

  return Promise.resolve(accessToken);
};

const createRefreshToken = (payload) => {
  const refreshToken = jwt.sign({ payload }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "30d",
  });

  return Promise.resolve(refreshToken);
};

module.exports = {
  createAccessToken,
  createRefreshToken,
};
