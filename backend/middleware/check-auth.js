const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw new Error('Authentication failed!');
    }
    //Validating token
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    //Adding data to request
    req.userData = {
      userId: decodedToken.userId,
      isAdmin: decodedToken.isAdmin,
    };
    next();
  } catch (error) {
    return next(new HttpError('Authentication failed!', 403));
  }
};
