const express = require("express");
const cors = require("cors");
const body_parser = require("body-parser");
const dbConnection = require("./db");
const register = require("./routes/register");
const postRouter = require("./routes/posts");
const cookieParser = require("cookie-parser");

const app = express();
const port = 9000;
//MIDDLEWARES
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());
app.use(cookieParser());
// Use CORS middleware
app.use(cors());

//ROUTES
app.use("/register", register);
app.use("/login", require("./routes/loginRoute"));
app.use("/api/posts", postRouter);
app.use("/api/logout", require("./routes/logout"));

//CONNECT THE DB WITH NODE
dbConnection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Database has been connected successfully");
  }
});

app.listen(port, () => {
  console.log("server running on port" + port);
});
