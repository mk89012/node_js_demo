require('dotenv').config()
const jwt = require('jsonwebtoken');
const {User} = require('../authModel');

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decodedToken._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(user);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { authenticate };