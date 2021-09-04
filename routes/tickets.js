const express = require("express");
const router = express.Router();
const { insertTicket } = require("../model/Ticket.model");

router.get("/", (req, res, next) => {
  // res.json({ message: " get tickets route" });
  next();
});

router.post("/", async (req, res) => {
  const result = await insertTicket(req.body);
  console.log(result);

  res.json({ message: "Un nouveau ticket à été crée", result });
});

module.exports = router;
