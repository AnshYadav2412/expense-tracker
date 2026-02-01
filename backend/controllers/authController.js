import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const registerUser = async (req, res) => {
  const { fullName, email, password, profileImageUrl } = req.body;

  //Validation : Check for empty / null fields
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    //create user

    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    res
      .status(201)
      .json({ id: user._id, user, token: generateToken(user._id) });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering the User", error: error.message });
  }
};

export const loginUser = async (req, res) => {};

export const getUserInfo = async (req, res) => {};
