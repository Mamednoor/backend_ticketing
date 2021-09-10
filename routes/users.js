const express = require("express");
const router = express.Router();

const {
  insertUser,
  getUserById,
  getUserByEmail,
} = require("../model/User.model");
const { hashPassword, comparePassword } = require("../services/bcrypt");
const {
  createAccessToken,
  createRefreshToken,
} = require("../services/checkToken");

const { checkToken } = require("../services/authorization");

router.all("/", (req, res, next) => {
  next();
});

// profil utilisateur
router.get("/user", checkToken, async (req, res) => {
  const _id = req.userId;
  const userProfil = await getUserById(_id);
  res.json({ user: userProfil });
});

// création d'un utilisateur
router.post("/", async (req, res) => {
  const { firstname, lastname, company, address, phone, email, password } =
    req.body;
  try {
    // hash password with bcrypt
    const hashedPwd = await hashPassword(password);

    const newUser = {
      firstname,
      lastname,
      company,
      address,
      phone,
      email,
      password: hashedPwd,
    };

    const result = await insertUser(newUser);

    console.log("création de l'utilisateur réussis", result);
    res.json({ message: "Un nouvelle utilisateur a été crée", result });
  } catch (error) {
    console.log("erreur lors de la création de l'utilisateur", error);
    res.json({ status: "error", message: error.message });
  }
});

// connexion d'un utilisateur
router.post("/login", async (req, res) => {
  console.log(" info login : ", req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      status: "error",
      message: "Les informations saisies sont incorrectes",
    });
  }

  const user = await getUserByEmail(email);

  const pwdCompare = user && user._id ? user.password : null;

  if (!pwdCompare)
    return res.json({
      status: "error",
      message: "vos identifiants sont incorrectes",
    });

  const result = await comparePassword(password, pwdCompare);
  if (!result) {
    return res.json({
      status: "error",
      message: "vos identifiants sont incorrectes",
    });
  }

  const accessToken = await createAccessToken(user.email, `${user._id}`);
  const refreshToken = await createRefreshToken(user.email, `${user._id}`);

  res.json({
    status: "success",
    message: "Connexion réussie",
    accessToken,
    refreshToken,
  });
});

module.exports = router;
