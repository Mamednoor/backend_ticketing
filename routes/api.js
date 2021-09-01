const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({
    message: "welcome root path of api ticketing web application",
  });
});

module.exports = router;
