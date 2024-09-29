import express from "express";
import sendEmail from "../controllers/emailController.js";

const router = express.Router();

// Route to handle sending email
router.post("/sendEmail", sendEmail);

export default router;
