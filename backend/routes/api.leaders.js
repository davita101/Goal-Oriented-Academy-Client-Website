import express from 'express';
import { getAllLeaders, leaderStudents,deleteLeaderById, leaderOneStudent, getLeaderById, updateLeaderById, deleteLeaderStudent } from '../controllers/leaders.controller.js';

const router = express.Router();

// ! all leaders
router.get('/', getAllLeaders);
// ! get leader by ID
router.get('/:leaderId', getLeaderById);
// ! update leader by ID
router.put('/:leaderId', updateLeaderById);
router.delete('/:leaderId', deleteLeaderById);
// ! leader all students
router.get('/:leaderId/students', leaderStudents);
// ! one student
router.get('/:leaderId/students/:studentId', leaderOneStudent);
// ! update student
router.put('/:leaderId/students/:studentId', updateLeaderById);
// ! delete student
router.delete('/:leaderId/students/:studentId', deleteLeaderStudent);
export default router;