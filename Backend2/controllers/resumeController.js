import Profile from "../models/resumeFieldModel.js"; // Import the Profile model

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
  const { profileId } = req.params; // Destructure profile ID from params
  const experienceData = req.body; // Experience data from the request body

  console.log("Incoming request to add experience:", { profileId, experienceData }); // Log incoming request

  try {
    // Find the profile by ID
    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Push the new experience data into the profile's experience array
    profile.experience.push(experienceData);

    // Save the updated profile
    const updatedProfile = await profile.save();

    // Return the updated experience array or profile
    res.status(201).json(updatedProfile); // You can also send just updatedProfile.experience if needed
  } catch (error) {
    console.error("Error adding experience:", error); // Log the error for debugging
    res.status(400).json({ message: error.message }); // Return a bad request status with the error message
  }
};

// 7. Update specific experience entry by ID
export const updateExperience = async (req, res) => {
  const { profileId, experienceId } = req.params; // Destructure profile and experience ID from params

  console.log("Updating experience for profileId:", profileId, "with experienceId:", experienceId); // Log incoming request

  try {
    // Find the profile by ID
    const profile = await Profile.findById(profileId);
    console.log("Profile found:", profile); // Log the profile

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Locate the specific experience entry by experienceId
    const experience = profile.experience.id(experienceId);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    // Update the experience entry with the new data
    Object.assign(experience, req.body);

    // Save the updated profile
    await profile.save();

    // Optionally return just the updated experience entry
    res.status(200).json(experience); // Return the updated experience entry
  } catch (error) {
    console.error("Error updating experience:", error); // Log the error for debugging
    res.status(400).json({ message: error.message }); // Return a bad request status with the error message
  }
};


// 8. Delete specific experience entry by ID
export const deleteExperience = async (req, res) => {
  const { profileId, experienceId } = req.params; // Destructure profile and experience ID from params

  try {
    // Find the profile by its ID
    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Check if the experience with the given experienceId exists
    const experienceIndex = profile.experience.findIndex(
        (exp) => exp._id.toString() === experienceId
    );

    if (experienceIndex === -1) {
      return res.status(404).json({ message: "Experience not found" });
    }

    // Remove the experience by index
    profile.experience.splice(experienceIndex, 1);

    // Save the updated profile
    await profile.save();

    // Respond with the updated profile
    res.status(200).json(profile);
  } catch (error) {
    console.error("Error deleting experience:", error); // Log the error for debugging
    res.status(500).json({ message: error.message });
  }
};

// 9. Add a new education record
export const addEducation = async (req, res) => {
  const { profileId } = req.params; // Get profile ID from the request parameters
  const educationData = req.body; // Get education data from the request body

  console.log("Request Params:", req.params); // Log to check the incoming profile ID
  try {
    const profile = await Profile.findById(profileId);
    console.log("Fetched Profile:", profile); // Log the fetched profile

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    profile.education.push(educationData); // Add education data to the education array
    await profile.save(); // Save the updated profile
    res.status(201).json(profile); // Respond with the updated profile
  } catch (error) {
    console.error("Error adding education:", error); // Log the error
    res.status(500).json({ message: error.message });
  }
};


// 10. Update an existing education record
export const updateEducation = async (req, res) => {
  const { profileId, educationId } = req.params; // Get profile ID and education ID from the request parameters
  const updatedEducationData = req.body; // Get updated education data from the request body

  try {
    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    const education = profile.education.id(educationId);
    if (!education) {
      return res.status(404).json({ message: 'Education entry not found' });
    }

    education.set(updatedEducationData); // Update the fields of the education entry
    await profile.save(); // Save the updated profile
    res.status(200).json(profile); // Respond with the updated profile
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 11. Delete an education record
export const deleteEducation = async (req, res) => {
  const { profileId, educationId } = req.params; // Get profile ID and education ID from the request parameters

  try {
    // Find the profile by its ID
    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Check if the education with the given educationId exists
    const educationIndex = profile.education.findIndex(
        (edu) => edu._id.toString() === educationId
    );

    if (educationIndex === -1) {
      return res.status(404).json({ message: 'Education entry not found' });
    }

    // Remove the education entry by index
    profile.education.splice(educationIndex, 1);

    // Save the updated profile
    await profile.save();

    // Respond with the updated profile
    res.status(200).json(profile);
  } catch (error) {
    console.error("Error deleting education:", error); // Log the error for debugging
    res.status(500).json({ message: error.message });
  }
};

