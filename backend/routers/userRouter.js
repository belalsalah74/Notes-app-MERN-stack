const express = require("express");
const router = express.Router();
const c = require("../controllers/userControllers");
router.route("/register").post(c.Register);
router.route("/login").post(c.Login);

module.exports = router;
