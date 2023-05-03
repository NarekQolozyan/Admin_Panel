const jwt = require('jsonwebtoken')
require('dotenv').config()

const SECRET = process.env.TOKEN_SECRET

module.exports.authenticateTokenAdmin = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.sendStatus(401);
  } 

  jwt.verify(token, SECRET, (err, decodedToken) => {
    if (err) {
      return res.sendStatus(403);
    } 
    
    if (decodedToken.role !== 'admin') {
      console.log(decodedToken)

      return res.sendStatus(403);
    }
    
    next();
  });
};
