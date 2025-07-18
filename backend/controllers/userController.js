import User from '../models/userModel.js';
import createToken from '../utils/createToken.js';
import bcrypt from 'bcryptjs';
import asyncHandler from '../middlewares/asyncHandler.js';
// import asyncHandler from 'express-async-handler' We are using a custom asyncHandler middleware instead

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input        
  if (!username || !email || !password) {
    res.status(400);
    throw new Error('Please fill all the fields');
  }
  if (username.trim() === '' || email.trim() === '' || password.trim() === '') {
    res.status(400);
    throw new Error('Fields cannot be empty');
  }
  if (username.length < 2) {
    res.status(400);
    throw new Error('Username must be at least 2 characters long.');
  }
  if(email.length < 5) {
    res.status(400);
    throw new Error('Email must be at least 5 characters long');
  }
  if(password.length < 6) {
    res.status(400);
    throw new Error('Password must be at least 6 characters long');
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);  
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    // Save the new user to the database
    await newUser.save();
    // Create JWT token
    createToken(res, newUser._id);
    // Respond with user data
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(500);
    throw new Error('Error creating user!');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    res.status(400);
    throw new Error('Please fill all the fields');
  }

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (!userExists) {
    res.status(400);
    throw new Error('User does not exist');
  }

  // Check password
  const isPasswordCorrect = await bcrypt.compare(password, userExists.password);
  if (!isPasswordCorrect) {
    res.status(400);
    throw new Error('Invalid password');
  }

  // Create JWT token and Respond with user data
  createToken(res, userExists._id);
  res.status(200).json({
    _id: userExists._id,
    username: userExists.username,
    email: userExists.email,
    isAdmin: userExists.isAdmin,
  });
});

const logoutCurrentUser = asyncHandler(async (req, res) => {
  // Clear the cookie to log out the user
  res.cookie('jwt', '', { 
    expires: new Date(0),
    httpOnly: true
   });
  res.status(200).json({ message: 'User logged out successfully' });
});

const getAllUsers = asyncHandler(async (req, res) => {
  // Fetch all users from the database
  const users = await User.find({});
  res.json(users);
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const currentUser = await User.findById(req.user._id); 

  if (!currentUser) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json({
    _id: currentUser._id,
    username: currentUser.username,
    email: currentUser.email,
  });
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    // Update user fields
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    // Hash new password if provided
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt) || user.password;
    }

    // Save updated user to the database and respond with user dat
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    // Prevent deletion of admin user
    if (user.isAdmin) {
      res.status(400);
      throw new Error('Cannot delete admin user');
    }
    // Delete user from the database
    await user.deleteOne({ _id: user._id });
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password'); // Exclude password from response

  if (user) {
    // Respond with user data
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    // Update user fields
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin) || user.isAdmin;

    // Save updated user to the database and respond with user data
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {createUser, loginUser, logoutCurrentUser, getAllUsers, getCurrentUserProfile , updateCurrentUserProfile, deleteUserById, getUserById, updateUserById};
// This function handles the creation of a new user, etc. It checks if the user already exists and creates a new user if not.