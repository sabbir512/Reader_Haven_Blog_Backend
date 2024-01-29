const mysql = require("../db");
const bcrypt = require("bcrypt");

exports.register = (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  mysql.query(
    "SELECT email FROM users WHERE email=?",
    [email],
    async (err, results) => {
      //IF THERE HAVE AND ERROR
      if (err) {
        console.log(err);
      }

      //IF EVERYTHING OK THEN WE WILL WORK WITH DATABASE
      if (results.length > 0) {
        return res.redirect(
          "http://localhost:3000/register?message=This Email has been already Taken Please Try With Another Email"
        );
      } else if (password !== confirmPassword) {
        return res.redirect(
          "http://localhost:3000/register?message=Password Did Not Match Try Again"
        );
      }

      // HASH THE PASSWORD BEFORE STORING IN THE DATABASE
      const hashedPassword = await bcrypt.hash(password, 10);

      mysql.query(
        "INSERT INTO users SET ?",
        { name: name, email: email, password: hashedPassword },
        (err, results) => {
          if (err) {
            console.log(err);
          } else {
            console.log(results);
            return res.redirect(
              "http://localhost:3000/register?message=User Registered Successfully"
            );
          }
        }
      );
    }
  );
};
