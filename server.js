// require('dotenv').config();
const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");
const PORT = process.env.PORT || 8080;
const db = require("./models");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use(
  // session({ secret:process.env.SESSION_SECRET, resave: true, saveUninitialized: true })
  session({ secret: "asflkjd", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

const apiRoutes = require("./routes/post-api-routes");
app.use(apiRoutes);

require("./routes/routes")(app);

//handlebars stuff start
const handlebars = require("express-handlebars");
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
//end handlebars stuff

// const socket = require("socket.io");

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log("Server listening on: http://localhost:" + PORT);
  });
});
