const jwt = require("jsonwebtoken");
require("dotenv").config();

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token)
    return res.status(401).json({
      error: "No token",
    });

  try {
    const decoded = jwt.verify(token, process.env.JWT);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      error: "Access denied",
    });
  }
}

module.exports = auth;
