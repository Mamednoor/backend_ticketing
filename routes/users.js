const express = require("express");
const router = express.Router();
const { insertUser } = require("../model/User.model");

router.all("/", (req, res, next) => {
  // res.json({ message: " get users route" });
  next();
});

router.post("/", async (req, res) => {
  const result = await insertUser(req.body);
  console.log(result);

  res.json({ message: "Un nouvel utilisateur à été crée", result });
});

module.exports = router;
