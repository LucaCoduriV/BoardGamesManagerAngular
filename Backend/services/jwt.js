const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  let token = req.headers.token;
  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(400).send("Accès refusé");
  }
}

exports.verifyToken = verifyToken;
