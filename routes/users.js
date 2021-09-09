const express = require("express");
const router = express.Router();

const { insertUser, getUserByEmail } = require("../model/User.model");
const { hashPassword, comparePassword } = require("../services/bcrypt");
const { createAccessJWT, createRefreshJWT } = require("../services/checkToken");
const { json } = require("body-parser");

router.get("/", (req, res, next) => {
  // res.json({ message: " get users route" });
  next();
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
  console.log("Corp de la requête login : ", req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      status: "error",
      message: "Les informations saisies sont incorrectes",
    });
  }

  const user = await getUserByEmail(email);

  console.log(" user connected : ", user);

  const pwdCompare = user && user._id ? user.password : null;

  if (!pwdCompare)
    return res.json({
      status: "error",
      message: "vos identifiants sont incorrectes",
    });

  const result = await comparePassword(password, pwdCompare);
  console.log("result : ", result);
  if (!result) {
    return res.json({
      status: "error",
      message: "vos identifiants sont incorrectes",
    });
  }

  const accessJWT = await createAccessJWT(user.email);
  const refreshJWT = await createRefreshJWT(user.email);

  res.json({
    status: "success",
    message: "Connexion réussie",
    accessJWT,
    refreshJWT,
  });
});

module.exports = router;
