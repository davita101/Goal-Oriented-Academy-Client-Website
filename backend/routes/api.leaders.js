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
import { roleMiddleware } from '../middleware/roleMiddleware.js';
import { ALLOWED_ROLES } from '../constants/app.js';

const router = express.Router();
// Apply authentication middleware to all routes
router.use(authMiddleware);

// ! All leaders
router.get('/', roleMiddleware(ALLOWED_ROLES), getAllLeaders);

// ! Get leader by ID
router.get('/:leaderId', roleMiddleware(ALLOWED_ROLES), getLeaderById);

// ! Update leader by ID
router.put('/:leaderId', roleMiddleware(ALLOWED_ROLES), updateLeaderById);

// ! Delete leader by ID
router.delete('/:leaderId', roleMiddleware(ALLOWED_ROLES), deleteLeaderById);

// ! Leader's all students
router.get('/:leaderId/students', roleMiddleware(ALLOWED_ROLES), leaderStudents);

// ! One student
router.get('/:leaderId/students/:studentId', roleMiddleware(ALLOWED_ROLES), leaderOneStudent);

// ! Update student
router.put('/:leaderId/students/:studentId', roleMiddleware(ALLOWED_ROLES), updateLeaderStudent);

// ! Delete student
router.delete('/:leaderId/students/:studentId', roleMiddleware(ALLOWED_ROLES), deleteLeaderStudent);

export default router;
