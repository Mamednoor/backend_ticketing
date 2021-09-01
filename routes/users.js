const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({ message: " get users route" });
});

module.exports = router;
