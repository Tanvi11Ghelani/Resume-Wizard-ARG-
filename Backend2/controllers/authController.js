import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { uploadOnCloudinary } from "../config/cloudinary.js";
import { validationResult } from "express-validator";
import { ApiError } from "../util/ApiError.js";
import axios from "axios";
import sendEmail from "./emailController.js";

// Sign-Up Controller
export const signupUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    if (!email) {
      throw new ApiError(400, "Email is required");
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Handle avatar upload to Cloudinary
    if (!req.files || !req.files.avatar) {
      throw new ApiError(400, "Avatar file is required");
    }

    const avatarLocalPath = req.files.avatar[0].path; // Use the file path
    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar) {
      throw new ApiError(400, "Failed to upload avatar");
    }

    // Create new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      avatar: {
        public_id: avatar.public_id,
        url: avatar.secure_url,
      },
    });

    await user.save();

    // Send welcome email
    const emailResult = await sendEmail(
      email,
      "Welcome to ResumeWizard",
      "Thank you for signing up! We're excited to have you on board."
    );

    if (!emailResult.success) {
      return res.status(500).json({
        message: "User registered, but failed to send welcome email.",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token, message: "User registered successfully" });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

// Login Controller
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
    const emailResult = await sendEmail(
      email,
      "Welcome to ResumeWizard",
      "Thank you for Login! We're excited to have you on board."
    );

    if (!emailResult.success) {
      return res.status(500).json({
        message: "User registered, but failed to send welcome email.",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "user is not exist" });
  }
};

// Logout Controller
export const logoutUser = (req, res) => {
  // Clear the JWT token on the client side or clear cookies for session management
  req.logout(); // If using sessions
  res.json({ message: "User logged out successfully" });
};

// Google Signup Controller
export const googleSignup = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { username, email, avatar, authProvider } = req.body;

    if (!username || !email || !avatar || !authProvider) {
      console.log("Missing required fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    let user = await User.findOne({ email });
    if (!user) {
      console.log("Creating new user");
      user = new User({
        username,
        email,
        avatar: {
          public_id: avatar,
          url: avatar,
        },
        authProvider,
      });

      try {
        await user.save();
        console.log("User Created:", user);
      } catch (saveError) {
        console.error("Error saving user to MongoDB:", saveError);
        return res
          .status(500)
          .json({ message: "Error saving user data to database." });
      }
    } else {
      console.log("User already exists:", user);
    }

    const emailResult = await sendEmail(
      email,
      "Welcome to ResumeWizard",
      "Thank you for signing up! We're excited to have you on board."
    );

    if (!emailResult.success) {
      return res.status(500).json({
        message: "User registered, but failed to send welcome email.",
      });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token, message: "Google signup successful!" });
  } catch (error) {
    console.error("Google Signup Error:", error);
    res.status(500).json({ message: "Failed to sign up with Google." });
  }
};

// Function to handle Google authentication callback
