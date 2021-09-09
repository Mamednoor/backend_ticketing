const jwt = require("jsonwebtoken");

const { setToken, getToken } = require("./redis");
const { storeUserRefreshToken } = require("../model/User.model");

const createAccessToken = async (email, _id) => {
  try {
    const accessToken = await jwt.sign(
      { email },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: "15m",
      }
    );
    await setToken(accessToken, `${_id}`);
    return Promise.resolve(accessToken);
  } catch (error) {
    return Promise.reject(error);
  }
};

const createRefreshToken = async (email, _id) => {
  try {
    const refreshToken = await jwt.sign(
      { email },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: "30d",
      }
    );
    await storeUserRefreshToken(_id, refreshToken);
    return Promise.resolve(refreshToken);
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = {
  createAccessToken,
  createRefreshToken,
};
