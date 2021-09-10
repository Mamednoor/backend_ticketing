const { verifyAccessToken } = require("./checkToken");
const { getToken } = require("./redis");

const checkToken = async (req, resp, next) => {
  // on vérifie la présence du token dans les headers
  const token = req.headers.authorization;

  // récuperer les informations de l'utilisateur à partir du token
  const decoded = await verifyAccessToken(token);
  console.log(decoded);
  if (decoded.email) {
    const userId = await getToken(token);

    if (!userId) {
      return resp
        .status(403)
        .json({ message: "Une erreur est survenue, la connexion échouée" });
    }
    req.userId = userId;
    return next();
  }

  return resp.status(401).json({ message: "Authorisation refusée" });
};

module.exports = {
  checkToken,
};
