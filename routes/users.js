const express = require("express");
const router = express.Router();

const { insertUser } = require("../model/User.model");
const { hashPassword } = require("../services/bcrypt");

router.get("/", (req, res, next) => {
  // res.json({ message: " get users route" });
  next();
});

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

    console.log("création d'un utilisateur réussis", result);
    res.json({ message: "Un nouvelle utilisateur à été crée", result });
  } catch (error) {
    console.log("erreur lors de la création d'un utilisateur", error);
    res.json({ status: "error", message: error.message });
  }
});

module.exports = router;
