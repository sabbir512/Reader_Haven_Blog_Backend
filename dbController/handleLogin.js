const mysql = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signin = (req, res) => {
  //CHECKING USER EXISTS OR NOT;
  const emailFromDb = "SELECT * FROM users WHERE email = ?";

  mysql.query(emailFromDb, [req.body.email], (err, result) => {
    if (err) {
      console.error("Error during login:", err);
      return res.status(500).json("Internal Server Error");
    }

    if (result.length === 0) {
      return res.status(404).json("User Not Found");
    }

    //IF EVERYTHING OK NOW CHECK THE PASSWORD
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      result[0].password
    );

    if (!isPasswordCorrect) {
      return res.redirect(
        "http://localhost:3000/login?message=Password or usename is wrong"
      );
    }

    const secretKey = "defaultSecretKey";

    const token = jwt.sign({ id: result[0].id }, secretKey);
    const { password, ...other } = result[0];

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: false,
    });
    res.status(200).json(other);
  });
};

// LOGOUT
exports.logout = (req, res) => {
  res.clearCookie("access_token", {
    sameSite: "none",
    secure: true,
  });

  // Send a JSON response indicating success
  res.status(200).json({ message: "User has been logged out successfully." });
};
