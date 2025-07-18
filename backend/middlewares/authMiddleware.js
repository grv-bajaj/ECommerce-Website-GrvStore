import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';
import dotenv from 'dotenv';
dotenv.config();

const authenticate = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;

  // Check if token exists
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }

  // Verify the token and get user data
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select('-password');
    next();
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized, token failed');
  }
});

const authenticateAdmin = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).send('Not authorized as an admin');
    }
});

export { authenticate, authenticateAdmin };
// This code defines middleware functions for user authentication in an Express application. The `authenticate` function checks for a JWT token in the request cookies, verifies it, and attaches the user data to the request object. The `authenticateAdmin` function does the same but also checks if the user is an admin before allowing access to certain routes. If the token is missing or invalid, it responds with an error message and appropriate status code.