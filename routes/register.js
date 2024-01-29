const express = require("express");
const signUpController = require("../dbController/signup");
const router = express.Router();

//THIS IS MIDDLEWARE FOR ALL DB FUNCTION
router.post("/", signUpController.register);

module.exports = router;
