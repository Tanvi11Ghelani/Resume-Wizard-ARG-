const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  location: { type: String },
  description: { type: String },
  currentlyWorking: { type: Boolean, default: false },
});

const educationSchema = new mongoose.Schema({
  schoolOrUniversity: { type: String, required: true },
  degree: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  currentlyStudying: { type: Boolean, default: false },
  description: { type: String },
});

const profileSchema = new mongoose.Schema(
  {
    jobTitle: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    photo: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    }, // Store the photo URL or file path
    country: { type: String, required: true },
    city: { type: String, required: true },
    professionalSummary: { type: String },
    experience: [experienceSchema],
    education: [educationSchema],
    skills: [{ type: String }],
    links: [{ type: String }],
    awards: [{ type: String }],
    courses: [{ type: String }],
    internships: [{ type: String }],
    languages: [{ type: String }],
    hobbies: [{ type: String }],
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
