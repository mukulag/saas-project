const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';

module.exports = (req, res, next) => {
  console.log("hi")
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, secretKey);
    req.userData = { userId: decodedToken.userId, email: decodedToken.email };
    next();
  } catch (error) {
    console.log("Ponka")
    return res.status(401).json({ error: 'Authentication failed try Again' });
  }
};