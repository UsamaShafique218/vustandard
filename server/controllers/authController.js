import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const isProd = process.env.NODE_ENV === "production";
const cookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const publicUser = (user) => ({ id: user._id, name: user.name, email: user.email, role: user.role });

// Login (admin only; there is no public sign-up)
export const login = async (req, res) => {
  const { email = "", password = "" } = req.body || {};
  const user = await User.findOne({ email: String(email).toLowerCase().trim() });
  if (!user || !(await bcrypt.compare(String(password), user.password))) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.cookie("token", token, cookieOptions).json({ message: "Login successful", user: publicUser(user) });
};

export const logout = (req, res) => {
  const { maxAge: _maxAge, ...rest } = cookieOptions;
  res.clearCookie("token", rest).json({ message: "Logged out" });
};

export const me = async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(401).json({ message: "Not authorized" });
  res.json({ user: publicUser(user) });
};
