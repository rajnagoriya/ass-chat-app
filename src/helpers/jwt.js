import jwt from "jsonwebtoken";

// genrate token 
export const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email, isVerified: user.isVerified }, process.env.JWT_SECRET, { expiresIn: '7d' }); 
};

// verify token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

