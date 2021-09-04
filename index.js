require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const routes = require("./routes/route");

const PORT = process.env.PORT || 8080;
// sécurité pour l'API
app.use(helmet());
// gestion des erreur cors
app.use(cors());

// connexion à MongoDB
mongoose.connect(process.env.DB_URL, {
  auth: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
  },
  authSource: "admin",
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
// affiche un message si la connexion à MongoDB est active ou un message d'erreur ainsi que la gestion des connexions
if (process.env.NODE_ENV !== "production") {
  const mDbConnect = mongoose.connection;
  mDbConnect.on("open", () => {
    console.log("mDbConnect : ", "MongoDB is connected");
  });
  mDbConnect.on("error", (error) => {
    console.log("error mongoose", error);
  });
  // gestion des connections
  app.use(morgan("dev"));
}

// configuration du corps bodyParser
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // for parsing application/json

//appel les routes dans un fichier commun
app.use("/", routes.api);
app.use("/users", routes.users);
app.use("/tickets", routes.tickets);

const handleError = require("./utils/errorHandler");

app.use((req, res, next) => {
  const error = new Error("la page demandée n'hexiste pas");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  handleError(error, res);
});

app.listen(PORT, () => {
  console.log(`API is running on http://localhost:${PORT}`);
});
