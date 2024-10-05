import express from 'express'; // Use import instead of require
import {
    createResume,
    updateResume,
    deleteResume,
    getAllResumes,
    getResumeById,
    addEducation,
    updateEducation,
    deleteEducation,
    addExperience,
    updateExperience,
    deleteExperience
} from '../controllers/resumeController.js';

// Create a new router instance
const router = express.Router();

// Routes for Resume
router.post('/', createResume);
router.get('/:id', getResumeById);
router.put('/update/:id', updateResume);
router.delete('/delete/:id', deleteResume);
router.get('/', getAllResumes);

// Routes for education operations
router.post('/:profileId/education', addEducation);
router.put('/:profileId/education/:educationId', updateEducation);
router.delete('/:profileId/education/:educationId', deleteEducation);

// Experience routes (within profile)
router.post('/:profileId/experience', addExperience);
router.put('/:profileId/experience/:experienceId', updateExperience);
router.delete('/:profileId/experience/:experienceId', deleteExperience);

export default router;
