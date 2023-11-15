const jwt = require("jsonwebtoken");
const { templateResponse } = require("../helper/templateResponse");
const { JWT_SECRET } = process.env;

const restrict = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    let resp = templateResponse("error", "Unauthorized", null);
    return res.status(401).json(resp);
  }

  const token = authorization.split(" ")[1];

  jwt.verify(token, JWT_SECRET, (err, decode) => {
    if (err) {
      let resp = templateResponse("error", "Unauthorized", null);
      return res.status(401).json(resp);
    }

    req.user = decode;
    next();
  });
};

module.exports = {
  restrict,
};
