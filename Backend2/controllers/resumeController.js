import Profile from "../models/Profile";

// 1. Create a new resume
export const createResume = async (req, res) => {
  try {
    const newProfile = new Profile(req.body);
    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 2. Get a resume by ID
export const getResumeById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: "Resume not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Update a resume by ID
export const updateResume = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!profile) {
      return res.status(404).json({ message: "Resume not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 4. Delete a resume by ID
export const deleteResume = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: "Resume not found" });
    }
    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5. List all resumes
export const getAllResumes = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 6. Add a new experience to a resume
export const addExperience = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: "Resume not found" });
    }
    profile.experience.push(req.body);
    await profile.save();
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 7. Update specific experience entry by ID
export const updateExperience = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: "Resume not found" });
    }
    const experience = profile.experience.id(req.params.expId);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    Object.assign(experience, req.body);
    await profile.save();
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 8. Delete specific experience entry by ID
export const deleteExperience = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: "Resume not found" });
    }
    const experience = profile.experience.id(req.params.expId);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    experience.remove();
    await profile.save();
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// You can replicate the "add", "update", and "delete" operations for education, skills, awards, etc.
