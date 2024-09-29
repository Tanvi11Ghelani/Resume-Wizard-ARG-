import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  googleId: {
    type: String,
  },
  authProvider: {
    type: String,
    enum: ["google", "local"],
    default: "local",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
