const express = require("express");
const handleSignUp = require("../dbController/handleLogin");
const router = express.Router();

router.post("/", handleSignUp.logout);

module.exports = router;
