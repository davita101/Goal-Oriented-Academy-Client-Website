import express from 'express';
import {
  getAllLeaders,
  leaderStudents,
  deleteLeaderById,
  leaderOneStudent,
  getLeaderById,
  updateLeaderById,
  updateLeaderStudent, // New controller for updating a student
  deleteLeaderStudent
} from '../controllers/leaders.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();
// Apply authentication middleware to all routes
router.use(authMiddleware);

// ! All leaders
router.get('/', getAllLeaders);

// ! Get leader by ID
router.get('/:leaderId', getLeaderById);

// ! Update leader by ID
router.put('/:leaderId', updateLeaderById);

// ! Delete leader by ID
router.delete('/:leaderId', deleteLeaderById);

// ! Leader's all students
router.get('/:leaderId/students', leaderStudents);

// ! One student
router.get('/:leaderId/students/:studentId', leaderOneStudent);

// ! Update student
router.put('/:leaderId/students/:studentId', updateLeaderStudent);

// ! Delete student
router.delete('/:leaderId/students/:studentId', deleteLeaderStudent);



export default router;
