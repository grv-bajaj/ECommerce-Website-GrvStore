import jwt from 'jsonwebtoken';

const createToken = (res, userId) => {
  // Check if userId is provided
  if (!userId) {
    throw new Error('UserId is required for Token creation');
  }

  // Generate JWT token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {expiresIn: '30d'});
  
  // Set JWT as an HTTP-only cookie
  res.cookie('jwt', token, {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Helps prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  });
  return token;
}

export default createToken; 
// The code is a simple function that generates a JWT token for a user. It takes a userId.
