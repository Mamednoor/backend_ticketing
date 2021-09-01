const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const routes = require("./routes/route");

// sécurité pour l'API
app.use(helmet());
// gestion des erreur cors
app.use(cors());
// gestion des connections
app.use(morgan("dev"));
// configuration du corps bodyParser
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // for parsing application/json

//appel les routes dans un fichier commun
app.use("/", routes.api);
app.use("/users", routes.users);
app.use("/tickets", routes.tickets);

const port = process.env.PORT || 8080;

const handleError = require("./routes/errorHandler");

// app.use("/", (req, res, next) => {
//   res.json({ message: "Hello World API backend" });
// });

app.use((req, res, next) => {
  const error = new Error("la page demandée n'hexiste pas");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  handleError(error, res);
});

app.listen(port, () => {
  console.log(`API is running on http://localhost:${port}`);
});
