const jwt = require("jsonwebtoken");

const config=require('../config.json')

const authenticateJWT = (req, res, next) => {
  console.log(req.headers)
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    // const token = authHeader
    jwt.verify(token, config.SECRET, (err, user) => {
      if (err) {
        return res.status(403).send({ msg: "something wrong" });
      }
      req.user = user;
      next();
    });
  }
  else {
    res.status(401).send({ message: "no token exist" });
  }

};

module.exports = authenticateJWT;


