import express from 'express';
import {
  getAllLeaders,
  deleteLeaderById,
  getLeaderById,
  updateLeaderById,
} from '../controllers/leaders.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import studentRoutes from "../routes/api.students.js"; // Correct import path
import { canDelete, canLeaderEditMiddleware,  canViewLeaderMiddleware } from '../middleware/leaderMiddleware.js';
import { canViewLeaderStudentsMiddleware } from '../middleware/studentMiddleware.js';
import { getAllStudent } from '../controllers/students.controller.js';
const router = express.Router();
// Apply authentication middleware to all routes
router.use(authMiddleware);

// ! studnets
router.use("/:leaderId/students", canViewLeaderStudentsMiddleware, studentRoutes);

// ! All students
router.get("/all-students", canViewLeaderStudentsMiddleware, getAllStudent);

// ! All leaders
router.get('/', canViewLeaderMiddleware, getAllLeaders);
// ! Get leader by ID
router.get('/:leaderId', canViewLeaderMiddleware, getLeaderById);
// ! Update leader by ID
router.put('/:leaderId', canLeaderEditMiddleware, updateLeaderById);
// ! Delete leader by ID
router.delete('/:leaderId', canDelete, deleteLeaderById);

export default router;
