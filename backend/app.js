require("dotenv").config({ path: `${__dirname}/src/utils/config/.env` });
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const { createRoles } = require("./src/libs/initialSetup");
const { createCategories } = require("./src/libs/initialSetup");
const session = require("express-session");
const passport = require("passport");
const routes = require("./src/routes/index");
const cors = require("cors");
const verifyToken = require('./src/controllers/middlewares/verifyToken');


//INSTANCIA DE EXPRESS
const server = express();
createRoles();
createCategories();

//ESTRATEGIAS
require("./src/passport/local-auth");
require("./src/passport/google-auth");

//MIDDLEWARES
server.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Origin",
    ],
  })
);
server.use(
  session({
    secret: "algunstringtemporalqsy",
    saveUninitialized: true,
    resave: true,
  })
);
server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use(passport.initialize());
server.use(passport.session());
// server.use('/profile', verifyToken)

server.use("/", routes);

module.exports = server;
