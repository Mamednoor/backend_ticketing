const express = require("express");
const router = express.Router();
const { insertTicket } = require("../model/Ticket.model");

router.get("/", (req, res, next) => {
  // res.json({ message: " get tickets route" });
  next();
});

router.post("/", async (req, res) => {
  try {
    const result = await insertTicket(req.body);
    console.log("création du ticket réussis", result);
    res.json({ message: "Un nouveau ticket a été crée", result });
  } catch (error) {
    console.log("erreur lors de la création du ticket", error);
    res.json({ status: "error", message: error.message });
  }
});

module.exports = router;
