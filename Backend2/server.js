import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import textRoutes from "./routes/textRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import emailRoutes from "./routes/emailRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js"

dotenv.config();

// Connect to the database
connectDB();

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173", // Replace with your frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Express session middleware (only if using session-based auth)
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.set("view engine", "ejs");

// Passport middleware for Google Auth
app.use(passport.initialize());
app.use(passport.session());

// Routes
// - auth
app.use("/api/auth", authRoutes);
//text(grammer)
app.use("/api/text", textRoutes);

app.use("/api/email", emailRoutes);

app.use("/api/resume",resumeRoutes)

// Error handling middleware
app.use(errorHandler);

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
