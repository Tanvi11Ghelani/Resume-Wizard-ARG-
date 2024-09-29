import express from "express";
import {
  signupUser,
  loginUser,
  logoutUser,
  googleSignup,
} from "../controllers/authController.js";
import { check } from "express-validator";
import { upload } from "../middleware/multerMiddleware.js";

const router = express.Router();

// Sign-Up route
router.post(
  "/signup",
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  [
    check("username", "Username is required").notEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be 6 or more characters").isLength({
      min: 6,
    }),
  ],
  signupUser
);

// Login route
router.post("/login", loginUser);

// Logout route
router.post("/logout", logoutUser);

// Google Signup route
router.post("/google-signup", googleSignup);

// router.post("/google", googleSignup);

export default router;
