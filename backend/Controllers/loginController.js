import { User } from "../Modules/Schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const register = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const existing = await User.findOne({ $or: [{ email },{username}] });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      name: username,
      password: hashedPassword,
    });

    await newUser.save();

    const token = newUser.generateAccessToken();

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: newUser._id,
        username: newUser.name,
        email: newUser.email,
      },
    });
    // Think of sending cookie if we want to make it more secure with options like httpOnly, secure, sameSite etc.
    // Then only changes can be made in server side and client side will not have access to it.

  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid username" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Incorrect password" });

    const token = user.generateAccessToken();

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};

// {
//   "email": "test@example.com",
//   "username": "john",
//   "password": "123456"
// }

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // Altermatively we can use cookies to store token
  const token = authHeader?.split(" ")[1];
  
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
